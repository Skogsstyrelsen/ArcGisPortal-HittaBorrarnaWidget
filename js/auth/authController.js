define([
  "dojo/request/registry",
  "dojo/request/xhr",
  "dojo/Deferred",
  "./jwtdecode",
  "dojo/domReady!"
], function (registry, xhr, Deferred, jwtDecode) {




  function _getNewToken(config) {
    return _makeRequest(config.auth.authority, {
      method: "POST",
      handleAs: "json",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: 'Basic ' + btoa(
          config.auth.clientId + ':' + config.auth.clientSecret
        ),
      },
      data: {
        scope: config.auth.scope,
        grant_type: config.auth.grantType
      }
    });
  }

  function _forwardAuthenticatedRequest(url, opts, token) {
    if (opts.headers) {
      opts.headers.Authorization = 'Bearer ' + token;
    } else {
      opts.headers = {
        Authorization: 'Bearer ' + token
      };
    }
    return _makeRequest(url, opts);
  }

  function _removeOldToken() {
    if (_storageEnabled()) {
      sessionStorage.removeItem("access_token");
    }
  }

  function _getExistingToken() {
    if (_storageEnabled()) {
      if (sessionStorage.access_token && !_hasExpired(sessionStorage.access_token)) {
        return sessionStorage.access_token;
      }
    }
    return null;
  }

  function _hasExpired(token) {
    return jwtDecode.decode(token).exp < new Date().getTime() / 1000;
  }

  function _storageEnabled() {
    try {
      return (typeof (Storage) !== "undefined" && window.sessionStorage);
    } catch (error) {
      return false;
    }
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

  function _makeRequest(url, opts) {
    return xhr(url, opts);
  }

  function registerAuthentication(config) {
    _removeOldToken();
    _checkRequiredKeys(config);
    registry.register(new RegExp(config.url), function (url, opts) {
      var deffered = new Deferred();
      var existingToken = _getExistingToken();
      if (existingToken) {
        return _forwardAuthenticatedRequest(url, opts, existingToken);
      } else {
        return _getNewToken(config).then(function (res) {
          if (_storageEnabled()) {
            sessionStorage.access_token = res.access_token;
          } else {
            console.warn("Session storage ej tillgängligt, autentisering sker istället per anrop");
          }
          return _forwardAuthenticatedRequest(url, opts, res.access_token);
        }, function (err) {
          console.error(err);
          deffered.reject("Misslyckad autentisering, kunde inte skapa token");
          return deffered.promise;
        });
      }

    }, true);
  }

  function register401Handler(config) {
    registry.register(new RegExp(config.url), function (url, opts) {
      var deferred = new Deferred();
      _makeRequest(url, opts).then(
        function (res) {
          deferred.resolve(res);
        },
        function (err) {
          if (err && err.response && err.response.status && err.response.status === 401) {
            deferred.reject("Autentisering misslyckades: " + url);
          }
          deferred.reject(err);
        }
      );
      return deferred.promise;
    });
  }

  return {

    registerAuthentication: registerAuthentication,
    register401Handler: register401Handler
  };

});
