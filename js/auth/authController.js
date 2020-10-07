define([
  "dojo/_base/declare",
  "dojo/Evented",
  "dojo/request",
  "dojo/request/registry",
  "dojo/request/xhr",
  "dojo/Deferred",
  "./jwtdecode",
  "dojo/domReady!"
], function (declare, Evented, request, registry, xhr, Deferred, jwtDecode) {


  function _getToken() {
    if (typeof (Storage) !== "undefined") {
      if (sessionStorage.access_token && !_hasExpired(sessionStorage.access_token)) {
        return sessionStorage.access_token;
      }
    }
    return null;
  }

  function _hasExpired(token) {
    return jwtDecode.decode(token).exp < new Date().getTime() / 1000;
  }

  function _checkRequiredKeys(config) {
    if (!config) {
      throw "Autentisering misslyckades, nödvändig konfiguration saknas";
    }
    if (!config.hasOwnProperty('url')) {
      throw "Autentisering misslyckades, nödvändig nyckel 'url' saknas i konfigurationen";
    }
    if (!config.auth) {
      throw "Autentisering misslyckades, nödvändig nyckel 'auth' saknas i konfigurationen";
    }
    if (!config.auth.hasOwnProperty("authority")) {
      throw "Autentisering misslyckades, nödvändig nyckel 'authority' saknas i konfigurationen";
    }
    if (!config.auth.hasOwnProperty("clientId")) {
      throw "Autentisering misslyckades, nödvändig nyckel 'clientId' saknas i konfigurationen";
    }
    if (!config.auth.hasOwnProperty("clientSecret")) {
      throw "Autentisering misslyckades, nödvändig nyckel 'clientSecret' saknas i konfigurationen";
    }
    if (!config.auth.hasOwnProperty("scope")) {
      throw "Autentisering misslyckades, nödvändig nyckel 'scope' saknas i konfigurationen";
    }
    if (!config.auth.hasOwnProperty("grantType")) {
      throw "Autentisering misslyckades, nödvändig nyckel 'grantType' saknas i konfigurationen";
    }

  }

  function registerAuthentication(config) {
    _checkRequiredKeys(config);
    registry.register(new RegExp(config.url), function (url, opts) {
      var deffered = new Deferred();
      var existingToken = _getToken();
      if (existingToken) {
        if (opts.headers) {
          opts.headers.Authorization = 'Bearer ' + existingToken;
        } else {
          opts.headers = {
            Authorization: 'Bearer ' + existingToken
          }
        }
        xhr(url, opts).then(function (res) {
          deffered.resolve(res);
        }, function (err) {
          deffered.reject(err);
        });
      } else {
        var secret = btoa(
          config.auth.clientId + ':' + config.auth.clientSecret
        );
        var contentType = 'application/x-www-form-urlencoded';
        request.post(config.auth.authority, {
          handleAs: "json",
          headers: {
            'Content-Type': contentType,
            authorization: 'Basic ' + secret,
          },
          data: {
            scope: config.auth.scope,
            grant_type: config.auth.grantType
          }
        }).then(function (res) {
          sessionStorage.access_token = res.access_token;
          if (opts.headers) {
            opts.headers.Authorization = 'Bearer ' + res.access_token;
          } else {
            opts.headers = {
              Authorization: 'Bearer ' + res.access_token
            }
          }
          xhr(url, opts).then(function (innerRes) {
            deffered.resolve(innerRes);
          }, function (err) {
            deffered.reject(err);
          });
        }, function (err) {
          deffered.reject(err);
        });
      }
      return deffered.promise;
    });
  }

  return {

    registerAuthentication: registerAuthentication
  };

});
