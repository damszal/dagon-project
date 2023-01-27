(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firebaseConfig = void 0;
const firebaseConfig = {
  databaseURL: "red note"
};
// databaseURL: "https://dagon-eb84e-default-rtdb.firebaseio.com/",
exports.firebaseConfig = firebaseConfig;

},{}],2:[function(require,module,exports){
"use strict";

var _app = require("firebase/app");
var _database = require("firebase/database");
var _config = require("../config");
const user1 = {
  login: "johncarmack",
  password: "carmack123"
};
const user2 = {
  login: "johnromero",
  password: "romero123"
};
const user3 = {
  login: "jamesgosling",
  password: "gosling123"
};

// Initialize Firebase
const app = (0, _app.initializeApp)(_config.firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = (0, _database.getDatabase)(app);

// console.log(firebaseConfig)

function writeUserData(userId, login, password) {
  const db = (0, _database.getDatabase)();
  (0, _database.set)((0, _database.ref)(db, 'users/' + userId), {
    login: login,
    password: password
  });
}
writeUserData("admin", "admin", "admin123");
writeUserData("user1", user1.login, user1.password);
writeUserData("user2", user2.login, user2.password);
writeUserData("user3", user3.login, user3.password);
const dbRef = (0, _database.ref)((0, _database.getDatabase)());
(0, _database.get)((0, _database.child)(dbRef, `users/admin`)).then(snapshot => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch(error => {
  console.error(error);
});

// ============================================================================
var CryptoJS = require("crypto-js");
console.log("1234567");
let barcodeForm = document.querySelector(".barcode-form");
let passwordForm = document.querySelector(".password-form");
let checkboxSwitch = document.querySelector(".checkbox-switch");
checkboxSwitch.addEventListener('click', () => {
  if (checkboxSwitch.checked == true) {
    barcodeForm.style.display = "none";
    passwordForm.style.display = "block";
  } else {
    barcodeForm.style.display = "block";
    passwordForm.style.display = "none";
  }
});

// ************************************************************************************
// item from database
const barcodeExamp = {
  barcode: 1234567
};
barcodeForm.addEventListener("submit", e => {
  e.preventDefault();
  if (barcodeForm[0].value == barcodeExamp.barcode) {
    document.cookie = "logged = yes";
    localStorage.clear();
    //localStorage.setItem("item", JSON.stringify(barcodeExamp))
    //console.log("zalogowałeś się!")
    window.location.replace("../pick/panel.htm");
    //console.log("zalogowałeś się!jjj")
  }
});

//-----------------------------------------------------------------------

const user1Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user1), 'dagon1').toString();
const user2Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user2), 'dagon2').toString();
//const user3Ecrypt = CryptoJS.AES.encrypt(JSON.stringify(user3), 'dagon3').toString();

// var bytes1  = CryptoJS.AES.decrypt(user1Ecrypt, 'dagon');
// var decryptedData1 = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

// console.log(decryptedData)
// console.log(ciphertext)

window.addEventListener('DOMContentLoaded', e => {
  localStorage.setItem("EncryptedUser1", JSON.stringify(user1Ecrypt));
  localStorage.setItem("EncryptedUser2", JSON.stringify(user2Ecrypt));
  localStorage.setItem("DecryptedUser3", JSON.stringify(user3));
  document.cookie = "logged= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
});

},{"../config":1,"crypto-js":18,"firebase/app":44,"firebase/database":45}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FirebaseError", {
  enumerable: true,
  get: function () {
    return _util.FirebaseError;
  }
});
exports._DEFAULT_ENTRY_NAME = exports.SDK_VERSION = void 0;
exports._addComponent = _addComponent;
exports._addOrOverwriteComponent = _addOrOverwriteComponent;
exports._apps = void 0;
exports._clearComponents = _clearComponents;
exports._components = void 0;
exports._getProvider = _getProvider;
exports._registerComponent = _registerComponent;
exports._removeServiceInstance = _removeServiceInstance;
exports.deleteApp = deleteApp;
exports.getApp = getApp;
exports.getApps = getApps;
exports.initializeApp = initializeApp;
exports.onLog = onLog;
exports.registerVersion = registerVersion;
exports.setLogLevel = setLogLevel;
var _component = require("@firebase/component");
var _logger = require("@firebase/logger");
var _util = require("@firebase/util");
var _idb = require("idb");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    // Loop through providers and get library/version pairs from any that are
    // version components.
    return providers.map(provider => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter(logString => logString).join(' ');
  }
}
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION" /* ComponentType.VERSION */;
}

const name$o = "@firebase/app";
const version$1 = "0.9.1";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new _logger.Logger('@firebase/app');
const name$n = "@firebase/app-compat";
const name$m = "@firebase/analytics-compat";
const name$l = "@firebase/analytics";
const name$k = "@firebase/app-check-compat";
const name$j = "@firebase/app-check";
const name$i = "@firebase/auth";
const name$h = "@firebase/auth-compat";
const name$g = "@firebase/database";
const name$f = "@firebase/database-compat";
const name$e = "@firebase/functions";
const name$d = "@firebase/functions-compat";
const name$c = "@firebase/installations";
const name$b = "@firebase/installations-compat";
const name$a = "@firebase/messaging";
const name$9 = "@firebase/messaging-compat";
const name$8 = "@firebase/performance";
const name$7 = "@firebase/performance-compat";
const name$6 = "@firebase/remote-config";
const name$5 = "@firebase/remote-config-compat";
const name$4 = "@firebase/storage";
const name$3 = "@firebase/storage-compat";
const name$2 = "@firebase/firestore";
const name$1 = "@firebase/firestore-compat";
const name = "firebase";
const version = "9.16.0";

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default app name
 *
 * @internal
 */
const DEFAULT_ENTRY_NAME = '[DEFAULT]';
exports._DEFAULT_ENTRY_NAME = DEFAULT_ENTRY_NAME;
const PLATFORM_LOG_STRING = {
  [name$o]: 'fire-core',
  [name$n]: 'fire-core-compat',
  [name$l]: 'fire-analytics',
  [name$m]: 'fire-analytics-compat',
  [name$j]: 'fire-app-check',
  [name$k]: 'fire-app-check-compat',
  [name$i]: 'fire-auth',
  [name$h]: 'fire-auth-compat',
  [name$g]: 'fire-rtdb',
  [name$f]: 'fire-rtdb-compat',
  [name$e]: 'fire-fn',
  [name$d]: 'fire-fn-compat',
  [name$c]: 'fire-iid',
  [name$b]: 'fire-iid-compat',
  [name$a]: 'fire-fcm',
  [name$9]: 'fire-fcm-compat',
  [name$8]: 'fire-perf',
  [name$7]: 'fire-perf-compat',
  [name$6]: 'fire-rc',
  [name$5]: 'fire-rc-compat',
  [name$4]: 'fire-gcs',
  [name$3]: 'fire-gcs-compat',
  [name$2]: 'fire-fst',
  [name$1]: 'fire-fst-compat',
  'fire-js': 'fire-js',
  [name]: 'fire-js-all'
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @internal
 */
const _apps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports._apps = _apps;
const _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */
exports._components = _components;
function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app.name}`, e);
  }
}
/**
 *
 * @internal
 */
function _addOrOverwriteComponent(app, component) {
  app.container.addOrOverwriteComponent(component);
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  // add the component to existing app instances
  for (const app of _apps.values()) {
    _addComponent(app, component);
  }
  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */
function _getProvider(app, name) {
  const heartbeatController = app.container.getProvider('heartbeat').getImmediate({
    optional: true
  });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app.container.getProvider(name);
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 * @param instanceIdentifier - service instance identifier in case the service supports multiple instances
 *
 * @internal
 */
function _removeServiceInstance(app, name, instanceIdentifier = DEFAULT_ENTRY_NAME) {
  _getProvider(app, name).clearInstance(instanceIdentifier);
}
/**
 * Test only
 *
 * @internal
 */
function _clearComponents() {
  _components.clear();
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
  ["no-app" /* AppError.NO_APP */]: "No Firebase App '{$appName}' has been created - " + 'call Firebase App.initializeApp()',
  ["bad-app-name" /* AppError.BAD_APP_NAME */]: "Illegal App name: '{$appName}",
  ["duplicate-app" /* AppError.DUPLICATE_APP */]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted" /* AppError.APP_DELETED */]: "Firebase App named '{$appName}' already deleted",
  ["no-options" /* AppError.NO_OPTIONS */]: 'Need to provide options, when not being deployed to hosting via source.',
  ["invalid-app-argument" /* AppError.INVALID_APP_ARGUMENT */]: 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.',
  ["invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */]: 'First argument to `onLog` must be null or a function.',
  ["idb-open" /* AppError.IDB_OPEN */]: 'Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-get" /* AppError.IDB_GET */]: 'Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-set" /* AppError.IDB_WRITE */]: 'Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.',
  ["idb-delete" /* AppError.IDB_DELETE */]: 'Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.'
};
const ERROR_FACTORY = new _util.ErrorFactory('app', 'Firebase', ERRORS);

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new _component.Component('app', () => this, "PUBLIC" /* ComponentType.PUBLIC */));
  }

  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted" /* AppError.APP_DELETED */, {
        appName: this._name
      });
    }
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The current SDK version.
 *
 * @public
 */
const SDK_VERSION = version;
exports.SDK_VERSION = SDK_VERSION;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== 'object') {
    const name = rawConfig;
    rawConfig = {
      name
    };
  }
  const config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  const name = config.name;
  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name" /* AppError.BAD_APP_NAME */, {
      appName: String(name)
    });
  }
  options || (options = (0, _util.getDefaultAppConfig)());
  if (!options) {
    throw ERROR_FACTORY.create("no-options" /* AppError.NO_OPTIONS */);
  }

  const existingApp = _apps.get(name);
  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if ((0, _util.deepEqual)(options, existingApp.options) && (0, _util.deepEqual)(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app" /* AppError.DUPLICATE_APP */, {
        appName: name
      });
    }
  }
  const container = new _component.ComponentContainer(name);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name, newApp);
  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */
function getApp(name = DEFAULT_ENTRY_NAME) {
  const app = _apps.get(name);
  if (!app && name === DEFAULT_ENTRY_NAME) {
    return initializeApp();
  }
  if (!app) {
    throw ERROR_FACTORY.create("no-app" /* AppError.NO_APP */, {
      appName: name
    });
  }
  return app;
}
/**
 * A (read-only) array of all initialized apps.
 * @public
 */
function getApps() {
  return Array.from(_apps.values());
}
/**
 * Renders this app unusable and frees the resources of all associated
 * services.
 *
 * @example
 * ```javascript
 * deleteApp(app)
 *   .then(function() {
 *     console.log("App deleted successfully");
 *   })
 *   .catch(function(error) {
 *     console.log("Error deleting app:", error);
 *   });
 * ```
 *
 * @public
 */
async function deleteApp(app) {
  const name = app.name;
  if (_apps.has(name)) {
    _apps.delete(name);
    await Promise.all(app.container.getProviders().map(provider => provider.delete()));
    app.isDeleted = true;
  }
}
/**
 * Registers a library's name and version for platform logging purposes.
 * @param library - Name of 1p or 3p library (e.g. firestore, angularfire)
 * @param version - Current version of that library.
 * @param variant - Bundle variant, e.g., node, rn, etc.
 *
 * @public
 */
function registerVersion(libraryKeyOrName, version, variant) {
  var _a;
  // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.
  let library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [`Unable to register library "${library}" with version "${version}":`];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }
    if (versionMismatch) {
      warning.push(`version name "${version}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(' '));
    return;
  }
  _registerComponent(new _component.Component(`${library}-version`, () => ({
    library,
    version
  }), "VERSION" /* ComponentType.VERSION */));
}
/**
 * Sets log handler for all Firebase SDKs.
 * @param logCallback - An optional custom log handler that executes user code whenever
 * the Firebase SDK makes a logging call.
 *
 * @public
 */
function onLog(logCallback, options) {
  if (logCallback !== null && typeof logCallback !== 'function') {
    throw ERROR_FACTORY.create("invalid-log-argument" /* AppError.INVALID_LOG_ARGUMENT */);
  }

  (0, _logger.setUserLogHandler)(logCallback, options);
}
/**
 * Sets log level for all Firebase SDKs.
 *
 * All of the log types above the current log level are captured (i.e. if
 * you set the log level to `info`, errors are logged, but `debug` and
 * `verbose` logs are not).
 *
 * @public
 */
function setLogLevel(logLevel) {
  (0, _logger.setLogLevel)(logLevel);
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME = 'firebase-heartbeat-database';
const DB_VERSION = 1;
const STORE_NAME = 'firebase-heartbeat-store';
let dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = (0, _idb.openDB)(DB_NAME, DB_VERSION, {
      upgrade: (db, oldVersion) => {
        // We don't use 'break' in this switch statement, the fall-through
        // behavior is what we want, because if there are multiple versions between
        // the old version and the current version, we want ALL the migrations
        // that correspond to those versions to run, not only the last one.
        // eslint-disable-next-line default-case
        switch (oldVersion) {
          case 0:
            db.createObjectStore(STORE_NAME);
        }
      }
    }).catch(e => {
      throw ERROR_FACTORY.create("idb-open" /* AppError.IDB_OPEN */, {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app) {
  try {
    const db = await getDbPromise();
    return db.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app));
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get" /* AppError.IDB_GET */, {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app, heartbeatObject) {
  try {
    const db = await getDbPromise();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app));
    return tx.done;
  } catch (e) {
    if (e instanceof _util.FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set" /* AppError.IDB_WRITE */, {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app) {
  return `${app.name}!${app.options.appId}`;
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_HEADER_BYTES = 1024;
// 30 days
const STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1000;
class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    /**
     * In-memory cache for heartbeats, used by getHeartbeatsHeader() to generate
     * the header string.
     * Stores one record per date. This will be consolidated into the standard
     * format of one record per user agent string before being sent as a header.
     * Populated from indexedDB when the controller is instantiated and should
     * be kept in sync with indexedDB.
     * Leave public for easier testing.
     */
    this._heartbeatsCache = null;
    const app = this.container.getProvider('app').getImmediate();
    this._storage = new HeartbeatStorageImpl(app);
    this._heartbeatsCachePromise = this._storage.read().then(result => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    const platformLogger = this.container.getProvider('platform-logger').getImmediate();
    // This is the "Firebase user agent" string from the platform logger
    // service, not the browser user agent.
    const agent = platformLogger.getPlatformInfoString();
    const date = getUTCDateString();
    if (this._heartbeatsCache === null) {
      this._heartbeatsCache = await this._heartbeatsCachePromise;
    }
    // Do not store a heartbeat if one is already stored for this day
    // or if a header has already been sent today.
    if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some(singleDateHeartbeat => singleDateHeartbeat.date === date)) {
      return;
    } else {
      // There is no entry for this date. Create one.
      this._heartbeatsCache.heartbeats.push({
        date,
        agent
      });
    }
    // Remove entries older than 30 days.
    this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter(singleDateHeartbeat => {
      const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
      const now = Date.now();
      return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
    });
    return this._storage.overwrite(this._heartbeatsCache);
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    if (this._heartbeatsCache === null) {
      await this._heartbeatsCachePromise;
    }
    // If it's still null or the array is empty, there is no data to send.
    if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
      return '';
    }
    const date = getUTCDateString();
    // Extract as many heartbeats from the cache as will fit under the size limit.
    const {
      heartbeatsToSend,
      unsentEntries
    } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
    const headerString = (0, _util.base64urlEncodeWithoutPadding)(JSON.stringify({
      version: 2,
      heartbeats: heartbeatsToSend
    }));
    // Store last sent date to prevent another being logged/sent for the same day.
    this._heartbeatsCache.lastSentHeartbeatDate = date;
    if (unsentEntries.length > 0) {
      // Store any unsent entries if they exist.
      this._heartbeatsCache.heartbeats = unsentEntries;
      // This seems more likely than emptying the array (below) to lead to some odd state
      // since the cache isn't empty and this will be called again on the next request,
      // and is probably safest if we await it.
      await this._storage.overwrite(this._heartbeatsCache);
    } else {
      this._heartbeatsCache.heartbeats = [];
      // Do not wait for this, to reduce latency.
      void this._storage.overwrite(this._heartbeatsCache);
    }
    return headerString;
  }
}
function getUTCDateString() {
  const today = new Date();
  // Returns date format 'YYYY-MM-DD'
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  // Heartbeats grouped by user agent in the standard format to be sent in
  // the header.
  const heartbeatsToSend = [];
  // Single date format heartbeats that are not sent.
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    // Look for an existing entry with the same user agent.
    const heartbeatEntry = heartbeatsToSend.find(hb => hb.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      // If no entry for this user agent exists, create one.
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        // If the header would exceed max size, remove the added heartbeat
        // entry and stop adding to the header.
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      // If the header would exceed max size, remove the added date
      // and stop adding to the header.
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    // Pop unsent entry from queue. (Skipped if adding the entry exceeded
    // quota and the loop breaks early.)
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
class HeartbeatStorageImpl {
  constructor(app) {
    this.app = app;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!(0, _util.isIndexedDBAvailable)()) {
      return false;
    } else {
      return (0, _util.validateIndexedDBOpenable)().then(() => true).catch(() => false);
    }
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return {
        heartbeats: []
      };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      return idbHeartbeatObject || {
        heartbeats: []
      };
    }
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  // add heartbeats
  async add(heartbeatsObject) {
    var _a;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a = heartbeatsObject.lastSentHeartbeatDate) !== null && _a !== void 0 ? _a : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [...existingHeartbeatsObject.heartbeats, ...heartbeatsObject.heartbeats]
      });
    }
  }
}
/**
 * Calculate bytes of a HeartbeatsByUserAgent array after being wrapped
 * in a platform logging header JSON object, stringified, and converted
 * to base 64.
 */
function countBytes(heartbeatsCache) {
  // base64 has a restricted set of characters, all of which should be 1 byte.
  return (0, _util.base64urlEncodeWithoutPadding)(
  // heartbeatsCache wrapper properties
  JSON.stringify({
    version: 2,
    heartbeats: heartbeatsCache
  })).length;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(variant) {
  _registerComponent(new _component.Component('platform-logger', container => new PlatformLoggerServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
  _registerComponent(new _component.Component('heartbeat', container => new HeartbeatServiceImpl(container), "PRIVATE" /* ComponentType.PRIVATE */));
  // Register `app` package.
  registerVersion(name$o, version$1, variant);
  // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
  registerVersion(name$o, version$1, 'esm2017');
  // Register platform SDK identifier (no version).
  registerVersion('fire-js', '');
}

/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */
registerCoreComponents('');

},{"@firebase/component":4,"@firebase/logger":6,"@firebase/util":7,"idb":46}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = exports.ComponentContainer = exports.Component = void 0;
var _util = require("@firebase/util");
/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
class Component {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(name, instanceFactory, type) {
    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */
    this.serviceProps = {};
    this.instantiationMode = "LAZY" /* InstantiationMode.LAZY */;
    this.onInstanceCreated = null;
  }
  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }
  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }
  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }
  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.Component = Component;
const DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
class Provider {
  constructor(name, container) {
    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(identifier) {
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new _util.Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        // initialize the service if it can be auto-initialized
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {
          // when the instance factory throws an exception during get(), it should not cause
          // a fatal error. We just return the unresolved promise in this case.
        }
      }
    }
    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }
  getImmediate(options) {
    var _a;
    // if multipleInstances is not supported, use the default name
    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;
    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }
    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }
    this.component = component;
    // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)
    if (!this.shouldAutoInitialize()) {
      return;
    }
    // if the service is eager, initialize the default instance
    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({
          instanceIdentifier: DEFAULT_ENTRY_NAME
        });
      } catch (e) {
        // when the instance factory for an eager Component throws an exception during the eager
        // initialization, it should not cause a fatal error.
        // TODO: Investigate if we need to make it configurable, because some component may want to cause
        // a fatal error in this case?
      }
    }
    // Create service instances for the pending promises and resolve them
    // NOTE: if this.multipleInstances is false, only the default instance will be created
    // and all promises with resolve with it regardless of the identifier.
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      try {
        // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {
        // when the instance factory throws an exception, it should not cause
        // a fatal error. We just leave the promise unresolved.
      }
    }
  }
  clearInstance(identifier = DEFAULT_ENTRY_NAME) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([...services.filter(service => 'INTERNAL' in service) // legacy services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service.INTERNAL.delete()), ...services.filter(service => '_delete' in service) // modularized services
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map(service => service._delete())]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(identifier = DEFAULT_ENTRY_NAME) {
    return this.instances.has(identifier);
  }
  getOptions(identifier = DEFAULT_ENTRY_NAME) {
    return this.instancesOptions.get(identifier) || {};
  }
  initialize(opts = {}) {
    const {
      options = {}
    } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }
    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }
    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    });
    // resolve any pending promise waiting for the service instance
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }
    return instance;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(callback, identifier) {
    var _a;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);
    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }
    return () => {
      existingCallbacks.delete(callback);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);
    if (!callbacks) {
      return;
    }
    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a) {
        // ignore errors in the onInit callback
      }
    }
  }
  getOrInitializeService({
    instanceIdentifier,
    options = {}
  }) {
    let instance = this.instances.get(instanceIdentifier);
    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      /**
       * Invoke onInit listeners.
       * Note this.component.onInstanceCreated is different, which is used by the component creator,
       * while onInit listeners are registered by consumers of the provider.
       */
      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      /**
       * Order is important
       * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
       * makes `isInitialized()` return true.
       */
      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a) {
          // ignore errors in the onInstanceCreatedCallback
        }
      }
    }
    return instance || null;
  }
  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
    } else {
      return identifier; // assume multiple instances are supported before the component is provided.
    }
  }

  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT" /* InstantiationMode.EXPLICIT */;
  }
}
// undefined should be passed to the service factory for the default instance
exports.Provider = Provider;
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER" /* InstantiationMode.EAGER */;
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
class ComponentContainer {
  constructor(name) {
    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      // delete the existing provider from the container, so we can register the new component
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(name) {
    if (this.providers.has(name)) {
      return this.providers.get(name);
    }
    // create a Provider for a service that hasn't registered with Firebase
    const provider = new Provider(name, this);
    this.providers.set(name, provider);
    return provider;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
exports.ComponentContainer = ComponentContainer;

},{"@firebase/util":7}],5:[function(require,module,exports){
(function (process){(function (){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports._TEST_ACCESS_hijackHash=exports._TEST_ACCESS_forceRestClient=exports._ReferenceImpl=exports._QueryParams=exports._QueryImpl=exports.TransactionResult=exports.QueryConstraint=exports.OnDisconnect=exports.Database=exports.DataSnapshot=void 0;exports._repoManagerDatabaseFromApp=repoManagerDatabaseFromApp;exports._setSDKVersion=setSDKVersion;exports._validateWritablePath=exports._validatePathString=void 0;exports.child=child;exports.connectDatabaseEmulator=connectDatabaseEmulator;exports.enableLogging=enableLogging;exports.endAt=endAt;exports.endBefore=endBefore;exports.equalTo=equalTo;exports.forceLongPolling=forceLongPolling;exports.forceWebSockets=forceWebSockets;exports.get=get;exports.getDatabase=getDatabase;exports.goOffline=goOffline;exports.goOnline=goOnline;exports.increment=increment;exports.limitToFirst=limitToFirst;exports.limitToLast=limitToLast;exports.off=off;exports.onChildAdded=onChildAdded;exports.onChildChanged=onChildChanged;exports.onChildMoved=onChildMoved;exports.onChildRemoved=onChildRemoved;exports.onDisconnect=onDisconnect;exports.onValue=onValue;exports.orderByChild=orderByChild;exports.orderByKey=orderByKey;exports.orderByPriority=orderByPriority;exports.orderByValue=orderByValue;exports.push=push;exports.query=query;exports.ref=ref;exports.refFromURL=refFromURL;exports.remove=remove;exports.runTransaction=runTransaction;exports.serverTimestamp=serverTimestamp;exports.set=set;exports.setPriority=setPriority;exports.setWithPriority=setWithPriority;exports.startAfter=startAfter;exports.startAt=startAt;exports.update=update;var _app=require("@firebase/app");var _component=require("@firebase/component");var _util=require("@firebase/util");var _logger=require("@firebase/logger");const name="@firebase/database";const version="0.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** The semver (www.semver.org) version of the SDK. */let SDK_VERSION='';/**
 * SDK_VERSION should be set before any database instance is created
 * @internal
 */function setSDKVersion(version){SDK_VERSION=version;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Wraps a DOM Storage object and:
 * - automatically encode objects as JSON strings before storing them to allow us to store arbitrary types.
 * - prefixes names with "firebase:" to avoid collisions with app data.
 *
 * We automatically (see storage.js) create two such wrappers, one for sessionStorage,
 * and one for localStorage.
 *
 */class DOMStorageWrapper{/**
     * @param domStorage_ - The underlying storage object (e.g. localStorage or sessionStorage)
     */constructor(domStorage_){this.domStorage_=domStorage_;// Use a prefix to avoid collisions with other stuff saved by the app.
this.prefix_='firebase:';}/**
     * @param key - The key to save the value under
     * @param value - The value being stored, or null to remove the key.
     */set(key,value){if(value==null){this.domStorage_.removeItem(this.prefixedName_(key));}else{this.domStorage_.setItem(this.prefixedName_(key),(0,_util.stringify)(value));}}/**
     * @returns The value that was stored under this key, or null
     */get(key){const storedVal=this.domStorage_.getItem(this.prefixedName_(key));if(storedVal==null){return null;}else{return(0,_util.jsonEval)(storedVal);}}remove(key){this.domStorage_.removeItem(this.prefixedName_(key));}prefixedName_(name){return this.prefix_+name;}toString(){return this.domStorage_.toString();}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An in-memory storage implementation that matches the API of DOMStorageWrapper
 * (TODO: create interface for both to implement).
 */class MemoryStorage{constructor(){this.cache_={};this.isInMemoryStorage=true;}set(key,value){if(value==null){delete this.cache_[key];}else{this.cache_[key]=value;}}get(key){if((0,_util.contains)(this.cache_,key)){return this.cache_[key];}return null;}remove(key){delete this.cache_[key];}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Helper to create a DOMStorageWrapper or else fall back to MemoryStorage.
 * TODO: Once MemoryStorage and DOMStorageWrapper have a shared interface this method annotation should change
 * to reflect this type
 *
 * @param domStorageName - Name of the underlying storage object
 *   (e.g. 'localStorage' or 'sessionStorage').
 * @returns Turning off type information until a common interface is defined.
 */const createStoragefor=function(domStorageName){try{// NOTE: just accessing "localStorage" or "window['localStorage']" may throw a security exception,
// so it must be inside the try/catch.
if(typeof window!=='undefined'&&typeof window[domStorageName]!=='undefined'){// Need to test cache. Just because it's here doesn't mean it works
const domStorage=window[domStorageName];domStorage.setItem('firebase:sentinel','cache');domStorage.removeItem('firebase:sentinel');return new DOMStorageWrapper(domStorage);}}catch(e){}// Failed to create wrapper.  Just return in-memory storage.
// TODO: log?
return new MemoryStorage();};/** A storage object that lasts across sessions */const PersistentStorage=createStoragefor('localStorage');/** A storage object that only lasts one session */const SessionStorage=createStoragefor('sessionStorage');/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const logClient=new _logger.Logger('@firebase/database');/**
 * Returns a locally-unique ID (generated by just incrementing up from 0 each time its called).
 */const LUIDGenerator=function(){let id=1;return function(){return id++;};}();/**
 * Sha1 hash of the input string
 * @param str - The string to hash
 * @returns {!string} The resulting hash
 */const sha1=function(str){const utf8Bytes=(0,_util.stringToByteArray)(str);const sha1=new _util.Sha1();sha1.update(utf8Bytes);const sha1Bytes=sha1.digest();return _util.base64.encodeByteArray(sha1Bytes);};const buildLogMessage_=function(...varArgs){let message='';for(let i=0;i<varArgs.length;i++){const arg=varArgs[i];if(Array.isArray(arg)||arg&&typeof arg==='object'&&// eslint-disable-next-line @typescript-eslint/no-explicit-any
typeof arg.length==='number'){message+=buildLogMessage_.apply(null,arg);}else if(typeof arg==='object'){message+=(0,_util.stringify)(arg);}else{message+=arg;}message+=' ';}return message;};/**
 * Use this for all debug messages in Firebase.
 */let logger=null;/**
 * Flag to check for log availability on first log message
 */let firstLog_=true;/**
 * The implementation of Firebase.enableLogging (defined here to break dependencies)
 * @param logger_ - A flag to turn on logging, or a custom logger
 * @param persistent - Whether or not to persist logging settings across refreshes
 */const enableLogging$1=function(logger_,persistent){(0,_util.assert)(!persistent||logger_===true||logger_===false,"Can't turn on custom loggers persistently.");if(logger_===true){logClient.logLevel=_logger.LogLevel.VERBOSE;logger=logClient.log.bind(logClient);if(persistent){SessionStorage.set('logging_enabled',true);}}else if(typeof logger_==='function'){logger=logger_;}else{logger=null;SessionStorage.remove('logging_enabled');}};const log=function(...varArgs){if(firstLog_===true){firstLog_=false;if(logger===null&&SessionStorage.get('logging_enabled')===true){enableLogging$1(true);}}if(logger){const message=buildLogMessage_.apply(null,varArgs);logger(message);}};const logWrapper=function(prefix){return function(...varArgs){log(prefix,...varArgs);};};const error=function(...varArgs){const message='FIREBASE INTERNAL ERROR: '+buildLogMessage_(...varArgs);logClient.error(message);};const fatal=function(...varArgs){const message=`FIREBASE FATAL ERROR: ${buildLogMessage_(...varArgs)}`;logClient.error(message);throw new Error(message);};const warn=function(...varArgs){const message='FIREBASE WARNING: '+buildLogMessage_(...varArgs);logClient.warn(message);};/**
 * Logs a warning if the containing page uses https. Called when a call to new Firebase
 * does not use https.
 */const warnIfPageIsSecure=function(){// Be very careful accessing browser globals. Who knows what may or may not exist.
if(typeof window!=='undefined'&&window.location&&window.location.protocol&&window.location.protocol.indexOf('https:')!==-1){warn('Insecure Firebase access from a secure page. '+'Please use https in calls to new Firebase().');}};/**
 * Returns true if data is NaN, or +/- Infinity.
 */const isInvalidJSONNumber=function(data){return typeof data==='number'&&(data!==data||// NaN
data===Number.POSITIVE_INFINITY||data===Number.NEGATIVE_INFINITY);};const executeWhenDOMReady=function(fn){if((0,_util.isNodeSdk)()||document.readyState==='complete'){fn();}else{// Modeled after jQuery. Try DOMContentLoaded and onreadystatechange (which
// fire before onload), but fall back to onload.
let called=false;const wrappedFn=function(){if(!document.body){setTimeout(wrappedFn,Math.floor(10));return;}if(!called){called=true;fn();}};if(document.addEventListener){document.addEventListener('DOMContentLoaded',wrappedFn,false);// fallback to onload.
window.addEventListener('load',wrappedFn,false);// eslint-disable-next-line @typescript-eslint/no-explicit-any
}else if(document.attachEvent){// IE.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
document.attachEvent('onreadystatechange',()=>{if(document.readyState==='complete'){wrappedFn();}});// fallback to onload.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.attachEvent('onload',wrappedFn);// jQuery has an extra hack for IE that we could employ (based on
// http://javascript.nwbox.com/IEContentLoaded/) But it looks really old.
// I'm hoping we don't need it.
}}};/**
 * Minimum key name. Invalid for actual data, used as a marker to sort before any valid names
 */const MIN_NAME='[MIN_NAME]';/**
 * Maximum key name. Invalid for actual data, used as a marker to sort above any valid names
 */const MAX_NAME='[MAX_NAME]';/**
 * Compares valid Firebase key names, plus min and max name
 */const nameCompare=function(a,b){if(a===b){return 0;}else if(a===MIN_NAME||b===MAX_NAME){return-1;}else if(b===MIN_NAME||a===MAX_NAME){return 1;}else{const aAsInt=tryParseInt(a),bAsInt=tryParseInt(b);if(aAsInt!==null){if(bAsInt!==null){return aAsInt-bAsInt===0?a.length-b.length:aAsInt-bAsInt;}else{return-1;}}else if(bAsInt!==null){return 1;}else{return a<b?-1:1;}}};/**
 * @returns {!number} comparison result.
 */const stringCompare=function(a,b){if(a===b){return 0;}else if(a<b){return-1;}else{return 1;}};const requireKey=function(key,obj){if(obj&&key in obj){return obj[key];}else{throw new Error('Missing required key ('+key+') in object: '+(0,_util.stringify)(obj));}};const ObjectToUniqueKey=function(obj){if(typeof obj!=='object'||obj===null){return(0,_util.stringify)(obj);}const keys=[];// eslint-disable-next-line guard-for-in
for(const k in obj){keys.push(k);}// Export as json, but with the keys sorted.
keys.sort();let key='{';for(let i=0;i<keys.length;i++){if(i!==0){key+=',';}key+=(0,_util.stringify)(keys[i]);key+=':';key+=ObjectToUniqueKey(obj[keys[i]]);}key+='}';return key;};/**
 * Splits a string into a number of smaller segments of maximum size
 * @param str - The string
 * @param segsize - The maximum number of chars in the string.
 * @returns The string, split into appropriately-sized chunks
 */const splitStringBySize=function(str,segsize){const len=str.length;if(len<=segsize){return[str];}const dataSegs=[];for(let c=0;c<len;c+=segsize){if(c+segsize>len){dataSegs.push(str.substring(c,len));}else{dataSegs.push(str.substring(c,c+segsize));}}return dataSegs;};/**
 * Apply a function to each (key, value) pair in an object or
 * apply a function to each (index, value) pair in an array
 * @param obj - The object or array to iterate over
 * @param fn - The function to apply
 */function each(obj,fn){for(const key in obj){if(obj.hasOwnProperty(key)){fn(key,obj[key]);}}}/**
 * Borrowed from http://hg.secondlife.com/llsd/src/tip/js/typedarray.js (MIT License)
 * I made one modification at the end and removed the NaN / Infinity
 * handling (since it seemed broken [caused an overflow] and we don't need it).  See MJL comments.
 * @param v - A double
 *
 */const doubleToIEEE754String=function(v){(0,_util.assert)(!isInvalidJSONNumber(v),'Invalid JSON number');// MJL
const ebits=11,fbits=52;const bias=(1<<ebits-1)-1;let s,e,f,ln,i;// Compute sign, exponent, fraction
// Skip NaN / Infinity handling --MJL.
if(v===0){e=0;f=0;s=1/v===-Infinity?1:0;}else{s=v<0;v=Math.abs(v);if(v>=Math.pow(2,1-bias)){// Normalized
ln=Math.min(Math.floor(Math.log(v)/Math.LN2),bias);e=ln+bias;f=Math.round(v*Math.pow(2,fbits-ln)-Math.pow(2,fbits));}else{// Denormalized
e=0;f=Math.round(v/Math.pow(2,1-bias-fbits));}}// Pack sign, exponent, fraction
const bits=[];for(i=fbits;i;i-=1){bits.push(f%2?1:0);f=Math.floor(f/2);}for(i=ebits;i;i-=1){bits.push(e%2?1:0);e=Math.floor(e/2);}bits.push(s?1:0);bits.reverse();const str=bits.join('');// Return the data as a hex string. --MJL
let hexByteString='';for(i=0;i<64;i+=8){let hexByte=parseInt(str.substr(i,8),2).toString(16);if(hexByte.length===1){hexByte='0'+hexByte;}hexByteString=hexByteString+hexByte;}return hexByteString.toLowerCase();};/**
 * Used to detect if we're in a Chrome content script (which executes in an
 * isolated environment where long-polling doesn't work).
 */const isChromeExtensionContentScript=function(){return!!(typeof window==='object'&&window['chrome']&&window['chrome']['extension']&&!/^chrome/.test(window.location.href));};/**
 * Used to detect if we're in a Windows 8 Store app.
 */const isWindowsStoreApp=function(){// Check for the presence of a couple WinRT globals
return typeof Windows==='object'&&typeof Windows.UI==='object';};/**
 * Converts a server error code to a Javascript Error
 */function errorForServerCode(code,query){let reason='Unknown Error';if(code==='too_big'){reason='The data requested exceeds the maximum size '+'that can be accessed with a single request.';}else if(code==='permission_denied'){reason="Client doesn't have permission to access the desired data.";}else if(code==='unavailable'){reason='The service is unavailable';}const error=new Error(code+' at '+query._path.toString()+': '+reason);// eslint-disable-next-line @typescript-eslint/no-explicit-any
error.code=code.toUpperCase();return error;}/**
 * Used to test for integer-looking strings
 */const INTEGER_REGEXP_=new RegExp('^-?(0*)\\d{1,10}$');/**
 * For use in keys, the minimum possible 32-bit integer.
 */const INTEGER_32_MIN=-2147483648;/**
 * For use in kyes, the maximum possible 32-bit integer.
 */const INTEGER_32_MAX=2147483647;/**
 * If the string contains a 32-bit integer, return it.  Else return null.
 */const tryParseInt=function(str){if(INTEGER_REGEXP_.test(str)){const intVal=Number(str);if(intVal>=INTEGER_32_MIN&&intVal<=INTEGER_32_MAX){return intVal;}}return null;};/**
 * Helper to run some code but catch any exceptions and re-throw them later.
 * Useful for preventing user callbacks from breaking internal code.
 *
 * Re-throwing the exception from a setTimeout is a little evil, but it's very
 * convenient (we don't have to try to figure out when is a safe point to
 * re-throw it), and the behavior seems reasonable:
 *
 * * If you aren't pausing on exceptions, you get an error in the console with
 *   the correct stack trace.
 * * If you're pausing on all exceptions, the debugger will pause on your
 *   exception and then again when we rethrow it.
 * * If you're only pausing on uncaught exceptions, the debugger will only pause
 *   on us re-throwing it.
 *
 * @param fn - The code to guard.
 */const exceptionGuard=function(fn){try{fn();}catch(e){// Re-throw exception when it's safe.
setTimeout(()=>{// It used to be that "throw e" would result in a good console error with
// relevant context, but as of Chrome 39, you just get the firebase.js
// file/line number where we re-throw it, which is useless. So we log
// e.stack explicitly.
const stack=e.stack||'';warn('Exception was thrown by user callback.',stack);throw e;},Math.floor(0));}};/**
 * @returns {boolean} true if we think we're currently being crawled.
 */const beingCrawled=function(){const userAgent=typeof window==='object'&&window['navigator']&&window['navigator']['userAgent']||'';// For now we whitelist the most popular crawlers.  We should refine this to be the set of crawlers we
// believe to support JavaScript/AJAX rendering.
// NOTE: Google Webmaster Tools doesn't really belong, but their "This is how a visitor to your website
// would have seen the page" is flaky if we don't treat it as a crawler.
return userAgent.search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0;};/**
 * Same as setTimeout() except on Node.JS it will /not/ prevent the process from exiting.
 *
 * It is removed with clearTimeout() as normal.
 *
 * @param fn - Function to run.
 * @param time - Milliseconds to wait before running.
 * @returns The setTimeout() return value.
 */const setTimeoutNonBlocking=function(fn,time){const timeout=setTimeout(fn,time);// Note: at the time of this comment, unrefTimer is under the unstable set of APIs. Run with --unstable to enable the API.
if(typeof timeout==='number'&&// @ts-ignore Is only defined in Deno environments.
typeof Deno!=='undefined'&&// @ts-ignore Deno and unrefTimer are only defined in Deno environments.
Deno['unrefTimer']){// @ts-ignore Deno and unrefTimer are only defined in Deno environments.
Deno.unrefTimer(timeout);// eslint-disable-next-line @typescript-eslint/no-explicit-any
}else if(typeof timeout==='object'&&timeout['unref']){// eslint-disable-next-line @typescript-eslint/no-explicit-any
timeout['unref']();}return timeout;};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Abstraction around AppCheck's token fetching capabilities.
 */class AppCheckTokenProvider{constructor(appName_,appCheckProvider){this.appName_=appName_;this.appCheckProvider=appCheckProvider;this.appCheck=appCheckProvider===null||appCheckProvider===void 0?void 0:appCheckProvider.getImmediate({optional:true});if(!this.appCheck){appCheckProvider===null||appCheckProvider===void 0?void 0:appCheckProvider.get().then(appCheck=>this.appCheck=appCheck);}}getToken(forceRefresh){if(!this.appCheck){return new Promise((resolve,reject)=>{// Support delayed initialization of FirebaseAppCheck. This allows our
// customers to initialize the RTDB SDK before initializing Firebase
// AppCheck and ensures that all requests are authenticated if a token
// becomes available before the timoeout below expires.
setTimeout(()=>{if(this.appCheck){this.getToken(forceRefresh).then(resolve,reject);}else{resolve(null);}},0);});}return this.appCheck.getToken(forceRefresh);}addTokenChangeListener(listener){var _a;(_a=this.appCheckProvider)===null||_a===void 0?void 0:_a.get().then(appCheck=>appCheck.addTokenListener(listener));}notifyForInvalidToken(){warn(`Provided AppCheck credentials for the app named "${this.appName_}" `+'are invalid. This usually indicates your app was not initialized correctly.');}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Abstraction around FirebaseApp's token fetching capabilities.
 */class FirebaseAuthTokenProvider{constructor(appName_,firebaseOptions_,authProvider_){this.appName_=appName_;this.firebaseOptions_=firebaseOptions_;this.authProvider_=authProvider_;this.auth_=null;this.auth_=authProvider_.getImmediate({optional:true});if(!this.auth_){authProvider_.onInit(auth=>this.auth_=auth);}}getToken(forceRefresh){if(!this.auth_){return new Promise((resolve,reject)=>{// Support delayed initialization of FirebaseAuth. This allows our
// customers to initialize the RTDB SDK before initializing Firebase
// Auth and ensures that all requests are authenticated if a token
// becomes available before the timoeout below expires.
setTimeout(()=>{if(this.auth_){this.getToken(forceRefresh).then(resolve,reject);}else{resolve(null);}},0);});}return this.auth_.getToken(forceRefresh).catch(error=>{// TODO: Need to figure out all the cases this is raised and whether
// this makes sense.
if(error&&error.code==='auth/token-not-initialized'){log('Got auth/token-not-initialized error.  Treating as null token.');return null;}else{return Promise.reject(error);}});}addTokenChangeListener(listener){// TODO: We might want to wrap the listener and call it with no args to
// avoid a leaky abstraction, but that makes removing the listener harder.
if(this.auth_){this.auth_.addAuthTokenListener(listener);}else{this.authProvider_.get().then(auth=>auth.addAuthTokenListener(listener));}}removeTokenChangeListener(listener){this.authProvider_.get().then(auth=>auth.removeAuthTokenListener(listener));}notifyForInvalidToken(){let errorMessage='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not '+'initialized correctly. ';if('credential'in this.firebaseOptions_){errorMessage+='Make sure the "credential" property provided to initializeApp() '+'is authorized to access the specified "databaseURL" and is from the correct '+'project.';}else if('serviceAccount'in this.firebaseOptions_){errorMessage+='Make sure the "serviceAccount" property provided to initializeApp() '+'is authorized to access the specified "databaseURL" and is from the correct '+'project.';}else{errorMessage+='Make sure the "apiKey" and "databaseURL" properties provided to '+'initializeApp() match the values provided for your app at '+'https://console.firebase.google.com/.';}warn(errorMessage);}}/* AuthTokenProvider that supplies a constant token. Used by Admin SDK or mockUserToken with emulators. */class EmulatorTokenProvider{constructor(accessToken){this.accessToken=accessToken;}getToken(forceRefresh){return Promise.resolve({accessToken:this.accessToken});}addTokenChangeListener(listener){// Invoke the listener immediately to match the behavior in Firebase Auth
// (see packages/auth/src/auth.js#L1807)
listener(this.accessToken);}removeTokenChangeListener(listener){}notifyForInvalidToken(){}}/** A string that is treated as an admin access token by the RTDB emulator. Used by Admin SDK. */EmulatorTokenProvider.OWNER='owner';/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PROTOCOL_VERSION='5';const VERSION_PARAM='v';const TRANSPORT_SESSION_PARAM='s';const REFERER_PARAM='r';const FORGE_REF='f';// Matches console.firebase.google.com, firebase-console-*.corp.google.com and
// firebase.corp.google.com
const FORGE_DOMAIN_RE=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/;const LAST_SESSION_PARAM='ls';const APPLICATION_ID_PARAM='p';const APP_CHECK_TOKEN_PARAM='ac';const WEBSOCKET='websocket';const LONG_POLLING='long_polling';/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A class that holds metadata about a Repo object
 */class RepoInfo{/**
     * @param host - Hostname portion of the url for the repo
     * @param secure - Whether or not this repo is accessed over ssl
     * @param namespace - The namespace represented by the repo
     * @param webSocketOnly - Whether to prefer websockets over all other transports (used by Nest).
     * @param nodeAdmin - Whether this instance uses Admin SDK credentials
     * @param persistenceKey - Override the default session persistence storage key
     */constructor(host,secure,namespace,webSocketOnly,nodeAdmin=false,persistenceKey='',includeNamespaceInQueryParams=false){this.secure=secure;this.namespace=namespace;this.webSocketOnly=webSocketOnly;this.nodeAdmin=nodeAdmin;this.persistenceKey=persistenceKey;this.includeNamespaceInQueryParams=includeNamespaceInQueryParams;this._host=host.toLowerCase();this._domain=this._host.substr(this._host.indexOf('.')+1);this.internalHost=PersistentStorage.get('host:'+host)||this._host;}isCacheableHost(){return this.internalHost.substr(0,2)==='s-';}isCustomHost(){return this._domain!=='firebaseio.com'&&this._domain!=='firebaseio-demo.com';}get host(){return this._host;}set host(newHost){if(newHost!==this.internalHost){this.internalHost=newHost;if(this.isCacheableHost()){PersistentStorage.set('host:'+this._host,this.internalHost);}}}toString(){let str=this.toURLString();if(this.persistenceKey){str+='<'+this.persistenceKey+'>';}return str;}toURLString(){const protocol=this.secure?'https://':'http://';const query=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:'';return`${protocol}${this.host}/${query}`;}}function repoInfoNeedsQueryParam(repoInfo){return repoInfo.host!==repoInfo.internalHost||repoInfo.isCustomHost()||repoInfo.includeNamespaceInQueryParams;}/**
 * Returns the websocket URL for this repo
 * @param repoInfo - RepoInfo object
 * @param type - of connection
 * @param params - list
 * @returns The URL for this repo
 */function repoInfoConnectionURL(repoInfo,type,params){(0,_util.assert)(typeof type==='string','typeof type must == string');(0,_util.assert)(typeof params==='object','typeof params must == object');let connURL;if(type===WEBSOCKET){connURL=(repoInfo.secure?'wss://':'ws://')+repoInfo.internalHost+'/.ws?';}else if(type===LONG_POLLING){connURL=(repoInfo.secure?'https://':'http://')+repoInfo.internalHost+'/.lp?';}else{throw new Error('Unknown connection type: '+type);}if(repoInfoNeedsQueryParam(repoInfo)){params['ns']=repoInfo.namespace;}const pairs=[];each(params,(key,value)=>{pairs.push(key+'='+value);});return connURL+pairs.join('&');}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Tracks a collection of stats.
 */class StatsCollection{constructor(){this.counters_={};}incrementCounter(name,amount=1){if(!(0,_util.contains)(this.counters_,name)){this.counters_[name]=0;}this.counters_[name]+=amount;}get(){return(0,_util.deepCopy)(this.counters_);}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const collections={};const reporters={};function statsManagerGetCollection(repoInfo){const hashString=repoInfo.toString();if(!collections[hashString]){collections[hashString]=new StatsCollection();}return collections[hashString];}function statsManagerGetOrCreateReporter(repoInfo,creatorFunction){const hashString=repoInfo.toString();if(!reporters[hashString]){reporters[hashString]=creatorFunction();}return reporters[hashString];}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * This class ensures the packets from the server arrive in order
 * This class takes data from the server and ensures it gets passed into the callbacks in order.
 */class PacketReceiver{/**
     * @param onMessage_
     */constructor(onMessage_){this.onMessage_=onMessage_;this.pendingResponses=[];this.currentResponseNum=0;this.closeAfterResponse=-1;this.onClose=null;}closeAfter(responseNum,callback){this.closeAfterResponse=responseNum;this.onClose=callback;if(this.closeAfterResponse<this.currentResponseNum){this.onClose();this.onClose=null;}}/**
     * Each message from the server comes with a response number, and an array of data. The responseNumber
     * allows us to ensure that we process them in the right order, since we can't be guaranteed that all
     * browsers will respond in the same order as the requests we sent
     */handleResponse(requestNum,data){this.pendingResponses[requestNum]=data;while(this.pendingResponses[this.currentResponseNum]){const toProcess=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<toProcess.length;++i){if(toProcess[i]){exceptionGuard(()=>{this.onMessage_(toProcess[i]);});}}if(this.currentResponseNum===this.closeAfterResponse){if(this.onClose){this.onClose();this.onClose=null;}break;}this.currentResponseNum++;}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // URL query parameters associated with longpolling
const FIREBASE_LONGPOLL_START_PARAM='start';const FIREBASE_LONGPOLL_CLOSE_COMMAND='close';const FIREBASE_LONGPOLL_COMMAND_CB_NAME='pLPCommand';const FIREBASE_LONGPOLL_DATA_CB_NAME='pRTLPCB';const FIREBASE_LONGPOLL_ID_PARAM='id';const FIREBASE_LONGPOLL_PW_PARAM='pw';const FIREBASE_LONGPOLL_SERIAL_PARAM='ser';const FIREBASE_LONGPOLL_CALLBACK_ID_PARAM='cb';const FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM='seg';const FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET='ts';const FIREBASE_LONGPOLL_DATA_PARAM='d';const FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM='dframe';//Data size constants.
//TODO: Perf: the maximum length actually differs from browser to browser.
// We should check what browser we're on and set accordingly.
const MAX_URL_DATA_SIZE=1870;const SEG_HEADER_SIZE=30;//ie: &seg=8299234&ts=982389123&d=
const MAX_PAYLOAD_SIZE=MAX_URL_DATA_SIZE-SEG_HEADER_SIZE;/**
 * Keepalive period
 * send a fresh request at minimum every 25 seconds. Opera has a maximum request
 * length of 30 seconds that we can't exceed.
 */const KEEPALIVE_REQUEST_INTERVAL=25000;/**
 * How long to wait before aborting a long-polling connection attempt.
 */const LP_CONNECT_TIMEOUT=30000;/**
 * This class manages a single long-polling connection.
 */class BrowserPollConnection{/**
     * @param connId An identifier for this connection, used for logging
     * @param repoInfo The info for the endpoint to send data to.
     * @param applicationId The Firebase App ID for this project.
     * @param appCheckToken The AppCheck token for this client.
     * @param authToken The AuthToken to use for this connection.
     * @param transportSessionId Optional transportSessionid if we are
     * reconnecting for an existing transport session
     * @param lastSessionId Optional lastSessionId if the PersistentConnection has
     * already created a connection previously
     */constructor(connId,repoInfo,applicationId,appCheckToken,authToken,transportSessionId,lastSessionId){this.connId=connId;this.repoInfo=repoInfo;this.applicationId=applicationId;this.appCheckToken=appCheckToken;this.authToken=authToken;this.transportSessionId=transportSessionId;this.lastSessionId=lastSessionId;this.bytesSent=0;this.bytesReceived=0;this.everConnected_=false;this.log_=logWrapper(connId);this.stats_=statsManagerGetCollection(repoInfo);this.urlFn=params=>{// Always add the token if we have one.
if(this.appCheckToken){params[APP_CHECK_TOKEN_PARAM]=this.appCheckToken;}return repoInfoConnectionURL(repoInfo,LONG_POLLING,params);};}/**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */open(onMessage,onDisconnect){this.curSegmentNum=0;this.onDisconnect_=onDisconnect;this.myPacketOrderer=new PacketReceiver(onMessage);this.isClosed_=false;this.connectTimeoutTimer_=setTimeout(()=>{this.log_('Timed out trying to connect.');// Make sure we clear the host cache
this.onClosed_();this.connectTimeoutTimer_=null;// eslint-disable-next-line @typescript-eslint/no-explicit-any
},Math.floor(LP_CONNECT_TIMEOUT));// Ensure we delay the creation of the iframe until the DOM is loaded.
executeWhenDOMReady(()=>{if(this.isClosed_){return;}//Set up a callback that gets triggered once a connection is set up.
this.scriptTagHolder=new FirebaseIFrameScriptHolder((...args)=>{const[command,arg1,arg2,arg3,arg4]=args;this.incrementIncomingBytes_(args);if(!this.scriptTagHolder){return;// we closed the connection.
}if(this.connectTimeoutTimer_){clearTimeout(this.connectTimeoutTimer_);this.connectTimeoutTimer_=null;}this.everConnected_=true;if(command===FIREBASE_LONGPOLL_START_PARAM){this.id=arg1;this.password=arg2;}else if(command===FIREBASE_LONGPOLL_CLOSE_COMMAND){// Don't clear the host cache. We got a response from the server, so we know it's reachable
if(arg1){// We aren't expecting any more data (other than what the server's already in the process of sending us
// through our already open polls), so don't send any more.
this.scriptTagHolder.sendNewPolls=false;// arg1 in this case is the last response number sent by the server. We should try to receive
// all of the responses up to this one before closing
this.myPacketOrderer.closeAfter(arg1,()=>{this.onClosed_();});}else{this.onClosed_();}}else{throw new Error('Unrecognized command received: '+command);}},(...args)=>{const[pN,data]=args;this.incrementIncomingBytes_(args);this.myPacketOrderer.handleResponse(pN,data);},()=>{this.onClosed_();},this.urlFn);//Send the initial request to connect. The serial number is simply to keep the browser from pulling previous results
//from cache.
const urlParams={};urlParams[FIREBASE_LONGPOLL_START_PARAM]='t';urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM]=Math.floor(Math.random()*100000000);if(this.scriptTagHolder.uniqueCallbackIdentifier){urlParams[FIREBASE_LONGPOLL_CALLBACK_ID_PARAM]=this.scriptTagHolder.uniqueCallbackIdentifier;}urlParams[VERSION_PARAM]=PROTOCOL_VERSION;if(this.transportSessionId){urlParams[TRANSPORT_SESSION_PARAM]=this.transportSessionId;}if(this.lastSessionId){urlParams[LAST_SESSION_PARAM]=this.lastSessionId;}if(this.applicationId){urlParams[APPLICATION_ID_PARAM]=this.applicationId;}if(this.appCheckToken){urlParams[APP_CHECK_TOKEN_PARAM]=this.appCheckToken;}if(typeof location!=='undefined'&&location.hostname&&FORGE_DOMAIN_RE.test(location.hostname)){urlParams[REFERER_PARAM]=FORGE_REF;}const connectURL=this.urlFn(urlParams);this.log_('Connecting via long-poll to '+connectURL);this.scriptTagHolder.addTag(connectURL,()=>{/* do nothing */});});}/**
     * Call this when a handshake has completed successfully and we want to consider the connection established
     */start(){this.scriptTagHolder.startLongPoll(this.id,this.password);this.addDisconnectPingFrame(this.id,this.password);}/**
     * Forces long polling to be considered as a potential transport
     */static forceAllow(){BrowserPollConnection.forceAllow_=true;}/**
     * Forces longpolling to not be considered as a potential transport
     */static forceDisallow(){BrowserPollConnection.forceDisallow_=true;}// Static method, use string literal so it can be accessed in a generic way
static isAvailable(){if((0,_util.isNodeSdk)()){return false;}else if(BrowserPollConnection.forceAllow_){return true;}else{// NOTE: In React-Native there's normally no 'document', but if you debug a React-Native app in
// the Chrome debugger, 'document' is defined, but document.createElement is null (2015/06/08).
return!BrowserPollConnection.forceDisallow_&&typeof document!=='undefined'&&document.createElement!=null&&!isChromeExtensionContentScript()&&!isWindowsStoreApp();}}/**
     * No-op for polling
     */markConnectionHealthy(){}/**
     * Stops polling and cleans up the iframe
     */shutdown_(){this.isClosed_=true;if(this.scriptTagHolder){this.scriptTagHolder.close();this.scriptTagHolder=null;}//remove the disconnect frame, which will trigger an XHR call to the server to tell it we're leaving.
if(this.myDisconnFrame){document.body.removeChild(this.myDisconnFrame);this.myDisconnFrame=null;}if(this.connectTimeoutTimer_){clearTimeout(this.connectTimeoutTimer_);this.connectTimeoutTimer_=null;}}/**
     * Triggered when this transport is closed
     */onClosed_(){if(!this.isClosed_){this.log_('Longpoll is closing itself');this.shutdown_();if(this.onDisconnect_){this.onDisconnect_(this.everConnected_);this.onDisconnect_=null;}}}/**
     * External-facing close handler. RealTime has requested we shut down. Kill our connection and tell the server
     * that we've left.
     */close(){if(!this.isClosed_){this.log_('Longpoll is being closed.');this.shutdown_();}}/**
     * Send the JSON object down to the server. It will need to be stringified, base64 encoded, and then
     * broken into chunks (since URLs have a small maximum length).
     * @param data - The JSON data to transmit.
     */send(data){const dataStr=(0,_util.stringify)(data);this.bytesSent+=dataStr.length;this.stats_.incrementCounter('bytes_sent',dataStr.length);//first, lets get the base64-encoded data
const base64data=(0,_util.base64Encode)(dataStr);//We can only fit a certain amount in each URL, so we need to split this request
//up into multiple pieces if it doesn't fit in one request.
const dataSegs=splitStringBySize(base64data,MAX_PAYLOAD_SIZE);//Enqueue each segment for transmission. We assign each chunk a sequential ID and a total number
//of segments so that we can reassemble the packet on the server.
for(let i=0;i<dataSegs.length;i++){this.scriptTagHolder.enqueueSegment(this.curSegmentNum,dataSegs.length,dataSegs[i]);this.curSegmentNum++;}}/**
     * This is how we notify the server that we're leaving.
     * We aren't able to send requests with DHTML on a window close event, but we can
     * trigger XHR requests in some browsers (everything but Opera basically).
     */addDisconnectPingFrame(id,pw){if((0,_util.isNodeSdk)()){return;}this.myDisconnFrame=document.createElement('iframe');const urlParams={};urlParams[FIREBASE_LONGPOLL_DISCONN_FRAME_REQUEST_PARAM]='t';urlParams[FIREBASE_LONGPOLL_ID_PARAM]=id;urlParams[FIREBASE_LONGPOLL_PW_PARAM]=pw;this.myDisconnFrame.src=this.urlFn(urlParams);this.myDisconnFrame.style.display='none';document.body.appendChild(this.myDisconnFrame);}/**
     * Used to track the bytes received by this client
     */incrementIncomingBytes_(args){// TODO: This is an annoying perf hit just to track the number of incoming bytes.  Maybe it should be opt-in.
const bytesReceived=(0,_util.stringify)(args).length;this.bytesReceived+=bytesReceived;this.stats_.incrementCounter('bytes_received',bytesReceived);}}/*********************************************************************************************
 * A wrapper around an iframe that is used as a long-polling script holder.
 *********************************************************************************************/class FirebaseIFrameScriptHolder{/**
     * @param commandCB - The callback to be called when control commands are recevied from the server.
     * @param onMessageCB - The callback to be triggered when responses arrive from the server.
     * @param onDisconnect - The callback to be triggered when this tag holder is closed
     * @param urlFn - A function that provides the URL of the endpoint to send data to.
     */constructor(commandCB,onMessageCB,onDisconnect,urlFn){this.onDisconnect=onDisconnect;this.urlFn=urlFn;//We maintain a count of all of the outstanding requests, because if we have too many active at once it can cause
//problems in some browsers.
this.outstandingRequests=new Set();//A queue of the pending segments waiting for transmission to the server.
this.pendingSegs=[];//A serial number. We use this for two things:
// 1) A way to ensure the browser doesn't cache responses to polls
// 2) A way to make the server aware when long-polls arrive in a different order than we started them. The
//    server needs to release both polls in this case or it will cause problems in Opera since Opera can only execute
//    JSONP code in the order it was added to the iframe.
this.currentSerial=Math.floor(Math.random()*100000000);// This gets set to false when we're "closing down" the connection (e.g. we're switching transports but there's still
// incoming data from the server that we're waiting for).
this.sendNewPolls=true;if(!(0,_util.isNodeSdk)()){//Each script holder registers a couple of uniquely named callbacks with the window. These are called from the
//iframes where we put the long-polling script tags. We have two callbacks:
//   1) Command Callback - Triggered for control issues, like starting a connection.
//   2) Message Callback - Triggered when new data arrives.
this.uniqueCallbackIdentifier=LUIDGenerator();window[FIREBASE_LONGPOLL_COMMAND_CB_NAME+this.uniqueCallbackIdentifier]=commandCB;window[FIREBASE_LONGPOLL_DATA_CB_NAME+this.uniqueCallbackIdentifier]=onMessageCB;//Create an iframe for us to add script tags to.
this.myIFrame=FirebaseIFrameScriptHolder.createIFrame_();// Set the iframe's contents.
let script='';// if we set a javascript url, it's IE and we need to set the document domain. The javascript url is sufficient
// for ie9, but ie8 needs to do it again in the document itself.
if(this.myIFrame.src&&this.myIFrame.src.substr(0,'javascript:'.length)==='javascript:'){const currentDomain=document.domain;script='<script>document.domain="'+currentDomain+'";</script>';}const iframeContents='<html><body>'+script+'</body></html>';try{this.myIFrame.doc.open();this.myIFrame.doc.write(iframeContents);this.myIFrame.doc.close();}catch(e){log('frame writing exception');if(e.stack){log(e.stack);}log(e);}}else{this.commandCB=commandCB;this.onMessageCB=onMessageCB;}}/**
     * Each browser has its own funny way to handle iframes. Here we mush them all together into one object that I can
     * actually use.
     */static createIFrame_(){const iframe=document.createElement('iframe');iframe.style.display='none';// This is necessary in order to initialize the document inside the iframe
if(document.body){document.body.appendChild(iframe);try{// If document.domain has been modified in IE, this will throw an error, and we need to set the
// domain of the iframe's document manually. We can do this via a javascript: url as the src attribute
// Also note that we must do this *after* the iframe has been appended to the page. Otherwise it doesn't work.
const a=iframe.contentWindow.document;if(!a){// Apologies for the log-spam, I need to do something to keep closure from optimizing out the assignment above.
log('No IE domain setting required');}}catch(e){const domain=document.domain;iframe.src="javascript:void((function(){document.open();document.domain='"+domain+"';document.close();})())";}}else{// LongPollConnection attempts to delay initialization until the document is ready, so hopefully this
// never gets hit.
throw'Document body has not initialized. Wait to initialize Firebase until after the document is ready.';}// Get the document of the iframe in a browser-specific way.
if(iframe.contentDocument){iframe.doc=iframe.contentDocument;// Firefox, Opera, Safari
}else if(iframe.contentWindow){iframe.doc=iframe.contentWindow.document;// Internet Explorer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}else if(iframe.document){// eslint-disable-next-line @typescript-eslint/no-explicit-any
iframe.doc=iframe.document;//others?
}return iframe;}/**
     * Cancel all outstanding queries and remove the frame.
     */close(){//Mark this iframe as dead, so no new requests are sent.
this.alive=false;if(this.myIFrame){//We have to actually remove all of the html inside this iframe before removing it from the
//window, or IE will continue loading and executing the script tags we've already added, which
//can lead to some errors being thrown. Setting textContent seems to be the safest way to do this.
this.myIFrame.doc.body.textContent='';setTimeout(()=>{if(this.myIFrame!==null){document.body.removeChild(this.myIFrame);this.myIFrame=null;}},Math.floor(0));}// Protect from being called recursively.
const onDisconnect=this.onDisconnect;if(onDisconnect){this.onDisconnect=null;onDisconnect();}}/**
     * Actually start the long-polling session by adding the first script tag(s) to the iframe.
     * @param id - The ID of this connection
     * @param pw - The password for this connection
     */startLongPoll(id,pw){this.myID=id;this.myPW=pw;this.alive=true;//send the initial request. If there are requests queued, make sure that we transmit as many as we are currently able to.
while(this.newRequest_()){}}/**
     * This is called any time someone might want a script tag to be added. It adds a script tag when there aren't
     * too many outstanding requests and we are still alive.
     *
     * If there are outstanding packet segments to send, it sends one. If there aren't, it sends a long-poll anyways if
     * needed.
     */newRequest_(){// We keep one outstanding request open all the time to receive data, but if we need to send data
// (pendingSegs.length > 0) then we create a new request to send the data.  The server will automatically
// close the old request.
if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){//construct our url
this.currentSerial++;const urlParams={};urlParams[FIREBASE_LONGPOLL_ID_PARAM]=this.myID;urlParams[FIREBASE_LONGPOLL_PW_PARAM]=this.myPW;urlParams[FIREBASE_LONGPOLL_SERIAL_PARAM]=this.currentSerial;let theURL=this.urlFn(urlParams);//Now add as much data as we can.
let curDataString='';let i=0;while(this.pendingSegs.length>0){//first, lets see if the next segment will fit.
const nextSeg=this.pendingSegs[0];if(nextSeg.d.length+SEG_HEADER_SIZE+curDataString.length<=MAX_URL_DATA_SIZE){//great, the segment will fit. Lets append it.
const theSeg=this.pendingSegs.shift();curDataString=curDataString+'&'+FIREBASE_LONGPOLL_SEGMENT_NUM_PARAM+i+'='+theSeg.seg+'&'+FIREBASE_LONGPOLL_SEGMENTS_IN_PACKET+i+'='+theSeg.ts+'&'+FIREBASE_LONGPOLL_DATA_PARAM+i+'='+theSeg.d;i++;}else{break;}}theURL=theURL+curDataString;this.addLongPollTag_(theURL,this.currentSerial);return true;}else{return false;}}/**
     * Queue a packet for transmission to the server.
     * @param segnum - A sequential id for this packet segment used for reassembly
     * @param totalsegs - The total number of segments in this packet
     * @param data - The data for this segment.
     */enqueueSegment(segnum,totalsegs,data){//add this to the queue of segments to send.
this.pendingSegs.push({seg:segnum,ts:totalsegs,d:data});//send the data immediately if there isn't already data being transmitted, unless
//startLongPoll hasn't been called yet.
if(this.alive){this.newRequest_();}}/**
     * Add a script tag for a regular long-poll request.
     * @param url - The URL of the script tag.
     * @param serial - The serial number of the request.
     */addLongPollTag_(url,serial){//remember that we sent this request.
this.outstandingRequests.add(serial);const doNewRequest=()=>{this.outstandingRequests.delete(serial);this.newRequest_();};// If this request doesn't return on its own accord (by the server sending us some data), we'll
// create a new one after the KEEPALIVE interval to make sure we always keep a fresh request open.
const keepaliveTimeout=setTimeout(doNewRequest,Math.floor(KEEPALIVE_REQUEST_INTERVAL));const readyStateCB=()=>{// Request completed.  Cancel the keepalive.
clearTimeout(keepaliveTimeout);// Trigger a new request so we can continue receiving data.
doNewRequest();};this.addTag(url,readyStateCB);}/**
     * Add an arbitrary script tag to the iframe.
     * @param url - The URL for the script tag source.
     * @param loadCB - A callback to be triggered once the script has loaded.
     */addTag(url,loadCB){if((0,_util.isNodeSdk)()){// eslint-disable-next-line @typescript-eslint/no-explicit-any
this.doNodeLongPoll(url,loadCB);}else{setTimeout(()=>{try{// if we're already closed, don't add this poll
if(!this.sendNewPolls){return;}const newScript=this.myIFrame.doc.createElement('script');newScript.type='text/javascript';newScript.async=true;newScript.src=url;// eslint-disable-next-line @typescript-eslint/no-explicit-any
newScript.onload=newScript.onreadystatechange=function(){// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rstate=newScript.readyState;if(!rstate||rstate==='loaded'||rstate==='complete'){// eslint-disable-next-line @typescript-eslint/no-explicit-any
newScript.onload=newScript.onreadystatechange=null;if(newScript.parentNode){newScript.parentNode.removeChild(newScript);}loadCB();}};newScript.onerror=()=>{log('Long-poll script failed to load: '+url);this.sendNewPolls=false;this.close();};this.myIFrame.doc.body.appendChild(newScript);}catch(e){// TODO: we should make this error visible somehow
}},Math.floor(1));}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WEBSOCKET_MAX_FRAME_SIZE=16384;const WEBSOCKET_KEEPALIVE_INTERVAL=45000;let WebSocketImpl=null;if(typeof MozWebSocket!=='undefined'){WebSocketImpl=MozWebSocket;}else if(typeof WebSocket!=='undefined'){WebSocketImpl=WebSocket;}/**
 * Create a new websocket connection with the given callbacks.
 */class WebSocketConnection{/**
     * @param connId identifier for this transport
     * @param repoInfo The info for the websocket endpoint.
     * @param applicationId The Firebase App ID for this project.
     * @param appCheckToken The App Check Token for this client.
     * @param authToken The Auth Token for this client.
     * @param transportSessionId Optional transportSessionId if this is connecting
     * to an existing transport session
     * @param lastSessionId Optional lastSessionId if there was a previous
     * connection
     */constructor(connId,repoInfo,applicationId,appCheckToken,authToken,transportSessionId,lastSessionId){this.connId=connId;this.applicationId=applicationId;this.appCheckToken=appCheckToken;this.authToken=authToken;this.keepaliveTimer=null;this.frames=null;this.totalFrames=0;this.bytesSent=0;this.bytesReceived=0;this.log_=logWrapper(this.connId);this.stats_=statsManagerGetCollection(repoInfo);this.connURL=WebSocketConnection.connectionURL_(repoInfo,transportSessionId,lastSessionId,appCheckToken,applicationId);this.nodeAdmin=repoInfo.nodeAdmin;}/**
     * @param repoInfo - The info for the websocket endpoint.
     * @param transportSessionId - Optional transportSessionId if this is connecting to an existing transport
     *                                         session
     * @param lastSessionId - Optional lastSessionId if there was a previous connection
     * @returns connection url
     */static connectionURL_(repoInfo,transportSessionId,lastSessionId,appCheckToken,applicationId){const urlParams={};urlParams[VERSION_PARAM]=PROTOCOL_VERSION;if(!(0,_util.isNodeSdk)()&&typeof location!=='undefined'&&location.hostname&&FORGE_DOMAIN_RE.test(location.hostname)){urlParams[REFERER_PARAM]=FORGE_REF;}if(transportSessionId){urlParams[TRANSPORT_SESSION_PARAM]=transportSessionId;}if(lastSessionId){urlParams[LAST_SESSION_PARAM]=lastSessionId;}if(appCheckToken){urlParams[APP_CHECK_TOKEN_PARAM]=appCheckToken;}if(applicationId){urlParams[APPLICATION_ID_PARAM]=applicationId;}return repoInfoConnectionURL(repoInfo,WEBSOCKET,urlParams);}/**
     * @param onMessage - Callback when messages arrive
     * @param onDisconnect - Callback with connection lost.
     */open(onMessage,onDisconnect){this.onDisconnect=onDisconnect;this.onMessage=onMessage;this.log_('Websocket connecting to '+this.connURL);this.everConnected_=false;// Assume failure until proven otherwise.
PersistentStorage.set('previous_websocket_failure',true);try{let options;if((0,_util.isNodeSdk)()){const device=this.nodeAdmin?'AdminNode':'Node';// UA Format: Firebase/<wire_protocol>/<sdk_version>/<platform>/<device>
options={headers:{'User-Agent':`Firebase/${PROTOCOL_VERSION}/${SDK_VERSION}/${process.platform}/${device}`,'X-Firebase-GMPID':this.applicationId||''}};// If using Node with admin creds, AppCheck-related checks are unnecessary.
// Note that we send the credentials here even if they aren't admin credentials, which is
// not a problem.
// Note that this header is just used to bypass appcheck, and the token should still be sent
// through the websocket connection once it is established.
if(this.authToken){options.headers['Authorization']=`Bearer ${this.authToken}`;}if(this.appCheckToken){options.headers['X-Firebase-AppCheck']=this.appCheckToken;}// Plumb appropriate http_proxy environment variable into faye-websocket if it exists.
const env=process['env'];const proxy=this.connURL.indexOf('wss://')===0?env['HTTPS_PROXY']||env['https_proxy']:env['HTTP_PROXY']||env['http_proxy'];if(proxy){options['proxy']={origin:proxy};}}this.mySock=new WebSocketImpl(this.connURL,[],options);}catch(e){this.log_('Error instantiating WebSocket.');const error=e.message||e.data;if(error){this.log_(error);}this.onClosed_();return;}this.mySock.onopen=()=>{this.log_('Websocket connected.');this.everConnected_=true;};this.mySock.onclose=()=>{this.log_('Websocket connection was disconnected.');this.mySock=null;this.onClosed_();};this.mySock.onmessage=m=>{this.handleIncomingFrame(m);};this.mySock.onerror=e=>{this.log_('WebSocket error.  Closing connection.');// eslint-disable-next-line @typescript-eslint/no-explicit-any
const error=e.message||e.data;if(error){this.log_(error);}this.onClosed_();};}/**
     * No-op for websockets, we don't need to do anything once the connection is confirmed as open
     */start(){}static forceDisallow(){WebSocketConnection.forceDisallow_=true;}static isAvailable(){let isOldAndroid=false;if(typeof navigator!=='undefined'&&navigator.userAgent){const oldAndroidRegex=/Android ([0-9]{0,}\.[0-9]{0,})/;const oldAndroidMatch=navigator.userAgent.match(oldAndroidRegex);if(oldAndroidMatch&&oldAndroidMatch.length>1){if(parseFloat(oldAndroidMatch[1])<4.4){isOldAndroid=true;}}}return!isOldAndroid&&WebSocketImpl!==null&&!WebSocketConnection.forceDisallow_;}/**
     * Returns true if we previously failed to connect with this transport.
     */static previouslyFailed(){// If our persistent storage is actually only in-memory storage,
// we default to assuming that it previously failed to be safe.
return PersistentStorage.isInMemoryStorage||PersistentStorage.get('previous_websocket_failure')===true;}markConnectionHealthy(){PersistentStorage.remove('previous_websocket_failure');}appendFrame_(data){this.frames.push(data);if(this.frames.length===this.totalFrames){const fullMess=this.frames.join('');this.frames=null;const jsonMess=(0,_util.jsonEval)(fullMess);//handle the message
this.onMessage(jsonMess);}}/**
     * @param frameCount - The number of frames we are expecting from the server
     */handleNewFrameCount_(frameCount){this.totalFrames=frameCount;this.frames=[];}/**
     * Attempts to parse a frame count out of some text. If it can't, assumes a value of 1
     * @returns Any remaining data to be process, or null if there is none
     */extractFrameCount_(data){(0,_util.assert)(this.frames===null,'We already have a frame buffer');// TODO: The server is only supposed to send up to 9999 frames (i.e. length <= 4), but that isn't being enforced
// currently.  So allowing larger frame counts (length <= 6).  See https://app.asana.com/0/search/8688598998380/8237608042508
if(data.length<=6){const frameCount=Number(data);if(!isNaN(frameCount)){this.handleNewFrameCount_(frameCount);return null;}}this.handleNewFrameCount_(1);return data;}/**
     * Process a websocket frame that has arrived from the server.
     * @param mess - The frame data
     */handleIncomingFrame(mess){if(this.mySock===null){return;// Chrome apparently delivers incoming packets even after we .close() the connection sometimes.
}const data=mess['data'];this.bytesReceived+=data.length;this.stats_.incrementCounter('bytes_received',data.length);this.resetKeepAlive();if(this.frames!==null){// we're buffering
this.appendFrame_(data);}else{// try to parse out a frame count, otherwise, assume 1 and process it
const remainingData=this.extractFrameCount_(data);if(remainingData!==null){this.appendFrame_(remainingData);}}}/**
     * Send a message to the server
     * @param data - The JSON object to transmit
     */send(data){this.resetKeepAlive();const dataStr=(0,_util.stringify)(data);this.bytesSent+=dataStr.length;this.stats_.incrementCounter('bytes_sent',dataStr.length);//We can only fit a certain amount in each websocket frame, so we need to split this request
//up into multiple pieces if it doesn't fit in one request.
const dataSegs=splitStringBySize(dataStr,WEBSOCKET_MAX_FRAME_SIZE);//Send the length header
if(dataSegs.length>1){this.sendString_(String(dataSegs.length));}//Send the actual data in segments.
for(let i=0;i<dataSegs.length;i++){this.sendString_(dataSegs[i]);}}shutdown_(){this.isClosed_=true;if(this.keepaliveTimer){clearInterval(this.keepaliveTimer);this.keepaliveTimer=null;}if(this.mySock){this.mySock.close();this.mySock=null;}}onClosed_(){if(!this.isClosed_){this.log_('WebSocket is closing itself');this.shutdown_();// since this is an internal close, trigger the close listener
if(this.onDisconnect){this.onDisconnect(this.everConnected_);this.onDisconnect=null;}}}/**
     * External-facing close handler.
     * Close the websocket and kill the connection.
     */close(){if(!this.isClosed_){this.log_('WebSocket is being closed');this.shutdown_();}}/**
     * Kill the current keepalive timer and start a new one, to ensure that it always fires N seconds after
     * the last activity.
     */resetKeepAlive(){clearInterval(this.keepaliveTimer);this.keepaliveTimer=setInterval(()=>{//If there has been no websocket activity for a while, send a no-op
if(this.mySock){this.sendString_('0');}this.resetKeepAlive();// eslint-disable-next-line @typescript-eslint/no-explicit-any
},Math.floor(WEBSOCKET_KEEPALIVE_INTERVAL));}/**
     * Send a string over the websocket.
     *
     * @param str - String to send.
     */sendString_(str){// Firefox seems to sometimes throw exceptions (NS_ERROR_UNEXPECTED) from websocket .send()
// calls for some unknown reason.  We treat these as an error and disconnect.
// See https://app.asana.com/0/58926111402292/68021340250410
try{this.mySock.send(str);}catch(e){this.log_('Exception thrown from WebSocket.send():',e.message||e.data,'Closing connection.');setTimeout(this.onClosed_.bind(this),0);}}}/**
 * Number of response before we consider the connection "healthy."
 */WebSocketConnection.responsesRequiredToBeHealthy=2;/**
 * Time to wait for the connection te become healthy before giving up.
 */WebSocketConnection.healthyTimeout=30000;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Currently simplistic, this class manages what transport a Connection should use at various stages of its
 * lifecycle.
 *
 * It starts with longpolling in a browser, and httppolling on node. It then upgrades to websockets if
 * they are available.
 */class TransportManager{/**
     * @param repoInfo - Metadata around the namespace we're connecting to
     */constructor(repoInfo){this.initTransports_(repoInfo);}static get ALL_TRANSPORTS(){return[BrowserPollConnection,WebSocketConnection];}/**
     * Returns whether transport has been selected to ensure WebSocketConnection or BrowserPollConnection are not called after
     * TransportManager has already set up transports_
     */static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_;}initTransports_(repoInfo){const isWebSocketsAvailable=WebSocketConnection&&WebSocketConnection['isAvailable']();let isSkipPollConnection=isWebSocketsAvailable&&!WebSocketConnection.previouslyFailed();if(repoInfo.webSocketOnly){if(!isWebSocketsAvailable){warn("wss:// URL used, but browser isn't known to support websockets.  Trying anyway.");}isSkipPollConnection=true;}if(isSkipPollConnection){this.transports_=[WebSocketConnection];}else{const transports=this.transports_=[];for(const transport of TransportManager.ALL_TRANSPORTS){if(transport&&transport['isAvailable']()){transports.push(transport);}}TransportManager.globalTransportInitialized_=true;}}/**
     * @returns The constructor for the initial transport to use
     */initialTransport(){if(this.transports_.length>0){return this.transports_[0];}else{throw new Error('No transports available');}}/**
     * @returns The constructor for the next transport, or null
     */upgradeTransport(){if(this.transports_.length>1){return this.transports_[1];}else{return null;}}}// Keeps track of whether the TransportManager has already chosen a transport to use
TransportManager.globalTransportInitialized_=false;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Abort upgrade attempt if it takes longer than 60s.
const UPGRADE_TIMEOUT=60000;// For some transports (WebSockets), we need to "validate" the transport by exchanging a few requests and responses.
// If we haven't sent enough requests within 5s, we'll start sending noop ping requests.
const DELAY_BEFORE_SENDING_EXTRA_REQUESTS=5000;// If the initial data sent triggers a lot of bandwidth (i.e. it's a large put or a listen for a large amount of data)
// then we may not be able to exchange our ping/pong requests within the healthy timeout.  So if we reach the timeout
// but we've sent/received enough bytes, we don't cancel the connection.
const BYTES_SENT_HEALTHY_OVERRIDE=10*1024;const BYTES_RECEIVED_HEALTHY_OVERRIDE=100*1024;const MESSAGE_TYPE='t';const MESSAGE_DATA='d';const CONTROL_SHUTDOWN='s';const CONTROL_RESET='r';const CONTROL_ERROR='e';const CONTROL_PONG='o';const SWITCH_ACK='a';const END_TRANSMISSION='n';const PING='p';const SERVER_HELLO='h';/**
 * Creates a new real-time connection to the server using whichever method works
 * best in the current browser.
 */class Connection{/**
     * @param id - an id for this connection
     * @param repoInfo_ - the info for the endpoint to connect to
     * @param applicationId_ - the Firebase App ID for this project
     * @param appCheckToken_ - The App Check Token for this device.
     * @param authToken_ - The auth token for this session.
     * @param onMessage_ - the callback to be triggered when a server-push message arrives
     * @param onReady_ - the callback to be triggered when this connection is ready to send messages.
     * @param onDisconnect_ - the callback to be triggered when a connection was lost
     * @param onKill_ - the callback to be triggered when this connection has permanently shut down.
     * @param lastSessionId - last session id in persistent connection. is used to clean up old session in real-time server
     */constructor(id,repoInfo_,applicationId_,appCheckToken_,authToken_,onMessage_,onReady_,onDisconnect_,onKill_,lastSessionId){this.id=id;this.repoInfo_=repoInfo_;this.applicationId_=applicationId_;this.appCheckToken_=appCheckToken_;this.authToken_=authToken_;this.onMessage_=onMessage_;this.onReady_=onReady_;this.onDisconnect_=onDisconnect_;this.onKill_=onKill_;this.lastSessionId=lastSessionId;this.connectionCount=0;this.pendingDataMessages=[];this.state_=0/* RealtimeState.CONNECTING */;this.log_=logWrapper('c:'+this.id+':');this.transportManager_=new TransportManager(repoInfo_);this.log_('Connection created');this.start_();}/**
     * Starts a connection attempt
     */start_(){const conn=this.transportManager_.initialTransport();this.conn_=new conn(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId);// For certain transports (WebSockets), we need to send and receive several messages back and forth before we
// can consider the transport healthy.
this.primaryResponsesRequired_=conn['responsesRequiredToBeHealthy']||0;const onMessageReceived=this.connReceiver_(this.conn_);const onConnectionLost=this.disconnReceiver_(this.conn_);this.tx_=this.conn_;this.rx_=this.conn_;this.secondaryConn_=null;this.isHealthy_=false;/*
         * Firefox doesn't like when code from one iframe tries to create another iframe by way of the parent frame.
         * This can occur in the case of a redirect, i.e. we guessed wrong on what server to connect to and received a reset.
         * Somehow, setTimeout seems to make this ok. That doesn't make sense from a security perspective, since you should
         * still have the context of your originating frame.
         */setTimeout(()=>{// this.conn_ gets set to null in some of the tests. Check to make sure it still exists before using it
this.conn_&&this.conn_.open(onMessageReceived,onConnectionLost);},Math.floor(0));const healthyTimeoutMS=conn['healthyTimeout']||0;if(healthyTimeoutMS>0){this.healthyTimeout_=setTimeoutNonBlocking(()=>{this.healthyTimeout_=null;if(!this.isHealthy_){if(this.conn_&&this.conn_.bytesReceived>BYTES_RECEIVED_HEALTHY_OVERRIDE){this.log_('Connection exceeded healthy timeout but has received '+this.conn_.bytesReceived+' bytes.  Marking connection healthy.');this.isHealthy_=true;this.conn_.markConnectionHealthy();}else if(this.conn_&&this.conn_.bytesSent>BYTES_SENT_HEALTHY_OVERRIDE){this.log_('Connection exceeded healthy timeout but has sent '+this.conn_.bytesSent+' bytes.  Leaving connection alive.');// NOTE: We don't want to mark it healthy, since we have no guarantee that the bytes have made it to
// the server.
}else{this.log_('Closing unhealthy connection after timeout.');this.close();}}// eslint-disable-next-line @typescript-eslint/no-explicit-any
},Math.floor(healthyTimeoutMS));}}nextTransportId_(){return'c:'+this.id+':'+this.connectionCount++;}disconnReceiver_(conn){return everConnected=>{if(conn===this.conn_){this.onConnectionLost_(everConnected);}else if(conn===this.secondaryConn_){this.log_('Secondary connection lost.');this.onSecondaryConnectionLost_();}else{this.log_('closing an old connection');}};}connReceiver_(conn){return message=>{if(this.state_!==2/* RealtimeState.DISCONNECTED */){if(conn===this.rx_){this.onPrimaryMessageReceived_(message);}else if(conn===this.secondaryConn_){this.onSecondaryMessageReceived_(message);}else{this.log_('message on old connection');}}};}/**
     * @param dataMsg - An arbitrary data message to be sent to the server
     */sendRequest(dataMsg){// wrap in a data message envelope and send it on
const msg={t:'d',d:dataMsg};this.sendData_(msg);}tryCleanupConnection(){if(this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_){this.log_('cleaning up and promoting a connection: '+this.secondaryConn_.connId);this.conn_=this.secondaryConn_;this.secondaryConn_=null;// the server will shutdown the old connection
}}onSecondaryControl_(controlData){if(MESSAGE_TYPE in controlData){const cmd=controlData[MESSAGE_TYPE];if(cmd===SWITCH_ACK){this.upgradeIfSecondaryHealthy_();}else if(cmd===CONTROL_RESET){// Most likely the session wasn't valid. Abandon the switch attempt
this.log_('Got a reset on secondary, closing it');this.secondaryConn_.close();// If we were already using this connection for something, than we need to fully close
if(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_){this.close();}}else if(cmd===CONTROL_PONG){this.log_('got pong on secondary.');this.secondaryResponsesRequired_--;this.upgradeIfSecondaryHealthy_();}}}onSecondaryMessageReceived_(parsedData){const layer=requireKey('t',parsedData);const data=requireKey('d',parsedData);if(layer==='c'){this.onSecondaryControl_(data);}else if(layer==='d'){// got a data message, but we're still second connection. Need to buffer it up
this.pendingDataMessages.push(data);}else{throw new Error('Unknown protocol layer: '+layer);}}upgradeIfSecondaryHealthy_(){if(this.secondaryResponsesRequired_<=0){this.log_('Secondary connection is healthy.');this.isHealthy_=true;this.secondaryConn_.markConnectionHealthy();this.proceedWithUpgrade_();}else{// Send a ping to make sure the connection is healthy.
this.log_('sending ping on secondary.');this.secondaryConn_.send({t:'c',d:{t:PING,d:{}}});}}proceedWithUpgrade_(){// tell this connection to consider itself open
this.secondaryConn_.start();// send ack
this.log_('sending client ack on secondary');this.secondaryConn_.send({t:'c',d:{t:SWITCH_ACK,d:{}}});// send end packet on primary transport, switch to sending on this one
// can receive on this one, buffer responses until end received on primary transport
this.log_('Ending transmission on primary');this.conn_.send({t:'c',d:{t:END_TRANSMISSION,d:{}}});this.tx_=this.secondaryConn_;this.tryCleanupConnection();}onPrimaryMessageReceived_(parsedData){// Must refer to parsedData properties in quotes, so closure doesn't touch them.
const layer=requireKey('t',parsedData);const data=requireKey('d',parsedData);if(layer==='c'){this.onControl_(data);}else if(layer==='d'){this.onDataMessage_(data);}}onDataMessage_(message){this.onPrimaryResponse_();// We don't do anything with data messages, just kick them up a level
this.onMessage_(message);}onPrimaryResponse_(){if(!this.isHealthy_){this.primaryResponsesRequired_--;if(this.primaryResponsesRequired_<=0){this.log_('Primary connection is healthy.');this.isHealthy_=true;this.conn_.markConnectionHealthy();}}}onControl_(controlData){const cmd=requireKey(MESSAGE_TYPE,controlData);if(MESSAGE_DATA in controlData){const payload=controlData[MESSAGE_DATA];if(cmd===SERVER_HELLO){this.onHandshake_(payload);}else if(cmd===END_TRANSMISSION){this.log_('recvd end transmission on primary');this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i){this.onDataMessage_(this.pendingDataMessages[i]);}this.pendingDataMessages=[];this.tryCleanupConnection();}else if(cmd===CONTROL_SHUTDOWN){// This was previously the 'onKill' callback passed to the lower-level connection
// payload in this case is the reason for the shutdown. Generally a human-readable error
this.onConnectionShutdown_(payload);}else if(cmd===CONTROL_RESET){// payload in this case is the host we should contact
this.onReset_(payload);}else if(cmd===CONTROL_ERROR){error('Server Error: '+payload);}else if(cmd===CONTROL_PONG){this.log_('got pong on primary.');this.onPrimaryResponse_();this.sendPingOnPrimaryIfNecessary_();}else{error('Unknown control packet command: '+cmd);}}}/**
     * @param handshake - The handshake data returned from the server
     */onHandshake_(handshake){const timestamp=handshake.ts;const version=handshake.v;const host=handshake.h;this.sessionId=handshake.s;this.repoInfo_.host=host;// if we've already closed the connection, then don't bother trying to progress further
if(this.state_===0/* RealtimeState.CONNECTING */){this.conn_.start();this.onConnectionEstablished_(this.conn_,timestamp);if(PROTOCOL_VERSION!==version){warn('Protocol version mismatch detected');}// TODO: do we want to upgrade? when? maybe a delay?
this.tryStartUpgrade_();}}tryStartUpgrade_(){const conn=this.transportManager_.upgradeTransport();if(conn){this.startUpgrade_(conn);}}startUpgrade_(conn){this.secondaryConn_=new conn(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId);// For certain transports (WebSockets), we need to send and receive several messages back and forth before we
// can consider the transport healthy.
this.secondaryResponsesRequired_=conn['responsesRequiredToBeHealthy']||0;const onMessage=this.connReceiver_(this.secondaryConn_);const onDisconnect=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(onMessage,onDisconnect);// If we haven't successfully upgraded after UPGRADE_TIMEOUT, give up and kill the secondary.
setTimeoutNonBlocking(()=>{if(this.secondaryConn_){this.log_('Timed out trying to upgrade.');this.secondaryConn_.close();}},Math.floor(UPGRADE_TIMEOUT));}onReset_(host){this.log_('Reset packet received.  New host: '+host);this.repoInfo_.host=host;// TODO: if we're already "connected", we need to trigger a disconnect at the next layer up.
// We don't currently support resets after the connection has already been established
if(this.state_===1/* RealtimeState.CONNECTED */){this.close();}else{// Close whatever connections we have open and start again.
this.closeConnections_();this.start_();}}onConnectionEstablished_(conn,timestamp){this.log_('Realtime connection established.');this.conn_=conn;this.state_=1/* RealtimeState.CONNECTED */;if(this.onReady_){this.onReady_(timestamp,this.sessionId);this.onReady_=null;}// If after 5 seconds we haven't sent enough requests to the server to get the connection healthy,
// send some pings.
if(this.primaryResponsesRequired_===0){this.log_('Primary connection is healthy.');this.isHealthy_=true;}else{setTimeoutNonBlocking(()=>{this.sendPingOnPrimaryIfNecessary_();},Math.floor(DELAY_BEFORE_SENDING_EXTRA_REQUESTS));}}sendPingOnPrimaryIfNecessary_(){// If the connection isn't considered healthy yet, we'll send a noop ping packet request.
if(!this.isHealthy_&&this.state_===1/* RealtimeState.CONNECTED */){this.log_('sending ping on primary.');this.sendData_({t:'c',d:{t:PING,d:{}}});}}onSecondaryConnectionLost_(){const conn=this.secondaryConn_;this.secondaryConn_=null;if(this.tx_===conn||this.rx_===conn){// we are relying on this connection already in some capacity. Therefore, a failure is real
this.close();}}/**
     * @param everConnected - Whether or not the connection ever reached a server. Used to determine if
     * we should flush the host cache
     */onConnectionLost_(everConnected){this.conn_=null;// NOTE: IF you're seeing a Firefox error for this line, I think it might be because it's getting
// called on window close and RealtimeState.CONNECTING is no longer defined.  Just a guess.
if(!everConnected&&this.state_===0/* RealtimeState.CONNECTING */){this.log_('Realtime connection failed.');// Since we failed to connect at all, clear any cached entry for this namespace in case the machine went away
if(this.repoInfo_.isCacheableHost()){PersistentStorage.remove('host:'+this.repoInfo_.host);// reset the internal host to what we would show the user, i.e. <ns>.firebaseio.com
this.repoInfo_.internalHost=this.repoInfo_.host;}}else if(this.state_===1/* RealtimeState.CONNECTED */){this.log_('Realtime connection lost.');}this.close();}onConnectionShutdown_(reason){this.log_('Connection shutdown command received. Shutting down...');if(this.onKill_){this.onKill_(reason);this.onKill_=null;}// We intentionally don't want to fire onDisconnect (kill is a different case),
// so clear the callback.
this.onDisconnect_=null;this.close();}sendData_(data){if(this.state_!==1/* RealtimeState.CONNECTED */){throw'Connection is not connected';}else{this.tx_.send(data);}}/**
     * Cleans up this connection, calling the appropriate callbacks
     */close(){if(this.state_!==2/* RealtimeState.DISCONNECTED */){this.log_('Closing realtime connection.');this.state_=2/* RealtimeState.DISCONNECTED */;this.closeConnections_();if(this.onDisconnect_){this.onDisconnect_();this.onDisconnect_=null;}}}closeConnections_(){this.log_('Shutting down all connections');if(this.conn_){this.conn_.close();this.conn_=null;}if(this.secondaryConn_){this.secondaryConn_.close();this.secondaryConn_=null;}if(this.healthyTimeout_){clearTimeout(this.healthyTimeout_);this.healthyTimeout_=null;}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Interface defining the set of actions that can be performed against the Firebase server
 * (basically corresponds to our wire protocol).
 *
 * @interface
 */class ServerActions{put(pathString,data,onComplete,hash){}merge(pathString,data,onComplete,hash){}/**
     * Refreshes the auth token for the current connection.
     * @param token - The authentication token
     */refreshAuthToken(token){}/**
     * Refreshes the app check token for the current connection.
     * @param token The app check token
     */refreshAppCheckToken(token){}onDisconnectPut(pathString,data,onComplete){}onDisconnectMerge(pathString,data,onComplete){}onDisconnectCancel(pathString,onComplete){}reportStats(stats){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Base class to be used if you want to emit events. Call the constructor with
 * the set of allowed event names.
 */class EventEmitter{constructor(allowedEvents_){this.allowedEvents_=allowedEvents_;this.listeners_={};(0,_util.assert)(Array.isArray(allowedEvents_)&&allowedEvents_.length>0,'Requires a non-empty array');}/**
     * To be called by derived classes to trigger events.
     */trigger(eventType,...varArgs){if(Array.isArray(this.listeners_[eventType])){// Clone the list, since callbacks could add/remove listeners.
const listeners=[...this.listeners_[eventType]];for(let i=0;i<listeners.length;i++){listeners[i].callback.apply(listeners[i].context,varArgs);}}}on(eventType,callback,context){this.validateEventType_(eventType);this.listeners_[eventType]=this.listeners_[eventType]||[];this.listeners_[eventType].push({callback,context});const eventData=this.getInitialEvent(eventType);if(eventData){callback.apply(context,eventData);}}off(eventType,callback,context){this.validateEventType_(eventType);const listeners=this.listeners_[eventType]||[];for(let i=0;i<listeners.length;i++){if(listeners[i].callback===callback&&(!context||context===listeners[i].context)){listeners.splice(i,1);return;}}}validateEventType_(eventType){(0,_util.assert)(this.allowedEvents_.find(et=>{return et===eventType;}),'Unknown event: '+eventType);}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Monitors online state (as reported by window.online/offline events).
 *
 * The expectation is that this could have many false positives (thinks we are online
 * when we're not), but no false negatives.  So we can safely use it to determine when
 * we definitely cannot reach the internet.
 */class OnlineMonitor extends EventEmitter{constructor(){super(['online']);this.online_=true;// We've had repeated complaints that Cordova apps can get stuck "offline", e.g.
// https://forum.ionicframework.com/t/firebase-connection-is-lost-and-never-come-back/43810
// It would seem that the 'online' event does not always fire consistently. So we disable it
// for Cordova.
if(typeof window!=='undefined'&&typeof window.addEventListener!=='undefined'&&!(0,_util.isMobileCordova)()){window.addEventListener('online',()=>{if(!this.online_){this.online_=true;this.trigger('online',true);}},false);window.addEventListener('offline',()=>{if(this.online_){this.online_=false;this.trigger('online',false);}},false);}}static getInstance(){return new OnlineMonitor();}getInitialEvent(eventType){(0,_util.assert)(eventType==='online','Unknown event type: '+eventType);return[this.online_];}currentlyOnline(){return this.online_;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Maximum key depth. */const MAX_PATH_DEPTH=32;/** Maximum number of (UTF8) bytes in a Firebase path. */const MAX_PATH_LENGTH_BYTES=768;/**
 * An immutable object representing a parsed path.  It's immutable so that you
 * can pass them around to other functions without worrying about them changing
 * it.
 */class Path{/**
     * @param pathOrString - Path string to parse, or another path, or the raw
     * tokens array
     */constructor(pathOrString,pieceNum){if(pieceNum===void 0){this.pieces_=pathOrString.split('/');// Remove empty pieces.
let copyTo=0;for(let i=0;i<this.pieces_.length;i++){if(this.pieces_[i].length>0){this.pieces_[copyTo]=this.pieces_[i];copyTo++;}}this.pieces_.length=copyTo;this.pieceNum_=0;}else{this.pieces_=pathOrString;this.pieceNum_=pieceNum;}}toString(){let pathString='';for(let i=this.pieceNum_;i<this.pieces_.length;i++){if(this.pieces_[i]!==''){pathString+='/'+this.pieces_[i];}}return pathString||'/';}}function newEmptyPath(){return new Path('');}function pathGetFront(path){if(path.pieceNum_>=path.pieces_.length){return null;}return path.pieces_[path.pieceNum_];}/**
 * @returns The number of segments in this path
 */function pathGetLength(path){return path.pieces_.length-path.pieceNum_;}function pathPopFront(path){let pieceNum=path.pieceNum_;if(pieceNum<path.pieces_.length){pieceNum++;}return new Path(path.pieces_,pieceNum);}function pathGetBack(path){if(path.pieceNum_<path.pieces_.length){return path.pieces_[path.pieces_.length-1];}return null;}function pathToUrlEncodedString(path){let pathString='';for(let i=path.pieceNum_;i<path.pieces_.length;i++){if(path.pieces_[i]!==''){pathString+='/'+encodeURIComponent(String(path.pieces_[i]));}}return pathString||'/';}/**
 * Shallow copy of the parts of the path.
 *
 */function pathSlice(path,begin=0){return path.pieces_.slice(path.pieceNum_+begin);}function pathParent(path){if(path.pieceNum_>=path.pieces_.length){return null;}const pieces=[];for(let i=path.pieceNum_;i<path.pieces_.length-1;i++){pieces.push(path.pieces_[i]);}return new Path(pieces,0);}function pathChild(path,childPathObj){const pieces=[];for(let i=path.pieceNum_;i<path.pieces_.length;i++){pieces.push(path.pieces_[i]);}if(childPathObj instanceof Path){for(let i=childPathObj.pieceNum_;i<childPathObj.pieces_.length;i++){pieces.push(childPathObj.pieces_[i]);}}else{const childPieces=childPathObj.split('/');for(let i=0;i<childPieces.length;i++){if(childPieces[i].length>0){pieces.push(childPieces[i]);}}}return new Path(pieces,0);}/**
 * @returns True if there are no segments in this path
 */function pathIsEmpty(path){return path.pieceNum_>=path.pieces_.length;}/**
 * @returns The path from outerPath to innerPath
 */function newRelativePath(outerPath,innerPath){const outer=pathGetFront(outerPath),inner=pathGetFront(innerPath);if(outer===null){return innerPath;}else if(outer===inner){return newRelativePath(pathPopFront(outerPath),pathPopFront(innerPath));}else{throw new Error('INTERNAL ERROR: innerPath ('+innerPath+') is not within '+'outerPath ('+outerPath+')');}}/**
 * @returns -1, 0, 1 if left is less, equal, or greater than the right.
 */function pathCompare(left,right){const leftKeys=pathSlice(left,0);const rightKeys=pathSlice(right,0);for(let i=0;i<leftKeys.length&&i<rightKeys.length;i++){const cmp=nameCompare(leftKeys[i],rightKeys[i]);if(cmp!==0){return cmp;}}if(leftKeys.length===rightKeys.length){return 0;}return leftKeys.length<rightKeys.length?-1:1;}/**
 * @returns true if paths are the same.
 */function pathEquals(path,other){if(pathGetLength(path)!==pathGetLength(other)){return false;}for(let i=path.pieceNum_,j=other.pieceNum_;i<=path.pieces_.length;i++,j++){if(path.pieces_[i]!==other.pieces_[j]){return false;}}return true;}/**
 * @returns True if this path is a parent of (or the same as) other
 */function pathContains(path,other){let i=path.pieceNum_;let j=other.pieceNum_;if(pathGetLength(path)>pathGetLength(other)){return false;}while(i<path.pieces_.length){if(path.pieces_[i]!==other.pieces_[j]){return false;}++i;++j;}return true;}/**
 * Dynamic (mutable) path used to count path lengths.
 *
 * This class is used to efficiently check paths for valid
 * length (in UTF8 bytes) and depth (used in path validation).
 *
 * Throws Error exception if path is ever invalid.
 *
 * The definition of a path always begins with '/'.
 */class ValidationPath{/**
     * @param path - Initial Path.
     * @param errorPrefix_ - Prefix for any error messages.
     */constructor(path,errorPrefix_){this.errorPrefix_=errorPrefix_;this.parts_=pathSlice(path,0);/** Initialize to number of '/' chars needed in path. */this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++){this.byteLength_+=(0,_util.stringLength)(this.parts_[i]);}validationPathCheckValid(this);}}function validationPathPush(validationPath,child){// Count the needed '/'
if(validationPath.parts_.length>0){validationPath.byteLength_+=1;}validationPath.parts_.push(child);validationPath.byteLength_+=(0,_util.stringLength)(child);validationPathCheckValid(validationPath);}function validationPathPop(validationPath){const last=validationPath.parts_.pop();validationPath.byteLength_-=(0,_util.stringLength)(last);// Un-count the previous '/'
if(validationPath.parts_.length>0){validationPath.byteLength_-=1;}}function validationPathCheckValid(validationPath){if(validationPath.byteLength_>MAX_PATH_LENGTH_BYTES){throw new Error(validationPath.errorPrefix_+'has a key path longer than '+MAX_PATH_LENGTH_BYTES+' bytes ('+validationPath.byteLength_+').');}if(validationPath.parts_.length>MAX_PATH_DEPTH){throw new Error(validationPath.errorPrefix_+'path specified exceeds the maximum depth that can be written ('+MAX_PATH_DEPTH+') or object contains a cycle '+validationPathToErrorString(validationPath));}}/**
 * String for use in error messages - uses '.' notation for path.
 */function validationPathToErrorString(validationPath){if(validationPath.parts_.length===0){return'';}return"in property '"+validationPath.parts_.join('.')+"'";}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VisibilityMonitor extends EventEmitter{constructor(){super(['visible']);let hidden;let visibilityChange;if(typeof document!=='undefined'&&typeof document.addEventListener!=='undefined'){if(typeof document['hidden']!=='undefined'){// Opera 12.10 and Firefox 18 and later support
visibilityChange='visibilitychange';hidden='hidden';}else if(typeof document['mozHidden']!=='undefined'){visibilityChange='mozvisibilitychange';hidden='mozHidden';}else if(typeof document['msHidden']!=='undefined'){visibilityChange='msvisibilitychange';hidden='msHidden';}else if(typeof document['webkitHidden']!=='undefined'){visibilityChange='webkitvisibilitychange';hidden='webkitHidden';}}// Initially, we always assume we are visible. This ensures that in browsers
// without page visibility support or in cases where we are never visible
// (e.g. chrome extension), we act as if we are visible, i.e. don't delay
// reconnects
this.visible_=true;if(visibilityChange){document.addEventListener(visibilityChange,()=>{const visible=!document[hidden];if(visible!==this.visible_){this.visible_=visible;this.trigger('visible',visible);}},false);}}static getInstance(){return new VisibilityMonitor();}getInitialEvent(eventType){(0,_util.assert)(eventType==='visible','Unknown event type: '+eventType);return[this.visible_];}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RECONNECT_MIN_DELAY=1000;const RECONNECT_MAX_DELAY_DEFAULT=60*5*1000;// 5 minutes in milliseconds (Case: 1858)
const RECONNECT_MAX_DELAY_FOR_ADMINS=30*1000;// 30 seconds for admin clients (likely to be a backend server)
const RECONNECT_DELAY_MULTIPLIER=1.3;const RECONNECT_DELAY_RESET_TIMEOUT=30000;// Reset delay back to MIN_DELAY after being connected for 30sec.
const SERVER_KILL_INTERRUPT_REASON='server_kill';// If auth fails repeatedly, we'll assume something is wrong and log a warning / back off.
const INVALID_TOKEN_THRESHOLD=3;/**
 * Firebase connection.  Abstracts wire protocol and handles reconnecting.
 *
 * NOTE: All JSON objects sent to the realtime connection must have property names enclosed
 * in quotes to make sure the closure compiler does not minify them.
 */class PersistentConnection extends ServerActions{/**
     * @param repoInfo_ - Data about the namespace we are connecting to
     * @param applicationId_ - The Firebase App ID for this project
     * @param onDataUpdate_ - A callback for new data from the server
     */constructor(repoInfo_,applicationId_,onDataUpdate_,onConnectStatus_,onServerInfoUpdate_,authTokenProvider_,appCheckTokenProvider_,authOverride_){super();this.repoInfo_=repoInfo_;this.applicationId_=applicationId_;this.onDataUpdate_=onDataUpdate_;this.onConnectStatus_=onConnectStatus_;this.onServerInfoUpdate_=onServerInfoUpdate_;this.authTokenProvider_=authTokenProvider_;this.appCheckTokenProvider_=appCheckTokenProvider_;this.authOverride_=authOverride_;// Used for diagnostic logging.
this.id=PersistentConnection.nextPersistentConnectionId_++;this.log_=logWrapper('p:'+this.id+':');this.interruptReasons_={};this.listens=new Map();this.outstandingPuts_=[];this.outstandingGets_=[];this.outstandingPutCount_=0;this.outstandingGetCount_=0;this.onDisconnectRequestQueue_=[];this.connected_=false;this.reconnectDelay_=RECONNECT_MIN_DELAY;this.maxReconnectDelay_=RECONNECT_MAX_DELAY_DEFAULT;this.securityDebugCallback_=null;this.lastSessionId=null;this.establishConnectionTimer_=null;this.visible_=false;// Before we get connected, we keep a queue of pending messages to send.
this.requestCBHash_={};this.requestNumber_=0;this.realtime_=null;this.authToken_=null;this.appCheckToken_=null;this.forceTokenRefresh_=false;this.invalidAuthTokenCount_=0;this.invalidAppCheckTokenCount_=0;this.firstConnection_=true;this.lastConnectionAttemptTime_=null;this.lastConnectionEstablishedTime_=null;if(authOverride_&&!(0,_util.isNodeSdk)()){throw new Error('Auth override specified in options, but not supported on non Node.js platforms');}VisibilityMonitor.getInstance().on('visible',this.onVisible_,this);if(repoInfo_.host.indexOf('fblocal')===-1){OnlineMonitor.getInstance().on('online',this.onOnline_,this);}}sendRequest(action,body,onResponse){const curReqNum=++this.requestNumber_;const msg={r:curReqNum,a:action,b:body};this.log_((0,_util.stringify)(msg));(0,_util.assert)(this.connected_,"sendRequest call when we're not connected not allowed.");this.realtime_.sendRequest(msg);if(onResponse){this.requestCBHash_[curReqNum]=onResponse;}}get(query){this.initConnection_();const deferred=new _util.Deferred();const request={p:query._path.toString(),q:query._queryObject};const outstandingGet={action:'g',request,onComplete:message=>{const payload=message['d'];if(message['s']==='ok'){deferred.resolve(payload);}else{deferred.reject(payload);}}};this.outstandingGets_.push(outstandingGet);this.outstandingGetCount_++;const index=this.outstandingGets_.length-1;if(this.connected_){this.sendGet_(index);}return deferred.promise;}listen(query,currentHashFn,tag,onComplete){this.initConnection_();const queryId=query._queryIdentifier;const pathString=query._path.toString();this.log_('Listen called for '+pathString+' '+queryId);if(!this.listens.has(pathString)){this.listens.set(pathString,new Map());}(0,_util.assert)(query._queryParams.isDefault()||!query._queryParams.loadsAllData(),'listen() called for non-default but complete query');(0,_util.assert)(!this.listens.get(pathString).has(queryId),`listen() called twice for same path/queryId.`);const listenSpec={onComplete,hashFn:currentHashFn,query,tag};this.listens.get(pathString).set(queryId,listenSpec);if(this.connected_){this.sendListen_(listenSpec);}}sendGet_(index){const get=this.outstandingGets_[index];this.sendRequest('g',get.request,message=>{delete this.outstandingGets_[index];this.outstandingGetCount_--;if(this.outstandingGetCount_===0){this.outstandingGets_=[];}if(get.onComplete){get.onComplete(message);}});}sendListen_(listenSpec){const query=listenSpec.query;const pathString=query._path.toString();const queryId=query._queryIdentifier;this.log_('Listen on '+pathString+' for '+queryId);const req={/*path*/p:pathString};const action='q';// Only bother to send query if it's non-default.
if(listenSpec.tag){req['q']=query._queryObject;req['t']=listenSpec.tag;}req[/*hash*/'h']=listenSpec.hashFn();this.sendRequest(action,req,message=>{const payload=message[/*data*/'d'];const status=message[/*status*/'s'];// print warnings in any case...
PersistentConnection.warnOnListenWarnings_(payload,query);const currentListenSpec=this.listens.get(pathString)&&this.listens.get(pathString).get(queryId);// only trigger actions if the listen hasn't been removed and readded
if(currentListenSpec===listenSpec){this.log_('listen response',message);if(status!=='ok'){this.removeListen_(pathString,queryId);}if(listenSpec.onComplete){listenSpec.onComplete(status,payload);}}});}static warnOnListenWarnings_(payload,query){if(payload&&typeof payload==='object'&&(0,_util.contains)(payload,'w')){// eslint-disable-next-line @typescript-eslint/no-explicit-any
const warnings=(0,_util.safeGet)(payload,'w');if(Array.isArray(warnings)&&~warnings.indexOf('no_index')){const indexSpec='".indexOn": "'+query._queryParams.getIndex().toString()+'"';const indexPath=query._path.toString();warn(`Using an unspecified index. Your data will be downloaded and `+`filtered on the client. Consider adding ${indexSpec} at `+`${indexPath} to your security rules for better performance.`);}}}refreshAuthToken(token){this.authToken_=token;this.log_('Auth token refreshed');if(this.authToken_){this.tryAuth();}else{//If we're connected we want to let the server know to unauthenticate us. If we're not connected, simply delete
//the credential so we dont become authenticated next time we connect.
if(this.connected_){this.sendRequest('unauth',{},()=>{});}}this.reduceReconnectDelayIfAdminCredential_(token);}reduceReconnectDelayIfAdminCredential_(credential){// NOTE: This isn't intended to be bulletproof (a malicious developer can always just modify the client).
// Additionally, we don't bother resetting the max delay back to the default if auth fails / expires.
const isFirebaseSecret=credential&&credential.length===40;if(isFirebaseSecret||(0,_util.isAdmin)(credential)){this.log_('Admin auth credential detected.  Reducing max reconnect time.');this.maxReconnectDelay_=RECONNECT_MAX_DELAY_FOR_ADMINS;}}refreshAppCheckToken(token){this.appCheckToken_=token;this.log_('App check token refreshed');if(this.appCheckToken_){this.tryAppCheck();}else{//If we're connected we want to let the server know to unauthenticate us.
//If we're not connected, simply delete the credential so we dont become
// authenticated next time we connect.
if(this.connected_){this.sendRequest('unappeck',{},()=>{});}}}/**
     * Attempts to authenticate with the given credentials. If the authentication attempt fails, it's triggered like
     * a auth revoked (the connection is closed).
     */tryAuth(){if(this.connected_&&this.authToken_){const token=this.authToken_;const authMethod=(0,_util.isValidFormat)(token)?'auth':'gauth';const requestData={cred:token};if(this.authOverride_===null){requestData['noauth']=true;}else if(typeof this.authOverride_==='object'){requestData['authvar']=this.authOverride_;}this.sendRequest(authMethod,requestData,res=>{const status=res[/*status*/'s'];const data=res[/*data*/'d']||'error';if(this.authToken_===token){if(status==='ok'){this.invalidAuthTokenCount_=0;}else{// Triggers reconnect and force refresh for auth token
this.onAuthRevoked_(status,data);}}});}}/**
     * Attempts to authenticate with the given token. If the authentication
     * attempt fails, it's triggered like the token was revoked (the connection is
     * closed).
     */tryAppCheck(){if(this.connected_&&this.appCheckToken_){this.sendRequest('appcheck',{'token':this.appCheckToken_},res=>{const status=res[/*status*/'s'];const data=res[/*data*/'d']||'error';if(status==='ok'){this.invalidAppCheckTokenCount_=0;}else{this.onAppCheckRevoked_(status,data);}});}}/**
     * @inheritDoc
     */unlisten(query,tag){const pathString=query._path.toString();const queryId=query._queryIdentifier;this.log_('Unlisten called for '+pathString+' '+queryId);(0,_util.assert)(query._queryParams.isDefault()||!query._queryParams.loadsAllData(),'unlisten() called for non-default but complete query');const listen=this.removeListen_(pathString,queryId);if(listen&&this.connected_){this.sendUnlisten_(pathString,queryId,query._queryObject,tag);}}sendUnlisten_(pathString,queryId,queryObj,tag){this.log_('Unlisten on '+pathString+' for '+queryId);const req={/*path*/p:pathString};const action='n';// Only bother sending queryId if it's non-default.
if(tag){req['q']=queryObj;req['t']=tag;}this.sendRequest(action,req);}onDisconnectPut(pathString,data,onComplete){this.initConnection_();if(this.connected_){this.sendOnDisconnect_('o',pathString,data,onComplete);}else{this.onDisconnectRequestQueue_.push({pathString,action:'o',data,onComplete});}}onDisconnectMerge(pathString,data,onComplete){this.initConnection_();if(this.connected_){this.sendOnDisconnect_('om',pathString,data,onComplete);}else{this.onDisconnectRequestQueue_.push({pathString,action:'om',data,onComplete});}}onDisconnectCancel(pathString,onComplete){this.initConnection_();if(this.connected_){this.sendOnDisconnect_('oc',pathString,null,onComplete);}else{this.onDisconnectRequestQueue_.push({pathString,action:'oc',data:null,onComplete});}}sendOnDisconnect_(action,pathString,data,onComplete){const request={/*path*/p:pathString,/*data*/d:data};this.log_('onDisconnect '+action,request);this.sendRequest(action,request,response=>{if(onComplete){setTimeout(()=>{onComplete(response[/*status*/'s'],response[/* data */'d']);},Math.floor(0));}});}put(pathString,data,onComplete,hash){this.putInternal('p',pathString,data,onComplete,hash);}merge(pathString,data,onComplete,hash){this.putInternal('m',pathString,data,onComplete,hash);}putInternal(action,pathString,data,onComplete,hash){this.initConnection_();const request={/*path*/p:pathString,/*data*/d:data};if(hash!==undefined){request[/*hash*/'h']=hash;}// TODO: Only keep track of the most recent put for a given path?
this.outstandingPuts_.push({action,request,onComplete});this.outstandingPutCount_++;const index=this.outstandingPuts_.length-1;if(this.connected_){this.sendPut_(index);}else{this.log_('Buffering put: '+pathString);}}sendPut_(index){const action=this.outstandingPuts_[index].action;const request=this.outstandingPuts_[index].request;const onComplete=this.outstandingPuts_[index].onComplete;this.outstandingPuts_[index].queued=this.connected_;this.sendRequest(action,request,message=>{this.log_(action+' response',message);delete this.outstandingPuts_[index];this.outstandingPutCount_--;// Clean up array occasionally.
if(this.outstandingPutCount_===0){this.outstandingPuts_=[];}if(onComplete){onComplete(message[/*status*/'s'],message[/* data */'d']);}});}reportStats(stats){// If we're not connected, we just drop the stats.
if(this.connected_){const request={/*counters*/c:stats};this.log_('reportStats',request);this.sendRequest(/*stats*/'s',request,result=>{const status=result[/*status*/'s'];if(status!=='ok'){const errorReason=result[/* data */'d'];this.log_('reportStats','Error sending stats: '+errorReason);}});}}onDataMessage_(message){if('r'in message){// this is a response
this.log_('from server: '+(0,_util.stringify)(message));const reqNum=message['r'];const onResponse=this.requestCBHash_[reqNum];if(onResponse){delete this.requestCBHash_[reqNum];onResponse(message[/*body*/'b']);}}else if('error'in message){throw'A server-side error has occurred: '+message['error'];}else if('a'in message){// a and b are action and body, respectively
this.onDataPush_(message['a'],message['b']);}}onDataPush_(action,body){this.log_('handleServerMessage',action,body);if(action==='d'){this.onDataUpdate_(body[/*path*/'p'],body[/*data*/'d'],/*isMerge*/false,body['t']);}else if(action==='m'){this.onDataUpdate_(body[/*path*/'p'],body[/*data*/'d'],/*isMerge=*/true,body['t']);}else if(action==='c'){this.onListenRevoked_(body[/*path*/'p'],body[/*query*/'q']);}else if(action==='ac'){this.onAuthRevoked_(body[/*status code*/'s'],body[/* explanation */'d']);}else if(action==='apc'){this.onAppCheckRevoked_(body[/*status code*/'s'],body[/* explanation */'d']);}else if(action==='sd'){this.onSecurityDebugPacket_(body);}else{error('Unrecognized action received from server: '+(0,_util.stringify)(action)+'\nAre you using the latest client?');}}onReady_(timestamp,sessionId){this.log_('connection ready');this.connected_=true;this.lastConnectionEstablishedTime_=new Date().getTime();this.handleTimestamp_(timestamp);this.lastSessionId=sessionId;if(this.firstConnection_){this.sendConnectStats_();}this.restoreState_();this.firstConnection_=false;this.onConnectStatus_(true);}scheduleConnect_(timeout){(0,_util.assert)(!this.realtime_,"Scheduling a connect when we're already connected/ing?");if(this.establishConnectionTimer_){clearTimeout(this.establishConnectionTimer_);}// NOTE: Even when timeout is 0, it's important to do a setTimeout to work around an infuriating "Security Error" in
// Firefox when trying to write to our long-polling iframe in some scenarios (e.g. Forge or our unit tests).
this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null;this.establishConnection_();// eslint-disable-next-line @typescript-eslint/no-explicit-any
},Math.floor(timeout));}initConnection_(){if(!this.realtime_&&this.firstConnection_){this.scheduleConnect_(0);}}onVisible_(visible){// NOTE: Tabbing away and back to a window will defeat our reconnect backoff, but I think that's fine.
if(visible&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_){this.log_('Window became visible.  Reducing delay.');this.reconnectDelay_=RECONNECT_MIN_DELAY;if(!this.realtime_){this.scheduleConnect_(0);}}this.visible_=visible;}onOnline_(online){if(online){this.log_('Browser went online.');this.reconnectDelay_=RECONNECT_MIN_DELAY;if(!this.realtime_){this.scheduleConnect_(0);}}else{this.log_('Browser went offline.  Killing connection.');if(this.realtime_){this.realtime_.close();}}}onRealtimeDisconnect_(){this.log_('data client disconnected');this.connected_=false;this.realtime_=null;// Since we don't know if our sent transactions succeeded or not, we need to cancel them.
this.cancelSentTransactions_();// Clear out the pending requests.
this.requestCBHash_={};if(this.shouldReconnect_()){if(!this.visible_){this.log_("Window isn't visible.  Delaying reconnect.");this.reconnectDelay_=this.maxReconnectDelay_;this.lastConnectionAttemptTime_=new Date().getTime();}else if(this.lastConnectionEstablishedTime_){// If we've been connected long enough, reset reconnect delay to minimum.
const timeSinceLastConnectSucceeded=new Date().getTime()-this.lastConnectionEstablishedTime_;if(timeSinceLastConnectSucceeded>RECONNECT_DELAY_RESET_TIMEOUT){this.reconnectDelay_=RECONNECT_MIN_DELAY;}this.lastConnectionEstablishedTime_=null;}const timeSinceLastConnectAttempt=new Date().getTime()-this.lastConnectionAttemptTime_;let reconnectDelay=Math.max(0,this.reconnectDelay_-timeSinceLastConnectAttempt);reconnectDelay=Math.random()*reconnectDelay;this.log_('Trying to reconnect in '+reconnectDelay+'ms');this.scheduleConnect_(reconnectDelay);// Adjust reconnect delay for next time.
this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*RECONNECT_DELAY_MULTIPLIER);}this.onConnectStatus_(false);}async establishConnection_(){if(this.shouldReconnect_()){this.log_('Making a connection attempt');this.lastConnectionAttemptTime_=new Date().getTime();this.lastConnectionEstablishedTime_=null;const onDataMessage=this.onDataMessage_.bind(this);const onReady=this.onReady_.bind(this);const onDisconnect=this.onRealtimeDisconnect_.bind(this);const connId=this.id+':'+PersistentConnection.nextConnectionId_++;const lastSessionId=this.lastSessionId;let canceled=false;let connection=null;const closeFn=function(){if(connection){connection.close();}else{canceled=true;onDisconnect();}};const sendRequestFn=function(msg){(0,_util.assert)(connection,"sendRequest call when we're not connected not allowed.");connection.sendRequest(msg);};this.realtime_={close:closeFn,sendRequest:sendRequestFn};const forceRefresh=this.forceTokenRefresh_;this.forceTokenRefresh_=false;try{// First fetch auth and app check token, and establish connection after
// fetching the token was successful
const[authToken,appCheckToken]=await Promise.all([this.authTokenProvider_.getToken(forceRefresh),this.appCheckTokenProvider_.getToken(forceRefresh)]);if(!canceled){log('getToken() completed. Creating connection.');this.authToken_=authToken&&authToken.accessToken;this.appCheckToken_=appCheckToken&&appCheckToken.token;connection=new Connection(connId,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,onDataMessage,onReady,onDisconnect,/* onKill= */reason=>{warn(reason+' ('+this.repoInfo_.toString()+')');this.interrupt(SERVER_KILL_INTERRUPT_REASON);},lastSessionId);}else{log('getToken() completed but was canceled');}}catch(error){this.log_('Failed to get token: '+error);if(!canceled){if(this.repoInfo_.nodeAdmin){// This may be a critical error for the Admin Node.js SDK, so log a warning.
// But getToken() may also just have temporarily failed, so we still want to
// continue retrying.
warn(error);}closeFn();}}}}interrupt(reason){log('Interrupting connection for reason: '+reason);this.interruptReasons_[reason]=true;if(this.realtime_){this.realtime_.close();}else{if(this.establishConnectionTimer_){clearTimeout(this.establishConnectionTimer_);this.establishConnectionTimer_=null;}if(this.connected_){this.onRealtimeDisconnect_();}}}resume(reason){log('Resuming connection for reason: '+reason);delete this.interruptReasons_[reason];if((0,_util.isEmpty)(this.interruptReasons_)){this.reconnectDelay_=RECONNECT_MIN_DELAY;if(!this.realtime_){this.scheduleConnect_(0);}}}handleTimestamp_(timestamp){const delta=timestamp-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:delta});}cancelSentTransactions_(){for(let i=0;i<this.outstandingPuts_.length;i++){const put=this.outstandingPuts_[i];if(put&&/*hash*/'h'in put.request&&put.queued){if(put.onComplete){put.onComplete('disconnect');}delete this.outstandingPuts_[i];this.outstandingPutCount_--;}}// Clean up array occasionally.
if(this.outstandingPutCount_===0){this.outstandingPuts_=[];}}onListenRevoked_(pathString,query){// Remove the listen and manufacture a "permission_denied" error for the failed listen.
let queryId;if(!query){queryId='default';}else{queryId=query.map(q=>ObjectToUniqueKey(q)).join('$');}const listen=this.removeListen_(pathString,queryId);if(listen&&listen.onComplete){listen.onComplete('permission_denied');}}removeListen_(pathString,queryId){const normalizedPathString=new Path(pathString).toString();// normalize path.
let listen;if(this.listens.has(normalizedPathString)){const map=this.listens.get(normalizedPathString);listen=map.get(queryId);map.delete(queryId);if(map.size===0){this.listens.delete(normalizedPathString);}}else{// all listens for this path has already been removed
listen=undefined;}return listen;}onAuthRevoked_(statusCode,explanation){log('Auth token revoked: '+statusCode+'/'+explanation);this.authToken_=null;this.forceTokenRefresh_=true;this.realtime_.close();if(statusCode==='invalid_token'||statusCode==='permission_denied'){// We'll wait a couple times before logging the warning / increasing the
// retry period since oauth tokens will report as "invalid" if they're
// just expired. Plus there may be transient issues that resolve themselves.
this.invalidAuthTokenCount_++;if(this.invalidAuthTokenCount_>=INVALID_TOKEN_THRESHOLD){// Set a long reconnect delay because recovery is unlikely
this.reconnectDelay_=RECONNECT_MAX_DELAY_FOR_ADMINS;// Notify the auth token provider that the token is invalid, which will log
// a warning
this.authTokenProvider_.notifyForInvalidToken();}}}onAppCheckRevoked_(statusCode,explanation){log('App check token revoked: '+statusCode+'/'+explanation);this.appCheckToken_=null;this.forceTokenRefresh_=true;// Note: We don't close the connection as the developer may not have
// enforcement enabled. The backend closes connections with enforcements.
if(statusCode==='invalid_token'||statusCode==='permission_denied'){// We'll wait a couple times before logging the warning / increasing the
// retry period since oauth tokens will report as "invalid" if they're
// just expired. Plus there may be transient issues that resolve themselves.
this.invalidAppCheckTokenCount_++;if(this.invalidAppCheckTokenCount_>=INVALID_TOKEN_THRESHOLD){this.appCheckTokenProvider_.notifyForInvalidToken();}}}onSecurityDebugPacket_(body){if(this.securityDebugCallback_){this.securityDebugCallback_(body);}else{if('msg'in body){console.log('FIREBASE: '+body['msg'].replace('\n','\nFIREBASE: '));}}}restoreState_(){//Re-authenticate ourselves if we have a credential stored.
this.tryAuth();this.tryAppCheck();// Puts depend on having received the corresponding data update from the server before they complete, so we must
// make sure to send listens before puts.
for(const queries of this.listens.values()){for(const listenSpec of queries.values()){this.sendListen_(listenSpec);}}for(let i=0;i<this.outstandingPuts_.length;i++){if(this.outstandingPuts_[i]){this.sendPut_(i);}}while(this.onDisconnectRequestQueue_.length){const request=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(request.action,request.pathString,request.data,request.onComplete);}for(let i=0;i<this.outstandingGets_.length;i++){if(this.outstandingGets_[i]){this.sendGet_(i);}}}/**
     * Sends client stats for first connection
     */sendConnectStats_(){const stats={};let clientName='js';if((0,_util.isNodeSdk)()){if(this.repoInfo_.nodeAdmin){clientName='admin_node';}else{clientName='node';}}stats['sdk.'+clientName+'.'+SDK_VERSION.replace(/\./g,'-')]=1;if((0,_util.isMobileCordova)()){stats['framework.cordova']=1;}else if((0,_util.isReactNative)()){stats['framework.reactnative']=1;}this.reportStats(stats);}shouldReconnect_(){const online=OnlineMonitor.getInstance().currentlyOnline();return(0,_util.isEmpty)(this.interruptReasons_)&&online;}}PersistentConnection.nextPersistentConnectionId_=0;/**
 * Counter for number of connections created. Mainly used for tagging in the logs
 */PersistentConnection.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NamedNode{constructor(name,node){this.name=name;this.node=node;}static Wrap(name,node){return new NamedNode(name,node);}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Index{/**
     * @returns A standalone comparison function for
     * this index
     */getCompare(){return this.compare.bind(this);}/**
     * Given a before and after value for a node, determine if the indexed value has changed. Even if they are different,
     * it's possible that the changes are isolated to parts of the snapshot that are not indexed.
     *
     *
     * @returns True if the portion of the snapshot being indexed changed between oldNode and newNode
     */indexedValueChanged(oldNode,newNode){const oldWrapped=new NamedNode(MIN_NAME,oldNode);const newWrapped=new NamedNode(MIN_NAME,newNode);return this.compare(oldWrapped,newWrapped)!==0;}/**
     * @returns a node wrapper that will sort equal to or less than
     * any other node wrapper, using this index
     */minPost(){// eslint-disable-next-line @typescript-eslint/no-explicit-any
return NamedNode.MIN;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let __EMPTY_NODE;class KeyIndex extends Index{static get __EMPTY_NODE(){return __EMPTY_NODE;}static set __EMPTY_NODE(val){__EMPTY_NODE=val;}compare(a,b){return nameCompare(a.name,b.name);}isDefinedOn(node){// We could probably return true here (since every node has a key), but it's never called
// so just leaving unimplemented for now.
throw(0,_util.assertionError)('KeyIndex.isDefinedOn not expected to be called.');}indexedValueChanged(oldNode,newNode){return false;// The key for a node never changes.
}minPost(){// eslint-disable-next-line @typescript-eslint/no-explicit-any
return NamedNode.MIN;}maxPost(){// TODO: This should really be created once and cached in a static property, but
// NamedNode isn't defined yet, so I can't use it in a static.  Bleh.
return new NamedNode(MAX_NAME,__EMPTY_NODE);}makePost(indexValue,name){(0,_util.assert)(typeof indexValue==='string','KeyIndex indexValue must always be a string.');// We just use empty node, but it'll never be compared, since our comparator only looks at name.
return new NamedNode(indexValue,__EMPTY_NODE);}/**
     * @returns String representation for inclusion in a query spec
     */toString(){return'.key';}}const KEY_INDEX=new KeyIndex();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An iterator over an LLRBNode.
 */class SortedMapIterator{/**
     * @param node - Node to iterate.
     * @param isReverse_ - Whether or not to iterate in reverse
     */constructor(node,startKey,comparator,isReverse_,resultGenerator_=null){this.isReverse_=isReverse_;this.resultGenerator_=resultGenerator_;this.nodeStack_=[];let cmp=1;while(!node.isEmpty()){node=node;cmp=startKey?comparator(node.key,startKey):1;// flip the comparison if we're going in reverse
if(isReverse_){cmp*=-1;}if(cmp<0){// This node is less than our start key. ignore it
if(this.isReverse_){node=node.left;}else{node=node.right;}}else if(cmp===0){// This node is exactly equal to our start key. Push it on the stack, but stop iterating;
this.nodeStack_.push(node);break;}else{// This node is greater than our start key, add it to the stack and move to the next one
this.nodeStack_.push(node);if(this.isReverse_){node=node.right;}else{node=node.left;}}}}getNext(){if(this.nodeStack_.length===0){return null;}let node=this.nodeStack_.pop();let result;if(this.resultGenerator_){result=this.resultGenerator_(node.key,node.value);}else{result={key:node.key,value:node.value};}if(this.isReverse_){node=node.left;while(!node.isEmpty()){this.nodeStack_.push(node);node=node.right;}}else{node=node.right;while(!node.isEmpty()){this.nodeStack_.push(node);node=node.left;}}return result;}hasNext(){return this.nodeStack_.length>0;}peek(){if(this.nodeStack_.length===0){return null;}const node=this.nodeStack_[this.nodeStack_.length-1];if(this.resultGenerator_){return this.resultGenerator_(node.key,node.value);}else{return{key:node.key,value:node.value};}}}/**
 * Represents a node in a Left-leaning Red-Black tree.
 */class LLRBNode{/**
     * @param key - Key associated with this node.
     * @param value - Value associated with this node.
     * @param color - Whether this node is red.
     * @param left - Left child.
     * @param right - Right child.
     */constructor(key,value,color,left,right){this.key=key;this.value=value;this.color=color!=null?color:LLRBNode.RED;this.left=left!=null?left:SortedMap.EMPTY_NODE;this.right=right!=null?right:SortedMap.EMPTY_NODE;}/**
     * Returns a copy of the current node, optionally replacing pieces of it.
     *
     * @param key - New key for the node, or null.
     * @param value - New value for the node, or null.
     * @param color - New color for the node, or null.
     * @param left - New left child for the node, or null.
     * @param right - New right child for the node, or null.
     * @returns The node copy.
     */copy(key,value,color,left,right){return new LLRBNode(key!=null?key:this.key,value!=null?value:this.value,color!=null?color:this.color,left!=null?left:this.left,right!=null?right:this.right);}/**
     * @returns The total number of nodes in the tree.
     */count(){return this.left.count()+1+this.right.count();}/**
     * @returns True if the tree is empty.
     */isEmpty(){return false;}/**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     *   node.  If it returns true, traversal is aborted.
     * @returns The first truthy value returned by action, or the last falsey
     *   value returned by action
     */inorderTraversal(action){return this.left.inorderTraversal(action)||!!action(this.key,this.value)||this.right.inorderTraversal(action);}/**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */reverseTraversal(action){return this.right.reverseTraversal(action)||action(this.key,this.value)||this.left.reverseTraversal(action);}/**
     * @returns The minimum node in the tree.
     */min_(){if(this.left.isEmpty()){return this;}else{return this.left.min_();}}/**
     * @returns The maximum key in the tree.
     */minKey(){return this.min_().key;}/**
     * @returns The maximum key in the tree.
     */maxKey(){if(this.right.isEmpty()){return this.key;}else{return this.right.maxKey();}}/**
     * @param key - Key to insert.
     * @param value - Value to insert.
     * @param comparator - Comparator.
     * @returns New tree, with the key/value added.
     */insert(key,value,comparator){let n=this;const cmp=comparator(key,n.key);if(cmp<0){n=n.copy(null,null,null,n.left.insert(key,value,comparator),null);}else if(cmp===0){n=n.copy(null,value,null,null,null);}else{n=n.copy(null,null,null,null,n.right.insert(key,value,comparator));}return n.fixUp_();}/**
     * @returns New tree, with the minimum key removed.
     */removeMin_(){if(this.left.isEmpty()){return SortedMap.EMPTY_NODE;}let n=this;if(!n.left.isRed_()&&!n.left.left.isRed_()){n=n.moveRedLeft_();}n=n.copy(null,null,null,n.left.removeMin_(),null);return n.fixUp_();}/**
     * @param key - The key of the item to remove.
     * @param comparator - Comparator.
     * @returns New tree, with the specified item removed.
     */remove(key,comparator){let n,smallest;n=this;if(comparator(key,n.key)<0){if(!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()){n=n.moveRedLeft_();}n=n.copy(null,null,null,n.left.remove(key,comparator),null);}else{if(n.left.isRed_()){n=n.rotateRight_();}if(!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()){n=n.moveRedRight_();}if(comparator(key,n.key)===0){if(n.right.isEmpty()){return SortedMap.EMPTY_NODE;}else{smallest=n.right.min_();n=n.copy(smallest.key,smallest.value,null,null,n.right.removeMin_());}}n=n.copy(null,null,null,null,n.right.remove(key,comparator));}return n.fixUp_();}/**
     * @returns Whether this is a RED node.
     */isRed_(){return this.color;}/**
     * @returns New tree after performing any needed rotations.
     */fixUp_(){let n=this;if(n.right.isRed_()&&!n.left.isRed_()){n=n.rotateLeft_();}if(n.left.isRed_()&&n.left.left.isRed_()){n=n.rotateRight_();}if(n.left.isRed_()&&n.right.isRed_()){n=n.colorFlip_();}return n;}/**
     * @returns New tree, after moveRedLeft.
     */moveRedLeft_(){let n=this.colorFlip_();if(n.right.left.isRed_()){n=n.copy(null,null,null,null,n.right.rotateRight_());n=n.rotateLeft_();n=n.colorFlip_();}return n;}/**
     * @returns New tree, after moveRedRight.
     */moveRedRight_(){let n=this.colorFlip_();if(n.left.left.isRed_()){n=n.rotateRight_();n=n.colorFlip_();}return n;}/**
     * @returns New tree, after rotateLeft.
     */rotateLeft_(){const nl=this.copy(null,null,LLRBNode.RED,null,this.right.left);return this.right.copy(null,null,this.color,nl,null);}/**
     * @returns New tree, after rotateRight.
     */rotateRight_(){const nr=this.copy(null,null,LLRBNode.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,nr);}/**
     * @returns Newt ree, after colorFlip.
     */colorFlip_(){const left=this.left.copy(null,null,!this.left.color,null,null);const right=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,left,right);}/**
     * For testing.
     *
     * @returns True if all is well.
     */checkMaxDepth_(){const blackDepth=this.check_();return Math.pow(2.0,blackDepth)<=this.count()+1;}check_(){if(this.isRed_()&&this.left.isRed_()){throw new Error('Red node has red child('+this.key+','+this.value+')');}if(this.right.isRed_()){throw new Error('Right child of ('+this.key+','+this.value+') is red');}const blackDepth=this.left.check_();if(blackDepth!==this.right.check_()){throw new Error('Black depths differ');}else{return blackDepth+(this.isRed_()?0:1);}}}LLRBNode.RED=true;LLRBNode.BLACK=false;/**
 * Represents an empty node (a leaf node in the Red-Black Tree).
 */class LLRBEmptyNode{/**
     * Returns a copy of the current node.
     *
     * @returns The node copy.
     */copy(key,value,color,left,right){return this;}/**
     * Returns a copy of the tree, with the specified key/value added.
     *
     * @param key - Key to be added.
     * @param value - Value to be added.
     * @param comparator - Comparator.
     * @returns New tree, with item added.
     */insert(key,value,comparator){return new LLRBNode(key,value,null);}/**
     * Returns a copy of the tree, with the specified key removed.
     *
     * @param key - The key to remove.
     * @param comparator - Comparator.
     * @returns New tree, with item removed.
     */remove(key,comparator){return this;}/**
     * @returns The total number of nodes in the tree.
     */count(){return 0;}/**
     * @returns True if the tree is empty.
     */isEmpty(){return true;}/**
     * Traverses the tree in key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */inorderTraversal(action){return false;}/**
     * Traverses the tree in reverse key order and calls the specified action function
     * for each node.
     *
     * @param action - Callback function to be called for each
     * node.  If it returns true, traversal is aborted.
     * @returns True if traversal was aborted.
     */reverseTraversal(action){return false;}minKey(){return null;}maxKey(){return null;}check_(){return 0;}/**
     * @returns Whether this node is red.
     */isRed_(){return false;}}/**
 * An immutable sorted map implementation, based on a Left-leaning Red-Black
 * tree.
 */class SortedMap{/**
     * @param comparator_ - Key comparator.
     * @param root_ - Optional root node for the map.
     */constructor(comparator_,root_=SortedMap.EMPTY_NODE){this.comparator_=comparator_;this.root_=root_;}/**
     * Returns a copy of the map, with the specified key/value added or replaced.
     * (TODO: We should perhaps rename this method to 'put')
     *
     * @param key - Key to be added.
     * @param value - Value to be added.
     * @returns New map, with item added.
     */insert(key,value){return new SortedMap(this.comparator_,this.root_.insert(key,value,this.comparator_).copy(null,null,LLRBNode.BLACK,null,null));}/**
     * Returns a copy of the map, with the specified key removed.
     *
     * @param key - The key to remove.
     * @returns New map, with item removed.
     */remove(key){return new SortedMap(this.comparator_,this.root_.remove(key,this.comparator_).copy(null,null,LLRBNode.BLACK,null,null));}/**
     * Returns the value of the node with the given key, or null.
     *
     * @param key - The key to look up.
     * @returns The value of the node with the given key, or null if the
     * key doesn't exist.
     */get(key){let cmp;let node=this.root_;while(!node.isEmpty()){cmp=this.comparator_(key,node.key);if(cmp===0){return node.value;}else if(cmp<0){node=node.left;}else if(cmp>0){node=node.right;}}return null;}/**
     * Returns the key of the item *before* the specified key, or null if key is the first item.
     * @param key - The key to find the predecessor of
     * @returns The predecessor key.
     */getPredecessorKey(key){let cmp,node=this.root_,rightParent=null;while(!node.isEmpty()){cmp=this.comparator_(key,node.key);if(cmp===0){if(!node.left.isEmpty()){node=node.left;while(!node.right.isEmpty()){node=node.right;}return node.key;}else if(rightParent){return rightParent.key;}else{return null;// first item.
}}else if(cmp<0){node=node.left;}else if(cmp>0){rightParent=node;node=node.right;}}throw new Error('Attempted to find predecessor key for a nonexistent key.  What gives?');}/**
     * @returns True if the map is empty.
     */isEmpty(){return this.root_.isEmpty();}/**
     * @returns The total number of nodes in the map.
     */count(){return this.root_.count();}/**
     * @returns The minimum key in the map.
     */minKey(){return this.root_.minKey();}/**
     * @returns The maximum key in the map.
     */maxKey(){return this.root_.maxKey();}/**
     * Traverses the map in key order and calls the specified action function
     * for each key/value pair.
     *
     * @param action - Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @returns The first truthy value returned by action, or the last falsey
     *   value returned by action
     */inorderTraversal(action){return this.root_.inorderTraversal(action);}/**
     * Traverses the map in reverse key order and calls the specified action function
     * for each key/value pair.
     *
     * @param action - Callback function to be called
     * for each key/value pair.  If action returns true, traversal is aborted.
     * @returns True if the traversal was aborted.
     */reverseTraversal(action){return this.root_.reverseTraversal(action);}/**
     * Returns an iterator over the SortedMap.
     * @returns The iterator.
     */getIterator(resultGenerator){return new SortedMapIterator(this.root_,null,this.comparator_,false,resultGenerator);}getIteratorFrom(key,resultGenerator){return new SortedMapIterator(this.root_,key,this.comparator_,false,resultGenerator);}getReverseIteratorFrom(key,resultGenerator){return new SortedMapIterator(this.root_,key,this.comparator_,true,resultGenerator);}getReverseIterator(resultGenerator){return new SortedMapIterator(this.root_,null,this.comparator_,true,resultGenerator);}}/**
 * Always use the same empty node, to reduce memory.
 */SortedMap.EMPTY_NODE=new LLRBEmptyNode();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NAME_ONLY_COMPARATOR(left,right){return nameCompare(left.name,right.name);}function NAME_COMPARATOR(left,right){return nameCompare(left,right);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let MAX_NODE$2;function setMaxNode$1(val){MAX_NODE$2=val;}const priorityHashText=function(priority){if(typeof priority==='number'){return'number:'+doubleToIEEE754String(priority);}else{return'string:'+priority;}};/**
 * Validates that a priority snapshot Node is valid.
 */const validatePriorityNode=function(priorityNode){if(priorityNode.isLeafNode()){const val=priorityNode.val();(0,_util.assert)(typeof val==='string'||typeof val==='number'||typeof val==='object'&&(0,_util.contains)(val,'.sv'),'Priority must be a string or number.');}else{(0,_util.assert)(priorityNode===MAX_NODE$2||priorityNode.isEmpty(),'priority of unexpected type.');}// Don't call getPriority() on MAX_NODE to avoid hitting assertion.
(0,_util.assert)(priorityNode===MAX_NODE$2||priorityNode.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.");};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let __childrenNodeConstructor;/**
 * LeafNode is a class for storing leaf nodes in a DataSnapshot.  It
 * implements Node and stores the value of the node (a string,
 * number, or boolean) accessible via getValue().
 */class LeafNode{/**
     * @param value_ - The value to store in this leaf node. The object type is
     * possible in the event of a deferred value
     * @param priorityNode_ - The priority of this node.
     */constructor(value_,priorityNode_=LeafNode.__childrenNodeConstructor.EMPTY_NODE){this.value_=value_;this.priorityNode_=priorityNode_;this.lazyHash_=null;(0,_util.assert)(this.value_!==undefined&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value.");validatePriorityNode(this.priorityNode_);}static set __childrenNodeConstructor(val){__childrenNodeConstructor=val;}static get __childrenNodeConstructor(){return __childrenNodeConstructor;}/** @inheritDoc */isLeafNode(){return true;}/** @inheritDoc */getPriority(){return this.priorityNode_;}/** @inheritDoc */updatePriority(newPriorityNode){return new LeafNode(this.value_,newPriorityNode);}/** @inheritDoc */getImmediateChild(childName){// Hack to treat priority as a regular child
if(childName==='.priority'){return this.priorityNode_;}else{return LeafNode.__childrenNodeConstructor.EMPTY_NODE;}}/** @inheritDoc */getChild(path){if(pathIsEmpty(path)){return this;}else if(pathGetFront(path)==='.priority'){return this.priorityNode_;}else{return LeafNode.__childrenNodeConstructor.EMPTY_NODE;}}hasChild(){return false;}/** @inheritDoc */getPredecessorChildName(childName,childNode){return null;}/** @inheritDoc */updateImmediateChild(childName,newChildNode){if(childName==='.priority'){return this.updatePriority(newChildNode);}else if(newChildNode.isEmpty()&&childName!=='.priority'){return this;}else{return LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(childName,newChildNode).updatePriority(this.priorityNode_);}}/** @inheritDoc */updateChild(path,newChildNode){const front=pathGetFront(path);if(front===null){return newChildNode;}else if(newChildNode.isEmpty()&&front!=='.priority'){return this;}else{(0,_util.assert)(front!=='.priority'||pathGetLength(path)===1,'.priority must be the last token in a path');return this.updateImmediateChild(front,LeafNode.__childrenNodeConstructor.EMPTY_NODE.updateChild(pathPopFront(path),newChildNode));}}/** @inheritDoc */isEmpty(){return false;}/** @inheritDoc */numChildren(){return 0;}/** @inheritDoc */forEachChild(index,action){return false;}val(exportFormat){if(exportFormat&&!this.getPriority().isEmpty()){return{'.value':this.getValue(),'.priority':this.getPriority().val()};}else{return this.getValue();}}/** @inheritDoc */hash(){if(this.lazyHash_===null){let toHash='';if(!this.priorityNode_.isEmpty()){toHash+='priority:'+priorityHashText(this.priorityNode_.val())+':';}const type=typeof this.value_;toHash+=type+':';if(type==='number'){toHash+=doubleToIEEE754String(this.value_);}else{toHash+=this.value_;}this.lazyHash_=sha1(toHash);}return this.lazyHash_;}/**
     * Returns the value of the leaf node.
     * @returns The value of the node.
     */getValue(){return this.value_;}compareTo(other){if(other===LeafNode.__childrenNodeConstructor.EMPTY_NODE){return 1;}else if(other instanceof LeafNode.__childrenNodeConstructor){return-1;}else{(0,_util.assert)(other.isLeafNode(),'Unknown node type');return this.compareToLeafNode_(other);}}/**
     * Comparison specifically for two leaf nodes
     */compareToLeafNode_(otherLeaf){const otherLeafType=typeof otherLeaf.value_;const thisLeafType=typeof this.value_;const otherIndex=LeafNode.VALUE_TYPE_ORDER.indexOf(otherLeafType);const thisIndex=LeafNode.VALUE_TYPE_ORDER.indexOf(thisLeafType);(0,_util.assert)(otherIndex>=0,'Unknown leaf type: '+otherLeafType);(0,_util.assert)(thisIndex>=0,'Unknown leaf type: '+thisLeafType);if(otherIndex===thisIndex){// Same type, compare values
if(thisLeafType==='object'){// Deferred value nodes are all equal, but we should also never get to this point...
return 0;}else{// Note that this works because true > false, all others are number or string comparisons
if(this.value_<otherLeaf.value_){return-1;}else if(this.value_===otherLeaf.value_){return 0;}else{return 1;}}}else{return thisIndex-otherIndex;}}withIndex(){return this;}isIndexed(){return true;}equals(other){if(other===this){return true;}else if(other.isLeafNode()){const otherLeaf=other;return this.value_===otherLeaf.value_&&this.priorityNode_.equals(otherLeaf.priorityNode_);}else{return false;}}}/**
 * The sort order for comparing leaf nodes of different types. If two leaf nodes have
 * the same type, the comparison falls back to their value
 */LeafNode.VALUE_TYPE_ORDER=['object','boolean','number','string'];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nodeFromJSON$1;let MAX_NODE$1;function setNodeFromJSON(val){nodeFromJSON$1=val;}function setMaxNode(val){MAX_NODE$1=val;}class PriorityIndex extends Index{compare(a,b){const aPriority=a.node.getPriority();const bPriority=b.node.getPriority();const indexCmp=aPriority.compareTo(bPriority);if(indexCmp===0){return nameCompare(a.name,b.name);}else{return indexCmp;}}isDefinedOn(node){return!node.getPriority().isEmpty();}indexedValueChanged(oldNode,newNode){return!oldNode.getPriority().equals(newNode.getPriority());}minPost(){// eslint-disable-next-line @typescript-eslint/no-explicit-any
return NamedNode.MIN;}maxPost(){return new NamedNode(MAX_NAME,new LeafNode('[PRIORITY-POST]',MAX_NODE$1));}makePost(indexValue,name){const priorityNode=nodeFromJSON$1(indexValue);return new NamedNode(name,new LeafNode('[PRIORITY-POST]',priorityNode));}/**
     * @returns String representation for inclusion in a query spec
     */toString(){return'.priority';}}const PRIORITY_INDEX=new PriorityIndex();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LOG_2=Math.log(2);class Base12Num{constructor(length){const logBase2=num=>// eslint-disable-next-line @typescript-eslint/no-explicit-any
parseInt(Math.log(num)/LOG_2,10);const bitMask=bits=>parseInt(Array(bits+1).join('1'),2);this.count=logBase2(length+1);this.current_=this.count-1;const mask=bitMask(this.count);this.bits_=length+1&mask;}nextBitIsOne(){//noinspection JSBitwiseOperatorUsage
const result=!(this.bits_&0x1<<this.current_);this.current_--;return result;}}/**
 * Takes a list of child nodes and constructs a SortedSet using the given comparison
 * function
 *
 * Uses the algorithm described in the paper linked here:
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.46.1458
 *
 * @param childList - Unsorted list of children
 * @param cmp - The comparison method to be used
 * @param keyFn - An optional function to extract K from a node wrapper, if K's
 * type is not NamedNode
 * @param mapSortFn - An optional override for comparator used by the generated sorted map
 */const buildChildSet=function(childList,cmp,keyFn,mapSortFn){childList.sort(cmp);const buildBalancedTree=function(low,high){const length=high-low;let namedNode;let key;if(length===0){return null;}else if(length===1){namedNode=childList[low];key=keyFn?keyFn(namedNode):namedNode;return new LLRBNode(key,namedNode.node,LLRBNode.BLACK,null,null);}else{// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middle=parseInt(length/2,10)+low;const left=buildBalancedTree(low,middle);const right=buildBalancedTree(middle+1,high);namedNode=childList[middle];key=keyFn?keyFn(namedNode):namedNode;return new LLRBNode(key,namedNode.node,LLRBNode.BLACK,left,right);}};const buildFrom12Array=function(base12){let node=null;let root=null;let index=childList.length;const buildPennant=function(chunkSize,color){const low=index-chunkSize;const high=index;index-=chunkSize;const childTree=buildBalancedTree(low+1,high);const namedNode=childList[low];const key=keyFn?keyFn(namedNode):namedNode;attachPennant(new LLRBNode(key,namedNode.node,color,null,childTree));};const attachPennant=function(pennant){if(node){node.left=pennant;node=pennant;}else{root=pennant;node=pennant;}};for(let i=0;i<base12.count;++i){const isOne=base12.nextBitIsOne();// The number of nodes taken in each slice is 2^(arr.length - (i + 1))
const chunkSize=Math.pow(2,base12.count-(i+1));if(isOne){buildPennant(chunkSize,LLRBNode.BLACK);}else{// current == 2
buildPennant(chunkSize,LLRBNode.BLACK);buildPennant(chunkSize,LLRBNode.RED);}}return root;};const base12=new Base12Num(childList.length);const root=buildFrom12Array(base12);// eslint-disable-next-line @typescript-eslint/no-explicit-any
return new SortedMap(mapSortFn||cmp,root);};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _defaultIndexMap;const fallbackObject={};class IndexMap{constructor(indexes_,indexSet_){this.indexes_=indexes_;this.indexSet_=indexSet_;}/**
     * The default IndexMap for nodes without a priority
     */static get Default(){(0,_util.assert)(fallbackObject&&PRIORITY_INDEX,'ChildrenNode.ts has not been loaded');_defaultIndexMap=_defaultIndexMap||new IndexMap({'.priority':fallbackObject},{'.priority':PRIORITY_INDEX});return _defaultIndexMap;}get(indexKey){const sortedMap=(0,_util.safeGet)(this.indexes_,indexKey);if(!sortedMap){throw new Error('No index defined for '+indexKey);}if(sortedMap instanceof SortedMap){return sortedMap;}else{// The index exists, but it falls back to just name comparison. Return null so that the calling code uses the
// regular child map
return null;}}hasIndex(indexDefinition){return(0,_util.contains)(this.indexSet_,indexDefinition.toString());}addIndex(indexDefinition,existingChildren){(0,_util.assert)(indexDefinition!==KEY_INDEX,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const childList=[];let sawIndexedValue=false;const iter=existingChildren.getIterator(NamedNode.Wrap);let next=iter.getNext();while(next){sawIndexedValue=sawIndexedValue||indexDefinition.isDefinedOn(next.node);childList.push(next);next=iter.getNext();}let newIndex;if(sawIndexedValue){newIndex=buildChildSet(childList,indexDefinition.getCompare());}else{newIndex=fallbackObject;}const indexName=indexDefinition.toString();const newIndexSet=Object.assign({},this.indexSet_);newIndexSet[indexName]=indexDefinition;const newIndexes=Object.assign({},this.indexes_);newIndexes[indexName]=newIndex;return new IndexMap(newIndexes,newIndexSet);}/**
     * Ensure that this node is properly tracked in any indexes that we're maintaining
     */addToIndexes(namedNode,existingChildren){const newIndexes=(0,_util.map)(this.indexes_,(indexedChildren,indexName)=>{const index=(0,_util.safeGet)(this.indexSet_,indexName);(0,_util.assert)(index,'Missing index implementation for '+indexName);if(indexedChildren===fallbackObject){// Check to see if we need to index everything
if(index.isDefinedOn(namedNode.node)){// We need to build this index
const childList=[];const iter=existingChildren.getIterator(NamedNode.Wrap);let next=iter.getNext();while(next){if(next.name!==namedNode.name){childList.push(next);}next=iter.getNext();}childList.push(namedNode);return buildChildSet(childList,index.getCompare());}else{// No change, this remains a fallback
return fallbackObject;}}else{const existingSnap=existingChildren.get(namedNode.name);let newChildren=indexedChildren;if(existingSnap){newChildren=newChildren.remove(new NamedNode(namedNode.name,existingSnap));}return newChildren.insert(namedNode,namedNode.node);}});return new IndexMap(newIndexes,this.indexSet_);}/**
     * Create a new IndexMap instance with the given value removed
     */removeFromIndexes(namedNode,existingChildren){const newIndexes=(0,_util.map)(this.indexes_,indexedChildren=>{if(indexedChildren===fallbackObject){// This is the fallback. Just return it, nothing to do in this case
return indexedChildren;}else{const existingSnap=existingChildren.get(namedNode.name);if(existingSnap){return indexedChildren.remove(new NamedNode(namedNode.name,existingSnap));}else{// No record of this child
return indexedChildren;}}});return new IndexMap(newIndexes,this.indexSet_);}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // TODO: For memory savings, don't store priorityNode_ if it's empty.
let EMPTY_NODE;/**
 * ChildrenNode is a class for storing internal nodes in a DataSnapshot
 * (i.e. nodes with children).  It implements Node and stores the
 * list of children in the children property, sorted by child name.
 */class ChildrenNode{/**
     * @param children_ - List of children of this node..
     * @param priorityNode_ - The priority of this node (as a snapshot node).
     */constructor(children_,priorityNode_,indexMap_){this.children_=children_;this.priorityNode_=priorityNode_;this.indexMap_=indexMap_;this.lazyHash_=null;/**
         * Note: The only reason we allow null priority is for EMPTY_NODE, since we can't use
         * EMPTY_NODE as the priority of EMPTY_NODE.  We might want to consider making EMPTY_NODE its own
         * class instead of an empty ChildrenNode.
         */if(this.priorityNode_){validatePriorityNode(this.priorityNode_);}if(this.children_.isEmpty()){(0,_util.assert)(!this.priorityNode_||this.priorityNode_.isEmpty(),'An empty node cannot have a priority');}}static get EMPTY_NODE(){return EMPTY_NODE||(EMPTY_NODE=new ChildrenNode(new SortedMap(NAME_COMPARATOR),null,IndexMap.Default));}/** @inheritDoc */isLeafNode(){return false;}/** @inheritDoc */getPriority(){return this.priorityNode_||EMPTY_NODE;}/** @inheritDoc */updatePriority(newPriorityNode){if(this.children_.isEmpty()){// Don't allow priorities on empty nodes
return this;}else{return new ChildrenNode(this.children_,newPriorityNode,this.indexMap_);}}/** @inheritDoc */getImmediateChild(childName){// Hack to treat priority as a regular child
if(childName==='.priority'){return this.getPriority();}else{const child=this.children_.get(childName);return child===null?EMPTY_NODE:child;}}/** @inheritDoc */getChild(path){const front=pathGetFront(path);if(front===null){return this;}return this.getImmediateChild(front).getChild(pathPopFront(path));}/** @inheritDoc */hasChild(childName){return this.children_.get(childName)!==null;}/** @inheritDoc */updateImmediateChild(childName,newChildNode){(0,_util.assert)(newChildNode,'We should always be passing snapshot nodes');if(childName==='.priority'){return this.updatePriority(newChildNode);}else{const namedNode=new NamedNode(childName,newChildNode);let newChildren,newIndexMap;if(newChildNode.isEmpty()){newChildren=this.children_.remove(childName);newIndexMap=this.indexMap_.removeFromIndexes(namedNode,this.children_);}else{newChildren=this.children_.insert(childName,newChildNode);newIndexMap=this.indexMap_.addToIndexes(namedNode,this.children_);}const newPriority=newChildren.isEmpty()?EMPTY_NODE:this.priorityNode_;return new ChildrenNode(newChildren,newPriority,newIndexMap);}}/** @inheritDoc */updateChild(path,newChildNode){const front=pathGetFront(path);if(front===null){return newChildNode;}else{(0,_util.assert)(pathGetFront(path)!=='.priority'||pathGetLength(path)===1,'.priority must be the last token in a path');const newImmediateChild=this.getImmediateChild(front).updateChild(pathPopFront(path),newChildNode);return this.updateImmediateChild(front,newImmediateChild);}}/** @inheritDoc */isEmpty(){return this.children_.isEmpty();}/** @inheritDoc */numChildren(){return this.children_.count();}/** @inheritDoc */val(exportFormat){if(this.isEmpty()){return null;}const obj={};let numKeys=0,maxKey=0,allIntegerKeys=true;this.forEachChild(PRIORITY_INDEX,(key,childNode)=>{obj[key]=childNode.val(exportFormat);numKeys++;if(allIntegerKeys&&ChildrenNode.INTEGER_REGEXP_.test(key)){maxKey=Math.max(maxKey,Number(key));}else{allIntegerKeys=false;}});if(!exportFormat&&allIntegerKeys&&maxKey<2*numKeys){// convert to array.
const array=[];// eslint-disable-next-line guard-for-in
for(const key in obj){array[key]=obj[key];}return array;}else{if(exportFormat&&!this.getPriority().isEmpty()){obj['.priority']=this.getPriority().val();}return obj;}}/** @inheritDoc */hash(){if(this.lazyHash_===null){let toHash='';if(!this.getPriority().isEmpty()){toHash+='priority:'+priorityHashText(this.getPriority().val())+':';}this.forEachChild(PRIORITY_INDEX,(key,childNode)=>{const childHash=childNode.hash();if(childHash!==''){toHash+=':'+key+':'+childHash;}});this.lazyHash_=toHash===''?'':sha1(toHash);}return this.lazyHash_;}/** @inheritDoc */getPredecessorChildName(childName,childNode,index){const idx=this.resolveIndex_(index);if(idx){const predecessor=idx.getPredecessorKey(new NamedNode(childName,childNode));return predecessor?predecessor.name:null;}else{return this.children_.getPredecessorKey(childName);}}getFirstChildName(indexDefinition){const idx=this.resolveIndex_(indexDefinition);if(idx){const minKey=idx.minKey();return minKey&&minKey.name;}else{return this.children_.minKey();}}getFirstChild(indexDefinition){const minKey=this.getFirstChildName(indexDefinition);if(minKey){return new NamedNode(minKey,this.children_.get(minKey));}else{return null;}}/**
     * Given an index, return the key name of the largest value we have, according to that index
     */getLastChildName(indexDefinition){const idx=this.resolveIndex_(indexDefinition);if(idx){const maxKey=idx.maxKey();return maxKey&&maxKey.name;}else{return this.children_.maxKey();}}getLastChild(indexDefinition){const maxKey=this.getLastChildName(indexDefinition);if(maxKey){return new NamedNode(maxKey,this.children_.get(maxKey));}else{return null;}}forEachChild(index,action){const idx=this.resolveIndex_(index);if(idx){return idx.inorderTraversal(wrappedNode=>{return action(wrappedNode.name,wrappedNode.node);});}else{return this.children_.inorderTraversal(action);}}getIterator(indexDefinition){return this.getIteratorFrom(indexDefinition.minPost(),indexDefinition);}getIteratorFrom(startPost,indexDefinition){const idx=this.resolveIndex_(indexDefinition);if(idx){return idx.getIteratorFrom(startPost,key=>key);}else{const iterator=this.children_.getIteratorFrom(startPost.name,NamedNode.Wrap);let next=iterator.peek();while(next!=null&&indexDefinition.compare(next,startPost)<0){iterator.getNext();next=iterator.peek();}return iterator;}}getReverseIterator(indexDefinition){return this.getReverseIteratorFrom(indexDefinition.maxPost(),indexDefinition);}getReverseIteratorFrom(endPost,indexDefinition){const idx=this.resolveIndex_(indexDefinition);if(idx){return idx.getReverseIteratorFrom(endPost,key=>{return key;});}else{const iterator=this.children_.getReverseIteratorFrom(endPost.name,NamedNode.Wrap);let next=iterator.peek();while(next!=null&&indexDefinition.compare(next,endPost)>0){iterator.getNext();next=iterator.peek();}return iterator;}}compareTo(other){if(this.isEmpty()){if(other.isEmpty()){return 0;}else{return-1;}}else if(other.isLeafNode()||other.isEmpty()){return 1;}else if(other===MAX_NODE){return-1;}else{// Must be another node with children.
return 0;}}withIndex(indexDefinition){if(indexDefinition===KEY_INDEX||this.indexMap_.hasIndex(indexDefinition)){return this;}else{const newIndexMap=this.indexMap_.addIndex(indexDefinition,this.children_);return new ChildrenNode(this.children_,this.priorityNode_,newIndexMap);}}isIndexed(index){return index===KEY_INDEX||this.indexMap_.hasIndex(index);}equals(other){if(other===this){return true;}else if(other.isLeafNode()){return false;}else{const otherChildrenNode=other;if(!this.getPriority().equals(otherChildrenNode.getPriority())){return false;}else if(this.children_.count()===otherChildrenNode.children_.count()){const thisIter=this.getIterator(PRIORITY_INDEX);const otherIter=otherChildrenNode.getIterator(PRIORITY_INDEX);let thisCurrent=thisIter.getNext();let otherCurrent=otherIter.getNext();while(thisCurrent&&otherCurrent){if(thisCurrent.name!==otherCurrent.name||!thisCurrent.node.equals(otherCurrent.node)){return false;}thisCurrent=thisIter.getNext();otherCurrent=otherIter.getNext();}return thisCurrent===null&&otherCurrent===null;}else{return false;}}}/**
     * Returns a SortedMap ordered by index, or null if the default (by-key) ordering can be used
     * instead.
     *
     */resolveIndex_(indexDefinition){if(indexDefinition===KEY_INDEX){return null;}else{return this.indexMap_.get(indexDefinition.toString());}}}ChildrenNode.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class MaxNode extends ChildrenNode{constructor(){super(new SortedMap(NAME_COMPARATOR),ChildrenNode.EMPTY_NODE,IndexMap.Default);}compareTo(other){if(other===this){return 0;}else{return 1;}}equals(other){// Not that we every compare it, but MAX_NODE is only ever equal to itself
return other===this;}getPriority(){return this;}getImmediateChild(childName){return ChildrenNode.EMPTY_NODE;}isEmpty(){return false;}}/**
 * Marker that will sort higher than any other snapshot.
 */const MAX_NODE=new MaxNode();Object.defineProperties(NamedNode,{MIN:{value:new NamedNode(MIN_NAME,ChildrenNode.EMPTY_NODE)},MAX:{value:new NamedNode(MAX_NAME,MAX_NODE)}});/**
 * Reference Extensions
 */KeyIndex.__EMPTY_NODE=ChildrenNode.EMPTY_NODE;LeafNode.__childrenNodeConstructor=ChildrenNode;setMaxNode$1(MAX_NODE);setMaxNode(MAX_NODE);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const USE_HINZE=true;/**
 * Constructs a snapshot node representing the passed JSON and returns it.
 * @param json - JSON to create a node for.
 * @param priority - Optional priority to use.  This will be ignored if the
 * passed JSON contains a .priority property.
 */function nodeFromJSON(json,priority=null){if(json===null){return ChildrenNode.EMPTY_NODE;}if(typeof json==='object'&&'.priority'in json){priority=json['.priority'];}(0,_util.assert)(priority===null||typeof priority==='string'||typeof priority==='number'||typeof priority==='object'&&'.sv'in priority,'Invalid priority type found: '+typeof priority);if(typeof json==='object'&&'.value'in json&&json['.value']!==null){json=json['.value'];}// Valid leaf nodes include non-objects or server-value wrapper objects
if(typeof json!=='object'||'.sv'in json){const jsonLeaf=json;return new LeafNode(jsonLeaf,nodeFromJSON(priority));}if(!(json instanceof Array)&&USE_HINZE){const children=[];let childrenHavePriority=false;const hinzeJsonObj=json;each(hinzeJsonObj,(key,child)=>{if(key.substring(0,1)!=='.'){// Ignore metadata nodes
const childNode=nodeFromJSON(child);if(!childNode.isEmpty()){childrenHavePriority=childrenHavePriority||!childNode.getPriority().isEmpty();children.push(new NamedNode(key,childNode));}}});if(children.length===0){return ChildrenNode.EMPTY_NODE;}const childSet=buildChildSet(children,NAME_ONLY_COMPARATOR,namedNode=>namedNode.name,NAME_COMPARATOR);if(childrenHavePriority){const sortedChildSet=buildChildSet(children,PRIORITY_INDEX.getCompare());return new ChildrenNode(childSet,nodeFromJSON(priority),new IndexMap({'.priority':sortedChildSet},{'.priority':PRIORITY_INDEX}));}else{return new ChildrenNode(childSet,nodeFromJSON(priority),IndexMap.Default);}}else{let node=ChildrenNode.EMPTY_NODE;each(json,(key,childData)=>{if((0,_util.contains)(json,key)){if(key.substring(0,1)!=='.'){// ignore metadata nodes.
const childNode=nodeFromJSON(childData);if(childNode.isLeafNode()||!childNode.isEmpty()){node=node.updateImmediateChild(key,childNode);}}}});return node.updatePriority(nodeFromJSON(priority));}}setNodeFromJSON(nodeFromJSON);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PathIndex extends Index{constructor(indexPath_){super();this.indexPath_=indexPath_;(0,_util.assert)(!pathIsEmpty(indexPath_)&&pathGetFront(indexPath_)!=='.priority',"Can't create PathIndex with empty path or .priority key");}extractChild(snap){return snap.getChild(this.indexPath_);}isDefinedOn(node){return!node.getChild(this.indexPath_).isEmpty();}compare(a,b){const aChild=this.extractChild(a.node);const bChild=this.extractChild(b.node);const indexCmp=aChild.compareTo(bChild);if(indexCmp===0){return nameCompare(a.name,b.name);}else{return indexCmp;}}makePost(indexValue,name){const valueNode=nodeFromJSON(indexValue);const node=ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_,valueNode);return new NamedNode(name,node);}maxPost(){const node=ChildrenNode.EMPTY_NODE.updateChild(this.indexPath_,MAX_NODE);return new NamedNode(MAX_NAME,node);}toString(){return pathSlice(this.indexPath_,0).join('/');}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ValueIndex extends Index{compare(a,b){const indexCmp=a.node.compareTo(b.node);if(indexCmp===0){return nameCompare(a.name,b.name);}else{return indexCmp;}}isDefinedOn(node){return true;}indexedValueChanged(oldNode,newNode){return!oldNode.equals(newNode);}minPost(){// eslint-disable-next-line @typescript-eslint/no-explicit-any
return NamedNode.MIN;}maxPost(){// eslint-disable-next-line @typescript-eslint/no-explicit-any
return NamedNode.MAX;}makePost(indexValue,name){const valueNode=nodeFromJSON(indexValue);return new NamedNode(name,valueNode);}/**
     * @returns String representation for inclusion in a query spec
     */toString(){return'.value';}}const VALUE_INDEX=new ValueIndex();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function changeValue(snapshotNode){return{type:"value"/* ChangeType.VALUE */,snapshotNode};}function changeChildAdded(childName,snapshotNode){return{type:"child_added"/* ChangeType.CHILD_ADDED */,snapshotNode,childName};}function changeChildRemoved(childName,snapshotNode){return{type:"child_removed"/* ChangeType.CHILD_REMOVED */,snapshotNode,childName};}function changeChildChanged(childName,snapshotNode,oldSnap){return{type:"child_changed"/* ChangeType.CHILD_CHANGED */,snapshotNode,childName,oldSnap};}function changeChildMoved(childName,snapshotNode){return{type:"child_moved"/* ChangeType.CHILD_MOVED */,snapshotNode,childName};}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Doesn't really filter nodes but applies an index to the node and keeps track of any changes
 */class IndexedFilter{constructor(index_){this.index_=index_;}updateChild(snap,key,newChild,affectedPath,source,optChangeAccumulator){(0,_util.assert)(snap.isIndexed(this.index_),'A node must be indexed if only a child is updated');const oldChild=snap.getImmediateChild(key);// Check if anything actually changed.
if(oldChild.getChild(affectedPath).equals(newChild.getChild(affectedPath))){// There's an edge case where a child can enter or leave the view because affectedPath was set to null.
// In this case, affectedPath will appear null in both the old and new snapshots.  So we need
// to avoid treating these cases as "nothing changed."
if(oldChild.isEmpty()===newChild.isEmpty()){// Nothing changed.
// This assert should be valid, but it's expensive (can dominate perf testing) so don't actually do it.
//assert(oldChild.equals(newChild), 'Old and new snapshots should be equal.');
return snap;}}if(optChangeAccumulator!=null){if(newChild.isEmpty()){if(snap.hasChild(key)){optChangeAccumulator.trackChildChange(changeChildRemoved(key,oldChild));}else{(0,_util.assert)(snap.isLeafNode(),'A child remove without an old child only makes sense on a leaf node');}}else if(oldChild.isEmpty()){optChangeAccumulator.trackChildChange(changeChildAdded(key,newChild));}else{optChangeAccumulator.trackChildChange(changeChildChanged(key,newChild,oldChild));}}if(snap.isLeafNode()&&newChild.isEmpty()){return snap;}else{// Make sure the node is indexed
return snap.updateImmediateChild(key,newChild).withIndex(this.index_);}}updateFullNode(oldSnap,newSnap,optChangeAccumulator){if(optChangeAccumulator!=null){if(!oldSnap.isLeafNode()){oldSnap.forEachChild(PRIORITY_INDEX,(key,childNode)=>{if(!newSnap.hasChild(key)){optChangeAccumulator.trackChildChange(changeChildRemoved(key,childNode));}});}if(!newSnap.isLeafNode()){newSnap.forEachChild(PRIORITY_INDEX,(key,childNode)=>{if(oldSnap.hasChild(key)){const oldChild=oldSnap.getImmediateChild(key);if(!oldChild.equals(childNode)){optChangeAccumulator.trackChildChange(changeChildChanged(key,childNode,oldChild));}}else{optChangeAccumulator.trackChildChange(changeChildAdded(key,childNode));}});}}return newSnap.withIndex(this.index_);}updatePriority(oldSnap,newPriority){if(oldSnap.isEmpty()){return ChildrenNode.EMPTY_NODE;}else{return oldSnap.updatePriority(newPriority);}}filtersNodes(){return false;}getIndexedFilter(){return this;}getIndex(){return this.index_;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Filters nodes by range and uses an IndexFilter to track any changes after filtering the node
 */class RangedFilter{constructor(params){this.indexedFilter_=new IndexedFilter(params.getIndex());this.index_=params.getIndex();this.startPost_=RangedFilter.getStartPost_(params);this.endPost_=RangedFilter.getEndPost_(params);this.startIsInclusive_=!params.startAfterSet_;this.endIsInclusive_=!params.endBeforeSet_;}getStartPost(){return this.startPost_;}getEndPost(){return this.endPost_;}matches(node){const isWithinStart=this.startIsInclusive_?this.index_.compare(this.getStartPost(),node)<=0:this.index_.compare(this.getStartPost(),node)<0;const isWithinEnd=this.endIsInclusive_?this.index_.compare(node,this.getEndPost())<=0:this.index_.compare(node,this.getEndPost())<0;return isWithinStart&&isWithinEnd;}updateChild(snap,key,newChild,affectedPath,source,optChangeAccumulator){if(!this.matches(new NamedNode(key,newChild))){newChild=ChildrenNode.EMPTY_NODE;}return this.indexedFilter_.updateChild(snap,key,newChild,affectedPath,source,optChangeAccumulator);}updateFullNode(oldSnap,newSnap,optChangeAccumulator){if(newSnap.isLeafNode()){// Make sure we have a children node with the correct index, not a leaf node;
newSnap=ChildrenNode.EMPTY_NODE;}let filtered=newSnap.withIndex(this.index_);// Don't support priorities on queries
filtered=filtered.updatePriority(ChildrenNode.EMPTY_NODE);const self=this;newSnap.forEachChild(PRIORITY_INDEX,(key,childNode)=>{if(!self.matches(new NamedNode(key,childNode))){filtered=filtered.updateImmediateChild(key,ChildrenNode.EMPTY_NODE);}});return this.indexedFilter_.updateFullNode(oldSnap,filtered,optChangeAccumulator);}updatePriority(oldSnap,newPriority){// Don't support priorities on queries
return oldSnap;}filtersNodes(){return true;}getIndexedFilter(){return this.indexedFilter_;}getIndex(){return this.index_;}static getStartPost_(params){if(params.hasStart()){const startName=params.getIndexStartName();return params.getIndex().makePost(params.getIndexStartValue(),startName);}else{return params.getIndex().minPost();}}static getEndPost_(params){if(params.hasEnd()){const endName=params.getIndexEndName();return params.getIndex().makePost(params.getIndexEndValue(),endName);}else{return params.getIndex().maxPost();}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Applies a limit and a range to a node and uses RangedFilter to do the heavy lifting where possible
 */class LimitedFilter{constructor(params){this.withinDirectionalStart=node=>this.reverse_?this.withinEndPost(node):this.withinStartPost(node);this.withinDirectionalEnd=node=>this.reverse_?this.withinStartPost(node):this.withinEndPost(node);this.withinStartPost=node=>{const compareRes=this.index_.compare(this.rangedFilter_.getStartPost(),node);return this.startIsInclusive_?compareRes<=0:compareRes<0;};this.withinEndPost=node=>{const compareRes=this.index_.compare(node,this.rangedFilter_.getEndPost());return this.endIsInclusive_?compareRes<=0:compareRes<0;};this.rangedFilter_=new RangedFilter(params);this.index_=params.getIndex();this.limit_=params.getLimit();this.reverse_=!params.isViewFromLeft();this.startIsInclusive_=!params.startAfterSet_;this.endIsInclusive_=!params.endBeforeSet_;}updateChild(snap,key,newChild,affectedPath,source,optChangeAccumulator){if(!this.rangedFilter_.matches(new NamedNode(key,newChild))){newChild=ChildrenNode.EMPTY_NODE;}if(snap.getImmediateChild(key).equals(newChild)){// No change
return snap;}else if(snap.numChildren()<this.limit_){return this.rangedFilter_.getIndexedFilter().updateChild(snap,key,newChild,affectedPath,source,optChangeAccumulator);}else{return this.fullLimitUpdateChild_(snap,key,newChild,source,optChangeAccumulator);}}updateFullNode(oldSnap,newSnap,optChangeAccumulator){let filtered;if(newSnap.isLeafNode()||newSnap.isEmpty()){// Make sure we have a children node with the correct index, not a leaf node;
filtered=ChildrenNode.EMPTY_NODE.withIndex(this.index_);}else{if(this.limit_*2<newSnap.numChildren()&&newSnap.isIndexed(this.index_)){// Easier to build up a snapshot, since what we're given has more than twice the elements we want
filtered=ChildrenNode.EMPTY_NODE.withIndex(this.index_);// anchor to the startPost, endPost, or last element as appropriate
let iterator;if(this.reverse_){iterator=newSnap.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_);}else{iterator=newSnap.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);}let count=0;while(iterator.hasNext()&&count<this.limit_){const next=iterator.getNext();if(!this.withinDirectionalStart(next)){// if we have not reached the start, skip to the next element
continue;}else if(!this.withinDirectionalEnd(next)){// if we have reached the end, stop adding elements
break;}else{filtered=filtered.updateImmediateChild(next.name,next.node);count++;}}}else{// The snap contains less than twice the limit. Faster to delete from the snap than build up a new one
filtered=newSnap.withIndex(this.index_);// Don't support priorities on queries
filtered=filtered.updatePriority(ChildrenNode.EMPTY_NODE);let iterator;if(this.reverse_){iterator=filtered.getReverseIterator(this.index_);}else{iterator=filtered.getIterator(this.index_);}let count=0;while(iterator.hasNext()){const next=iterator.getNext();const inRange=count<this.limit_&&this.withinDirectionalStart(next)&&this.withinDirectionalEnd(next);if(inRange){count++;}else{filtered=filtered.updateImmediateChild(next.name,ChildrenNode.EMPTY_NODE);}}}}return this.rangedFilter_.getIndexedFilter().updateFullNode(oldSnap,filtered,optChangeAccumulator);}updatePriority(oldSnap,newPriority){// Don't support priorities on queries
return oldSnap;}filtersNodes(){return true;}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter();}getIndex(){return this.index_;}fullLimitUpdateChild_(snap,childKey,childSnap,source,changeAccumulator){// TODO: rename all cache stuff etc to general snap terminology
let cmp;if(this.reverse_){const indexCmp=this.index_.getCompare();cmp=(a,b)=>indexCmp(b,a);}else{cmp=this.index_.getCompare();}const oldEventCache=snap;(0,_util.assert)(oldEventCache.numChildren()===this.limit_,'');const newChildNamedNode=new NamedNode(childKey,childSnap);const windowBoundary=this.reverse_?oldEventCache.getFirstChild(this.index_):oldEventCache.getLastChild(this.index_);const inRange=this.rangedFilter_.matches(newChildNamedNode);if(oldEventCache.hasChild(childKey)){const oldChildSnap=oldEventCache.getImmediateChild(childKey);let nextChild=source.getChildAfterChild(this.index_,windowBoundary,this.reverse_);while(nextChild!=null&&(nextChild.name===childKey||oldEventCache.hasChild(nextChild.name))){// There is a weird edge case where a node is updated as part of a merge in the write tree, but hasn't
// been applied to the limited filter yet. Ignore this next child which will be updated later in
// the limited filter...
nextChild=source.getChildAfterChild(this.index_,nextChild,this.reverse_);}const compareNext=nextChild==null?1:cmp(nextChild,newChildNamedNode);const remainsInWindow=inRange&&!childSnap.isEmpty()&&compareNext>=0;if(remainsInWindow){if(changeAccumulator!=null){changeAccumulator.trackChildChange(changeChildChanged(childKey,childSnap,oldChildSnap));}return oldEventCache.updateImmediateChild(childKey,childSnap);}else{if(changeAccumulator!=null){changeAccumulator.trackChildChange(changeChildRemoved(childKey,oldChildSnap));}const newEventCache=oldEventCache.updateImmediateChild(childKey,ChildrenNode.EMPTY_NODE);const nextChildInRange=nextChild!=null&&this.rangedFilter_.matches(nextChild);if(nextChildInRange){if(changeAccumulator!=null){changeAccumulator.trackChildChange(changeChildAdded(nextChild.name,nextChild.node));}return newEventCache.updateImmediateChild(nextChild.name,nextChild.node);}else{return newEventCache;}}}else if(childSnap.isEmpty()){// we're deleting a node, but it was not in the window, so ignore it
return snap;}else if(inRange){if(cmp(windowBoundary,newChildNamedNode)>=0){if(changeAccumulator!=null){changeAccumulator.trackChildChange(changeChildRemoved(windowBoundary.name,windowBoundary.node));changeAccumulator.trackChildChange(changeChildAdded(childKey,childSnap));}return oldEventCache.updateImmediateChild(childKey,childSnap).updateImmediateChild(windowBoundary.name,ChildrenNode.EMPTY_NODE);}else{return snap;}}else{return snap;}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * This class is an immutable-from-the-public-api struct containing a set of query parameters defining a
 * range to be returned for a particular location. It is assumed that validation of parameters is done at the
 * user-facing API level, so it is not done here.
 *
 * @internal
 */class QueryParams{constructor(){this.limitSet_=false;this.startSet_=false;this.startNameSet_=false;this.startAfterSet_=false;// can only be true if startSet_ is true
this.endSet_=false;this.endNameSet_=false;this.endBeforeSet_=false;// can only be true if endSet_ is true
this.limit_=0;this.viewFrom_='';this.indexStartValue_=null;this.indexStartName_='';this.indexEndValue_=null;this.indexEndName_='';this.index_=PRIORITY_INDEX;}hasStart(){return this.startSet_;}/**
     * @returns True if it would return from left.
     */isViewFromLeft(){if(this.viewFrom_===''){// limit(), rather than limitToFirst or limitToLast was called.
// This means that only one of startSet_ and endSet_ is true. Use them
// to calculate which side of the view to anchor to. If neither is set,
// anchor to the end.
return this.startSet_;}else{return this.viewFrom_==="l"/* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;}}/**
     * Only valid to call if hasStart() returns true
     */getIndexStartValue(){(0,_util.assert)(this.startSet_,'Only valid if start has been set');return this.indexStartValue_;}/**
     * Only valid to call if hasStart() returns true.
     * Returns the starting key name for the range defined by these query parameters
     */getIndexStartName(){(0,_util.assert)(this.startSet_,'Only valid if start has been set');if(this.startNameSet_){return this.indexStartName_;}else{return MIN_NAME;}}hasEnd(){return this.endSet_;}/**
     * Only valid to call if hasEnd() returns true.
     */getIndexEndValue(){(0,_util.assert)(this.endSet_,'Only valid if end has been set');return this.indexEndValue_;}/**
     * Only valid to call if hasEnd() returns true.
     * Returns the end key name for the range defined by these query parameters
     */getIndexEndName(){(0,_util.assert)(this.endSet_,'Only valid if end has been set');if(this.endNameSet_){return this.indexEndName_;}else{return MAX_NAME;}}hasLimit(){return this.limitSet_;}/**
     * @returns True if a limit has been set and it has been explicitly anchored
     */hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!=='';}/**
     * Only valid to call if hasLimit() returns true
     */getLimit(){(0,_util.assert)(this.limitSet_,'Only valid if limit has been set');return this.limit_;}getIndex(){return this.index_;}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_);}isDefault(){return this.loadsAllData()&&this.index_===PRIORITY_INDEX;}copy(){const copy=new QueryParams();copy.limitSet_=this.limitSet_;copy.limit_=this.limit_;copy.startSet_=this.startSet_;copy.startAfterSet_=this.startAfterSet_;copy.indexStartValue_=this.indexStartValue_;copy.startNameSet_=this.startNameSet_;copy.indexStartName_=this.indexStartName_;copy.endSet_=this.endSet_;copy.endBeforeSet_=this.endBeforeSet_;copy.indexEndValue_=this.indexEndValue_;copy.endNameSet_=this.endNameSet_;copy.indexEndName_=this.indexEndName_;copy.index_=this.index_;copy.viewFrom_=this.viewFrom_;return copy;}}exports._QueryParams=QueryParams;function queryParamsGetNodeFilter(queryParams){if(queryParams.loadsAllData()){return new IndexedFilter(queryParams.getIndex());}else if(queryParams.hasLimit()){return new LimitedFilter(queryParams);}else{return new RangedFilter(queryParams);}}function queryParamsLimitToFirst(queryParams,newLimit){const newParams=queryParams.copy();newParams.limitSet_=true;newParams.limit_=newLimit;newParams.viewFrom_="l"/* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;return newParams;}function queryParamsLimitToLast(queryParams,newLimit){const newParams=queryParams.copy();newParams.limitSet_=true;newParams.limit_=newLimit;newParams.viewFrom_="r"/* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT */;return newParams;}function queryParamsStartAt(queryParams,indexValue,key){const newParams=queryParams.copy();newParams.startSet_=true;if(indexValue===undefined){indexValue=null;}newParams.indexStartValue_=indexValue;if(key!=null){newParams.startNameSet_=true;newParams.indexStartName_=key;}else{newParams.startNameSet_=false;newParams.indexStartName_='';}return newParams;}function queryParamsStartAfter(queryParams,indexValue,key){let params;if(queryParams.index_===KEY_INDEX||!!key){params=queryParamsStartAt(queryParams,indexValue,key);}else{params=queryParamsStartAt(queryParams,indexValue,MAX_NAME);}params.startAfterSet_=true;return params;}function queryParamsEndAt(queryParams,indexValue,key){const newParams=queryParams.copy();newParams.endSet_=true;if(indexValue===undefined){indexValue=null;}newParams.indexEndValue_=indexValue;if(key!==undefined){newParams.endNameSet_=true;newParams.indexEndName_=key;}else{newParams.endNameSet_=false;newParams.indexEndName_='';}return newParams;}function queryParamsEndBefore(queryParams,indexValue,key){let params;if(queryParams.index_===KEY_INDEX||!!key){params=queryParamsEndAt(queryParams,indexValue,key);}else{params=queryParamsEndAt(queryParams,indexValue,MIN_NAME);}params.endBeforeSet_=true;return params;}function queryParamsOrderBy(queryParams,index){const newParams=queryParams.copy();newParams.index_=index;return newParams;}/**
 * Returns a set of REST query string parameters representing this query.
 *
 * @returns query string parameters
 */function queryParamsToRestQueryStringParameters(queryParams){const qs={};if(queryParams.isDefault()){return qs;}let orderBy;if(queryParams.index_===PRIORITY_INDEX){orderBy="$priority"/* REST_QUERY_CONSTANTS.PRIORITY_INDEX */;}else if(queryParams.index_===VALUE_INDEX){orderBy="$value"/* REST_QUERY_CONSTANTS.VALUE_INDEX */;}else if(queryParams.index_===KEY_INDEX){orderBy="$key"/* REST_QUERY_CONSTANTS.KEY_INDEX */;}else{(0,_util.assert)(queryParams.index_ instanceof PathIndex,'Unrecognized index type!');orderBy=queryParams.index_.toString();}qs["orderBy"/* REST_QUERY_CONSTANTS.ORDER_BY */]=(0,_util.stringify)(orderBy);if(queryParams.startSet_){const startParam=queryParams.startAfterSet_?"startAfter"/* REST_QUERY_CONSTANTS.START_AFTER */:"startAt"/* REST_QUERY_CONSTANTS.START_AT */;qs[startParam]=(0,_util.stringify)(queryParams.indexStartValue_);if(queryParams.startNameSet_){qs[startParam]+=','+(0,_util.stringify)(queryParams.indexStartName_);}}if(queryParams.endSet_){const endParam=queryParams.endBeforeSet_?"endBefore"/* REST_QUERY_CONSTANTS.END_BEFORE */:"endAt"/* REST_QUERY_CONSTANTS.END_AT */;qs[endParam]=(0,_util.stringify)(queryParams.indexEndValue_);if(queryParams.endNameSet_){qs[endParam]+=','+(0,_util.stringify)(queryParams.indexEndName_);}}if(queryParams.limitSet_){if(queryParams.isViewFromLeft()){qs["limitToFirst"/* REST_QUERY_CONSTANTS.LIMIT_TO_FIRST */]=queryParams.limit_;}else{qs["limitToLast"/* REST_QUERY_CONSTANTS.LIMIT_TO_LAST */]=queryParams.limit_;}}return qs;}function queryParamsGetQueryObject(queryParams){const obj={};if(queryParams.startSet_){obj["sp"/* WIRE_PROTOCOL_CONSTANTS.INDEX_START_VALUE */]=queryParams.indexStartValue_;if(queryParams.startNameSet_){obj["sn"/* WIRE_PROTOCOL_CONSTANTS.INDEX_START_NAME */]=queryParams.indexStartName_;}obj["sin"/* WIRE_PROTOCOL_CONSTANTS.INDEX_START_IS_INCLUSIVE */]=!queryParams.startAfterSet_;}if(queryParams.endSet_){obj["ep"/* WIRE_PROTOCOL_CONSTANTS.INDEX_END_VALUE */]=queryParams.indexEndValue_;if(queryParams.endNameSet_){obj["en"/* WIRE_PROTOCOL_CONSTANTS.INDEX_END_NAME */]=queryParams.indexEndName_;}obj["ein"/* WIRE_PROTOCOL_CONSTANTS.INDEX_END_IS_INCLUSIVE */]=!queryParams.endBeforeSet_;}if(queryParams.limitSet_){obj["l"/* WIRE_PROTOCOL_CONSTANTS.LIMIT */]=queryParams.limit_;let viewFrom=queryParams.viewFrom_;if(viewFrom===''){if(queryParams.isViewFromLeft()){viewFrom="l"/* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_LEFT */;}else{viewFrom="r"/* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM_RIGHT */;}}obj["vf"/* WIRE_PROTOCOL_CONSTANTS.VIEW_FROM */]=viewFrom;}// For now, priority index is the default, so we only specify if it's some other index
if(queryParams.index_!==PRIORITY_INDEX){obj["i"/* WIRE_PROTOCOL_CONSTANTS.INDEX */]=queryParams.index_.toString();}return obj;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An implementation of ServerActions that communicates with the server via REST requests.
 * This is mostly useful for compatibility with crawlers, where we don't want to spin up a full
 * persistent connection (using WebSockets or long-polling)
 */class ReadonlyRestClient extends ServerActions{/**
     * @param repoInfo_ - Data about the namespace we are connecting to
     * @param onDataUpdate_ - A callback for new data from the server
     */constructor(repoInfo_,onDataUpdate_,authTokenProvider_,appCheckTokenProvider_){super();this.repoInfo_=repoInfo_;this.onDataUpdate_=onDataUpdate_;this.authTokenProvider_=authTokenProvider_;this.appCheckTokenProvider_=appCheckTokenProvider_;/** @private {function(...[*])} */this.log_=logWrapper('p:rest:');/**
         * We don't actually need to track listens, except to prevent us calling an onComplete for a listen
         * that's been removed. :-/
         */this.listens_={};}reportStats(stats){throw new Error('Method not implemented.');}static getListenId_(query,tag){if(tag!==undefined){return'tag$'+tag;}else{(0,_util.assert)(query._queryParams.isDefault(),"should have a tag if it's not a default query.");return query._path.toString();}}/** @inheritDoc */listen(query,currentHashFn,tag,onComplete){const pathString=query._path.toString();this.log_('Listen called for '+pathString+' '+query._queryIdentifier);// Mark this listener so we can tell if it's removed.
const listenId=ReadonlyRestClient.getListenId_(query,tag);const thisListen={};this.listens_[listenId]=thisListen;const queryStringParameters=queryParamsToRestQueryStringParameters(query._queryParams);this.restRequest_(pathString+'.json',queryStringParameters,(error,result)=>{let data=result;if(error===404){data=null;error=null;}if(error===null){this.onDataUpdate_(pathString,data,/*isMerge=*/false,tag);}if((0,_util.safeGet)(this.listens_,listenId)===thisListen){let status;if(!error){status='ok';}else if(error===401){status='permission_denied';}else{status='rest_error:'+error;}onComplete(status,null);}});}/** @inheritDoc */unlisten(query,tag){const listenId=ReadonlyRestClient.getListenId_(query,tag);delete this.listens_[listenId];}get(query){const queryStringParameters=queryParamsToRestQueryStringParameters(query._queryParams);const pathString=query._path.toString();const deferred=new _util.Deferred();this.restRequest_(pathString+'.json',queryStringParameters,(error,result)=>{let data=result;if(error===404){data=null;error=null;}if(error===null){this.onDataUpdate_(pathString,data,/*isMerge=*/false,/*tag=*/null);deferred.resolve(data);}else{deferred.reject(new Error(data));}});return deferred.promise;}/** @inheritDoc */refreshAuthToken(token){// no-op since we just always call getToken.
}/**
     * Performs a REST request to the given path, with the provided query string parameters,
     * and any auth credentials we have.
     */restRequest_(pathString,queryStringParameters={},callback){queryStringParameters['format']='export';return Promise.all([this.authTokenProvider_.getToken(/*forceRefresh=*/false),this.appCheckTokenProvider_.getToken(/*forceRefresh=*/false)]).then(([authToken,appCheckToken])=>{if(authToken&&authToken.accessToken){queryStringParameters['auth']=authToken.accessToken;}if(appCheckToken&&appCheckToken.token){queryStringParameters['ac']=appCheckToken.token;}const url=(this.repoInfo_.secure?'https://':'http://')+this.repoInfo_.host+pathString+'?'+'ns='+this.repoInfo_.namespace+(0,_util.querystring)(queryStringParameters);this.log_('Sending REST request for '+url);const xhr=new XMLHttpRequest();xhr.onreadystatechange=()=>{if(callback&&xhr.readyState===4){this.log_('REST Response for '+url+' received. status:',xhr.status,'response:',xhr.responseText);let res=null;if(xhr.status>=200&&xhr.status<300){try{res=(0,_util.jsonEval)(xhr.responseText);}catch(e){warn('Failed to parse JSON response for '+url+': '+xhr.responseText);}callback(null,res);}else{// 401 and 404 are expected.
if(xhr.status!==401&&xhr.status!==404){warn('Got unsuccessful REST response for '+url+' Status: '+xhr.status);}callback(xhr.status);}callback=null;}};xhr.open('GET',url,/*asynchronous=*/true);xhr.send();});}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Mutable object which basically just stores a reference to the "latest" immutable snapshot.
 */class SnapshotHolder{constructor(){this.rootNode_=ChildrenNode.EMPTY_NODE;}getNode(path){return this.rootNode_.getChild(path);}updateSnapshot(path,newSnapshotNode){this.rootNode_=this.rootNode_.updateChild(path,newSnapshotNode);}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function newSparseSnapshotTree(){return{value:null,children:new Map()};}/**
 * Stores the given node at the specified path. If there is already a node
 * at a shallower path, it merges the new data into that snapshot node.
 *
 * @param path - Path to look up snapshot for.
 * @param data - The new data, or null.
 */function sparseSnapshotTreeRemember(sparseSnapshotTree,path,data){if(pathIsEmpty(path)){sparseSnapshotTree.value=data;sparseSnapshotTree.children.clear();}else if(sparseSnapshotTree.value!==null){sparseSnapshotTree.value=sparseSnapshotTree.value.updateChild(path,data);}else{const childKey=pathGetFront(path);if(!sparseSnapshotTree.children.has(childKey)){sparseSnapshotTree.children.set(childKey,newSparseSnapshotTree());}const child=sparseSnapshotTree.children.get(childKey);path=pathPopFront(path);sparseSnapshotTreeRemember(child,path,data);}}/**
 * Purge the data at path from the cache.
 *
 * @param path - Path to look up snapshot for.
 * @returns True if this node should now be removed.
 */function sparseSnapshotTreeForget(sparseSnapshotTree,path){if(pathIsEmpty(path)){sparseSnapshotTree.value=null;sparseSnapshotTree.children.clear();return true;}else{if(sparseSnapshotTree.value!==null){if(sparseSnapshotTree.value.isLeafNode()){// We're trying to forget a node that doesn't exist
return false;}else{const value=sparseSnapshotTree.value;sparseSnapshotTree.value=null;value.forEachChild(PRIORITY_INDEX,(key,tree)=>{sparseSnapshotTreeRemember(sparseSnapshotTree,new Path(key),tree);});return sparseSnapshotTreeForget(sparseSnapshotTree,path);}}else if(sparseSnapshotTree.children.size>0){const childKey=pathGetFront(path);path=pathPopFront(path);if(sparseSnapshotTree.children.has(childKey)){const safeToRemove=sparseSnapshotTreeForget(sparseSnapshotTree.children.get(childKey),path);if(safeToRemove){sparseSnapshotTree.children.delete(childKey);}}return sparseSnapshotTree.children.size===0;}else{return true;}}}/**
 * Recursively iterates through all of the stored tree and calls the
 * callback on each one.
 *
 * @param prefixPath - Path to look up node for.
 * @param func - The function to invoke for each tree.
 */function sparseSnapshotTreeForEachTree(sparseSnapshotTree,prefixPath,func){if(sparseSnapshotTree.value!==null){func(prefixPath,sparseSnapshotTree.value);}else{sparseSnapshotTreeForEachChild(sparseSnapshotTree,(key,tree)=>{const path=new Path(prefixPath.toString()+'/'+key);sparseSnapshotTreeForEachTree(tree,path,func);});}}/**
 * Iterates through each immediate child and triggers the callback.
 * Only seems to be used in tests.
 *
 * @param func - The function to invoke for each child.
 */function sparseSnapshotTreeForEachChild(sparseSnapshotTree,func){sparseSnapshotTree.children.forEach((tree,key)=>{func(key,tree);});}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Returns the delta from the previous call to get stats.
 *
 * @param collection_ - The collection to "listen" to.
 */class StatsListener{constructor(collection_){this.collection_=collection_;this.last_=null;}get(){const newStats=this.collection_.get();const delta=Object.assign({},newStats);if(this.last_){each(this.last_,(stat,value)=>{delta[stat]=delta[stat]-value;});}this.last_=newStats;return delta;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Assuming some apps may have a short amount of time on page, and a bulk of firebase operations probably
// happen on page load, we try to report our first set of stats pretty quickly, but we wait at least 10
// seconds to try to ensure the Firebase connection is established / settled.
const FIRST_STATS_MIN_TIME=10*1000;const FIRST_STATS_MAX_TIME=30*1000;// We'll continue to report stats on average every 5 minutes.
const REPORT_STATS_INTERVAL=5*60*1000;class StatsReporter{constructor(collection,server_){this.server_=server_;this.statsToReport_={};this.statsListener_=new StatsListener(collection);const timeout=FIRST_STATS_MIN_TIME+(FIRST_STATS_MAX_TIME-FIRST_STATS_MIN_TIME)*Math.random();setTimeoutNonBlocking(this.reportStats_.bind(this),Math.floor(timeout));}reportStats_(){const stats=this.statsListener_.get();const reportedStats={};let haveStatsToReport=false;each(stats,(stat,value)=>{if(value>0&&(0,_util.contains)(this.statsToReport_,stat)){reportedStats[stat]=value;haveStatsToReport=true;}});if(haveStatsToReport){this.server_.reportStats(reportedStats);}// queue our next run.
setTimeoutNonBlocking(this.reportStats_.bind(this),Math.floor(Math.random()*2*REPORT_STATS_INTERVAL));}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 *
 * @enum
 */var OperationType;(function(OperationType){OperationType[OperationType["OVERWRITE"]=0]="OVERWRITE";OperationType[OperationType["MERGE"]=1]="MERGE";OperationType[OperationType["ACK_USER_WRITE"]=2]="ACK_USER_WRITE";OperationType[OperationType["LISTEN_COMPLETE"]=3]="LISTEN_COMPLETE";})(OperationType||(OperationType={}));function newOperationSourceUser(){return{fromUser:true,fromServer:false,queryId:null,tagged:false};}function newOperationSourceServer(){return{fromUser:false,fromServer:true,queryId:null,tagged:false};}function newOperationSourceServerTaggedQuery(queryId){return{fromUser:false,fromServer:true,queryId,tagged:true};}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AckUserWrite{/**
     * @param affectedTree - A tree containing true for each affected path. Affected paths can't overlap.
     */constructor(/** @inheritDoc */path,/** @inheritDoc */affectedTree,/** @inheritDoc */revert){this.path=path;this.affectedTree=affectedTree;this.revert=revert;/** @inheritDoc */this.type=OperationType.ACK_USER_WRITE;/** @inheritDoc */this.source=newOperationSourceUser();}operationForChild(childName){if(!pathIsEmpty(this.path)){(0,_util.assert)(pathGetFront(this.path)===childName,'operationForChild called for unrelated child.');return new AckUserWrite(pathPopFront(this.path),this.affectedTree,this.revert);}else if(this.affectedTree.value!=null){(0,_util.assert)(this.affectedTree.children.isEmpty(),'affectedTree should not have overlapping affected paths.');// All child locations are affected as well; just return same operation.
return this;}else{const childTree=this.affectedTree.subtree(new Path(childName));return new AckUserWrite(newEmptyPath(),childTree,this.revert);}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ListenComplete{constructor(source,path){this.source=source;this.path=path;/** @inheritDoc */this.type=OperationType.LISTEN_COMPLETE;}operationForChild(childName){if(pathIsEmpty(this.path)){return new ListenComplete(this.source,newEmptyPath());}else{return new ListenComplete(this.source,pathPopFront(this.path));}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Overwrite{constructor(source,path,snap){this.source=source;this.path=path;this.snap=snap;/** @inheritDoc */this.type=OperationType.OVERWRITE;}operationForChild(childName){if(pathIsEmpty(this.path)){return new Overwrite(this.source,newEmptyPath(),this.snap.getImmediateChild(childName));}else{return new Overwrite(this.source,pathPopFront(this.path),this.snap);}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Merge{constructor(/** @inheritDoc */source,/** @inheritDoc */path,/** @inheritDoc */children){this.source=source;this.path=path;this.children=children;/** @inheritDoc */this.type=OperationType.MERGE;}operationForChild(childName){if(pathIsEmpty(this.path)){const childTree=this.children.subtree(new Path(childName));if(childTree.isEmpty()){// This child is unaffected
return null;}else if(childTree.value){// We have a snapshot for the child in question.  This becomes an overwrite of the child.
return new Overwrite(this.source,newEmptyPath(),childTree.value);}else{// This is a merge at a deeper level
return new Merge(this.source,newEmptyPath(),childTree);}}else{(0,_util.assert)(pathGetFront(this.path)===childName,"Can't get a merge for a child not on the path of the operation");return new Merge(this.source,pathPopFront(this.path),this.children);}}toString(){return'Operation('+this.path+': '+this.source.toString()+' merge: '+this.children.toString()+')';}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A cache node only stores complete children. Additionally it holds a flag whether the node can be considered fully
 * initialized in the sense that we know at one point in time this represented a valid state of the world, e.g.
 * initialized with data from the server, or a complete overwrite by the client. The filtered flag also tracks
 * whether a node potentially had children removed due to a filter.
 */class CacheNode{constructor(node_,fullyInitialized_,filtered_){this.node_=node_;this.fullyInitialized_=fullyInitialized_;this.filtered_=filtered_;}/**
     * Returns whether this node was fully initialized with either server data or a complete overwrite by the client
     */isFullyInitialized(){return this.fullyInitialized_;}/**
     * Returns whether this node is potentially missing children due to a filter applied to the node
     */isFiltered(){return this.filtered_;}isCompleteForPath(path){if(pathIsEmpty(path)){return this.isFullyInitialized()&&!this.filtered_;}const childKey=pathGetFront(path);return this.isCompleteForChild(childKey);}isCompleteForChild(key){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(key);}getNode(){return this.node_;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An EventGenerator is used to convert "raw" changes (Change) as computed by the
 * CacheDiffer into actual events (Event) that can be raised.  See generateEventsForChanges()
 * for details.
 *
 */class EventGenerator{constructor(query_){this.query_=query_;this.index_=this.query_._queryParams.getIndex();}}/**
 * Given a set of raw changes (no moved events and prevName not specified yet), and a set of
 * EventRegistrations that should be notified of these changes, generate the actual events to be raised.
 *
 * Notes:
 *  - child_moved events will be synthesized at this time for any child_changed events that affect
 *    our index.
 *  - prevName will be calculated based on the index ordering.
 */function eventGeneratorGenerateEventsForChanges(eventGenerator,changes,eventCache,eventRegistrations){const events=[];const moves=[];changes.forEach(change=>{if(change.type==="child_changed"/* ChangeType.CHILD_CHANGED */&&eventGenerator.index_.indexedValueChanged(change.oldSnap,change.snapshotNode)){moves.push(changeChildMoved(change.childName,change.snapshotNode));}});eventGeneratorGenerateEventsForType(eventGenerator,events,"child_removed"/* ChangeType.CHILD_REMOVED */,changes,eventRegistrations,eventCache);eventGeneratorGenerateEventsForType(eventGenerator,events,"child_added"/* ChangeType.CHILD_ADDED */,changes,eventRegistrations,eventCache);eventGeneratorGenerateEventsForType(eventGenerator,events,"child_moved"/* ChangeType.CHILD_MOVED */,moves,eventRegistrations,eventCache);eventGeneratorGenerateEventsForType(eventGenerator,events,"child_changed"/* ChangeType.CHILD_CHANGED */,changes,eventRegistrations,eventCache);eventGeneratorGenerateEventsForType(eventGenerator,events,"value"/* ChangeType.VALUE */,changes,eventRegistrations,eventCache);return events;}/**
 * Given changes of a single change type, generate the corresponding events.
 */function eventGeneratorGenerateEventsForType(eventGenerator,events,eventType,changes,registrations,eventCache){const filteredChanges=changes.filter(change=>change.type===eventType);filteredChanges.sort((a,b)=>eventGeneratorCompareChanges(eventGenerator,a,b));filteredChanges.forEach(change=>{const materializedChange=eventGeneratorMaterializeSingleChange(eventGenerator,change,eventCache);registrations.forEach(registration=>{if(registration.respondsTo(change.type)){events.push(registration.createEvent(materializedChange,eventGenerator.query_));}});});}function eventGeneratorMaterializeSingleChange(eventGenerator,change,eventCache){if(change.type==='value'||change.type==='child_removed'){return change;}else{change.prevName=eventCache.getPredecessorChildName(change.childName,change.snapshotNode,eventGenerator.index_);return change;}}function eventGeneratorCompareChanges(eventGenerator,a,b){if(a.childName==null||b.childName==null){throw(0,_util.assertionError)('Should only compare child_ events.');}const aWrapped=new NamedNode(a.childName,a.snapshotNode);const bWrapped=new NamedNode(b.childName,b.snapshotNode);return eventGenerator.index_.compare(aWrapped,bWrapped);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function newViewCache(eventCache,serverCache){return{eventCache,serverCache};}function viewCacheUpdateEventSnap(viewCache,eventSnap,complete,filtered){return newViewCache(new CacheNode(eventSnap,complete,filtered),viewCache.serverCache);}function viewCacheUpdateServerSnap(viewCache,serverSnap,complete,filtered){return newViewCache(viewCache.eventCache,new CacheNode(serverSnap,complete,filtered));}function viewCacheGetCompleteEventSnap(viewCache){return viewCache.eventCache.isFullyInitialized()?viewCache.eventCache.getNode():null;}function viewCacheGetCompleteServerSnap(viewCache){return viewCache.serverCache.isFullyInitialized()?viewCache.serverCache.getNode():null;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let emptyChildrenSingleton;/**
 * Singleton empty children collection.
 *
 */const EmptyChildren=()=>{if(!emptyChildrenSingleton){emptyChildrenSingleton=new SortedMap(stringCompare);}return emptyChildrenSingleton;};/**
 * A tree with immutable elements.
 */class ImmutableTree{constructor(value,children=EmptyChildren()){this.value=value;this.children=children;}static fromObject(obj){let tree=new ImmutableTree(null);each(obj,(childPath,childSnap)=>{tree=tree.set(new Path(childPath),childSnap);});return tree;}/**
     * True if the value is empty and there are no children
     */isEmpty(){return this.value===null&&this.children.isEmpty();}/**
     * Given a path and predicate, return the first node and the path to that node
     * where the predicate returns true.
     *
     * TODO Do a perf test -- If we're creating a bunch of `{path: value:}`
     * objects on the way back out, it may be better to pass down a pathSoFar obj.
     *
     * @param relativePath - The remainder of the path
     * @param predicate - The predicate to satisfy to return a node
     */findRootMostMatchingPathAndValue(relativePath,predicate){if(this.value!=null&&predicate(this.value)){return{path:newEmptyPath(),value:this.value};}else{if(pathIsEmpty(relativePath)){return null;}else{const front=pathGetFront(relativePath);const child=this.children.get(front);if(child!==null){const childExistingPathAndValue=child.findRootMostMatchingPathAndValue(pathPopFront(relativePath),predicate);if(childExistingPathAndValue!=null){const fullPath=pathChild(new Path(front),childExistingPathAndValue.path);return{path:fullPath,value:childExistingPathAndValue.value};}else{return null;}}else{return null;}}}}/**
     * Find, if it exists, the shortest subpath of the given path that points a defined
     * value in the tree
     */findRootMostValueAndPath(relativePath){return this.findRootMostMatchingPathAndValue(relativePath,()=>true);}/**
     * @returns The subtree at the given path
     */subtree(relativePath){if(pathIsEmpty(relativePath)){return this;}else{const front=pathGetFront(relativePath);const childTree=this.children.get(front);if(childTree!==null){return childTree.subtree(pathPopFront(relativePath));}else{return new ImmutableTree(null);}}}/**
     * Sets a value at the specified path.
     *
     * @param relativePath - Path to set value at.
     * @param toSet - Value to set.
     * @returns Resulting tree.
     */set(relativePath,toSet){if(pathIsEmpty(relativePath)){return new ImmutableTree(toSet,this.children);}else{const front=pathGetFront(relativePath);const child=this.children.get(front)||new ImmutableTree(null);const newChild=child.set(pathPopFront(relativePath),toSet);const newChildren=this.children.insert(front,newChild);return new ImmutableTree(this.value,newChildren);}}/**
     * Removes the value at the specified path.
     *
     * @param relativePath - Path to value to remove.
     * @returns Resulting tree.
     */remove(relativePath){if(pathIsEmpty(relativePath)){if(this.children.isEmpty()){return new ImmutableTree(null);}else{return new ImmutableTree(null,this.children);}}else{const front=pathGetFront(relativePath);const child=this.children.get(front);if(child){const newChild=child.remove(pathPopFront(relativePath));let newChildren;if(newChild.isEmpty()){newChildren=this.children.remove(front);}else{newChildren=this.children.insert(front,newChild);}if(this.value===null&&newChildren.isEmpty()){return new ImmutableTree(null);}else{return new ImmutableTree(this.value,newChildren);}}else{return this;}}}/**
     * Gets a value from the tree.
     *
     * @param relativePath - Path to get value for.
     * @returns Value at path, or null.
     */get(relativePath){if(pathIsEmpty(relativePath)){return this.value;}else{const front=pathGetFront(relativePath);const child=this.children.get(front);if(child){return child.get(pathPopFront(relativePath));}else{return null;}}}/**
     * Replace the subtree at the specified path with the given new tree.
     *
     * @param relativePath - Path to replace subtree for.
     * @param newTree - New tree.
     * @returns Resulting tree.
     */setTree(relativePath,newTree){if(pathIsEmpty(relativePath)){return newTree;}else{const front=pathGetFront(relativePath);const child=this.children.get(front)||new ImmutableTree(null);const newChild=child.setTree(pathPopFront(relativePath),newTree);let newChildren;if(newChild.isEmpty()){newChildren=this.children.remove(front);}else{newChildren=this.children.insert(front,newChild);}return new ImmutableTree(this.value,newChildren);}}/**
     * Performs a depth first fold on this tree. Transforms a tree into a single
     * value, given a function that operates on the path to a node, an optional
     * current value, and a map of child names to folded subtrees
     */fold(fn){return this.fold_(newEmptyPath(),fn);}/**
     * Recursive helper for public-facing fold() method
     */fold_(pathSoFar,fn){const accum={};this.children.inorderTraversal((childKey,childTree)=>{accum[childKey]=childTree.fold_(pathChild(pathSoFar,childKey),fn);});return fn(pathSoFar,this.value,accum);}/**
     * Find the first matching value on the given path. Return the result of applying f to it.
     */findOnPath(path,f){return this.findOnPath_(path,newEmptyPath(),f);}findOnPath_(pathToFollow,pathSoFar,f){const result=this.value?f(pathSoFar,this.value):false;if(result){return result;}else{if(pathIsEmpty(pathToFollow)){return null;}else{const front=pathGetFront(pathToFollow);const nextChild=this.children.get(front);if(nextChild){return nextChild.findOnPath_(pathPopFront(pathToFollow),pathChild(pathSoFar,front),f);}else{return null;}}}}foreachOnPath(path,f){return this.foreachOnPath_(path,newEmptyPath(),f);}foreachOnPath_(pathToFollow,currentRelativePath,f){if(pathIsEmpty(pathToFollow)){return this;}else{if(this.value){f(currentRelativePath,this.value);}const front=pathGetFront(pathToFollow);const nextChild=this.children.get(front);if(nextChild){return nextChild.foreachOnPath_(pathPopFront(pathToFollow),pathChild(currentRelativePath,front),f);}else{return new ImmutableTree(null);}}}/**
     * Calls the given function for each node in the tree that has a value.
     *
     * @param f - A function to be called with the path from the root of the tree to
     * a node, and the value at that node. Called in depth-first order.
     */foreach(f){this.foreach_(newEmptyPath(),f);}foreach_(currentRelativePath,f){this.children.inorderTraversal((childName,childTree)=>{childTree.foreach_(pathChild(currentRelativePath,childName),f);});if(this.value){f(currentRelativePath,this.value);}}foreachChild(f){this.children.inorderTraversal((childName,childTree)=>{if(childTree.value){f(childName,childTree.value);}});}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * This class holds a collection of writes that can be applied to nodes in unison. It abstracts away the logic with
 * dealing with priority writes and multiple nested writes. At any given path there is only allowed to be one write
 * modifying that path. Any write to an existing path or shadowing an existing path will modify that existing write
 * to reflect the write added.
 */class CompoundWrite{constructor(writeTree_){this.writeTree_=writeTree_;}static empty(){return new CompoundWrite(new ImmutableTree(null));}}function compoundWriteAddWrite(compoundWrite,path,node){if(pathIsEmpty(path)){return new CompoundWrite(new ImmutableTree(node));}else{const rootmost=compoundWrite.writeTree_.findRootMostValueAndPath(path);if(rootmost!=null){const rootMostPath=rootmost.path;let value=rootmost.value;const relativePath=newRelativePath(rootMostPath,path);value=value.updateChild(relativePath,node);return new CompoundWrite(compoundWrite.writeTree_.set(rootMostPath,value));}else{const subtree=new ImmutableTree(node);const newWriteTree=compoundWrite.writeTree_.setTree(path,subtree);return new CompoundWrite(newWriteTree);}}}function compoundWriteAddWrites(compoundWrite,path,updates){let newWrite=compoundWrite;each(updates,(childKey,node)=>{newWrite=compoundWriteAddWrite(newWrite,pathChild(path,childKey),node);});return newWrite;}/**
 * Will remove a write at the given path and deeper paths. This will <em>not</em> modify a write at a higher
 * location, which must be removed by calling this method with that path.
 *
 * @param compoundWrite - The CompoundWrite to remove.
 * @param path - The path at which a write and all deeper writes should be removed
 * @returns The new CompoundWrite with the removed path
 */function compoundWriteRemoveWrite(compoundWrite,path){if(pathIsEmpty(path)){return CompoundWrite.empty();}else{const newWriteTree=compoundWrite.writeTree_.setTree(path,new ImmutableTree(null));return new CompoundWrite(newWriteTree);}}/**
 * Returns whether this CompoundWrite will fully overwrite a node at a given location and can therefore be
 * considered "complete".
 *
 * @param compoundWrite - The CompoundWrite to check.
 * @param path - The path to check for
 * @returns Whether there is a complete write at that path
 */function compoundWriteHasCompleteWrite(compoundWrite,path){return compoundWriteGetCompleteNode(compoundWrite,path)!=null;}/**
 * Returns a node for a path if and only if the node is a "complete" overwrite at that path. This will not aggregate
 * writes from deeper paths, but will return child nodes from a more shallow path.
 *
 * @param compoundWrite - The CompoundWrite to get the node from.
 * @param path - The path to get a complete write
 * @returns The node if complete at that path, or null otherwise.
 */function compoundWriteGetCompleteNode(compoundWrite,path){const rootmost=compoundWrite.writeTree_.findRootMostValueAndPath(path);if(rootmost!=null){return compoundWrite.writeTree_.get(rootmost.path).getChild(newRelativePath(rootmost.path,path));}else{return null;}}/**
 * Returns all children that are guaranteed to be a complete overwrite.
 *
 * @param compoundWrite - The CompoundWrite to get children from.
 * @returns A list of all complete children.
 */function compoundWriteGetCompleteChildren(compoundWrite){const children=[];const node=compoundWrite.writeTree_.value;if(node!=null){// If it's a leaf node, it has no children; so nothing to do.
if(!node.isLeafNode()){node.forEachChild(PRIORITY_INDEX,(childName,childNode)=>{children.push(new NamedNode(childName,childNode));});}}else{compoundWrite.writeTree_.children.inorderTraversal((childName,childTree)=>{if(childTree.value!=null){children.push(new NamedNode(childName,childTree.value));}});}return children;}function compoundWriteChildCompoundWrite(compoundWrite,path){if(pathIsEmpty(path)){return compoundWrite;}else{const shadowingNode=compoundWriteGetCompleteNode(compoundWrite,path);if(shadowingNode!=null){return new CompoundWrite(new ImmutableTree(shadowingNode));}else{return new CompoundWrite(compoundWrite.writeTree_.subtree(path));}}}/**
 * Returns true if this CompoundWrite is empty and therefore does not modify any nodes.
 * @returns Whether this CompoundWrite is empty
 */function compoundWriteIsEmpty(compoundWrite){return compoundWrite.writeTree_.isEmpty();}/**
 * Applies this CompoundWrite to a node. The node is returned with all writes from this CompoundWrite applied to the
 * node
 * @param node - The node to apply this CompoundWrite to
 * @returns The node with all writes applied
 */function compoundWriteApply(compoundWrite,node){return applySubtreeWrite(newEmptyPath(),compoundWrite.writeTree_,node);}function applySubtreeWrite(relativePath,writeTree,node){if(writeTree.value!=null){// Since there a write is always a leaf, we're done here
return node.updateChild(relativePath,writeTree.value);}else{let priorityWrite=null;writeTree.children.inorderTraversal((childKey,childTree)=>{if(childKey==='.priority'){// Apply priorities at the end so we don't update priorities for either empty nodes or forget
// to apply priorities to empty nodes that are later filled
(0,_util.assert)(childTree.value!==null,'Priority writes must always be leaf nodes');priorityWrite=childTree.value;}else{node=applySubtreeWrite(pathChild(relativePath,childKey),childTree,node);}});// If there was a priority write, we only apply it if the node is not empty
if(!node.getChild(relativePath).isEmpty()&&priorityWrite!==null){node=node.updateChild(pathChild(relativePath,'.priority'),priorityWrite);}return node;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Create a new WriteTreeRef for the given path. For use with a new sync point at the given path.
 *
 */function writeTreeChildWrites(writeTree,path){return newWriteTreeRef(path,writeTree);}/**
 * Record a new overwrite from user code.
 *
 * @param visible - This is set to false by some transactions. It should be excluded from event caches
 */function writeTreeAddOverwrite(writeTree,path,snap,writeId,visible){(0,_util.assert)(writeId>writeTree.lastWriteId,'Stacking an older write on top of newer ones');if(visible===undefined){visible=true;}writeTree.allWrites.push({path,snap,writeId,visible});if(visible){writeTree.visibleWrites=compoundWriteAddWrite(writeTree.visibleWrites,path,snap);}writeTree.lastWriteId=writeId;}/**
 * Record a new merge from user code.
 */function writeTreeAddMerge(writeTree,path,changedChildren,writeId){(0,_util.assert)(writeId>writeTree.lastWriteId,'Stacking an older merge on top of newer ones');writeTree.allWrites.push({path,children:changedChildren,writeId,visible:true});writeTree.visibleWrites=compoundWriteAddWrites(writeTree.visibleWrites,path,changedChildren);writeTree.lastWriteId=writeId;}function writeTreeGetWrite(writeTree,writeId){for(let i=0;i<writeTree.allWrites.length;i++){const record=writeTree.allWrites[i];if(record.writeId===writeId){return record;}}return null;}/**
 * Remove a write (either an overwrite or merge) that has been successfully acknowledge by the server. Recalculates
 * the tree if necessary.  We return true if it may have been visible, meaning views need to reevaluate.
 *
 * @returns true if the write may have been visible (meaning we'll need to reevaluate / raise
 * events as a result).
 */function writeTreeRemoveWrite(writeTree,writeId){// Note: disabling this check. It could be a transaction that preempted another transaction, and thus was applied
// out of order.
//const validClear = revert || this.allWrites_.length === 0 || writeId <= this.allWrites_[0].writeId;
//assert(validClear, "Either we don't have this write, or it's the first one in the queue");
const idx=writeTree.allWrites.findIndex(s=>{return s.writeId===writeId;});(0,_util.assert)(idx>=0,'removeWrite called with nonexistent writeId.');const writeToRemove=writeTree.allWrites[idx];writeTree.allWrites.splice(idx,1);let removedWriteWasVisible=writeToRemove.visible;let removedWriteOverlapsWithOtherWrites=false;let i=writeTree.allWrites.length-1;while(removedWriteWasVisible&&i>=0){const currentWrite=writeTree.allWrites[i];if(currentWrite.visible){if(i>=idx&&writeTreeRecordContainsPath_(currentWrite,writeToRemove.path)){// The removed write was completely shadowed by a subsequent write.
removedWriteWasVisible=false;}else if(pathContains(writeToRemove.path,currentWrite.path)){// Either we're covering some writes or they're covering part of us (depending on which came first).
removedWriteOverlapsWithOtherWrites=true;}}i--;}if(!removedWriteWasVisible){return false;}else if(removedWriteOverlapsWithOtherWrites){// There's some shadowing going on. Just rebuild the visible writes from scratch.
writeTreeResetTree_(writeTree);return true;}else{// There's no shadowing.  We can safely just remove the write(s) from visibleWrites.
if(writeToRemove.snap){writeTree.visibleWrites=compoundWriteRemoveWrite(writeTree.visibleWrites,writeToRemove.path);}else{const children=writeToRemove.children;each(children,childName=>{writeTree.visibleWrites=compoundWriteRemoveWrite(writeTree.visibleWrites,pathChild(writeToRemove.path,childName));});}return true;}}function writeTreeRecordContainsPath_(writeRecord,path){if(writeRecord.snap){return pathContains(writeRecord.path,path);}else{for(const childName in writeRecord.children){if(writeRecord.children.hasOwnProperty(childName)&&pathContains(pathChild(writeRecord.path,childName),path)){return true;}}return false;}}/**
 * Re-layer the writes and merges into a tree so we can efficiently calculate event snapshots
 */function writeTreeResetTree_(writeTree){writeTree.visibleWrites=writeTreeLayerTree_(writeTree.allWrites,writeTreeDefaultFilter_,newEmptyPath());if(writeTree.allWrites.length>0){writeTree.lastWriteId=writeTree.allWrites[writeTree.allWrites.length-1].writeId;}else{writeTree.lastWriteId=-1;}}/**
 * The default filter used when constructing the tree. Keep everything that's visible.
 */function writeTreeDefaultFilter_(write){return write.visible;}/**
 * Static method. Given an array of WriteRecords, a filter for which ones to include, and a path, construct the tree of
 * event data at that path.
 */function writeTreeLayerTree_(writes,filter,treeRoot){let compoundWrite=CompoundWrite.empty();for(let i=0;i<writes.length;++i){const write=writes[i];// Theory, a later set will either:
// a) abort a relevant transaction, so no need to worry about excluding it from calculating that transaction
// b) not be relevant to a transaction (separate branch), so again will not affect the data for that transaction
if(filter(write)){const writePath=write.path;let relativePath;if(write.snap){if(pathContains(treeRoot,writePath)){relativePath=newRelativePath(treeRoot,writePath);compoundWrite=compoundWriteAddWrite(compoundWrite,relativePath,write.snap);}else if(pathContains(writePath,treeRoot)){relativePath=newRelativePath(writePath,treeRoot);compoundWrite=compoundWriteAddWrite(compoundWrite,newEmptyPath(),write.snap.getChild(relativePath));}else;}else if(write.children){if(pathContains(treeRoot,writePath)){relativePath=newRelativePath(treeRoot,writePath);compoundWrite=compoundWriteAddWrites(compoundWrite,relativePath,write.children);}else if(pathContains(writePath,treeRoot)){relativePath=newRelativePath(writePath,treeRoot);if(pathIsEmpty(relativePath)){compoundWrite=compoundWriteAddWrites(compoundWrite,newEmptyPath(),write.children);}else{const child=(0,_util.safeGet)(write.children,pathGetFront(relativePath));if(child){// There exists a child in this node that matches the root path
const deepNode=child.getChild(pathPopFront(relativePath));compoundWrite=compoundWriteAddWrite(compoundWrite,newEmptyPath(),deepNode);}}}else;}else{throw(0,_util.assertionError)('WriteRecord should have .snap or .children');}}}return compoundWrite;}/**
 * Given optional, underlying server data, and an optional set of constraints (exclude some sets, include hidden
 * writes), attempt to calculate a complete snapshot for the given path
 *
 * @param writeIdsToExclude - An optional set to be excluded
 * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
 */function writeTreeCalcCompleteEventCache(writeTree,treePath,completeServerCache,writeIdsToExclude,includeHiddenWrites){if(!writeIdsToExclude&&!includeHiddenWrites){const shadowingNode=compoundWriteGetCompleteNode(writeTree.visibleWrites,treePath);if(shadowingNode!=null){return shadowingNode;}else{const subMerge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,treePath);if(compoundWriteIsEmpty(subMerge)){return completeServerCache;}else if(completeServerCache==null&&!compoundWriteHasCompleteWrite(subMerge,newEmptyPath())){// We wouldn't have a complete snapshot, since there's no underlying data and no complete shadow
return null;}else{const layeredCache=completeServerCache||ChildrenNode.EMPTY_NODE;return compoundWriteApply(subMerge,layeredCache);}}}else{const merge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,treePath);if(!includeHiddenWrites&&compoundWriteIsEmpty(merge)){return completeServerCache;}else{// If the server cache is null, and we don't have a complete cache, we need to return null
if(!includeHiddenWrites&&completeServerCache==null&&!compoundWriteHasCompleteWrite(merge,newEmptyPath())){return null;}else{const filter=function(write){return(write.visible||includeHiddenWrites)&&(!writeIdsToExclude||!~writeIdsToExclude.indexOf(write.writeId))&&(pathContains(write.path,treePath)||pathContains(treePath,write.path));};const mergeAtPath=writeTreeLayerTree_(writeTree.allWrites,filter,treePath);const layeredCache=completeServerCache||ChildrenNode.EMPTY_NODE;return compoundWriteApply(mergeAtPath,layeredCache);}}}}/**
 * With optional, underlying server data, attempt to return a children node of children that we have complete data for.
 * Used when creating new views, to pre-fill their complete event children snapshot.
 */function writeTreeCalcCompleteEventChildren(writeTree,treePath,completeServerChildren){let completeChildren=ChildrenNode.EMPTY_NODE;const topLevelSet=compoundWriteGetCompleteNode(writeTree.visibleWrites,treePath);if(topLevelSet){if(!topLevelSet.isLeafNode()){// we're shadowing everything. Return the children.
topLevelSet.forEachChild(PRIORITY_INDEX,(childName,childSnap)=>{completeChildren=completeChildren.updateImmediateChild(childName,childSnap);});}return completeChildren;}else if(completeServerChildren){// Layer any children we have on top of this
// We know we don't have a top-level set, so just enumerate existing children
const merge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,treePath);completeServerChildren.forEachChild(PRIORITY_INDEX,(childName,childNode)=>{const node=compoundWriteApply(compoundWriteChildCompoundWrite(merge,new Path(childName)),childNode);completeChildren=completeChildren.updateImmediateChild(childName,node);});// Add any complete children we have from the set
compoundWriteGetCompleteChildren(merge).forEach(namedNode=>{completeChildren=completeChildren.updateImmediateChild(namedNode.name,namedNode.node);});return completeChildren;}else{// We don't have anything to layer on top of. Layer on any children we have
// Note that we can return an empty snap if we have a defined delete
const merge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,treePath);compoundWriteGetCompleteChildren(merge).forEach(namedNode=>{completeChildren=completeChildren.updateImmediateChild(namedNode.name,namedNode.node);});return completeChildren;}}/**
 * Given that the underlying server data has updated, determine what, if anything, needs to be
 * applied to the event cache.
 *
 * Possibilities:
 *
 * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
 *
 * 2. Some write is completely shadowing. No events to be raised
 *
 * 3. Is partially shadowed. Events
 *
 * Either existingEventSnap or existingServerSnap must exist
 */function writeTreeCalcEventCacheAfterServerOverwrite(writeTree,treePath,childPath,existingEventSnap,existingServerSnap){(0,_util.assert)(existingEventSnap||existingServerSnap,'Either existingEventSnap or existingServerSnap must exist');const path=pathChild(treePath,childPath);if(compoundWriteHasCompleteWrite(writeTree.visibleWrites,path)){// At this point we can probably guarantee that we're in case 2, meaning no events
// May need to check visibility while doing the findRootMostValueAndPath call
return null;}else{// No complete shadowing. We're either partially shadowing or not shadowing at all.
const childMerge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,path);if(compoundWriteIsEmpty(childMerge)){// We're not shadowing at all. Case 1
return existingServerSnap.getChild(childPath);}else{// This could be more efficient if the serverNode + updates doesn't change the eventSnap
// However this is tricky to find out, since user updates don't necessary change the server
// snap, e.g. priority updates on empty nodes, or deep deletes. Another special case is if the server
// adds nodes, but doesn't change any existing writes. It is therefore not enough to
// only check if the updates change the serverNode.
// Maybe check if the merge tree contains these special cases and only do a full overwrite in that case?
return compoundWriteApply(childMerge,existingServerSnap.getChild(childPath));}}}/**
 * Returns a complete child for a given server snap after applying all user writes or null if there is no
 * complete child for this ChildKey.
 */function writeTreeCalcCompleteChild(writeTree,treePath,childKey,existingServerSnap){const path=pathChild(treePath,childKey);const shadowingNode=compoundWriteGetCompleteNode(writeTree.visibleWrites,path);if(shadowingNode!=null){return shadowingNode;}else{if(existingServerSnap.isCompleteForChild(childKey)){const childMerge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,path);return compoundWriteApply(childMerge,existingServerSnap.getNode().getImmediateChild(childKey));}else{return null;}}}/**
 * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
 * a higher path, this will return the child of that write relative to the write and this path.
 * Returns null if there is no write at this path.
 */function writeTreeShadowingWrite(writeTree,path){return compoundWriteGetCompleteNode(writeTree.visibleWrites,path);}/**
 * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
 * the window, but may now be in the window.
 */function writeTreeCalcIndexedSlice(writeTree,treePath,completeServerData,startPost,count,reverse,index){let toIterate;const merge=compoundWriteChildCompoundWrite(writeTree.visibleWrites,treePath);const shadowingNode=compoundWriteGetCompleteNode(merge,newEmptyPath());if(shadowingNode!=null){toIterate=shadowingNode;}else if(completeServerData!=null){toIterate=compoundWriteApply(merge,completeServerData);}else{// no children to iterate on
return[];}toIterate=toIterate.withIndex(index);if(!toIterate.isEmpty()&&!toIterate.isLeafNode()){const nodes=[];const cmp=index.getCompare();const iter=reverse?toIterate.getReverseIteratorFrom(startPost,index):toIterate.getIteratorFrom(startPost,index);let next=iter.getNext();while(next&&nodes.length<count){if(cmp(next,startPost)!==0){nodes.push(next);}next=iter.getNext();}return nodes;}else{return[];}}function newWriteTree(){return{visibleWrites:CompoundWrite.empty(),allWrites:[],lastWriteId:-1};}/**
 * If possible, returns a complete event cache, using the underlying server data if possible. In addition, can be used
 * to get a cache that includes hidden writes, and excludes arbitrary writes. Note that customizing the returned node
 * can lead to a more expensive calculation.
 *
 * @param writeIdsToExclude - Optional writes to exclude.
 * @param includeHiddenWrites - Defaults to false, whether or not to layer on writes with visible set to false
 */function writeTreeRefCalcCompleteEventCache(writeTreeRef,completeServerCache,writeIdsToExclude,includeHiddenWrites){return writeTreeCalcCompleteEventCache(writeTreeRef.writeTree,writeTreeRef.treePath,completeServerCache,writeIdsToExclude,includeHiddenWrites);}/**
 * If possible, returns a children node containing all of the complete children we have data for. The returned data is a
 * mix of the given server data and write data.
 *
 */function writeTreeRefCalcCompleteEventChildren(writeTreeRef,completeServerChildren){return writeTreeCalcCompleteEventChildren(writeTreeRef.writeTree,writeTreeRef.treePath,completeServerChildren);}/**
 * Given that either the underlying server data has updated or the outstanding writes have updated, determine what,
 * if anything, needs to be applied to the event cache.
 *
 * Possibilities:
 *
 * 1. No writes are shadowing. Events should be raised, the snap to be applied comes from the server data
 *
 * 2. Some write is completely shadowing. No events to be raised
 *
 * 3. Is partially shadowed. Events should be raised
 *
 * Either existingEventSnap or existingServerSnap must exist, this is validated via an assert
 *
 *
 */function writeTreeRefCalcEventCacheAfterServerOverwrite(writeTreeRef,path,existingEventSnap,existingServerSnap){return writeTreeCalcEventCacheAfterServerOverwrite(writeTreeRef.writeTree,writeTreeRef.treePath,path,existingEventSnap,existingServerSnap);}/**
 * Returns a node if there is a complete overwrite for this path. More specifically, if there is a write at
 * a higher path, this will return the child of that write relative to the write and this path.
 * Returns null if there is no write at this path.
 *
 */function writeTreeRefShadowingWrite(writeTreeRef,path){return writeTreeShadowingWrite(writeTreeRef.writeTree,pathChild(writeTreeRef.treePath,path));}/**
 * This method is used when processing child remove events on a query. If we can, we pull in children that were outside
 * the window, but may now be in the window
 */function writeTreeRefCalcIndexedSlice(writeTreeRef,completeServerData,startPost,count,reverse,index){return writeTreeCalcIndexedSlice(writeTreeRef.writeTree,writeTreeRef.treePath,completeServerData,startPost,count,reverse,index);}/**
 * Returns a complete child for a given server snap after applying all user writes or null if there is no
 * complete child for this ChildKey.
 */function writeTreeRefCalcCompleteChild(writeTreeRef,childKey,existingServerCache){return writeTreeCalcCompleteChild(writeTreeRef.writeTree,writeTreeRef.treePath,childKey,existingServerCache);}/**
 * Return a WriteTreeRef for a child.
 */function writeTreeRefChild(writeTreeRef,childName){return newWriteTreeRef(pathChild(writeTreeRef.treePath,childName),writeTreeRef.writeTree);}function newWriteTreeRef(path,writeTree){return{treePath:path,writeTree};}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ChildChangeAccumulator{constructor(){this.changeMap=new Map();}trackChildChange(change){const type=change.type;const childKey=change.childName;(0,_util.assert)(type==="child_added"/* ChangeType.CHILD_ADDED */||type==="child_changed"/* ChangeType.CHILD_CHANGED */||type==="child_removed"/* ChangeType.CHILD_REMOVED */,'Only child changes supported for tracking');(0,_util.assert)(childKey!=='.priority','Only non-priority child changes can be tracked.');const oldChange=this.changeMap.get(childKey);if(oldChange){const oldType=oldChange.type;if(type==="child_added"/* ChangeType.CHILD_ADDED */&&oldType==="child_removed"/* ChangeType.CHILD_REMOVED */){this.changeMap.set(childKey,changeChildChanged(childKey,change.snapshotNode,oldChange.snapshotNode));}else if(type==="child_removed"/* ChangeType.CHILD_REMOVED */&&oldType==="child_added"/* ChangeType.CHILD_ADDED */){this.changeMap.delete(childKey);}else if(type==="child_removed"/* ChangeType.CHILD_REMOVED */&&oldType==="child_changed"/* ChangeType.CHILD_CHANGED */){this.changeMap.set(childKey,changeChildRemoved(childKey,oldChange.oldSnap));}else if(type==="child_changed"/* ChangeType.CHILD_CHANGED */&&oldType==="child_added"/* ChangeType.CHILD_ADDED */){this.changeMap.set(childKey,changeChildAdded(childKey,change.snapshotNode));}else if(type==="child_changed"/* ChangeType.CHILD_CHANGED */&&oldType==="child_changed"/* ChangeType.CHILD_CHANGED */){this.changeMap.set(childKey,changeChildChanged(childKey,change.snapshotNode,oldChange.oldSnap));}else{throw(0,_util.assertionError)('Illegal combination of changes: '+change+' occurred after '+oldChange);}}else{this.changeMap.set(childKey,change);}}getChanges(){return Array.from(this.changeMap.values());}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An implementation of CompleteChildSource that never returns any additional children
 */ // eslint-disable-next-line @typescript-eslint/naming-convention
class NoCompleteChildSource_{getCompleteChild(childKey){return null;}getChildAfterChild(index,child,reverse){return null;}}/**
 * Singleton instance.
 */const NO_COMPLETE_CHILD_SOURCE=new NoCompleteChildSource_();/**
 * An implementation of CompleteChildSource that uses a WriteTree in addition to any other server data or
 * old event caches available to calculate complete children.
 */class WriteTreeCompleteChildSource{constructor(writes_,viewCache_,optCompleteServerCache_=null){this.writes_=writes_;this.viewCache_=viewCache_;this.optCompleteServerCache_=optCompleteServerCache_;}getCompleteChild(childKey){const node=this.viewCache_.eventCache;if(node.isCompleteForChild(childKey)){return node.getNode().getImmediateChild(childKey);}else{const serverNode=this.optCompleteServerCache_!=null?new CacheNode(this.optCompleteServerCache_,true,false):this.viewCache_.serverCache;return writeTreeRefCalcCompleteChild(this.writes_,childKey,serverNode);}}getChildAfterChild(index,child,reverse){const completeServerData=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:viewCacheGetCompleteServerSnap(this.viewCache_);const nodes=writeTreeRefCalcIndexedSlice(this.writes_,completeServerData,child,1,reverse,index);if(nodes.length===0){return null;}else{return nodes[0];}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function newViewProcessor(filter){return{filter};}function viewProcessorAssertIndexed(viewProcessor,viewCache){(0,_util.assert)(viewCache.eventCache.getNode().isIndexed(viewProcessor.filter.getIndex()),'Event snap not indexed');(0,_util.assert)(viewCache.serverCache.getNode().isIndexed(viewProcessor.filter.getIndex()),'Server snap not indexed');}function viewProcessorApplyOperation(viewProcessor,oldViewCache,operation,writesCache,completeCache){const accumulator=new ChildChangeAccumulator();let newViewCache,filterServerNode;if(operation.type===OperationType.OVERWRITE){const overwrite=operation;if(overwrite.source.fromUser){newViewCache=viewProcessorApplyUserOverwrite(viewProcessor,oldViewCache,overwrite.path,overwrite.snap,writesCache,completeCache,accumulator);}else{(0,_util.assert)(overwrite.source.fromServer,'Unknown source.');// We filter the node if it's a tagged update or the node has been previously filtered  and the
// update is not at the root in which case it is ok (and necessary) to mark the node unfiltered
// again
filterServerNode=overwrite.source.tagged||oldViewCache.serverCache.isFiltered()&&!pathIsEmpty(overwrite.path);newViewCache=viewProcessorApplyServerOverwrite(viewProcessor,oldViewCache,overwrite.path,overwrite.snap,writesCache,completeCache,filterServerNode,accumulator);}}else if(operation.type===OperationType.MERGE){const merge=operation;if(merge.source.fromUser){newViewCache=viewProcessorApplyUserMerge(viewProcessor,oldViewCache,merge.path,merge.children,writesCache,completeCache,accumulator);}else{(0,_util.assert)(merge.source.fromServer,'Unknown source.');// We filter the node if it's a tagged update or the node has been previously filtered
filterServerNode=merge.source.tagged||oldViewCache.serverCache.isFiltered();newViewCache=viewProcessorApplyServerMerge(viewProcessor,oldViewCache,merge.path,merge.children,writesCache,completeCache,filterServerNode,accumulator);}}else if(operation.type===OperationType.ACK_USER_WRITE){const ackUserWrite=operation;if(!ackUserWrite.revert){newViewCache=viewProcessorAckUserWrite(viewProcessor,oldViewCache,ackUserWrite.path,ackUserWrite.affectedTree,writesCache,completeCache,accumulator);}else{newViewCache=viewProcessorRevertUserWrite(viewProcessor,oldViewCache,ackUserWrite.path,writesCache,completeCache,accumulator);}}else if(operation.type===OperationType.LISTEN_COMPLETE){newViewCache=viewProcessorListenComplete(viewProcessor,oldViewCache,operation.path,writesCache,accumulator);}else{throw(0,_util.assertionError)('Unknown operation type: '+operation.type);}const changes=accumulator.getChanges();viewProcessorMaybeAddValueEvent(oldViewCache,newViewCache,changes);return{viewCache:newViewCache,changes};}function viewProcessorMaybeAddValueEvent(oldViewCache,newViewCache,accumulator){const eventSnap=newViewCache.eventCache;if(eventSnap.isFullyInitialized()){const isLeafOrEmpty=eventSnap.getNode().isLeafNode()||eventSnap.getNode().isEmpty();const oldCompleteSnap=viewCacheGetCompleteEventSnap(oldViewCache);if(accumulator.length>0||!oldViewCache.eventCache.isFullyInitialized()||isLeafOrEmpty&&!eventSnap.getNode().equals(oldCompleteSnap)||!eventSnap.getNode().getPriority().equals(oldCompleteSnap.getPriority())){accumulator.push(changeValue(viewCacheGetCompleteEventSnap(newViewCache)));}}}function viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor,viewCache,changePath,writesCache,source,accumulator){const oldEventSnap=viewCache.eventCache;if(writeTreeRefShadowingWrite(writesCache,changePath)!=null){// we have a shadowing write, ignore changes
return viewCache;}else{let newEventCache,serverNode;if(pathIsEmpty(changePath)){// TODO: figure out how this plays with "sliding ack windows"
(0,_util.assert)(viewCache.serverCache.isFullyInitialized(),'If change path is empty, we must have complete server data');if(viewCache.serverCache.isFiltered()){// We need to special case this, because we need to only apply writes to complete children, or
// we might end up raising events for incomplete children. If the server data is filtered deep
// writes cannot be guaranteed to be complete
const serverCache=viewCacheGetCompleteServerSnap(viewCache);const completeChildren=serverCache instanceof ChildrenNode?serverCache:ChildrenNode.EMPTY_NODE;const completeEventChildren=writeTreeRefCalcCompleteEventChildren(writesCache,completeChildren);newEventCache=viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(),completeEventChildren,accumulator);}else{const completeNode=writeTreeRefCalcCompleteEventCache(writesCache,viewCacheGetCompleteServerSnap(viewCache));newEventCache=viewProcessor.filter.updateFullNode(viewCache.eventCache.getNode(),completeNode,accumulator);}}else{const childKey=pathGetFront(changePath);if(childKey==='.priority'){(0,_util.assert)(pathGetLength(changePath)===1,"Can't have a priority with additional path components");const oldEventNode=oldEventSnap.getNode();serverNode=viewCache.serverCache.getNode();// we might have overwrites for this priority
const updatedPriority=writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache,changePath,oldEventNode,serverNode);if(updatedPriority!=null){newEventCache=viewProcessor.filter.updatePriority(oldEventNode,updatedPriority);}else{// priority didn't change, keep old node
newEventCache=oldEventSnap.getNode();}}else{const childChangePath=pathPopFront(changePath);// update child
let newEventChild;if(oldEventSnap.isCompleteForChild(childKey)){serverNode=viewCache.serverCache.getNode();const eventChildUpdate=writeTreeRefCalcEventCacheAfterServerOverwrite(writesCache,changePath,oldEventSnap.getNode(),serverNode);if(eventChildUpdate!=null){newEventChild=oldEventSnap.getNode().getImmediateChild(childKey).updateChild(childChangePath,eventChildUpdate);}else{// Nothing changed, just keep the old child
newEventChild=oldEventSnap.getNode().getImmediateChild(childKey);}}else{newEventChild=writeTreeRefCalcCompleteChild(writesCache,childKey,viewCache.serverCache);}if(newEventChild!=null){newEventCache=viewProcessor.filter.updateChild(oldEventSnap.getNode(),childKey,newEventChild,childChangePath,source,accumulator);}else{// no complete child available or no change
newEventCache=oldEventSnap.getNode();}}}return viewCacheUpdateEventSnap(viewCache,newEventCache,oldEventSnap.isFullyInitialized()||pathIsEmpty(changePath),viewProcessor.filter.filtersNodes());}}function viewProcessorApplyServerOverwrite(viewProcessor,oldViewCache,changePath,changedSnap,writesCache,completeCache,filterServerNode,accumulator){const oldServerSnap=oldViewCache.serverCache;let newServerCache;const serverFilter=filterServerNode?viewProcessor.filter:viewProcessor.filter.getIndexedFilter();if(pathIsEmpty(changePath)){newServerCache=serverFilter.updateFullNode(oldServerSnap.getNode(),changedSnap,null);}else if(serverFilter.filtersNodes()&&!oldServerSnap.isFiltered()){// we want to filter the server node, but we didn't filter the server node yet, so simulate a full update
const newServerNode=oldServerSnap.getNode().updateChild(changePath,changedSnap);newServerCache=serverFilter.updateFullNode(oldServerSnap.getNode(),newServerNode,null);}else{const childKey=pathGetFront(changePath);if(!oldServerSnap.isCompleteForPath(changePath)&&pathGetLength(changePath)>1){// We don't update incomplete nodes with updates intended for other listeners
return oldViewCache;}const childChangePath=pathPopFront(changePath);const childNode=oldServerSnap.getNode().getImmediateChild(childKey);const newChildNode=childNode.updateChild(childChangePath,changedSnap);if(childKey==='.priority'){newServerCache=serverFilter.updatePriority(oldServerSnap.getNode(),newChildNode);}else{newServerCache=serverFilter.updateChild(oldServerSnap.getNode(),childKey,newChildNode,childChangePath,NO_COMPLETE_CHILD_SOURCE,null);}}const newViewCache=viewCacheUpdateServerSnap(oldViewCache,newServerCache,oldServerSnap.isFullyInitialized()||pathIsEmpty(changePath),serverFilter.filtersNodes());const source=new WriteTreeCompleteChildSource(writesCache,newViewCache,completeCache);return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor,newViewCache,changePath,writesCache,source,accumulator);}function viewProcessorApplyUserOverwrite(viewProcessor,oldViewCache,changePath,changedSnap,writesCache,completeCache,accumulator){const oldEventSnap=oldViewCache.eventCache;let newViewCache,newEventCache;const source=new WriteTreeCompleteChildSource(writesCache,oldViewCache,completeCache);if(pathIsEmpty(changePath)){newEventCache=viewProcessor.filter.updateFullNode(oldViewCache.eventCache.getNode(),changedSnap,accumulator);newViewCache=viewCacheUpdateEventSnap(oldViewCache,newEventCache,true,viewProcessor.filter.filtersNodes());}else{const childKey=pathGetFront(changePath);if(childKey==='.priority'){newEventCache=viewProcessor.filter.updatePriority(oldViewCache.eventCache.getNode(),changedSnap);newViewCache=viewCacheUpdateEventSnap(oldViewCache,newEventCache,oldEventSnap.isFullyInitialized(),oldEventSnap.isFiltered());}else{const childChangePath=pathPopFront(changePath);const oldChild=oldEventSnap.getNode().getImmediateChild(childKey);let newChild;if(pathIsEmpty(childChangePath)){// Child overwrite, we can replace the child
newChild=changedSnap;}else{const childNode=source.getCompleteChild(childKey);if(childNode!=null){if(pathGetBack(childChangePath)==='.priority'&&childNode.getChild(pathParent(childChangePath)).isEmpty()){// This is a priority update on an empty node. If this node exists on the server, the
// server will send down the priority in the update, so ignore for now
newChild=childNode;}else{newChild=childNode.updateChild(childChangePath,changedSnap);}}else{// There is no complete child node available
newChild=ChildrenNode.EMPTY_NODE;}}if(!oldChild.equals(newChild)){const newEventSnap=viewProcessor.filter.updateChild(oldEventSnap.getNode(),childKey,newChild,childChangePath,source,accumulator);newViewCache=viewCacheUpdateEventSnap(oldViewCache,newEventSnap,oldEventSnap.isFullyInitialized(),viewProcessor.filter.filtersNodes());}else{newViewCache=oldViewCache;}}}return newViewCache;}function viewProcessorCacheHasChild(viewCache,childKey){return viewCache.eventCache.isCompleteForChild(childKey);}function viewProcessorApplyUserMerge(viewProcessor,viewCache,path,changedChildren,writesCache,serverCache,accumulator){// HACK: In the case of a limit query, there may be some changes that bump things out of the
// window leaving room for new items.  It's important we process these changes first, so we
// iterate the changes twice, first processing any that affect items currently in view.
// TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
// and event snap.  I'm not sure if this will result in edge cases when a child is in one but
// not the other.
let curViewCache=viewCache;changedChildren.foreach((relativePath,childNode)=>{const writePath=pathChild(path,relativePath);if(viewProcessorCacheHasChild(viewCache,pathGetFront(writePath))){curViewCache=viewProcessorApplyUserOverwrite(viewProcessor,curViewCache,writePath,childNode,writesCache,serverCache,accumulator);}});changedChildren.foreach((relativePath,childNode)=>{const writePath=pathChild(path,relativePath);if(!viewProcessorCacheHasChild(viewCache,pathGetFront(writePath))){curViewCache=viewProcessorApplyUserOverwrite(viewProcessor,curViewCache,writePath,childNode,writesCache,serverCache,accumulator);}});return curViewCache;}function viewProcessorApplyMerge(viewProcessor,node,merge){merge.foreach((relativePath,childNode)=>{node=node.updateChild(relativePath,childNode);});return node;}function viewProcessorApplyServerMerge(viewProcessor,viewCache,path,changedChildren,writesCache,serverCache,filterServerNode,accumulator){// If we don't have a cache yet, this merge was intended for a previously listen in the same location. Ignore it and
// wait for the complete data update coming soon.
if(viewCache.serverCache.getNode().isEmpty()&&!viewCache.serverCache.isFullyInitialized()){return viewCache;}// HACK: In the case of a limit query, there may be some changes that bump things out of the
// window leaving room for new items.  It's important we process these changes first, so we
// iterate the changes twice, first processing any that affect items currently in view.
// TODO: I consider an item "in view" if cacheHasChild is true, which checks both the server
// and event snap.  I'm not sure if this will result in edge cases when a child is in one but
// not the other.
let curViewCache=viewCache;let viewMergeTree;if(pathIsEmpty(path)){viewMergeTree=changedChildren;}else{viewMergeTree=new ImmutableTree(null).setTree(path,changedChildren);}const serverNode=viewCache.serverCache.getNode();viewMergeTree.children.inorderTraversal((childKey,childTree)=>{if(serverNode.hasChild(childKey)){const serverChild=viewCache.serverCache.getNode().getImmediateChild(childKey);const newChild=viewProcessorApplyMerge(viewProcessor,serverChild,childTree);curViewCache=viewProcessorApplyServerOverwrite(viewProcessor,curViewCache,new Path(childKey),newChild,writesCache,serverCache,filterServerNode,accumulator);}});viewMergeTree.children.inorderTraversal((childKey,childMergeTree)=>{const isUnknownDeepMerge=!viewCache.serverCache.isCompleteForChild(childKey)&&childMergeTree.value===null;if(!serverNode.hasChild(childKey)&&!isUnknownDeepMerge){const serverChild=viewCache.serverCache.getNode().getImmediateChild(childKey);const newChild=viewProcessorApplyMerge(viewProcessor,serverChild,childMergeTree);curViewCache=viewProcessorApplyServerOverwrite(viewProcessor,curViewCache,new Path(childKey),newChild,writesCache,serverCache,filterServerNode,accumulator);}});return curViewCache;}function viewProcessorAckUserWrite(viewProcessor,viewCache,ackPath,affectedTree,writesCache,completeCache,accumulator){if(writeTreeRefShadowingWrite(writesCache,ackPath)!=null){return viewCache;}// Only filter server node if it is currently filtered
const filterServerNode=viewCache.serverCache.isFiltered();// Essentially we'll just get our existing server cache for the affected paths and re-apply it as a server update
// now that it won't be shadowed.
const serverCache=viewCache.serverCache;if(affectedTree.value!=null){// This is an overwrite.
if(pathIsEmpty(ackPath)&&serverCache.isFullyInitialized()||serverCache.isCompleteForPath(ackPath)){return viewProcessorApplyServerOverwrite(viewProcessor,viewCache,ackPath,serverCache.getNode().getChild(ackPath),writesCache,completeCache,filterServerNode,accumulator);}else if(pathIsEmpty(ackPath)){// This is a goofy edge case where we are acking data at this location but don't have full data.  We
// should just re-apply whatever we have in our cache as a merge.
let changedChildren=new ImmutableTree(null);serverCache.getNode().forEachChild(KEY_INDEX,(name,node)=>{changedChildren=changedChildren.set(new Path(name),node);});return viewProcessorApplyServerMerge(viewProcessor,viewCache,ackPath,changedChildren,writesCache,completeCache,filterServerNode,accumulator);}else{return viewCache;}}else{// This is a merge.
let changedChildren=new ImmutableTree(null);affectedTree.foreach((mergePath,value)=>{const serverCachePath=pathChild(ackPath,mergePath);if(serverCache.isCompleteForPath(serverCachePath)){changedChildren=changedChildren.set(mergePath,serverCache.getNode().getChild(serverCachePath));}});return viewProcessorApplyServerMerge(viewProcessor,viewCache,ackPath,changedChildren,writesCache,completeCache,filterServerNode,accumulator);}}function viewProcessorListenComplete(viewProcessor,viewCache,path,writesCache,accumulator){const oldServerNode=viewCache.serverCache;const newViewCache=viewCacheUpdateServerSnap(viewCache,oldServerNode.getNode(),oldServerNode.isFullyInitialized()||pathIsEmpty(path),oldServerNode.isFiltered());return viewProcessorGenerateEventCacheAfterServerEvent(viewProcessor,newViewCache,path,writesCache,NO_COMPLETE_CHILD_SOURCE,accumulator);}function viewProcessorRevertUserWrite(viewProcessor,viewCache,path,writesCache,completeServerCache,accumulator){let complete;if(writeTreeRefShadowingWrite(writesCache,path)!=null){return viewCache;}else{const source=new WriteTreeCompleteChildSource(writesCache,viewCache,completeServerCache);const oldEventCache=viewCache.eventCache.getNode();let newEventCache;if(pathIsEmpty(path)||pathGetFront(path)==='.priority'){let newNode;if(viewCache.serverCache.isFullyInitialized()){newNode=writeTreeRefCalcCompleteEventCache(writesCache,viewCacheGetCompleteServerSnap(viewCache));}else{const serverChildren=viewCache.serverCache.getNode();(0,_util.assert)(serverChildren instanceof ChildrenNode,'serverChildren would be complete if leaf node');newNode=writeTreeRefCalcCompleteEventChildren(writesCache,serverChildren);}newNode=newNode;newEventCache=viewProcessor.filter.updateFullNode(oldEventCache,newNode,accumulator);}else{const childKey=pathGetFront(path);let newChild=writeTreeRefCalcCompleteChild(writesCache,childKey,viewCache.serverCache);if(newChild==null&&viewCache.serverCache.isCompleteForChild(childKey)){newChild=oldEventCache.getImmediateChild(childKey);}if(newChild!=null){newEventCache=viewProcessor.filter.updateChild(oldEventCache,childKey,newChild,pathPopFront(path),source,accumulator);}else if(viewCache.eventCache.getNode().hasChild(childKey)){// No complete child available, delete the existing one, if any
newEventCache=viewProcessor.filter.updateChild(oldEventCache,childKey,ChildrenNode.EMPTY_NODE,pathPopFront(path),source,accumulator);}else{newEventCache=oldEventCache;}if(newEventCache.isEmpty()&&viewCache.serverCache.isFullyInitialized()){// We might have reverted all child writes. Maybe the old event was a leaf node
complete=writeTreeRefCalcCompleteEventCache(writesCache,viewCacheGetCompleteServerSnap(viewCache));if(complete.isLeafNode()){newEventCache=viewProcessor.filter.updateFullNode(newEventCache,complete,accumulator);}}}complete=viewCache.serverCache.isFullyInitialized()||writeTreeRefShadowingWrite(writesCache,newEmptyPath())!=null;return viewCacheUpdateEventSnap(viewCache,newEventCache,complete,viewProcessor.filter.filtersNodes());}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A view represents a specific location and query that has 1 or more event registrations.
 *
 * It does several things:
 *  - Maintains the list of event registrations for this location/query.
 *  - Maintains a cache of the data visible for this location/query.
 *  - Applies new operations (via applyOperation), updates the cache, and based on the event
 *    registrations returns the set of events to be raised.
 */class View{constructor(query_,initialViewCache){this.query_=query_;this.eventRegistrations_=[];const params=this.query_._queryParams;const indexFilter=new IndexedFilter(params.getIndex());const filter=queryParamsGetNodeFilter(params);this.processor_=newViewProcessor(filter);const initialServerCache=initialViewCache.serverCache;const initialEventCache=initialViewCache.eventCache;// Don't filter server node with other filter than index, wait for tagged listen
const serverSnap=indexFilter.updateFullNode(ChildrenNode.EMPTY_NODE,initialServerCache.getNode(),null);const eventSnap=filter.updateFullNode(ChildrenNode.EMPTY_NODE,initialEventCache.getNode(),null);const newServerCache=new CacheNode(serverSnap,initialServerCache.isFullyInitialized(),indexFilter.filtersNodes());const newEventCache=new CacheNode(eventSnap,initialEventCache.isFullyInitialized(),filter.filtersNodes());this.viewCache_=newViewCache(newEventCache,newServerCache);this.eventGenerator_=new EventGenerator(this.query_);}get query(){return this.query_;}}function viewGetServerCache(view){return view.viewCache_.serverCache.getNode();}function viewGetCompleteNode(view){return viewCacheGetCompleteEventSnap(view.viewCache_);}function viewGetCompleteServerCache(view,path){const cache=viewCacheGetCompleteServerSnap(view.viewCache_);if(cache){// If this isn't a "loadsAllData" view, then cache isn't actually a complete cache and
// we need to see if it contains the child we're interested in.
if(view.query._queryParams.loadsAllData()||!pathIsEmpty(path)&&!cache.getImmediateChild(pathGetFront(path)).isEmpty()){return cache.getChild(path);}}return null;}function viewIsEmpty(view){return view.eventRegistrations_.length===0;}function viewAddEventRegistration(view,eventRegistration){view.eventRegistrations_.push(eventRegistration);}/**
 * @param eventRegistration - If null, remove all callbacks.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @returns Cancel events, if cancelError was provided.
 */function viewRemoveEventRegistration(view,eventRegistration,cancelError){const cancelEvents=[];if(cancelError){(0,_util.assert)(eventRegistration==null,'A cancel should cancel all event registrations.');const path=view.query._path;view.eventRegistrations_.forEach(registration=>{const maybeEvent=registration.createCancelEvent(cancelError,path);if(maybeEvent){cancelEvents.push(maybeEvent);}});}if(eventRegistration){let remaining=[];for(let i=0;i<view.eventRegistrations_.length;++i){const existing=view.eventRegistrations_[i];if(!existing.matches(eventRegistration)){remaining.push(existing);}else if(eventRegistration.hasAnyCallback()){// We're removing just this one
remaining=remaining.concat(view.eventRegistrations_.slice(i+1));break;}}view.eventRegistrations_=remaining;}else{view.eventRegistrations_=[];}return cancelEvents;}/**
 * Applies the given Operation, updates our cache, and returns the appropriate events.
 */function viewApplyOperation(view,operation,writesCache,completeServerCache){if(operation.type===OperationType.MERGE&&operation.source.queryId!==null){(0,_util.assert)(viewCacheGetCompleteServerSnap(view.viewCache_),'We should always have a full cache before handling merges');(0,_util.assert)(viewCacheGetCompleteEventSnap(view.viewCache_),'Missing event cache, even though we have a server cache');}const oldViewCache=view.viewCache_;const result=viewProcessorApplyOperation(view.processor_,oldViewCache,operation,writesCache,completeServerCache);viewProcessorAssertIndexed(view.processor_,result.viewCache);(0,_util.assert)(result.viewCache.serverCache.isFullyInitialized()||!oldViewCache.serverCache.isFullyInitialized(),'Once a server snap is complete, it should never go back');view.viewCache_=result.viewCache;return viewGenerateEventsForChanges_(view,result.changes,result.viewCache.eventCache.getNode(),null);}function viewGetInitialEvents(view,registration){const eventSnap=view.viewCache_.eventCache;const initialChanges=[];if(!eventSnap.getNode().isLeafNode()){const eventNode=eventSnap.getNode();eventNode.forEachChild(PRIORITY_INDEX,(key,childNode)=>{initialChanges.push(changeChildAdded(key,childNode));});}if(eventSnap.isFullyInitialized()){initialChanges.push(changeValue(eventSnap.getNode()));}return viewGenerateEventsForChanges_(view,initialChanges,eventSnap.getNode(),registration);}function viewGenerateEventsForChanges_(view,changes,eventCache,eventRegistration){const registrations=eventRegistration?[eventRegistration]:view.eventRegistrations_;return eventGeneratorGenerateEventsForChanges(view.eventGenerator_,changes,eventCache,registrations);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let referenceConstructor$1;/**
 * SyncPoint represents a single location in a SyncTree with 1 or more event registrations, meaning we need to
 * maintain 1 or more Views at this location to cache server data and raise appropriate events for server changes
 * and user writes (set, transaction, update).
 *
 * It's responsible for:
 *  - Maintaining the set of 1 or more views necessary at this location (a SyncPoint with 0 views should be removed).
 *  - Proxying user / server operations to the views as appropriate (i.e. applyServerOverwrite,
 *    applyUserOverwrite, etc.)
 */class SyncPoint{constructor(){/**
         * The Views being tracked at this location in the tree, stored as a map where the key is a
         * queryId and the value is the View for that query.
         *
         * NOTE: This list will be quite small (usually 1, but perhaps 2 or 3; any more is an odd use case).
         */this.views=new Map();}}function syncPointSetReferenceConstructor(val){(0,_util.assert)(!referenceConstructor$1,'__referenceConstructor has already been defined');referenceConstructor$1=val;}function syncPointGetReferenceConstructor(){(0,_util.assert)(referenceConstructor$1,'Reference.ts has not been loaded');return referenceConstructor$1;}function syncPointIsEmpty(syncPoint){return syncPoint.views.size===0;}function syncPointApplyOperation(syncPoint,operation,writesCache,optCompleteServerCache){const queryId=operation.source.queryId;if(queryId!==null){const view=syncPoint.views.get(queryId);(0,_util.assert)(view!=null,'SyncTree gave us an op for an invalid query.');return viewApplyOperation(view,operation,writesCache,optCompleteServerCache);}else{let events=[];for(const view of syncPoint.views.values()){events=events.concat(viewApplyOperation(view,operation,writesCache,optCompleteServerCache));}return events;}}/**
 * Get a view for the specified query.
 *
 * @param query - The query to return a view for
 * @param writesCache
 * @param serverCache
 * @param serverCacheComplete
 * @returns Events to raise.
 */function syncPointGetView(syncPoint,query,writesCache,serverCache,serverCacheComplete){const queryId=query._queryIdentifier;const view=syncPoint.views.get(queryId);if(!view){// TODO: make writesCache take flag for complete server node
let eventCache=writeTreeRefCalcCompleteEventCache(writesCache,serverCacheComplete?serverCache:null);let eventCacheComplete=false;if(eventCache){eventCacheComplete=true;}else if(serverCache instanceof ChildrenNode){eventCache=writeTreeRefCalcCompleteEventChildren(writesCache,serverCache);eventCacheComplete=false;}else{eventCache=ChildrenNode.EMPTY_NODE;eventCacheComplete=false;}const viewCache=newViewCache(new CacheNode(eventCache,eventCacheComplete,false),new CacheNode(serverCache,serverCacheComplete,false));return new View(query,viewCache);}return view;}/**
 * Add an event callback for the specified query.
 *
 * @param query
 * @param eventRegistration
 * @param writesCache
 * @param serverCache - Complete server cache, if we have it.
 * @param serverCacheComplete
 * @returns Events to raise.
 */function syncPointAddEventRegistration(syncPoint,query,eventRegistration,writesCache,serverCache,serverCacheComplete){const view=syncPointGetView(syncPoint,query,writesCache,serverCache,serverCacheComplete);if(!syncPoint.views.has(query._queryIdentifier)){syncPoint.views.set(query._queryIdentifier,view);}// This is guaranteed to exist now, we just created anything that was missing
viewAddEventRegistration(view,eventRegistration);return viewGetInitialEvents(view,eventRegistration);}/**
 * Remove event callback(s).  Return cancelEvents if a cancelError is specified.
 *
 * If query is the default query, we'll check all views for the specified eventRegistration.
 * If eventRegistration is null, we'll remove all callbacks for the specified view(s).
 *
 * @param eventRegistration - If null, remove all callbacks.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @returns removed queries and any cancel events
 */function syncPointRemoveEventRegistration(syncPoint,query,eventRegistration,cancelError){const queryId=query._queryIdentifier;const removed=[];let cancelEvents=[];const hadCompleteView=syncPointHasCompleteView(syncPoint);if(queryId==='default'){// When you do ref.off(...), we search all views for the registration to remove.
for(const[viewQueryId,view]of syncPoint.views.entries()){cancelEvents=cancelEvents.concat(viewRemoveEventRegistration(view,eventRegistration,cancelError));if(viewIsEmpty(view)){syncPoint.views.delete(viewQueryId);// We'll deal with complete views later.
if(!view.query._queryParams.loadsAllData()){removed.push(view.query);}}}}else{// remove the callback from the specific view.
const view=syncPoint.views.get(queryId);if(view){cancelEvents=cancelEvents.concat(viewRemoveEventRegistration(view,eventRegistration,cancelError));if(viewIsEmpty(view)){syncPoint.views.delete(queryId);// We'll deal with complete views later.
if(!view.query._queryParams.loadsAllData()){removed.push(view.query);}}}}if(hadCompleteView&&!syncPointHasCompleteView(syncPoint)){// We removed our last complete view.
removed.push(new(syncPointGetReferenceConstructor())(query._repo,query._path));}return{removed,events:cancelEvents};}function syncPointGetQueryViews(syncPoint){const result=[];for(const view of syncPoint.views.values()){if(!view.query._queryParams.loadsAllData()){result.push(view);}}return result;}/**
 * @param path - The path to the desired complete snapshot
 * @returns A complete cache, if it exists
 */function syncPointGetCompleteServerCache(syncPoint,path){let serverCache=null;for(const view of syncPoint.views.values()){serverCache=serverCache||viewGetCompleteServerCache(view,path);}return serverCache;}function syncPointViewForQuery(syncPoint,query){const params=query._queryParams;if(params.loadsAllData()){return syncPointGetCompleteView(syncPoint);}else{const queryId=query._queryIdentifier;return syncPoint.views.get(queryId);}}function syncPointViewExistsForQuery(syncPoint,query){return syncPointViewForQuery(syncPoint,query)!=null;}function syncPointHasCompleteView(syncPoint){return syncPointGetCompleteView(syncPoint)!=null;}function syncPointGetCompleteView(syncPoint){for(const view of syncPoint.views.values()){if(view.query._queryParams.loadsAllData()){return view;}}return null;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let referenceConstructor;function syncTreeSetReferenceConstructor(val){(0,_util.assert)(!referenceConstructor,'__referenceConstructor has already been defined');referenceConstructor=val;}function syncTreeGetReferenceConstructor(){(0,_util.assert)(referenceConstructor,'Reference.ts has not been loaded');return referenceConstructor;}/**
 * Static tracker for next query tag.
 */let syncTreeNextQueryTag_=1;/**
 * SyncTree is the central class for managing event callback registration, data caching, views
 * (query processing), and event generation.  There are typically two SyncTree instances for
 * each Repo, one for the normal Firebase data, and one for the .info data.
 *
 * It has a number of responsibilities, including:
 *  - Tracking all user event callbacks (registered via addEventRegistration() and removeEventRegistration()).
 *  - Applying and caching data changes for user set(), transaction(), and update() calls
 *    (applyUserOverwrite(), applyUserMerge()).
 *  - Applying and caching data changes for server data changes (applyServerOverwrite(),
 *    applyServerMerge()).
 *  - Generating user-facing events for server and user changes (all of the apply* methods
 *    return the set of events that need to be raised as a result).
 *  - Maintaining the appropriate set of server listens to ensure we are always subscribed
 *    to the correct set of paths and queries to satisfy the current set of user event
 *    callbacks (listens are started/stopped using the provided listenProvider).
 *
 * NOTE: Although SyncTree tracks event callbacks and calculates events to raise, the actual
 * events are returned to the caller rather than raised synchronously.
 *
 */class SyncTree{/**
     * @param listenProvider_ - Used by SyncTree to start / stop listening
     *   to server data.
     */constructor(listenProvider_){this.listenProvider_=listenProvider_;/**
         * Tree of SyncPoints.  There's a SyncPoint at any location that has 1 or more views.
         */this.syncPointTree_=new ImmutableTree(null);/**
         * A tree of all pending user writes (user-initiated set()'s, transaction()'s, update()'s, etc.).
         */this.pendingWriteTree_=newWriteTree();this.tagToQueryMap=new Map();this.queryToTagMap=new Map();}}/**
 * Apply the data changes for a user-generated set() or transaction() call.
 *
 * @returns Events to raise.
 */function syncTreeApplyUserOverwrite(syncTree,path,newData,writeId,visible){// Record pending write.
writeTreeAddOverwrite(syncTree.pendingWriteTree_,path,newData,writeId,visible);if(!visible){return[];}else{return syncTreeApplyOperationToSyncPoints_(syncTree,new Overwrite(newOperationSourceUser(),path,newData));}}/**
 * Apply the data from a user-generated update() call
 *
 * @returns Events to raise.
 */function syncTreeApplyUserMerge(syncTree,path,changedChildren,writeId){// Record pending merge.
writeTreeAddMerge(syncTree.pendingWriteTree_,path,changedChildren,writeId);const changeTree=ImmutableTree.fromObject(changedChildren);return syncTreeApplyOperationToSyncPoints_(syncTree,new Merge(newOperationSourceUser(),path,changeTree));}/**
 * Acknowledge a pending user write that was previously registered with applyUserOverwrite() or applyUserMerge().
 *
 * @param revert - True if the given write failed and needs to be reverted
 * @returns Events to raise.
 */function syncTreeAckUserWrite(syncTree,writeId,revert=false){const write=writeTreeGetWrite(syncTree.pendingWriteTree_,writeId);const needToReevaluate=writeTreeRemoveWrite(syncTree.pendingWriteTree_,writeId);if(!needToReevaluate){return[];}else{let affectedTree=new ImmutableTree(null);if(write.snap!=null){// overwrite
affectedTree=affectedTree.set(newEmptyPath(),true);}else{each(write.children,pathString=>{affectedTree=affectedTree.set(new Path(pathString),true);});}return syncTreeApplyOperationToSyncPoints_(syncTree,new AckUserWrite(write.path,affectedTree,revert));}}/**
 * Apply new server data for the specified path..
 *
 * @returns Events to raise.
 */function syncTreeApplyServerOverwrite(syncTree,path,newData){return syncTreeApplyOperationToSyncPoints_(syncTree,new Overwrite(newOperationSourceServer(),path,newData));}/**
 * Apply new server data to be merged in at the specified path.
 *
 * @returns Events to raise.
 */function syncTreeApplyServerMerge(syncTree,path,changedChildren){const changeTree=ImmutableTree.fromObject(changedChildren);return syncTreeApplyOperationToSyncPoints_(syncTree,new Merge(newOperationSourceServer(),path,changeTree));}/**
 * Apply a listen complete for a query
 *
 * @returns Events to raise.
 */function syncTreeApplyListenComplete(syncTree,path){return syncTreeApplyOperationToSyncPoints_(syncTree,new ListenComplete(newOperationSourceServer(),path));}/**
 * Apply a listen complete for a tagged query
 *
 * @returns Events to raise.
 */function syncTreeApplyTaggedListenComplete(syncTree,path,tag){const queryKey=syncTreeQueryKeyForTag_(syncTree,tag);if(queryKey){const r=syncTreeParseQueryKey_(queryKey);const queryPath=r.path,queryId=r.queryId;const relativePath=newRelativePath(queryPath,path);const op=new ListenComplete(newOperationSourceServerTaggedQuery(queryId),relativePath);return syncTreeApplyTaggedOperation_(syncTree,queryPath,op);}else{// We've already removed the query. No big deal, ignore the update
return[];}}/**
 * Remove event callback(s).
 *
 * If query is the default query, we'll check all queries for the specified eventRegistration.
 * If eventRegistration is null, we'll remove all callbacks for the specified query/queries.
 *
 * @param eventRegistration - If null, all callbacks are removed.
 * @param cancelError - If a cancelError is provided, appropriate cancel events will be returned.
 * @param skipListenerDedup - When performing a `get()`, we don't add any new listeners, so no
 *  deduping needs to take place. This flag allows toggling of that behavior
 * @returns Cancel events, if cancelError was provided.
 */function syncTreeRemoveEventRegistration(syncTree,query,eventRegistration,cancelError,skipListenerDedup=false){// Find the syncPoint first. Then deal with whether or not it has matching listeners
const path=query._path;const maybeSyncPoint=syncTree.syncPointTree_.get(path);let cancelEvents=[];// A removal on a default query affects all queries at that location. A removal on an indexed query, even one without
// other query constraints, does *not* affect all queries at that location. So this check must be for 'default', and
// not loadsAllData().
if(maybeSyncPoint&&(query._queryIdentifier==='default'||syncPointViewExistsForQuery(maybeSyncPoint,query))){const removedAndEvents=syncPointRemoveEventRegistration(maybeSyncPoint,query,eventRegistration,cancelError);if(syncPointIsEmpty(maybeSyncPoint)){syncTree.syncPointTree_=syncTree.syncPointTree_.remove(path);}const removed=removedAndEvents.removed;cancelEvents=removedAndEvents.events;if(!skipListenerDedup){/**
             * We may have just removed one of many listeners and can short-circuit this whole process
             * We may also not have removed a default listener, in which case all of the descendant listeners should already be
             * properly set up.
             */ // Since indexed queries can shadow if they don't have other query constraints, check for loadsAllData(), instead of
// queryId === 'default'
const removingDefault=-1!==removed.findIndex(query=>{return query._queryParams.loadsAllData();});const covered=syncTree.syncPointTree_.findOnPath(path,(relativePath,parentSyncPoint)=>syncPointHasCompleteView(parentSyncPoint));if(removingDefault&&!covered){const subtree=syncTree.syncPointTree_.subtree(path);// There are potentially child listeners. Determine what if any listens we need to send before executing the
// removal
if(!subtree.isEmpty()){// We need to fold over our subtree and collect the listeners to send
const newViews=syncTreeCollectDistinctViewsForSubTree_(subtree);// Ok, we've collected all the listens we need. Set them up.
for(let i=0;i<newViews.length;++i){const view=newViews[i],newQuery=view.query;const listener=syncTreeCreateListenerForView_(syncTree,view);syncTree.listenProvider_.startListening(syncTreeQueryForListening_(newQuery),syncTreeTagForQuery(syncTree,newQuery),listener.hashFn,listener.onComplete);}}// Otherwise there's nothing below us, so nothing we need to start listening on
}// If we removed anything and we're not covered by a higher up listen, we need to stop listening on this query
// The above block has us covered in terms of making sure we're set up on listens lower in the tree.
// Also, note that if we have a cancelError, it's already been removed at the provider level.
if(!covered&&removed.length>0&&!cancelError){// If we removed a default, then we weren't listening on any of the other queries here. Just cancel the one
// default. Otherwise, we need to iterate through and cancel each individual query
if(removingDefault){// We don't tag default listeners
const defaultTag=null;syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(query),defaultTag);}else{removed.forEach(queryToRemove=>{const tagToRemove=syncTree.queryToTagMap.get(syncTreeMakeQueryKey_(queryToRemove));syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToRemove),tagToRemove);});}}}// Now, clear all of the tags we're tracking for the removed listens
syncTreeRemoveTags_(syncTree,removed);}return cancelEvents;}/**
 * Apply new server data for the specified tagged query.
 *
 * @returns Events to raise.
 */function syncTreeApplyTaggedQueryOverwrite(syncTree,path,snap,tag){const queryKey=syncTreeQueryKeyForTag_(syncTree,tag);if(queryKey!=null){const r=syncTreeParseQueryKey_(queryKey);const queryPath=r.path,queryId=r.queryId;const relativePath=newRelativePath(queryPath,path);const op=new Overwrite(newOperationSourceServerTaggedQuery(queryId),relativePath,snap);return syncTreeApplyTaggedOperation_(syncTree,queryPath,op);}else{// Query must have been removed already
return[];}}/**
 * Apply server data to be merged in for the specified tagged query.
 *
 * @returns Events to raise.
 */function syncTreeApplyTaggedQueryMerge(syncTree,path,changedChildren,tag){const queryKey=syncTreeQueryKeyForTag_(syncTree,tag);if(queryKey){const r=syncTreeParseQueryKey_(queryKey);const queryPath=r.path,queryId=r.queryId;const relativePath=newRelativePath(queryPath,path);const changeTree=ImmutableTree.fromObject(changedChildren);const op=new Merge(newOperationSourceServerTaggedQuery(queryId),relativePath,changeTree);return syncTreeApplyTaggedOperation_(syncTree,queryPath,op);}else{// We've already removed the query. No big deal, ignore the update
return[];}}/**
 * Add an event callback for the specified query.
 *
 * @returns Events to raise.
 */function syncTreeAddEventRegistration(syncTree,query,eventRegistration,skipSetupListener=false){const path=query._path;let serverCache=null;let foundAncestorDefaultView=false;// Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
// Consider optimizing this once there's a better understanding of what actual behavior will be.
syncTree.syncPointTree_.foreachOnPath(path,(pathToSyncPoint,sp)=>{const relativePath=newRelativePath(pathToSyncPoint,path);serverCache=serverCache||syncPointGetCompleteServerCache(sp,relativePath);foundAncestorDefaultView=foundAncestorDefaultView||syncPointHasCompleteView(sp);});let syncPoint=syncTree.syncPointTree_.get(path);if(!syncPoint){syncPoint=new SyncPoint();syncTree.syncPointTree_=syncTree.syncPointTree_.set(path,syncPoint);}else{foundAncestorDefaultView=foundAncestorDefaultView||syncPointHasCompleteView(syncPoint);serverCache=serverCache||syncPointGetCompleteServerCache(syncPoint,newEmptyPath());}let serverCacheComplete;if(serverCache!=null){serverCacheComplete=true;}else{serverCacheComplete=false;serverCache=ChildrenNode.EMPTY_NODE;const subtree=syncTree.syncPointTree_.subtree(path);subtree.foreachChild((childName,childSyncPoint)=>{const completeCache=syncPointGetCompleteServerCache(childSyncPoint,newEmptyPath());if(completeCache){serverCache=serverCache.updateImmediateChild(childName,completeCache);}});}const viewAlreadyExists=syncPointViewExistsForQuery(syncPoint,query);if(!viewAlreadyExists&&!query._queryParams.loadsAllData()){// We need to track a tag for this query
const queryKey=syncTreeMakeQueryKey_(query);(0,_util.assert)(!syncTree.queryToTagMap.has(queryKey),'View does not exist, but we have a tag');const tag=syncTreeGetNextQueryTag_();syncTree.queryToTagMap.set(queryKey,tag);syncTree.tagToQueryMap.set(tag,queryKey);}const writesCache=writeTreeChildWrites(syncTree.pendingWriteTree_,path);let events=syncPointAddEventRegistration(syncPoint,query,eventRegistration,writesCache,serverCache,serverCacheComplete);if(!viewAlreadyExists&&!foundAncestorDefaultView&&!skipSetupListener){const view=syncPointViewForQuery(syncPoint,query);events=events.concat(syncTreeSetupListener_(syncTree,query,view));}return events;}/**
 * Returns a complete cache, if we have one, of the data at a particular path. If the location does not have a
 * listener above it, we will get a false "null". This shouldn't be a problem because transactions will always
 * have a listener above, and atomic operations would correctly show a jitter of <increment value> ->
 *     <incremented total> as the write is applied locally and then acknowledged at the server.
 *
 * Note: this method will *include* hidden writes from transaction with applyLocally set to false.
 *
 * @param path - The path to the data we want
 * @param writeIdsToExclude - A specific set to be excluded
 */function syncTreeCalcCompleteEventCache(syncTree,path,writeIdsToExclude){const includeHiddenSets=true;const writeTree=syncTree.pendingWriteTree_;const serverCache=syncTree.syncPointTree_.findOnPath(path,(pathSoFar,syncPoint)=>{const relativePath=newRelativePath(pathSoFar,path);const serverCache=syncPointGetCompleteServerCache(syncPoint,relativePath);if(serverCache){return serverCache;}});return writeTreeCalcCompleteEventCache(writeTree,path,serverCache,writeIdsToExclude,includeHiddenSets);}function syncTreeGetServerValue(syncTree,query){const path=query._path;let serverCache=null;// Any covering writes will necessarily be at the root, so really all we need to find is the server cache.
// Consider optimizing this once there's a better understanding of what actual behavior will be.
syncTree.syncPointTree_.foreachOnPath(path,(pathToSyncPoint,sp)=>{const relativePath=newRelativePath(pathToSyncPoint,path);serverCache=serverCache||syncPointGetCompleteServerCache(sp,relativePath);});let syncPoint=syncTree.syncPointTree_.get(path);if(!syncPoint){syncPoint=new SyncPoint();syncTree.syncPointTree_=syncTree.syncPointTree_.set(path,syncPoint);}else{serverCache=serverCache||syncPointGetCompleteServerCache(syncPoint,newEmptyPath());}const serverCacheComplete=serverCache!=null;const serverCacheNode=serverCacheComplete?new CacheNode(serverCache,true,false):null;const writesCache=writeTreeChildWrites(syncTree.pendingWriteTree_,query._path);const view=syncPointGetView(syncPoint,query,writesCache,serverCacheComplete?serverCacheNode.getNode():ChildrenNode.EMPTY_NODE,serverCacheComplete);return viewGetCompleteNode(view);}/**
 * A helper method that visits all descendant and ancestor SyncPoints, applying the operation.
 *
 * NOTES:
 * - Descendant SyncPoints will be visited first (since we raise events depth-first).
 *
 * - We call applyOperation() on each SyncPoint passing three things:
 *   1. A version of the Operation that has been made relative to the SyncPoint location.
 *   2. A WriteTreeRef of any writes we have cached at the SyncPoint location.
 *   3. A snapshot Node with cached server data, if we have it.
 *
 * - We concatenate all of the events returned by each SyncPoint and return the result.
 */function syncTreeApplyOperationToSyncPoints_(syncTree,operation){return syncTreeApplyOperationHelper_(operation,syncTree.syncPointTree_,/*serverCache=*/null,writeTreeChildWrites(syncTree.pendingWriteTree_,newEmptyPath()));}/**
 * Recursive helper for applyOperationToSyncPoints_
 */function syncTreeApplyOperationHelper_(operation,syncPointTree,serverCache,writesCache){if(pathIsEmpty(operation.path)){return syncTreeApplyOperationDescendantsHelper_(operation,syncPointTree,serverCache,writesCache);}else{const syncPoint=syncPointTree.get(newEmptyPath());// If we don't have cached server data, see if we can get it from this SyncPoint.
if(serverCache==null&&syncPoint!=null){serverCache=syncPointGetCompleteServerCache(syncPoint,newEmptyPath());}let events=[];const childName=pathGetFront(operation.path);const childOperation=operation.operationForChild(childName);const childTree=syncPointTree.children.get(childName);if(childTree&&childOperation){const childServerCache=serverCache?serverCache.getImmediateChild(childName):null;const childWritesCache=writeTreeRefChild(writesCache,childName);events=events.concat(syncTreeApplyOperationHelper_(childOperation,childTree,childServerCache,childWritesCache));}if(syncPoint){events=events.concat(syncPointApplyOperation(syncPoint,operation,writesCache,serverCache));}return events;}}/**
 * Recursive helper for applyOperationToSyncPoints_
 */function syncTreeApplyOperationDescendantsHelper_(operation,syncPointTree,serverCache,writesCache){const syncPoint=syncPointTree.get(newEmptyPath());// If we don't have cached server data, see if we can get it from this SyncPoint.
if(serverCache==null&&syncPoint!=null){serverCache=syncPointGetCompleteServerCache(syncPoint,newEmptyPath());}let events=[];syncPointTree.children.inorderTraversal((childName,childTree)=>{const childServerCache=serverCache?serverCache.getImmediateChild(childName):null;const childWritesCache=writeTreeRefChild(writesCache,childName);const childOperation=operation.operationForChild(childName);if(childOperation){events=events.concat(syncTreeApplyOperationDescendantsHelper_(childOperation,childTree,childServerCache,childWritesCache));}});if(syncPoint){events=events.concat(syncPointApplyOperation(syncPoint,operation,writesCache,serverCache));}return events;}function syncTreeCreateListenerForView_(syncTree,view){const query=view.query;const tag=syncTreeTagForQuery(syncTree,query);return{hashFn:()=>{const cache=viewGetServerCache(view)||ChildrenNode.EMPTY_NODE;return cache.hash();},onComplete:status=>{if(status==='ok'){if(tag){return syncTreeApplyTaggedListenComplete(syncTree,query._path,tag);}else{return syncTreeApplyListenComplete(syncTree,query._path);}}else{// If a listen failed, kill all of the listeners here, not just the one that triggered the error.
// Note that this may need to be scoped to just this listener if we change permissions on filtered children
const error=errorForServerCode(status,query);return syncTreeRemoveEventRegistration(syncTree,query,/*eventRegistration*/null,error);}}};}/**
 * Return the tag associated with the given query.
 */function syncTreeTagForQuery(syncTree,query){const queryKey=syncTreeMakeQueryKey_(query);return syncTree.queryToTagMap.get(queryKey);}/**
 * Given a query, computes a "queryKey" suitable for use in our queryToTagMap_.
 */function syncTreeMakeQueryKey_(query){return query._path.toString()+'$'+query._queryIdentifier;}/**
 * Return the query associated with the given tag, if we have one
 */function syncTreeQueryKeyForTag_(syncTree,tag){return syncTree.tagToQueryMap.get(tag);}/**
 * Given a queryKey (created by makeQueryKey), parse it back into a path and queryId.
 */function syncTreeParseQueryKey_(queryKey){const splitIndex=queryKey.indexOf('$');(0,_util.assert)(splitIndex!==-1&&splitIndex<queryKey.length-1,'Bad queryKey.');return{queryId:queryKey.substr(splitIndex+1),path:new Path(queryKey.substr(0,splitIndex))};}/**
 * A helper method to apply tagged operations
 */function syncTreeApplyTaggedOperation_(syncTree,queryPath,operation){const syncPoint=syncTree.syncPointTree_.get(queryPath);(0,_util.assert)(syncPoint,"Missing sync point for query tag that we're tracking");const writesCache=writeTreeChildWrites(syncTree.pendingWriteTree_,queryPath);return syncPointApplyOperation(syncPoint,operation,writesCache,null);}/**
 * This collapses multiple unfiltered views into a single view, since we only need a single
 * listener for them.
 */function syncTreeCollectDistinctViewsForSubTree_(subtree){return subtree.fold((relativePath,maybeChildSyncPoint,childMap)=>{if(maybeChildSyncPoint&&syncPointHasCompleteView(maybeChildSyncPoint)){const completeView=syncPointGetCompleteView(maybeChildSyncPoint);return[completeView];}else{// No complete view here, flatten any deeper listens into an array
let views=[];if(maybeChildSyncPoint){views=syncPointGetQueryViews(maybeChildSyncPoint);}each(childMap,(_key,childViews)=>{views=views.concat(childViews);});return views;}});}/**
 * Normalizes a query to a query we send the server for listening
 *
 * @returns The normalized query
 */function syncTreeQueryForListening_(query){if(query._queryParams.loadsAllData()&&!query._queryParams.isDefault()){// We treat queries that load all data as default queries
// Cast is necessary because ref() technically returns Firebase which is actually fb.api.Firebase which inherits
// from Query
return new(syncTreeGetReferenceConstructor())(query._repo,query._path);}else{return query;}}function syncTreeRemoveTags_(syncTree,queries){for(let j=0;j<queries.length;++j){const removedQuery=queries[j];if(!removedQuery._queryParams.loadsAllData()){// We should have a tag for this
const removedQueryKey=syncTreeMakeQueryKey_(removedQuery);const removedQueryTag=syncTree.queryToTagMap.get(removedQueryKey);syncTree.queryToTagMap.delete(removedQueryKey);syncTree.tagToQueryMap.delete(removedQueryTag);}}}/**
 * Static accessor for query tags.
 */function syncTreeGetNextQueryTag_(){return syncTreeNextQueryTag_++;}/**
 * For a given new listen, manage the de-duplication of outstanding subscriptions.
 *
 * @returns This method can return events to support synchronous data sources
 */function syncTreeSetupListener_(syncTree,query,view){const path=query._path;const tag=syncTreeTagForQuery(syncTree,query);const listener=syncTreeCreateListenerForView_(syncTree,view);const events=syncTree.listenProvider_.startListening(syncTreeQueryForListening_(query),tag,listener.hashFn,listener.onComplete);const subtree=syncTree.syncPointTree_.subtree(path);// The root of this subtree has our query. We're here because we definitely need to send a listen for that, but we
// may need to shadow other listens as well.
if(tag){(0,_util.assert)(!syncPointHasCompleteView(subtree.value),"If we're adding a query, it shouldn't be shadowed");}else{// Shadow everything at or below this location, this is a default listener.
const queriesToStop=subtree.fold((relativePath,maybeChildSyncPoint,childMap)=>{if(!pathIsEmpty(relativePath)&&maybeChildSyncPoint&&syncPointHasCompleteView(maybeChildSyncPoint)){return[syncPointGetCompleteView(maybeChildSyncPoint).query];}else{// No default listener here, flatten any deeper queries into an array
let queries=[];if(maybeChildSyncPoint){queries=queries.concat(syncPointGetQueryViews(maybeChildSyncPoint).map(view=>view.query));}each(childMap,(_key,childQueries)=>{queries=queries.concat(childQueries);});return queries;}});for(let i=0;i<queriesToStop.length;++i){const queryToStop=queriesToStop[i];syncTree.listenProvider_.stopListening(syncTreeQueryForListening_(queryToStop),syncTreeTagForQuery(syncTree,queryToStop));}}return events;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ExistingValueProvider{constructor(node_){this.node_=node_;}getImmediateChild(childName){const child=this.node_.getImmediateChild(childName);return new ExistingValueProvider(child);}node(){return this.node_;}}class DeferredValueProvider{constructor(syncTree,path){this.syncTree_=syncTree;this.path_=path;}getImmediateChild(childName){const childPath=pathChild(this.path_,childName);return new DeferredValueProvider(this.syncTree_,childPath);}node(){return syncTreeCalcCompleteEventCache(this.syncTree_,this.path_);}}/**
 * Generate placeholders for deferred values.
 */const generateWithValues=function(values){values=values||{};values['timestamp']=values['timestamp']||new Date().getTime();return values;};/**
 * Value to use when firing local events. When writing server values, fire
 * local events with an approximate value, otherwise return value as-is.
 */const resolveDeferredLeafValue=function(value,existingVal,serverValues){if(!value||typeof value!=='object'){return value;}(0,_util.assert)('.sv'in value,'Unexpected leaf node or priority contents');if(typeof value['.sv']==='string'){return resolveScalarDeferredValue(value['.sv'],existingVal,serverValues);}else if(typeof value['.sv']==='object'){return resolveComplexDeferredValue(value['.sv'],existingVal);}else{(0,_util.assert)(false,'Unexpected server value: '+JSON.stringify(value,null,2));}};const resolveScalarDeferredValue=function(op,existing,serverValues){switch(op){case'timestamp':return serverValues['timestamp'];default:(0,_util.assert)(false,'Unexpected server value: '+op);}};const resolveComplexDeferredValue=function(op,existing,unused){if(!op.hasOwnProperty('increment')){(0,_util.assert)(false,'Unexpected server value: '+JSON.stringify(op,null,2));}const delta=op['increment'];if(typeof delta!=='number'){(0,_util.assert)(false,'Unexpected increment value: '+delta);}const existingNode=existing.node();(0,_util.assert)(existingNode!==null&&typeof existingNode!=='undefined','Expected ChildrenNode.EMPTY_NODE for nulls');// Incrementing a non-number sets the value to the incremented amount
if(!existingNode.isLeafNode()){return delta;}const leaf=existingNode;const existingVal=leaf.getValue();if(typeof existingVal!=='number'){return delta;}// No need to do over/underflow arithmetic here because JS only handles floats under the covers
return existingVal+delta;};/**
 * Recursively replace all deferred values and priorities in the tree with the
 * specified generated replacement values.
 * @param path - path to which write is relative
 * @param node - new data written at path
 * @param syncTree - current data
 */const resolveDeferredValueTree=function(path,node,syncTree,serverValues){return resolveDeferredValue(node,new DeferredValueProvider(syncTree,path),serverValues);};/**
 * Recursively replace all deferred values and priorities in the node with the
 * specified generated replacement values.  If there are no server values in the node,
 * it'll be returned as-is.
 */const resolveDeferredValueSnapshot=function(node,existing,serverValues){return resolveDeferredValue(node,new ExistingValueProvider(existing),serverValues);};function resolveDeferredValue(node,existingVal,serverValues){const rawPri=node.getPriority().val();const priority=resolveDeferredLeafValue(rawPri,existingVal.getImmediateChild('.priority'),serverValues);let newNode;if(node.isLeafNode()){const leafNode=node;const value=resolveDeferredLeafValue(leafNode.getValue(),existingVal,serverValues);if(value!==leafNode.getValue()||priority!==leafNode.getPriority().val()){return new LeafNode(value,nodeFromJSON(priority));}else{return node;}}else{const childrenNode=node;newNode=childrenNode;if(priority!==childrenNode.getPriority().val()){newNode=newNode.updatePriority(new LeafNode(priority));}childrenNode.forEachChild(PRIORITY_INDEX,(childName,childNode)=>{const newChildNode=resolveDeferredValue(childNode,existingVal.getImmediateChild(childName),serverValues);if(newChildNode!==childNode){newNode=newNode.updateImmediateChild(childName,newChildNode);}});return newNode;}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A light-weight tree, traversable by path.  Nodes can have both values and children.
 * Nodes are not enumerated (by forEachChild) unless they have a value or non-empty
 * children.
 */class Tree{/**
     * @param name - Optional name of the node.
     * @param parent - Optional parent node.
     * @param node - Optional node to wrap.
     */constructor(name='',parent=null,node={children:{},childCount:0}){this.name=name;this.parent=parent;this.node=node;}}/**
 * Returns a sub-Tree for the given path.
 *
 * @param pathObj - Path to look up.
 * @returns Tree for path.
 */function treeSubTree(tree,pathObj){// TODO: Require pathObj to be Path?
let path=pathObj instanceof Path?pathObj:new Path(pathObj);let child=tree,next=pathGetFront(path);while(next!==null){const childNode=(0,_util.safeGet)(child.node.children,next)||{children:{},childCount:0};child=new Tree(next,child,childNode);path=pathPopFront(path);next=pathGetFront(path);}return child;}/**
 * Returns the data associated with this tree node.
 *
 * @returns The data or null if no data exists.
 */function treeGetValue(tree){return tree.node.value;}/**
 * Sets data to this tree node.
 *
 * @param value - Value to set.
 */function treeSetValue(tree,value){tree.node.value=value;treeUpdateParents(tree);}/**
 * @returns Whether the tree has any children.
 */function treeHasChildren(tree){return tree.node.childCount>0;}/**
 * @returns Whethe rthe tree is empty (no value or children).
 */function treeIsEmpty(tree){return treeGetValue(tree)===undefined&&!treeHasChildren(tree);}/**
 * Calls action for each child of this tree node.
 *
 * @param action - Action to be called for each child.
 */function treeForEachChild(tree,action){each(tree.node.children,(child,childTree)=>{action(new Tree(child,tree,childTree));});}/**
 * Does a depth-first traversal of this node's descendants, calling action for each one.
 *
 * @param action - Action to be called for each child.
 * @param includeSelf - Whether to call action on this node as well. Defaults to
 *   false.
 * @param childrenFirst - Whether to call action on children before calling it on
 *   parent.
 */function treeForEachDescendant(tree,action,includeSelf,childrenFirst){if(includeSelf&&!childrenFirst){action(tree);}treeForEachChild(tree,child=>{treeForEachDescendant(child,action,true,childrenFirst);});if(includeSelf&&childrenFirst){action(tree);}}/**
 * Calls action on each ancestor node.
 *
 * @param action - Action to be called on each parent; return
 *   true to abort.
 * @param includeSelf - Whether to call action on this node as well.
 * @returns true if the action callback returned true.
 */function treeForEachAncestor(tree,action,includeSelf){let node=includeSelf?tree:tree.parent;while(node!==null){if(action(node)){return true;}node=node.parent;}return false;}/**
 * @returns The path of this tree node, as a Path.
 */function treeGetPath(tree){return new Path(tree.parent===null?tree.name:treeGetPath(tree.parent)+'/'+tree.name);}/**
 * Adds or removes this child from its parent based on whether it's empty or not.
 */function treeUpdateParents(tree){if(tree.parent!==null){treeUpdateChild(tree.parent,tree.name,tree);}}/**
 * Adds or removes the passed child to this tree node, depending on whether it's empty.
 *
 * @param childName - The name of the child to update.
 * @param child - The child to update.
 */function treeUpdateChild(tree,childName,child){const childEmpty=treeIsEmpty(child);const childExists=(0,_util.contains)(tree.node.children,childName);if(childEmpty&&childExists){delete tree.node.children[childName];tree.node.childCount--;treeUpdateParents(tree);}else if(!childEmpty&&!childExists){tree.node.children[childName]=child.node;tree.node.childCount++;treeUpdateParents(tree);}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * True for invalid Firebase keys
 */const INVALID_KEY_REGEX_=/[\[\].#$\/\u0000-\u001F\u007F]/;/**
 * True for invalid Firebase paths.
 * Allows '/' in paths.
 */const INVALID_PATH_REGEX_=/[\[\].#$\u0000-\u001F\u007F]/;/**
 * Maximum number of characters to allow in leaf value
 */const MAX_LEAF_SIZE_=10*1024*1024;const isValidKey=function(key){return typeof key==='string'&&key.length!==0&&!INVALID_KEY_REGEX_.test(key);};const isValidPathString=function(pathString){return typeof pathString==='string'&&pathString.length!==0&&!INVALID_PATH_REGEX_.test(pathString);};const isValidRootPathString=function(pathString){if(pathString){// Allow '/.info/' at the beginning.
pathString=pathString.replace(/^\/*\.info(\/|$)/,'/');}return isValidPathString(pathString);};const isValidPriority=function(priority){return priority===null||typeof priority==='string'||typeof priority==='number'&&!isInvalidJSONNumber(priority)||priority&&typeof priority==='object'&&// eslint-disable-next-line @typescript-eslint/no-explicit-any
(0,_util.contains)(priority,'.sv');};/**
 * Pre-validate a datum passed as an argument to Firebase function.
 */const validateFirebaseDataArg=function(fnName,value,path,optional){if(optional&&value===undefined){return;}validateFirebaseData((0,_util.errorPrefix)(fnName,'value'),value,path);};/**
 * Validate a data object client-side before sending to server.
 */const validateFirebaseData=function(errorPrefix,data,path_){const path=path_ instanceof Path?new ValidationPath(path_,errorPrefix):path_;if(data===undefined){throw new Error(errorPrefix+'contains undefined '+validationPathToErrorString(path));}if(typeof data==='function'){throw new Error(errorPrefix+'contains a function '+validationPathToErrorString(path)+' with contents = '+data.toString());}if(isInvalidJSONNumber(data)){throw new Error(errorPrefix+'contains '+data.toString()+' '+validationPathToErrorString(path));}// Check max leaf size, but try to avoid the utf8 conversion if we can.
if(typeof data==='string'&&data.length>MAX_LEAF_SIZE_/3&&(0,_util.stringLength)(data)>MAX_LEAF_SIZE_){throw new Error(errorPrefix+'contains a string greater than '+MAX_LEAF_SIZE_+' utf8 bytes '+validationPathToErrorString(path)+" ('"+data.substring(0,50)+"...')");}// TODO = Perf = Consider combining the recursive validation of keys into NodeFromJSON
// to save extra walking of large objects.
if(data&&typeof data==='object'){let hasDotValue=false;let hasActualChild=false;each(data,(key,value)=>{if(key==='.value'){hasDotValue=true;}else if(key!=='.priority'&&key!=='.sv'){hasActualChild=true;if(!isValidKey(key)){throw new Error(errorPrefix+' contains an invalid key ('+key+') '+validationPathToErrorString(path)+'.  Keys must be non-empty strings '+'and can\'t contain ".", "#", "$", "/", "[", or "]"');}}validationPathPush(path,key);validateFirebaseData(errorPrefix,value,path);validationPathPop(path);});if(hasDotValue&&hasActualChild){throw new Error(errorPrefix+' contains ".value" child '+validationPathToErrorString(path)+' in addition to actual children.');}}};/**
 * Pre-validate paths passed in the firebase function.
 */const validateFirebaseMergePaths=function(errorPrefix,mergePaths){let i,curPath;for(i=0;i<mergePaths.length;i++){curPath=mergePaths[i];const keys=pathSlice(curPath);for(let j=0;j<keys.length;j++){if(keys[j]==='.priority'&&j===keys.length-1);else if(!isValidKey(keys[j])){throw new Error(errorPrefix+'contains an invalid key ('+keys[j]+') in path '+curPath.toString()+'. Keys must be non-empty strings '+'and can\'t contain ".", "#", "$", "/", "[", or "]"');}}}// Check that update keys are not descendants of each other.
// We rely on the property that sorting guarantees that ancestors come
// right before descendants.
mergePaths.sort(pathCompare);let prevPath=null;for(i=0;i<mergePaths.length;i++){curPath=mergePaths[i];if(prevPath!==null&&pathContains(prevPath,curPath)){throw new Error(errorPrefix+'contains a path '+prevPath.toString()+' that is ancestor of another path '+curPath.toString());}prevPath=curPath;}};/**
 * pre-validate an object passed as an argument to firebase function (
 * must be an object - e.g. for firebase.update()).
 */const validateFirebaseMergeDataArg=function(fnName,data,path,optional){if(optional&&data===undefined){return;}const errorPrefix$1=(0,_util.errorPrefix)(fnName,'values');if(!(data&&typeof data==='object')||Array.isArray(data)){throw new Error(errorPrefix$1+' must be an object containing the children to replace.');}const mergePaths=[];each(data,(key,value)=>{const curPath=new Path(key);validateFirebaseData(errorPrefix$1,value,pathChild(path,curPath));if(pathGetBack(curPath)==='.priority'){if(!isValidPriority(value)){throw new Error(errorPrefix$1+"contains an invalid value for '"+curPath.toString()+"', which must be a valid "+'Firebase priority (a string, finite number, server value, or null).');}}mergePaths.push(curPath);});validateFirebaseMergePaths(errorPrefix$1,mergePaths);};const validatePriority=function(fnName,priority,optional){if(optional&&priority===undefined){return;}if(isInvalidJSONNumber(priority)){throw new Error((0,_util.errorPrefix)(fnName,'priority')+'is '+priority.toString()+', but must be a valid Firebase priority (a string, finite number, '+'server value, or null).');}// Special case to allow importing data with a .sv.
if(!isValidPriority(priority)){throw new Error((0,_util.errorPrefix)(fnName,'priority')+'must be a valid Firebase priority '+'(a string, finite number, server value, or null).');}};const validateKey=function(fnName,argumentName,key,optional){if(optional&&key===undefined){return;}if(!isValidKey(key)){throw new Error((0,_util.errorPrefix)(fnName,argumentName)+'was an invalid key = "'+key+'".  Firebase keys must be non-empty strings and '+'can\'t contain ".", "#", "$", "/", "[", or "]").');}};/**
 * @internal
 */const validatePathString=function(fnName,argumentName,pathString,optional){if(optional&&pathString===undefined){return;}if(!isValidPathString(pathString)){throw new Error((0,_util.errorPrefix)(fnName,argumentName)+'was an invalid path = "'+pathString+'". Paths must be non-empty strings and '+'can\'t contain ".", "#", "$", "[", or "]"');}};exports._validatePathString=validatePathString;const validateRootPathString=function(fnName,argumentName,pathString,optional){if(pathString){// Allow '/.info/' at the beginning.
pathString=pathString.replace(/^\/*\.info(\/|$)/,'/');}validatePathString(fnName,argumentName,pathString,optional);};/**
 * @internal
 */const validateWritablePath=function(fnName,path){if(pathGetFront(path)==='.info'){throw new Error(fnName+" failed = Can't modify data under /.info/");}};exports._validateWritablePath=validateWritablePath;const validateUrl=function(fnName,parsedUrl){// TODO = Validate server better.
const pathString=parsedUrl.path.toString();if(!(typeof parsedUrl.repoInfo.host==='string')||parsedUrl.repoInfo.host.length===0||!isValidKey(parsedUrl.repoInfo.namespace)&&parsedUrl.repoInfo.host.split(':')[0]!=='localhost'||pathString.length!==0&&!isValidRootPathString(pathString)){throw new Error((0,_util.errorPrefix)(fnName,'url')+'must be a valid firebase URL and '+'the path can\'t contain ".", "#", "$", "[", or "]".');}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * The event queue serves a few purposes:
 * 1. It ensures we maintain event order in the face of event callbacks doing operations that result in more
 *    events being queued.
 * 2. raiseQueuedEvents() handles being called reentrantly nicely.  That is, if in the course of raising events,
 *    raiseQueuedEvents() is called again, the "inner" call will pick up raising events where the "outer" call
 *    left off, ensuring that the events are still raised synchronously and in order.
 * 3. You can use raiseEventsAtPath and raiseEventsForChangedPath to ensure only relevant previously-queued
 *    events are raised synchronously.
 *
 * NOTE: This can all go away if/when we move to async events.
 *
 */class EventQueue{constructor(){this.eventLists_=[];/**
         * Tracks recursion depth of raiseQueuedEvents_, for debugging purposes.
         */this.recursionDepth_=0;}}/**
 * @param eventDataList - The new events to queue.
 */function eventQueueQueueEvents(eventQueue,eventDataList){// We group events by path, storing them in a single EventList, to make it easier to skip over them quickly.
let currList=null;for(let i=0;i<eventDataList.length;i++){const data=eventDataList[i];const path=data.getPath();if(currList!==null&&!pathEquals(path,currList.path)){eventQueue.eventLists_.push(currList);currList=null;}if(currList===null){currList={events:[],path};}currList.events.push(data);}if(currList){eventQueue.eventLists_.push(currList);}}/**
 * Queues the specified events and synchronously raises all events (including previously queued ones)
 * for the specified path.
 *
 * It is assumed that the new events are all for the specified path.
 *
 * @param path - The path to raise events for.
 * @param eventDataList - The new events to raise.
 */function eventQueueRaiseEventsAtPath(eventQueue,path,eventDataList){eventQueueQueueEvents(eventQueue,eventDataList);eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue,eventPath=>pathEquals(eventPath,path));}/**
 * Queues the specified events and synchronously raises all events (including previously queued ones) for
 * locations related to the specified change path (i.e. all ancestors and descendants).
 *
 * It is assumed that the new events are all related (ancestor or descendant) to the specified path.
 *
 * @param changedPath - The path to raise events for.
 * @param eventDataList - The events to raise
 */function eventQueueRaiseEventsForChangedPath(eventQueue,changedPath,eventDataList){eventQueueQueueEvents(eventQueue,eventDataList);eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue,eventPath=>pathContains(eventPath,changedPath)||pathContains(changedPath,eventPath));}function eventQueueRaiseQueuedEventsMatchingPredicate(eventQueue,predicate){eventQueue.recursionDepth_++;let sentAll=true;for(let i=0;i<eventQueue.eventLists_.length;i++){const eventList=eventQueue.eventLists_[i];if(eventList){const eventPath=eventList.path;if(predicate(eventPath)){eventListRaise(eventQueue.eventLists_[i]);eventQueue.eventLists_[i]=null;}else{sentAll=false;}}}if(sentAll){eventQueue.eventLists_=[];}eventQueue.recursionDepth_--;}/**
 * Iterates through the list and raises each event
 */function eventListRaise(eventList){for(let i=0;i<eventList.events.length;i++){const eventData=eventList.events[i];if(eventData!==null){eventList.events[i]=null;const eventFn=eventData.getEventRunner();if(logger){log('event: '+eventData.toString());}exceptionGuard(eventFn);}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const INTERRUPT_REASON='repo_interrupt';/**
 * If a transaction does not succeed after 25 retries, we abort it. Among other
 * things this ensure that if there's ever a bug causing a mismatch between
 * client / server hashes for some data, we won't retry indefinitely.
 */const MAX_TRANSACTION_RETRIES=25;/**
 * A connection to a single data repository.
 */class Repo{constructor(repoInfo_,forceRestClient_,authTokenProvider_,appCheckProvider_){this.repoInfo_=repoInfo_;this.forceRestClient_=forceRestClient_;this.authTokenProvider_=authTokenProvider_;this.appCheckProvider_=appCheckProvider_;this.dataUpdateCount=0;this.statsListener_=null;this.eventQueue_=new EventQueue();this.nextWriteId_=1;this.interceptServerDataCallback_=null;/** A list of data pieces and paths to be set when this client disconnects. */this.onDisconnect_=newSparseSnapshotTree();/** Stores queues of outstanding transactions for Firebase locations. */this.transactionQueueTree_=new Tree();// TODO: This should be @private but it's used by test_access.js and internal.js
this.persistentConnection_=null;// This key is intentionally not updated if RepoInfo is later changed or replaced
this.key=this.repoInfo_.toURLString();}/**
     * @returns The URL corresponding to the root of this Firebase.
     */toString(){return(this.repoInfo_.secure?'https://':'http://')+this.repoInfo_.host;}}function repoStart(repo,appId,authOverride){repo.stats_=statsManagerGetCollection(repo.repoInfo_);if(repo.forceRestClient_||beingCrawled()){repo.server_=new ReadonlyRestClient(repo.repoInfo_,(pathString,data,isMerge,tag)=>{repoOnDataUpdate(repo,pathString,data,isMerge,tag);},repo.authTokenProvider_,repo.appCheckProvider_);// Minor hack: Fire onConnect immediately, since there's no actual connection.
setTimeout(()=>repoOnConnectStatus(repo,/* connectStatus= */true),0);}else{// Validate authOverride
if(typeof authOverride!=='undefined'&&authOverride!==null){if(typeof authOverride!=='object'){throw new Error('Only objects are supported for option databaseAuthVariableOverride');}try{(0,_util.stringify)(authOverride);}catch(e){throw new Error('Invalid authOverride provided: '+e);}}repo.persistentConnection_=new PersistentConnection(repo.repoInfo_,appId,(pathString,data,isMerge,tag)=>{repoOnDataUpdate(repo,pathString,data,isMerge,tag);},connectStatus=>{repoOnConnectStatus(repo,connectStatus);},updates=>{repoOnServerInfoUpdate(repo,updates);},repo.authTokenProvider_,repo.appCheckProvider_,authOverride);repo.server_=repo.persistentConnection_;}repo.authTokenProvider_.addTokenChangeListener(token=>{repo.server_.refreshAuthToken(token);});repo.appCheckProvider_.addTokenChangeListener(result=>{repo.server_.refreshAppCheckToken(result.token);});// In the case of multiple Repos for the same repoInfo (i.e. there are multiple Firebase.Contexts being used),
// we only want to create one StatsReporter.  As such, we'll report stats over the first Repo created.
repo.statsReporter_=statsManagerGetOrCreateReporter(repo.repoInfo_,()=>new StatsReporter(repo.stats_,repo.server_));// Used for .info.
repo.infoData_=new SnapshotHolder();repo.infoSyncTree_=new SyncTree({startListening:(query,tag,currentHashFn,onComplete)=>{let infoEvents=[];const node=repo.infoData_.getNode(query._path);// This is possibly a hack, but we have different semantics for .info endpoints. We don't raise null events
// on initial data...
if(!node.isEmpty()){infoEvents=syncTreeApplyServerOverwrite(repo.infoSyncTree_,query._path,node);setTimeout(()=>{onComplete('ok');},0);}return infoEvents;},stopListening:()=>{}});repoUpdateInfo(repo,'connected',false);repo.serverSyncTree_=new SyncTree({startListening:(query,tag,currentHashFn,onComplete)=>{repo.server_.listen(query,currentHashFn,tag,(status,data)=>{const events=onComplete(status,data);eventQueueRaiseEventsForChangedPath(repo.eventQueue_,query._path,events);});// No synchronous events for network-backed sync trees
return[];},stopListening:(query,tag)=>{repo.server_.unlisten(query,tag);}});}/**
 * @returns The time in milliseconds, taking the server offset into account if we have one.
 */function repoServerTime(repo){const offsetNode=repo.infoData_.getNode(new Path('.info/serverTimeOffset'));const offset=offsetNode.val()||0;return new Date().getTime()+offset;}/**
 * Generate ServerValues using some variables from the repo object.
 */function repoGenerateServerValues(repo){return generateWithValues({timestamp:repoServerTime(repo)});}/**
 * Called by realtime when we get new messages from the server.
 */function repoOnDataUpdate(repo,pathString,data,isMerge,tag){// For testing.
repo.dataUpdateCount++;const path=new Path(pathString);data=repo.interceptServerDataCallback_?repo.interceptServerDataCallback_(pathString,data):data;let events=[];if(tag){if(isMerge){const taggedChildren=(0,_util.map)(data,raw=>nodeFromJSON(raw));events=syncTreeApplyTaggedQueryMerge(repo.serverSyncTree_,path,taggedChildren,tag);}else{const taggedSnap=nodeFromJSON(data);events=syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_,path,taggedSnap,tag);}}else if(isMerge){const changedChildren=(0,_util.map)(data,raw=>nodeFromJSON(raw));events=syncTreeApplyServerMerge(repo.serverSyncTree_,path,changedChildren);}else{const snap=nodeFromJSON(data);events=syncTreeApplyServerOverwrite(repo.serverSyncTree_,path,snap);}let affectedPath=path;if(events.length>0){// Since we have a listener outstanding for each transaction, receiving any events
// is a proxy for some change having occurred.
affectedPath=repoRerunTransactions(repo,path);}eventQueueRaiseEventsForChangedPath(repo.eventQueue_,affectedPath,events);}function repoOnConnectStatus(repo,connectStatus){repoUpdateInfo(repo,'connected',connectStatus);if(connectStatus===false){repoRunOnDisconnectEvents(repo);}}function repoOnServerInfoUpdate(repo,updates){each(updates,(key,value)=>{repoUpdateInfo(repo,key,value);});}function repoUpdateInfo(repo,pathString,value){const path=new Path('/.info/'+pathString);const newNode=nodeFromJSON(value);repo.infoData_.updateSnapshot(path,newNode);const events=syncTreeApplyServerOverwrite(repo.infoSyncTree_,path,newNode);eventQueueRaiseEventsForChangedPath(repo.eventQueue_,path,events);}function repoGetNextWriteId(repo){return repo.nextWriteId_++;}/**
 * The purpose of `getValue` is to return the latest known value
 * satisfying `query`.
 *
 * This method will first check for in-memory cached values
 * belonging to active listeners. If they are found, such values
 * are considered to be the most up-to-date.
 *
 * If the client is not connected, this method will wait until the
 *  repo has established a connection and then request the value for `query`.
 * If the client is not able to retrieve the query result for another reason,
 * it reports an error.
 *
 * @param query - The query to surface a value for.
 */function repoGetValue(repo,query,eventRegistration){// Only active queries are cached. There is no persisted cache.
const cached=syncTreeGetServerValue(repo.serverSyncTree_,query);if(cached!=null){return Promise.resolve(cached);}return repo.server_.get(query).then(payload=>{const node=nodeFromJSON(payload).withIndex(query._queryParams.getIndex());/**
         * Below we simulate the actions of an `onlyOnce` `onValue()` event where:
         * Add an event registration,
         * Update data at the path,
         * Raise any events,
         * Cleanup the SyncTree
         */syncTreeAddEventRegistration(repo.serverSyncTree_,query,eventRegistration,true);let events;if(query._queryParams.loadsAllData()){events=syncTreeApplyServerOverwrite(repo.serverSyncTree_,query._path,node);}else{const tag=syncTreeTagForQuery(repo.serverSyncTree_,query);events=syncTreeApplyTaggedQueryOverwrite(repo.serverSyncTree_,query._path,node,tag);}/*
         * We need to raise events in the scenario where `get()` is called at a parent path, and
         * while the `get()` is pending, `onValue` is called at a child location. While get() is waiting
         * for the data, `onValue` will register a new event. Then, get() will come back, and update the syncTree
         * and its corresponding serverCache, including the child location where `onValue` is called. Then,
         * `onValue` will receive the event from the server, but look at the syncTree and see that the data received
         * from the server is already at the SyncPoint, and so the `onValue` callback will never get fired.
         * Calling `eventQueueRaiseEventsForChangedPath()` is the correct way to propagate the events and
         * ensure the corresponding child events will get fired.
         */eventQueueRaiseEventsForChangedPath(repo.eventQueue_,query._path,events);syncTreeRemoveEventRegistration(repo.serverSyncTree_,query,eventRegistration,null,true);return node;},err=>{repoLog(repo,'get for query '+(0,_util.stringify)(query)+' failed: '+err);return Promise.reject(new Error(err));});}function repoSetWithPriority(repo,path,newVal,newPriority,onComplete){repoLog(repo,'set',{path:path.toString(),value:newVal,priority:newPriority});// TODO: Optimize this behavior to either (a) store flag to skip resolving where possible and / or
// (b) store unresolved paths on JSON parse
const serverValues=repoGenerateServerValues(repo);const newNodeUnresolved=nodeFromJSON(newVal,newPriority);const existing=syncTreeCalcCompleteEventCache(repo.serverSyncTree_,path);const newNode=resolveDeferredValueSnapshot(newNodeUnresolved,existing,serverValues);const writeId=repoGetNextWriteId(repo);const events=syncTreeApplyUserOverwrite(repo.serverSyncTree_,path,newNode,writeId,true);eventQueueQueueEvents(repo.eventQueue_,events);repo.server_.put(path.toString(),newNodeUnresolved.val(/*export=*/true),(status,errorReason)=>{const success=status==='ok';if(!success){warn('set at '+path+' failed: '+status);}const clearEvents=syncTreeAckUserWrite(repo.serverSyncTree_,writeId,!success);eventQueueRaiseEventsForChangedPath(repo.eventQueue_,path,clearEvents);repoCallOnCompleteCallback(repo,onComplete,status,errorReason);});const affectedPath=repoAbortTransactions(repo,path);repoRerunTransactions(repo,affectedPath);// We queued the events above, so just flush the queue here
eventQueueRaiseEventsForChangedPath(repo.eventQueue_,affectedPath,[]);}function repoUpdate(repo,path,childrenToMerge,onComplete){repoLog(repo,'update',{path:path.toString(),value:childrenToMerge});// Start with our existing data and merge each child into it.
let empty=true;const serverValues=repoGenerateServerValues(repo);const changedChildren={};each(childrenToMerge,(changedKey,changedValue)=>{empty=false;changedChildren[changedKey]=resolveDeferredValueTree(pathChild(path,changedKey),nodeFromJSON(changedValue),repo.serverSyncTree_,serverValues);});if(!empty){const writeId=repoGetNextWriteId(repo);const events=syncTreeApplyUserMerge(repo.serverSyncTree_,path,changedChildren,writeId);eventQueueQueueEvents(repo.eventQueue_,events);repo.server_.merge(path.toString(),childrenToMerge,(status,errorReason)=>{const success=status==='ok';if(!success){warn('update at '+path+' failed: '+status);}const clearEvents=syncTreeAckUserWrite(repo.serverSyncTree_,writeId,!success);const affectedPath=clearEvents.length>0?repoRerunTransactions(repo,path):path;eventQueueRaiseEventsForChangedPath(repo.eventQueue_,affectedPath,clearEvents);repoCallOnCompleteCallback(repo,onComplete,status,errorReason);});each(childrenToMerge,changedPath=>{const affectedPath=repoAbortTransactions(repo,pathChild(path,changedPath));repoRerunTransactions(repo,affectedPath);});// We queued the events above, so just flush the queue here
eventQueueRaiseEventsForChangedPath(repo.eventQueue_,path,[]);}else{log("update() called with empty data.  Don't do anything.");repoCallOnCompleteCallback(repo,onComplete,'ok',undefined);}}/**
 * Applies all of the changes stored up in the onDisconnect_ tree.
 */function repoRunOnDisconnectEvents(repo){repoLog(repo,'onDisconnectEvents');const serverValues=repoGenerateServerValues(repo);const resolvedOnDisconnectTree=newSparseSnapshotTree();sparseSnapshotTreeForEachTree(repo.onDisconnect_,newEmptyPath(),(path,node)=>{const resolved=resolveDeferredValueTree(path,node,repo.serverSyncTree_,serverValues);sparseSnapshotTreeRemember(resolvedOnDisconnectTree,path,resolved);});let events=[];sparseSnapshotTreeForEachTree(resolvedOnDisconnectTree,newEmptyPath(),(path,snap)=>{events=events.concat(syncTreeApplyServerOverwrite(repo.serverSyncTree_,path,snap));const affectedPath=repoAbortTransactions(repo,path);repoRerunTransactions(repo,affectedPath);});repo.onDisconnect_=newSparseSnapshotTree();eventQueueRaiseEventsForChangedPath(repo.eventQueue_,newEmptyPath(),events);}function repoOnDisconnectCancel(repo,path,onComplete){repo.server_.onDisconnectCancel(path.toString(),(status,errorReason)=>{if(status==='ok'){sparseSnapshotTreeForget(repo.onDisconnect_,path);}repoCallOnCompleteCallback(repo,onComplete,status,errorReason);});}function repoOnDisconnectSet(repo,path,value,onComplete){const newNode=nodeFromJSON(value);repo.server_.onDisconnectPut(path.toString(),newNode.val(/*export=*/true),(status,errorReason)=>{if(status==='ok'){sparseSnapshotTreeRemember(repo.onDisconnect_,path,newNode);}repoCallOnCompleteCallback(repo,onComplete,status,errorReason);});}function repoOnDisconnectSetWithPriority(repo,path,value,priority,onComplete){const newNode=nodeFromJSON(value,priority);repo.server_.onDisconnectPut(path.toString(),newNode.val(/*export=*/true),(status,errorReason)=>{if(status==='ok'){sparseSnapshotTreeRemember(repo.onDisconnect_,path,newNode);}repoCallOnCompleteCallback(repo,onComplete,status,errorReason);});}function repoOnDisconnectUpdate(repo,path,childrenToMerge,onComplete){if((0,_util.isEmpty)(childrenToMerge)){log("onDisconnect().update() called with empty data.  Don't do anything.");repoCallOnCompleteCallback(repo,onComplete,'ok',undefined);return;}repo.server_.onDisconnectMerge(path.toString(),childrenToMerge,(status,errorReason)=>{if(status==='ok'){each(childrenToMerge,(childName,childNode)=>{const newChildNode=nodeFromJSON(childNode);sparseSnapshotTreeRemember(repo.onDisconnect_,pathChild(path,childName),newChildNode);});}repoCallOnCompleteCallback(repo,onComplete,status,errorReason);});}function repoAddEventCallbackForQuery(repo,query,eventRegistration){let events;if(pathGetFront(query._path)==='.info'){events=syncTreeAddEventRegistration(repo.infoSyncTree_,query,eventRegistration);}else{events=syncTreeAddEventRegistration(repo.serverSyncTree_,query,eventRegistration);}eventQueueRaiseEventsAtPath(repo.eventQueue_,query._path,events);}function repoRemoveEventCallbackForQuery(repo,query,eventRegistration){// These are guaranteed not to raise events, since we're not passing in a cancelError. However, we can future-proof
// a little bit by handling the return values anyways.
let events;if(pathGetFront(query._path)==='.info'){events=syncTreeRemoveEventRegistration(repo.infoSyncTree_,query,eventRegistration);}else{events=syncTreeRemoveEventRegistration(repo.serverSyncTree_,query,eventRegistration);}eventQueueRaiseEventsAtPath(repo.eventQueue_,query._path,events);}function repoInterrupt(repo){if(repo.persistentConnection_){repo.persistentConnection_.interrupt(INTERRUPT_REASON);}}function repoResume(repo){if(repo.persistentConnection_){repo.persistentConnection_.resume(INTERRUPT_REASON);}}function repoLog(repo,...varArgs){let prefix='';if(repo.persistentConnection_){prefix=repo.persistentConnection_.id+':';}log(prefix,...varArgs);}function repoCallOnCompleteCallback(repo,callback,status,errorReason){if(callback){exceptionGuard(()=>{if(status==='ok'){callback(null);}else{const code=(status||'error').toUpperCase();let message=code;if(errorReason){message+=': '+errorReason;}const error=new Error(message);// eslint-disable-next-line @typescript-eslint/no-explicit-any
error.code=code;callback(error);}});}}/**
 * Creates a new transaction, adds it to the transactions we're tracking, and
 * sends it to the server if possible.
 *
 * @param path - Path at which to do transaction.
 * @param transactionUpdate - Update callback.
 * @param onComplete - Completion callback.
 * @param unwatcher - Function that will be called when the transaction no longer
 * need data updates for `path`.
 * @param applyLocally - Whether or not to make intermediate results visible
 */function repoStartTransaction(repo,path,transactionUpdate,onComplete,unwatcher,applyLocally){repoLog(repo,'transaction on '+path);// Initialize transaction.
const transaction={path,update:transactionUpdate,onComplete,// One of TransactionStatus enums.
status:null,// Used when combining transactions at different locations to figure out
// which one goes first.
order:LUIDGenerator(),// Whether to raise local events for this transaction.
applyLocally,// Count of how many times we've retried the transaction.
retryCount:0,// Function to call to clean up our .on() listener.
unwatcher,// Stores why a transaction was aborted.
abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null};// Run transaction initially.
const currentState=repoGetLatestState(repo,path,undefined);transaction.currentInputSnapshot=currentState;const newVal=transaction.update(currentState.val());if(newVal===undefined){// Abort transaction.
transaction.unwatcher();transaction.currentOutputSnapshotRaw=null;transaction.currentOutputSnapshotResolved=null;if(transaction.onComplete){transaction.onComplete(null,false,transaction.currentInputSnapshot);}}else{validateFirebaseData('transaction failed: Data returned ',newVal,transaction.path);// Mark as run and add to our queue.
transaction.status=0/* TransactionStatus.RUN */;const queueNode=treeSubTree(repo.transactionQueueTree_,path);const nodeQueue=treeGetValue(queueNode)||[];nodeQueue.push(transaction);treeSetValue(queueNode,nodeQueue);// Update visibleData and raise events
// Note: We intentionally raise events after updating all of our
// transaction state, since the user could start new transactions from the
// event callbacks.
let priorityForNode;if(typeof newVal==='object'&&newVal!==null&&(0,_util.contains)(newVal,'.priority')){// eslint-disable-next-line @typescript-eslint/no-explicit-any
priorityForNode=(0,_util.safeGet)(newVal,'.priority');(0,_util.assert)(isValidPriority(priorityForNode),'Invalid priority returned by transaction. '+'Priority must be a valid string, finite number, server value, or null.');}else{const currentNode=syncTreeCalcCompleteEventCache(repo.serverSyncTree_,path)||ChildrenNode.EMPTY_NODE;priorityForNode=currentNode.getPriority().val();}const serverValues=repoGenerateServerValues(repo);const newNodeUnresolved=nodeFromJSON(newVal,priorityForNode);const newNode=resolveDeferredValueSnapshot(newNodeUnresolved,currentState,serverValues);transaction.currentOutputSnapshotRaw=newNodeUnresolved;transaction.currentOutputSnapshotResolved=newNode;transaction.currentWriteId=repoGetNextWriteId(repo);const events=syncTreeApplyUserOverwrite(repo.serverSyncTree_,path,newNode,transaction.currentWriteId,transaction.applyLocally);eventQueueRaiseEventsForChangedPath(repo.eventQueue_,path,events);repoSendReadyTransactions(repo,repo.transactionQueueTree_);}}/**
 * @param excludeSets - A specific set to exclude
 */function repoGetLatestState(repo,path,excludeSets){return syncTreeCalcCompleteEventCache(repo.serverSyncTree_,path,excludeSets)||ChildrenNode.EMPTY_NODE;}/**
 * Sends any already-run transactions that aren't waiting for outstanding
 * transactions to complete.
 *
 * Externally it's called with no arguments, but it calls itself recursively
 * with a particular transactionQueueTree node to recurse through the tree.
 *
 * @param node - transactionQueueTree node to start at.
 */function repoSendReadyTransactions(repo,node=repo.transactionQueueTree_){// Before recursing, make sure any completed transactions are removed.
if(!node){repoPruneCompletedTransactionsBelowNode(repo,node);}if(treeGetValue(node)){const queue=repoBuildTransactionQueue(repo,node);(0,_util.assert)(queue.length>0,'Sending zero length transaction queue');const allRun=queue.every(transaction=>transaction.status===0/* TransactionStatus.RUN */);// If they're all run (and not sent), we can send them.  Else, we must wait.
if(allRun){repoSendTransactionQueue(repo,treeGetPath(node),queue);}}else if(treeHasChildren(node)){treeForEachChild(node,childNode=>{repoSendReadyTransactions(repo,childNode);});}}/**
 * Given a list of run transactions, send them to the server and then handle
 * the result (success or failure).
 *
 * @param path - The location of the queue.
 * @param queue - Queue of transactions under the specified location.
 */function repoSendTransactionQueue(repo,path,queue){// Mark transactions as sent and increment retry count!
const setsToIgnore=queue.map(txn=>{return txn.currentWriteId;});const latestState=repoGetLatestState(repo,path,setsToIgnore);let snapToSend=latestState;const latestHash=latestState.hash();for(let i=0;i<queue.length;i++){const txn=queue[i];(0,_util.assert)(txn.status===0/* TransactionStatus.RUN */,'tryToSendTransactionQueue_: items in queue should all be run.');txn.status=1/* TransactionStatus.SENT */;txn.retryCount++;const relativePath=newRelativePath(path,txn.path);// If we've gotten to this point, the output snapshot must be defined.
snapToSend=snapToSend.updateChild(relativePath/** @type {!Node} */,txn.currentOutputSnapshotRaw);}const dataToSend=snapToSend.val(true);const pathToSend=path;// Send the put.
repo.server_.put(pathToSend.toString(),dataToSend,status=>{repoLog(repo,'transaction put response',{path:pathToSend.toString(),status});let events=[];if(status==='ok'){// Queue up the callbacks and fire them after cleaning up all of our
// transaction state, since the callback could trigger more
// transactions or sets.
const callbacks=[];for(let i=0;i<queue.length;i++){queue[i].status=2/* TransactionStatus.COMPLETED */;events=events.concat(syncTreeAckUserWrite(repo.serverSyncTree_,queue[i].currentWriteId));if(queue[i].onComplete){// We never unset the output snapshot, and given that this
// transaction is complete, it should be set
callbacks.push(()=>queue[i].onComplete(null,true,queue[i].currentOutputSnapshotResolved));}queue[i].unwatcher();}// Now remove the completed transactions.
repoPruneCompletedTransactionsBelowNode(repo,treeSubTree(repo.transactionQueueTree_,path));// There may be pending transactions that we can now send.
repoSendReadyTransactions(repo,repo.transactionQueueTree_);eventQueueRaiseEventsForChangedPath(repo.eventQueue_,path,events);// Finally, trigger onComplete callbacks.
for(let i=0;i<callbacks.length;i++){exceptionGuard(callbacks[i]);}}else{// transactions are no longer sent.  Update their status appropriately.
if(status==='datastale'){for(let i=0;i<queue.length;i++){if(queue[i].status===3/* TransactionStatus.SENT_NEEDS_ABORT */){queue[i].status=4/* TransactionStatus.NEEDS_ABORT */;}else{queue[i].status=0/* TransactionStatus.RUN */;}}}else{warn('transaction at '+pathToSend.toString()+' failed: '+status);for(let i=0;i<queue.length;i++){queue[i].status=4/* TransactionStatus.NEEDS_ABORT */;queue[i].abortReason=status;}}repoRerunTransactions(repo,path);}},latestHash);}/**
 * Finds all transactions dependent on the data at changedPath and reruns them.
 *
 * Should be called any time cached data changes.
 *
 * Return the highest path that was affected by rerunning transactions. This
 * is the path at which events need to be raised for.
 *
 * @param changedPath - The path in mergedData that changed.
 * @returns The rootmost path that was affected by rerunning transactions.
 */function repoRerunTransactions(repo,changedPath){const rootMostTransactionNode=repoGetAncestorTransactionNode(repo,changedPath);const path=treeGetPath(rootMostTransactionNode);const queue=repoBuildTransactionQueue(repo,rootMostTransactionNode);repoRerunTransactionQueue(repo,queue,path);return path;}/**
 * Does all the work of rerunning transactions (as well as cleans up aborted
 * transactions and whatnot).
 *
 * @param queue - The queue of transactions to run.
 * @param path - The path the queue is for.
 */function repoRerunTransactionQueue(repo,queue,path){if(queue.length===0){return;// Nothing to do!
}// Queue up the callbacks and fire them after cleaning up all of our
// transaction state, since the callback could trigger more transactions or
// sets.
const callbacks=[];let events=[];// Ignore all of the sets we're going to re-run.
const txnsToRerun=queue.filter(q=>{return q.status===0/* TransactionStatus.RUN */;});const setsToIgnore=txnsToRerun.map(q=>{return q.currentWriteId;});for(let i=0;i<queue.length;i++){const transaction=queue[i];const relativePath=newRelativePath(path,transaction.path);let abortTransaction=false,abortReason;(0,_util.assert)(relativePath!==null,'rerunTransactionsUnderNode_: relativePath should not be null.');if(transaction.status===4/* TransactionStatus.NEEDS_ABORT */){abortTransaction=true;abortReason=transaction.abortReason;events=events.concat(syncTreeAckUserWrite(repo.serverSyncTree_,transaction.currentWriteId,true));}else if(transaction.status===0/* TransactionStatus.RUN */){if(transaction.retryCount>=MAX_TRANSACTION_RETRIES){abortTransaction=true;abortReason='maxretry';events=events.concat(syncTreeAckUserWrite(repo.serverSyncTree_,transaction.currentWriteId,true));}else{// This code reruns a transaction
const currentNode=repoGetLatestState(repo,transaction.path,setsToIgnore);transaction.currentInputSnapshot=currentNode;const newData=queue[i].update(currentNode.val());if(newData!==undefined){validateFirebaseData('transaction failed: Data returned ',newData,transaction.path);let newDataNode=nodeFromJSON(newData);const hasExplicitPriority=typeof newData==='object'&&newData!=null&&(0,_util.contains)(newData,'.priority');if(!hasExplicitPriority){// Keep the old priority if there wasn't a priority explicitly specified.
newDataNode=newDataNode.updatePriority(currentNode.getPriority());}const oldWriteId=transaction.currentWriteId;const serverValues=repoGenerateServerValues(repo);const newNodeResolved=resolveDeferredValueSnapshot(newDataNode,currentNode,serverValues);transaction.currentOutputSnapshotRaw=newDataNode;transaction.currentOutputSnapshotResolved=newNodeResolved;transaction.currentWriteId=repoGetNextWriteId(repo);// Mutates setsToIgnore in place
setsToIgnore.splice(setsToIgnore.indexOf(oldWriteId),1);events=events.concat(syncTreeApplyUserOverwrite(repo.serverSyncTree_,transaction.path,newNodeResolved,transaction.currentWriteId,transaction.applyLocally));events=events.concat(syncTreeAckUserWrite(repo.serverSyncTree_,oldWriteId,true));}else{abortTransaction=true;abortReason='nodata';events=events.concat(syncTreeAckUserWrite(repo.serverSyncTree_,transaction.currentWriteId,true));}}}eventQueueRaiseEventsForChangedPath(repo.eventQueue_,path,events);events=[];if(abortTransaction){// Abort.
queue[i].status=2/* TransactionStatus.COMPLETED */;// Removing a listener can trigger pruning which can muck with
// mergedData/visibleData (as it prunes data). So defer the unwatcher
// until we're done.
(function(unwatcher){setTimeout(unwatcher,Math.floor(0));})(queue[i].unwatcher);if(queue[i].onComplete){if(abortReason==='nodata'){callbacks.push(()=>queue[i].onComplete(null,false,queue[i].currentInputSnapshot));}else{callbacks.push(()=>queue[i].onComplete(new Error(abortReason),false,null));}}}}// Clean up completed transactions.
repoPruneCompletedTransactionsBelowNode(repo,repo.transactionQueueTree_);// Now fire callbacks, now that we're in a good, known state.
for(let i=0;i<callbacks.length;i++){exceptionGuard(callbacks[i]);}// Try to send the transaction result to the server.
repoSendReadyTransactions(repo,repo.transactionQueueTree_);}/**
 * Returns the rootmost ancestor node of the specified path that has a pending
 * transaction on it, or just returns the node for the given path if there are
 * no pending transactions on any ancestor.
 *
 * @param path - The location to start at.
 * @returns The rootmost node with a transaction.
 */function repoGetAncestorTransactionNode(repo,path){let front;// Start at the root and walk deeper into the tree towards path until we
// find a node with pending transactions.
let transactionNode=repo.transactionQueueTree_;front=pathGetFront(path);while(front!==null&&treeGetValue(transactionNode)===undefined){transactionNode=treeSubTree(transactionNode,front);path=pathPopFront(path);front=pathGetFront(path);}return transactionNode;}/**
 * Builds the queue of all transactions at or below the specified
 * transactionNode.
 *
 * @param transactionNode
 * @returns The generated queue.
 */function repoBuildTransactionQueue(repo,transactionNode){// Walk any child transaction queues and aggregate them into a single queue.
const transactionQueue=[];repoAggregateTransactionQueuesForNode(repo,transactionNode,transactionQueue);// Sort them by the order the transactions were created.
transactionQueue.sort((a,b)=>a.order-b.order);return transactionQueue;}function repoAggregateTransactionQueuesForNode(repo,node,queue){const nodeQueue=treeGetValue(node);if(nodeQueue){for(let i=0;i<nodeQueue.length;i++){queue.push(nodeQueue[i]);}}treeForEachChild(node,child=>{repoAggregateTransactionQueuesForNode(repo,child,queue);});}/**
 * Remove COMPLETED transactions at or below this node in the transactionQueueTree_.
 */function repoPruneCompletedTransactionsBelowNode(repo,node){const queue=treeGetValue(node);if(queue){let to=0;for(let from=0;from<queue.length;from++){if(queue[from].status!==2/* TransactionStatus.COMPLETED */){queue[to]=queue[from];to++;}}queue.length=to;treeSetValue(node,queue.length>0?queue:undefined);}treeForEachChild(node,childNode=>{repoPruneCompletedTransactionsBelowNode(repo,childNode);});}/**
 * Aborts all transactions on ancestors or descendants of the specified path.
 * Called when doing a set() or update() since we consider them incompatible
 * with transactions.
 *
 * @param path - Path for which we want to abort related transactions.
 */function repoAbortTransactions(repo,path){const affectedPath=treeGetPath(repoGetAncestorTransactionNode(repo,path));const transactionNode=treeSubTree(repo.transactionQueueTree_,path);treeForEachAncestor(transactionNode,node=>{repoAbortTransactionsOnNode(repo,node);});repoAbortTransactionsOnNode(repo,transactionNode);treeForEachDescendant(transactionNode,node=>{repoAbortTransactionsOnNode(repo,node);});return affectedPath;}/**
 * Abort transactions stored in this transaction queue node.
 *
 * @param node - Node to abort transactions for.
 */function repoAbortTransactionsOnNode(repo,node){const queue=treeGetValue(node);if(queue){// Queue up the callbacks and fire them after cleaning up all of our
// transaction state, since the callback could trigger more transactions
// or sets.
const callbacks=[];// Go through queue.  Any already-sent transactions must be marked for
// abort, while the unsent ones can be immediately aborted and removed.
let events=[];let lastSent=-1;for(let i=0;i<queue.length;i++){if(queue[i].status===3/* TransactionStatus.SENT_NEEDS_ABORT */);else if(queue[i].status===1/* TransactionStatus.SENT */){(0,_util.assert)(lastSent===i-1,'All SENT items should be at beginning of queue.');lastSent=i;// Mark transaction for abort when it comes back.
queue[i].status=3/* TransactionStatus.SENT_NEEDS_ABORT */;queue[i].abortReason='set';}else{(0,_util.assert)(queue[i].status===0/* TransactionStatus.RUN */,'Unexpected transaction status in abort');// We can abort it immediately.
queue[i].unwatcher();events=events.concat(syncTreeAckUserWrite(repo.serverSyncTree_,queue[i].currentWriteId,true));if(queue[i].onComplete){callbacks.push(queue[i].onComplete.bind(null,new Error('set'),false,null));}}}if(lastSent===-1){// We're not waiting for any sent transactions.  We can clear the queue.
treeSetValue(node,undefined);}else{// Remove the transactions we aborted.
queue.length=lastSent+1;}// Now fire the callbacks.
eventQueueRaiseEventsForChangedPath(repo.eventQueue_,treeGetPath(node),events);for(let i=0;i<callbacks.length;i++){exceptionGuard(callbacks[i]);}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function decodePath(pathString){let pathStringDecoded='';const pieces=pathString.split('/');for(let i=0;i<pieces.length;i++){if(pieces[i].length>0){let piece=pieces[i];try{piece=decodeURIComponent(piece.replace(/\+/g,' '));}catch(e){}pathStringDecoded+='/'+piece;}}return pathStringDecoded;}/**
 * @returns key value hash
 */function decodeQuery(queryString){const results={};if(queryString.charAt(0)==='?'){queryString=queryString.substring(1);}for(const segment of queryString.split('&')){if(segment.length===0){continue;}const kv=segment.split('=');if(kv.length===2){results[decodeURIComponent(kv[0])]=decodeURIComponent(kv[1]);}else{warn(`Invalid query segment '${segment}' in query '${queryString}'`);}}return results;}const parseRepoInfo=function(dataURL,nodeAdmin){const parsedUrl=parseDatabaseURL(dataURL),namespace=parsedUrl.namespace;if(parsedUrl.domain==='firebase.com'){fatal(parsedUrl.host+' is no longer supported. '+'Please use <YOUR FIREBASE>.firebaseio.com instead');}// Catch common error of uninitialized namespace value.
if((!namespace||namespace==='undefined')&&parsedUrl.domain!=='localhost'){fatal('Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com');}if(!parsedUrl.secure){warnIfPageIsSecure();}const webSocketOnly=parsedUrl.scheme==='ws'||parsedUrl.scheme==='wss';return{repoInfo:new RepoInfo(parsedUrl.host,parsedUrl.secure,namespace,webSocketOnly,nodeAdmin,/*persistenceKey=*/'',/*includeNamespaceInQueryParams=*/namespace!==parsedUrl.subdomain),path:new Path(parsedUrl.pathString)};};const parseDatabaseURL=function(dataURL){// Default to empty strings in the event of a malformed string.
let host='',domain='',subdomain='',pathString='',namespace='';// Always default to SSL, unless otherwise specified.
let secure=true,scheme='https',port=443;// Don't do any validation here. The caller is responsible for validating the result of parsing.
if(typeof dataURL==='string'){// Parse scheme.
let colonInd=dataURL.indexOf('//');if(colonInd>=0){scheme=dataURL.substring(0,colonInd-1);dataURL=dataURL.substring(colonInd+2);}// Parse host, path, and query string.
let slashInd=dataURL.indexOf('/');if(slashInd===-1){slashInd=dataURL.length;}let questionMarkInd=dataURL.indexOf('?');if(questionMarkInd===-1){questionMarkInd=dataURL.length;}host=dataURL.substring(0,Math.min(slashInd,questionMarkInd));if(slashInd<questionMarkInd){// For pathString, questionMarkInd will always come after slashInd
pathString=decodePath(dataURL.substring(slashInd,questionMarkInd));}const queryParams=decodeQuery(dataURL.substring(Math.min(dataURL.length,questionMarkInd)));// If we have a port, use scheme for determining if it's secure.
colonInd=host.indexOf(':');if(colonInd>=0){secure=scheme==='https'||scheme==='wss';port=parseInt(host.substring(colonInd+1),10);}else{colonInd=host.length;}const hostWithoutPort=host.slice(0,colonInd);if(hostWithoutPort.toLowerCase()==='localhost'){domain='localhost';}else if(hostWithoutPort.split('.').length<=2){domain=hostWithoutPort;}else{// Interpret the subdomain of a 3 or more component URL as the namespace name.
const dotInd=host.indexOf('.');subdomain=host.substring(0,dotInd).toLowerCase();domain=host.substring(dotInd+1);// Normalize namespaces to lowercase to share storage / connection.
namespace=subdomain;}// Always treat the value of the `ns` as the namespace name if it is present.
if('ns'in queryParams){namespace=queryParams['ns'];}}return{host,port,domain,subdomain,secure,scheme,pathString,namespace};};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Modeled after base64 web-safe chars, but ordered by ASCII.
const PUSH_CHARS='-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';/**
 * Fancy ID generator that creates 20-character string identifiers with the
 * following properties:
 *
 * 1. They're based on timestamp so that they sort *after* any existing ids.
 * 2. They contain 72-bits of random data after the timestamp so that IDs won't
 *    collide with other clients' IDs.
 * 3. They sort *lexicographically* (so the timestamp is converted to characters
 *    that will sort properly).
 * 4. They're monotonically increasing. Even if you generate more than one in
 *    the same timestamp, the latter ones will sort after the former ones. We do
 *    this by using the previous random bits but "incrementing" them by 1 (only
 *    in the case of a timestamp collision).
 */const nextPushId=function(){// Timestamp of last push, used to prevent local collisions if you push twice
// in one ms.
let lastPushTime=0;// We generate 72-bits of randomness which get turned into 12 characters and
// appended to the timestamp to prevent collisions with other clients. We
// store the last characters we generated because in the event of a collision,
// we'll use those same characters except "incremented" by one.
const lastRandChars=[];return function(now){const duplicateTime=now===lastPushTime;lastPushTime=now;let i;const timeStampChars=new Array(8);for(i=7;i>=0;i--){timeStampChars[i]=PUSH_CHARS.charAt(now%64);// NOTE: Can't use << here because javascript will convert to int and lose
// the upper bits.
now=Math.floor(now/64);}(0,_util.assert)(now===0,'Cannot push at time == 0');let id=timeStampChars.join('');if(!duplicateTime){for(i=0;i<12;i++){lastRandChars[i]=Math.floor(Math.random()*64);}}else{// If the timestamp hasn't changed since last push, use the same random
// number, except incremented by 1.
for(i=11;i>=0&&lastRandChars[i]===63;i--){lastRandChars[i]=0;}lastRandChars[i]++;}for(i=0;i<12;i++){id+=PUSH_CHARS.charAt(lastRandChars[i]);}(0,_util.assert)(id.length===20,'nextPushId: Length should be 20.');return id;};}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Encapsulates the data needed to raise an event
 */class DataEvent{/**
     * @param eventType - One of: value, child_added, child_changed, child_moved, child_removed
     * @param eventRegistration - The function to call to with the event data. User provided
     * @param snapshot - The data backing the event
     * @param prevName - Optional, the name of the previous child for child_* events.
     */constructor(eventType,eventRegistration,snapshot,prevName){this.eventType=eventType;this.eventRegistration=eventRegistration;this.snapshot=snapshot;this.prevName=prevName;}getPath(){const ref=this.snapshot.ref;if(this.eventType==='value'){return ref._path;}else{return ref.parent._path;}}getEventType(){return this.eventType;}getEventRunner(){return this.eventRegistration.getEventRunner(this);}toString(){return this.getPath().toString()+':'+this.eventType+':'+(0,_util.stringify)(this.snapshot.exportVal());}}class CancelEvent{constructor(eventRegistration,error,path){this.eventRegistration=eventRegistration;this.error=error;this.path=path;}getPath(){return this.path;}getEventType(){return'cancel';}getEventRunner(){return this.eventRegistration.getEventRunner(this);}toString(){return this.path.toString()+':cancel';}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A wrapper class that converts events from the database@exp SDK to the legacy
 * Database SDK. Events are not converted directly as event registration relies
 * on reference comparison of the original user callback (see `matches()`) and
 * relies on equality of the legacy SDK's `context` object.
 */class CallbackContext{constructor(snapshotCallback,cancelCallback){this.snapshotCallback=snapshotCallback;this.cancelCallback=cancelCallback;}onValue(expDataSnapshot,previousChildName){this.snapshotCallback.call(null,expDataSnapshot,previousChildName);}onCancel(error){(0,_util.assert)(this.hasCancelCallback,'Raising a cancel event on a listener with no cancel callback');return this.cancelCallback.call(null,error);}get hasCancelCallback(){return!!this.cancelCallback;}matches(other){return this.snapshotCallback===other.snapshotCallback||this.snapshotCallback.userCallback!==undefined&&this.snapshotCallback.userCallback===other.snapshotCallback.userCallback&&this.snapshotCallback.context===other.snapshotCallback.context;}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * The `onDisconnect` class allows you to write or clear data when your client
 * disconnects from the Database server. These updates occur whether your
 * client disconnects cleanly or not, so you can rely on them to clean up data
 * even if a connection is dropped or a client crashes.
 *
 * The `onDisconnect` class is most commonly used to manage presence in
 * applications where it is useful to detect how many clients are connected and
 * when other clients disconnect. See
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information.
 *
 * To avoid problems when a connection is dropped before the requests can be
 * transferred to the Database server, these functions should be called before
 * writing any data.
 *
 * Note that `onDisconnect` operations are only triggered once. If you want an
 * operation to occur each time a disconnect occurs, you'll need to re-establish
 * the `onDisconnect` operations each time you reconnect.
 */class OnDisconnect{/** @hideconstructor */constructor(_repo,_path){this._repo=_repo;this._path=_path;}/**
     * Cancels all previously queued `onDisconnect()` set or update events for this
     * location and all children.
     *
     * If a write has been queued for this location via a `set()` or `update()` at a
     * parent location, the write at this location will be canceled, though writes
     * to sibling locations will still occur.
     *
     * @returns Resolves when synchronization to the server is complete.
     */cancel(){const deferred=new _util.Deferred();repoOnDisconnectCancel(this._repo,this._path,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
     * Ensures the data at this location is deleted when the client is disconnected
     * (due to closing the browser, navigating to a new page, or network issues).
     *
     * @returns Resolves when synchronization to the server is complete.
     */remove(){validateWritablePath('OnDisconnect.remove',this._path);const deferred=new _util.Deferred();repoOnDisconnectSet(this._repo,this._path,null,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
     * Ensures the data at this location is set to the specified value when the
     * client is disconnected (due to closing the browser, navigating to a new page,
     * or network issues).
     *
     * `set()` is especially useful for implementing "presence" systems, where a
     * value should be changed or cleared when a user disconnects so that they
     * appear "offline" to other users. See
     * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
     * for more information.
     *
     * Note that `onDisconnect` operations are only triggered once. If you want an
     * operation to occur each time a disconnect occurs, you'll need to re-establish
     * the `onDisconnect` operations each time.
     *
     * @param value - The value to be written to this location on disconnect (can
     * be an object, array, string, number, boolean, or null).
     * @returns Resolves when synchronization to the Database is complete.
     */set(value){validateWritablePath('OnDisconnect.set',this._path);validateFirebaseDataArg('OnDisconnect.set',value,this._path,false);const deferred=new _util.Deferred();repoOnDisconnectSet(this._repo,this._path,value,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
     * Ensures the data at this location is set to the specified value and priority
     * when the client is disconnected (due to closing the browser, navigating to a
     * new page, or network issues).
     *
     * @param value - The value to be written to this location on disconnect (can
     * be an object, array, string, number, boolean, or null).
     * @param priority - The priority to be written (string, number, or null).
     * @returns Resolves when synchronization to the Database is complete.
     */setWithPriority(value,priority){validateWritablePath('OnDisconnect.setWithPriority',this._path);validateFirebaseDataArg('OnDisconnect.setWithPriority',value,this._path,false);validatePriority('OnDisconnect.setWithPriority',priority,false);const deferred=new _util.Deferred();repoOnDisconnectSetWithPriority(this._repo,this._path,value,priority,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
     * Writes multiple values at this location when the client is disconnected (due
     * to closing the browser, navigating to a new page, or network issues).
     *
     * The `values` argument contains multiple property-value pairs that will be
     * written to the Database together. Each child property can either be a simple
     * property (for example, "name") or a relative path (for example, "name/first")
     * from the current location to the data to update.
     *
     * As opposed to the `set()` method, `update()` can be use to selectively update
     * only the referenced properties at the current location (instead of replacing
     * all the child properties at the current location).
     *
     * @param values - Object containing multiple values.
     * @returns Resolves when synchronization to the Database is complete.
     */update(values){validateWritablePath('OnDisconnect.update',this._path);validateFirebaseMergeDataArg('OnDisconnect.update',values,this._path,false);const deferred=new _util.Deferred();repoOnDisconnectUpdate(this._repo,this._path,values,deferred.wrapCallback(()=>{}));return deferred.promise;}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @internal
 */exports.OnDisconnect=OnDisconnect;class QueryImpl{/**
     * @hideconstructor
     */constructor(_repo,_path,_queryParams,_orderByCalled){this._repo=_repo;this._path=_path;this._queryParams=_queryParams;this._orderByCalled=_orderByCalled;}get key(){if(pathIsEmpty(this._path)){return null;}else{return pathGetBack(this._path);}}get ref(){return new ReferenceImpl(this._repo,this._path);}get _queryIdentifier(){const obj=queryParamsGetQueryObject(this._queryParams);const id=ObjectToUniqueKey(obj);return id==='{}'?'default':id;}/**
     * An object representation of the query parameters used by this Query.
     */get _queryObject(){return queryParamsGetQueryObject(this._queryParams);}isEqual(other){other=(0,_util.getModularInstance)(other);if(!(other instanceof QueryImpl)){return false;}const sameRepo=this._repo===other._repo;const samePath=pathEquals(this._path,other._path);const sameQueryIdentifier=this._queryIdentifier===other._queryIdentifier;return sameRepo&&samePath&&sameQueryIdentifier;}toJSON(){return this.toString();}toString(){return this._repo.toString()+pathToUrlEncodedString(this._path);}}/**
 * Validates that no other order by call has been made
 */exports._QueryImpl=QueryImpl;function validateNoPreviousOrderByCall(query,fnName){if(query._orderByCalled===true){throw new Error(fnName+": You can't combine multiple orderBy calls.");}}/**
 * Validates start/end values for queries.
 */function validateQueryEndpoints(params){let startNode=null;let endNode=null;if(params.hasStart()){startNode=params.getIndexStartValue();}if(params.hasEnd()){endNode=params.getIndexEndValue();}if(params.getIndex()===KEY_INDEX){const tooManyArgsError='Query: When ordering by key, you may only pass one argument to '+'startAt(), endAt(), or equalTo().';const wrongArgTypeError='Query: When ordering by key, the argument passed to startAt(), startAfter(), '+'endAt(), endBefore(), or equalTo() must be a string.';if(params.hasStart()){const startName=params.getIndexStartName();if(startName!==MIN_NAME){throw new Error(tooManyArgsError);}else if(typeof startNode!=='string'){throw new Error(wrongArgTypeError);}}if(params.hasEnd()){const endName=params.getIndexEndName();if(endName!==MAX_NAME){throw new Error(tooManyArgsError);}else if(typeof endNode!=='string'){throw new Error(wrongArgTypeError);}}}else if(params.getIndex()===PRIORITY_INDEX){if(startNode!=null&&!isValidPriority(startNode)||endNode!=null&&!isValidPriority(endNode)){throw new Error('Query: When ordering by priority, the first argument passed to startAt(), '+'startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value '+'(null, a number, or a string).');}}else{(0,_util.assert)(params.getIndex()instanceof PathIndex||params.getIndex()===VALUE_INDEX,'unknown index type.');if(startNode!=null&&typeof startNode==='object'||endNode!=null&&typeof endNode==='object'){throw new Error('Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or '+'equalTo() cannot be an object.');}}}/**
 * Validates that limit* has been called with the correct combination of parameters
 */function validateLimit(params){if(params.hasStart()&&params.hasEnd()&&params.hasLimit()&&!params.hasAnchoredLimit()){throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use "+'limitToFirst() or limitToLast() instead.');}}/**
 * @internal
 */class ReferenceImpl extends QueryImpl{/** @hideconstructor */constructor(repo,path){super(repo,path,new QueryParams(),false);}get parent(){const parentPath=pathParent(this._path);return parentPath===null?null:new ReferenceImpl(this._repo,parentPath);}get root(){let ref=this;while(ref.parent!==null){ref=ref.parent;}return ref;}}/**
 * A `DataSnapshot` contains data from a Database location.
 *
 * Any time you read data from the Database, you receive the data as a
 * `DataSnapshot`. A `DataSnapshot` is passed to the event callbacks you attach
 * with `on()` or `once()`. You can extract the contents of the snapshot as a
 * JavaScript object by calling the `val()` method. Alternatively, you can
 * traverse into the snapshot by calling `child()` to return child snapshots
 * (which you could then call `val()` on).
 *
 * A `DataSnapshot` is an efficiently generated, immutable copy of the data at
 * a Database location. It cannot be modified and will never change (to modify
 * data, you always call the `set()` method on a `Reference` directly).
 */exports._ReferenceImpl=ReferenceImpl;class DataSnapshot{/**
     * @param _node - A SnapshotNode to wrap.
     * @param ref - The location this snapshot came from.
     * @param _index - The iteration order for this snapshot
     * @hideconstructor
     */constructor(_node,/**
     * The location of this DataSnapshot.
     */ref,_index){this._node=_node;this.ref=ref;this._index=_index;}/**
     * Gets the priority value of the data in this `DataSnapshot`.
     *
     * Applications need not use priority but can order collections by
     * ordinary properties (see
     * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data |Sorting and filtering data}
     * ).
     */get priority(){// typecast here because we never return deferred values or internal priorities (MAX_PRIORITY)
return this._node.getPriority().val();}/**
     * The key (last part of the path) of the location of this `DataSnapshot`.
     *
     * The last token in a Database location is considered its key. For example,
     * "ada" is the key for the /users/ada/ node. Accessing the key on any
     * `DataSnapshot` will return the key for the location that generated it.
     * However, accessing the key on the root URL of a Database will return
     * `null`.
     */get key(){return this.ref.key;}/** Returns the number of child properties of this `DataSnapshot`. */get size(){return this._node.numChildren();}/**
     * Gets another `DataSnapshot` for the location at the specified relative path.
     *
     * Passing a relative path to the `child()` method of a DataSnapshot returns
     * another `DataSnapshot` for the location at the specified relative path. The
     * relative path can either be a simple child name (for example, "ada") or a
     * deeper, slash-separated path (for example, "ada/name/first"). If the child
     * location has no data, an empty `DataSnapshot` (that is, a `DataSnapshot`
     * whose value is `null`) is returned.
     *
     * @param path - A relative path to the location of child data.
     */child(path){const childPath=new Path(path);const childRef=child(this.ref,path);return new DataSnapshot(this._node.getChild(childPath),childRef,PRIORITY_INDEX);}/**
     * Returns true if this `DataSnapshot` contains any data. It is slightly more
     * efficient than using `snapshot.val() !== null`.
     */exists(){return!this._node.isEmpty();}/**
     * Exports the entire contents of the DataSnapshot as a JavaScript object.
     *
     * The `exportVal()` method is similar to `val()`, except priority information
     * is included (if available), making it suitable for backing up your data.
     *
     * @returns The DataSnapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
exportVal(){return this._node.val(true);}/**
     * Enumerates the top-level children in the `DataSnapshot`.
     *
     * Because of the way JavaScript objects work, the ordering of data in the
     * JavaScript object returned by `val()` is not guaranteed to match the
     * ordering on the server nor the ordering of `onChildAdded()` events. That is
     * where `forEach()` comes in handy. It guarantees the children of a
     * `DataSnapshot` will be iterated in their query order.
     *
     * If no explicit `orderBy*()` method is used, results are returned
     * ordered by key (unless priorities are used, in which case, results are
     * returned by priority).
     *
     * @param action - A function that will be called for each child DataSnapshot.
     * The callback can return true to cancel further enumeration.
     * @returns true if enumeration was canceled due to your callback returning
     * true.
     */forEach(action){if(this._node.isLeafNode()){return false;}const childrenNode=this._node;// Sanitize the return value to a boolean. ChildrenNode.forEachChild has a weird return type...
return!!childrenNode.forEachChild(this._index,(key,node)=>{return action(new DataSnapshot(node,child(this.ref,key),PRIORITY_INDEX));});}/**
     * Returns true if the specified child path has (non-null) data.
     *
     * @param path - A relative path to the location of a potential child.
     * @returns `true` if data exists at the specified child path; else
     *  `false`.
     */hasChild(path){const childPath=new Path(path);return!this._node.getChild(childPath).isEmpty();}/**
     * Returns whether or not the `DataSnapshot` has any non-`null` child
     * properties.
     *
     * You can use `hasChildren()` to determine if a `DataSnapshot` has any
     * children. If it does, you can enumerate them using `forEach()`. If it
     * doesn't, then either this snapshot contains a primitive value (which can be
     * retrieved with `val()`) or it is empty (in which case, `val()` will return
     * `null`).
     *
     * @returns true if this snapshot has any children; else false.
     */hasChildren(){if(this._node.isLeafNode()){return false;}else{return!this._node.isEmpty();}}/**
     * Returns a JSON-serializable representation of this object.
     */toJSON(){return this.exportVal();}/**
     * Extracts a JavaScript value from a `DataSnapshot`.
     *
     * Depending on the data in a `DataSnapshot`, the `val()` method may return a
     * scalar type (string, number, or boolean), an array, or an object. It may
     * also return null, indicating that the `DataSnapshot` is empty (contains no
     * data).
     *
     * @returns The DataSnapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
val(){return this._node.val();}}/**
 *
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided path. If no path is provided, the `Reference`
 * will point to the root of the Database.
 *
 * @param db - The database instance to obtain a reference for.
 * @param path - Optional path representing the location the returned
 *   `Reference` will point. If not provided, the returned `Reference` will
 *   point to the root of the Database.
 * @returns If a path is provided, a `Reference`
 *   pointing to the provided path. Otherwise, a `Reference` pointing to the
 *   root of the Database.
 */exports.DataSnapshot=DataSnapshot;function ref(db,path){db=(0,_util.getModularInstance)(db);db._checkNotDeleted('ref');return path!==undefined?child(db._root,path):db._root;}/**
 * Returns a `Reference` representing the location in the Database
 * corresponding to the provided Firebase URL.
 *
 * An exception is thrown if the URL is not a valid Firebase Database URL or it
 * has a different domain than the current `Database` instance.
 *
 * Note that all query parameters (`orderBy`, `limitToLast`, etc.) are ignored
 * and are not applied to the returned `Reference`.
 *
 * @param db - The database instance to obtain a reference for.
 * @param url - The Firebase URL at which the returned `Reference` will
 *   point.
 * @returns A `Reference` pointing to the provided
 *   Firebase URL.
 */function refFromURL(db,url){db=(0,_util.getModularInstance)(db);db._checkNotDeleted('refFromURL');const parsedURL=parseRepoInfo(url,db._repo.repoInfo_.nodeAdmin);validateUrl('refFromURL',parsedURL);const repoInfo=parsedURL.repoInfo;if(!db._repo.repoInfo_.isCustomHost()&&repoInfo.host!==db._repo.repoInfo_.host){fatal('refFromURL'+': Host name does not match the current database: '+'(found '+repoInfo.host+' but expected '+db._repo.repoInfo_.host+')');}return ref(db,parsedURL.path.toString());}/**
 * Gets a `Reference` for the location at the specified relative path.
 *
 * The relative path can either be a simple child name (for example, "ada") or
 * a deeper slash-separated path (for example, "ada/name/first").
 *
 * @param parent - The parent location.
 * @param path - A relative path from this location to the desired child
 *   location.
 * @returns The specified child location.
 */function child(parent,path){parent=(0,_util.getModularInstance)(parent);if(pathGetFront(parent._path)===null){validateRootPathString('child','path',path,false);}else{validatePathString('child','path',path,false);}return new ReferenceImpl(parent._repo,pathChild(parent._path,path));}/**
 * Returns an `OnDisconnect` object - see
 * {@link https://firebase.google.com/docs/database/web/offline-capabilities | Enabling Offline Capabilities in JavaScript}
 * for more information on how to use it.
 *
 * @param ref - The reference to add OnDisconnect triggers for.
 */function onDisconnect(ref){ref=(0,_util.getModularInstance)(ref);return new OnDisconnect(ref._repo,ref._path);}/**
 * Generates a new child location using a unique key and returns its
 * `Reference`.
 *
 * This is the most common pattern for adding data to a collection of items.
 *
 * If you provide a value to `push()`, the value is written to the
 * generated location. If you don't pass a value, nothing is written to the
 * database and the child remains empty (but you can use the `Reference`
 * elsewhere).
 *
 * The unique keys generated by `push()` are ordered by the current time, so the
 * resulting list of items is chronologically sorted. The keys are also
 * designed to be unguessable (they contain 72 random bits of entropy).
 *
 * See {@link https://firebase.google.com/docs/database/web/lists-of-data#append_to_a_list_of_data | Append to a list of data}.
 * See {@link https://firebase.googleblog.com/2015/02/the-2120-ways-to-ensure-unique_68.html | The 2^120 Ways to Ensure Unique Identifiers}.
 *
 * @param parent - The parent location.
 * @param value - Optional value to be written at the generated location.
 * @returns Combined `Promise` and `Reference`; resolves when write is complete,
 * but can be used immediately as the `Reference` to the child location.
 */function push(parent,value){parent=(0,_util.getModularInstance)(parent);validateWritablePath('push',parent._path);validateFirebaseDataArg('push',value,parent._path,true);const now=repoServerTime(parent._repo);const name=nextPushId(now);// push() returns a ThennableReference whose promise is fulfilled with a
// regular Reference. We use child() to create handles to two different
// references. The first is turned into a ThennableReference below by adding
// then() and catch() methods and is used as the return value of push(). The
// second remains a regular Reference and is used as the fulfilled value of
// the first ThennableReference.
const thennablePushRef=child(parent,name);const pushRef=child(parent,name);let promise;if(value!=null){promise=set(pushRef,value).then(()=>pushRef);}else{promise=Promise.resolve(pushRef);}thennablePushRef.then=promise.then.bind(promise);thennablePushRef.catch=promise.then.bind(promise,undefined);return thennablePushRef;}/**
 * Removes the data at this Database location.
 *
 * Any data at child locations will also be deleted.
 *
 * The effect of the remove will be visible immediately and the corresponding
 * event 'value' will be triggered. Synchronization of the remove to the
 * Firebase servers will also be started, and the returned Promise will resolve
 * when complete. If provided, the onComplete callback will be called
 * asynchronously after synchronization has finished.
 *
 * @param ref - The location to remove.
 * @returns Resolves when remove on server is complete.
 */function remove(ref){validateWritablePath('remove',ref._path);return set(ref,null);}/**
 * Writes data to this Database location.
 *
 * This will overwrite any data at this location and all child locations.
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ("value", "child_added", etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * Passing `null` for the new value is equivalent to calling `remove()`; namely,
 * all data at this location and all child locations will be deleted.
 *
 * `set()` will remove any priority stored at this location, so if priority is
 * meant to be preserved, you need to use `setWithPriority()` instead.
 *
 * Note that modifying data with `set()` will cancel any pending transactions
 * at that location, so extreme care should be taken if mixing `set()` and
 * `transaction()` to modify the same data.
 *
 * A single `set()` will generate a single "value" event at the location where
 * the `set()` was performed.
 *
 * @param ref - The location to write to.
 * @param value - The value to be written (string, number, boolean, object,
 *   array, or null).
 * @returns Resolves when write to server is complete.
 */function set(ref,value){ref=(0,_util.getModularInstance)(ref);validateWritablePath('set',ref._path);validateFirebaseDataArg('set',value,ref._path,false);const deferred=new _util.Deferred();repoSetWithPriority(ref._repo,ref._path,value,/*priority=*/null,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
 * Sets a priority for the data at this Database location.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */function setPriority(ref,priority){ref=(0,_util.getModularInstance)(ref);validateWritablePath('setPriority',ref._path);validatePriority('setPriority',priority,false);const deferred=new _util.Deferred();repoSetWithPriority(ref._repo,pathChild(ref._path,'.priority'),priority,null,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
 * Writes data the Database location. Like `set()` but also specifies the
 * priority for that data.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sorting_and_filtering_data | Sorting and filtering data}
 * ).
 *
 * @param ref - The location to write to.
 * @param value - The value to be written (string, number, boolean, object,
 *   array, or null).
 * @param priority - The priority to be written (string, number, or null).
 * @returns Resolves when write to server is complete.
 */function setWithPriority(ref,value,priority){validateWritablePath('setWithPriority',ref._path);validateFirebaseDataArg('setWithPriority',value,ref._path,false);validatePriority('setWithPriority',priority,false);if(ref.key==='.length'||ref.key==='.keys'){throw'setWithPriority failed: '+ref.key+' is a read-only object.';}const deferred=new _util.Deferred();repoSetWithPriority(ref._repo,ref._path,value,priority,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
 * Writes multiple values to the Database at once.
 *
 * The `values` argument contains multiple property-value pairs that will be
 * written to the Database together. Each child property can either be a simple
 * property (for example, "name") or a relative path (for example,
 * "name/first") from the current location to the data to update.
 *
 * As opposed to the `set()` method, `update()` can be use to selectively update
 * only the referenced properties at the current location (instead of replacing
 * all the child properties at the current location).
 *
 * The effect of the write will be visible immediately, and the corresponding
 * events ('value', 'child_added', etc.) will be triggered. Synchronization of
 * the data to the Firebase servers will also be started, and the returned
 * Promise will resolve when complete. If provided, the `onComplete` callback
 * will be called asynchronously after synchronization has finished.
 *
 * A single `update()` will generate a single "value" event at the location
 * where the `update()` was performed, regardless of how many children were
 * modified.
 *
 * Note that modifying data with `update()` will cancel any pending
 * transactions at that location, so extreme care should be taken if mixing
 * `update()` and `transaction()` to modify the same data.
 *
 * Passing `null` to `update()` will remove the data at this location.
 *
 * See
 * {@link https://firebase.googleblog.com/2015/09/introducing-multi-location-updates-and_86.html | Introducing multi-location updates and more}.
 *
 * @param ref - The location to write to.
 * @param values - Object containing multiple values.
 * @returns Resolves when update on server is complete.
 */function update(ref,values){validateFirebaseMergeDataArg('update',values,ref._path,false);const deferred=new _util.Deferred();repoUpdate(ref._repo,ref._path,values,deferred.wrapCallback(()=>{}));return deferred.promise;}/**
 * Gets the most up-to-date result for this query.
 *
 * @param query - The query to run.
 * @returns A `Promise` which resolves to the resulting DataSnapshot if a value is
 * available, or rejects if the client is unable to return a value (e.g., if the
 * server is unreachable and there is nothing cached).
 */function get(query){query=(0,_util.getModularInstance)(query);const callbackContext=new CallbackContext(()=>{});const container=new ValueEventRegistration(callbackContext);return repoGetValue(query._repo,query,container).then(node=>{return new DataSnapshot(node,new ReferenceImpl(query._repo,query._path),query._queryParams.getIndex());});}/**
 * Represents registration for 'value' events.
 */class ValueEventRegistration{constructor(callbackContext){this.callbackContext=callbackContext;}respondsTo(eventType){return eventType==='value';}createEvent(change,query){const index=query._queryParams.getIndex();return new DataEvent('value',this,new DataSnapshot(change.snapshotNode,new ReferenceImpl(query._repo,query._path),index));}getEventRunner(eventData){if(eventData.getEventType()==='cancel'){return()=>this.callbackContext.onCancel(eventData.error);}else{return()=>this.callbackContext.onValue(eventData.snapshot,null);}}createCancelEvent(error,path){if(this.callbackContext.hasCancelCallback){return new CancelEvent(this,error,path);}else{return null;}}matches(other){if(!(other instanceof ValueEventRegistration)){return false;}else if(!other.callbackContext||!this.callbackContext){// If no callback specified, we consider it to match any callback.
return true;}else{return other.callbackContext.matches(this.callbackContext);}}hasAnyCallback(){return this.callbackContext!==null;}}/**
 * Represents the registration of a child_x event.
 */class ChildEventRegistration{constructor(eventType,callbackContext){this.eventType=eventType;this.callbackContext=callbackContext;}respondsTo(eventType){let eventToCheck=eventType==='children_added'?'child_added':eventType;eventToCheck=eventToCheck==='children_removed'?'child_removed':eventToCheck;return this.eventType===eventToCheck;}createCancelEvent(error,path){if(this.callbackContext.hasCancelCallback){return new CancelEvent(this,error,path);}else{return null;}}createEvent(change,query){(0,_util.assert)(change.childName!=null,'Child events should have a childName.');const childRef=child(new ReferenceImpl(query._repo,query._path),change.childName);const index=query._queryParams.getIndex();return new DataEvent(change.type,this,new DataSnapshot(change.snapshotNode,childRef,index),change.prevName);}getEventRunner(eventData){if(eventData.getEventType()==='cancel'){return()=>this.callbackContext.onCancel(eventData.error);}else{return()=>this.callbackContext.onValue(eventData.snapshot,eventData.prevName);}}matches(other){if(other instanceof ChildEventRegistration){return this.eventType===other.eventType&&(!this.callbackContext||!other.callbackContext||this.callbackContext.matches(other.callbackContext));}return false;}hasAnyCallback(){return!!this.callbackContext;}}function addEventListener(query,eventType,callback,cancelCallbackOrListenOptions,options){let cancelCallback;if(typeof cancelCallbackOrListenOptions==='object'){cancelCallback=undefined;options=cancelCallbackOrListenOptions;}if(typeof cancelCallbackOrListenOptions==='function'){cancelCallback=cancelCallbackOrListenOptions;}if(options&&options.onlyOnce){const userCallback=callback;const onceCallback=(dataSnapshot,previousChildName)=>{repoRemoveEventCallbackForQuery(query._repo,query,container);userCallback(dataSnapshot,previousChildName);};onceCallback.userCallback=callback.userCallback;onceCallback.context=callback.context;callback=onceCallback;}const callbackContext=new CallbackContext(callback,cancelCallback||undefined);const container=eventType==='value'?new ValueEventRegistration(callbackContext):new ChildEventRegistration(eventType,callbackContext);repoAddEventCallbackForQuery(query._repo,query,container);return()=>repoRemoveEventCallbackForQuery(query._repo,query,container);}function onValue(query,callback,cancelCallbackOrListenOptions,options){return addEventListener(query,'value',callback,cancelCallbackOrListenOptions,options);}function onChildAdded(query,callback,cancelCallbackOrListenOptions,options){return addEventListener(query,'child_added',callback,cancelCallbackOrListenOptions,options);}function onChildChanged(query,callback,cancelCallbackOrListenOptions,options){return addEventListener(query,'child_changed',callback,cancelCallbackOrListenOptions,options);}function onChildMoved(query,callback,cancelCallbackOrListenOptions,options){return addEventListener(query,'child_moved',callback,cancelCallbackOrListenOptions,options);}function onChildRemoved(query,callback,cancelCallbackOrListenOptions,options){return addEventListener(query,'child_removed',callback,cancelCallbackOrListenOptions,options);}/**
 * Detaches a callback previously attached with the corresponding `on*()` (`onValue`, `onChildAdded`) listener.
 * Note: This is not the recommended way to remove a listener. Instead, please use the returned callback function from
 * the respective `on*` callbacks.
 *
 * Detach a callback previously attached with `on*()`. Calling `off()` on a parent listener
 * will not automatically remove listeners registered on child nodes, `off()`
 * must also be called on any child listeners to remove the callback.
 *
 * If a callback is not specified, all callbacks for the specified eventType
 * will be removed. Similarly, if no eventType is specified, all callbacks
 * for the `Reference` will be removed.
 *
 * Individual listeners can also be removed by invoking their unsubscribe
 * callbacks.
 *
 * @param query - The query that the listener was registered with.
 * @param eventType - One of the following strings: "value", "child_added",
 * "child_changed", "child_removed", or "child_moved." If omitted, all callbacks
 * for the `Reference` will be removed.
 * @param callback - The callback function that was passed to `on()` or
 * `undefined` to remove all callbacks.
 */function off(query,eventType,callback){let container=null;const expCallback=callback?new CallbackContext(callback):null;if(eventType==='value'){container=new ValueEventRegistration(expCallback);}else if(eventType){container=new ChildEventRegistration(eventType,expCallback);}repoRemoveEventCallbackForQuery(query._repo,query,container);}/**
 * A `QueryConstraint` is used to narrow the set of documents returned by a
 * Database query. `QueryConstraint`s are created by invoking {@link endAt},
 * {@link endBefore}, {@link startAt}, {@link startAfter}, {@link
 * limitToFirst}, {@link limitToLast}, {@link orderByChild},
 * {@link orderByChild}, {@link orderByKey} , {@link orderByPriority} ,
 * {@link orderByValue}  or {@link equalTo} and
 * can then be passed to {@link query} to create a new query instance that
 * also contains this `QueryConstraint`.
 */class QueryConstraint{}exports.QueryConstraint=QueryConstraint;class QueryEndAtConstraint extends QueryConstraint{constructor(_value,_key){super();this._value=_value;this._key=_key;}_apply(query){validateFirebaseDataArg('endAt',this._value,query._path,true);const newParams=queryParamsEndAt(query._queryParams,this._value,this._key);validateLimit(newParams);validateQueryEndpoints(newParams);if(query._queryParams.hasEnd()){throw new Error('endAt: Starting point was already set (by another call to endAt, '+'endBefore or equalTo).');}return new QueryImpl(query._repo,query._path,newParams,query._orderByCalled);}}/**
 * Creates a `QueryConstraint` with the specified ending point.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The ending point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name less than or equal
 * to the specified key.
 *
 * You can read more about `endAt()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to end at. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to end at, among the children with the previously
 * specified priority. This argument is only allowed if ordering by child,
 * value, or priority.
 */function endAt(value,key){validateKey('endAt','key',key,true);return new QueryEndAtConstraint(value,key);}class QueryEndBeforeConstraint extends QueryConstraint{constructor(_value,_key){super();this._value=_value;this._key=_key;}_apply(query){validateFirebaseDataArg('endBefore',this._value,query._path,false);const newParams=queryParamsEndBefore(query._queryParams,this._value,this._key);validateLimit(newParams);validateQueryEndpoints(newParams);if(query._queryParams.hasEnd()){throw new Error('endBefore: Starting point was already set (by another call to endAt, '+'endBefore or equalTo).');}return new QueryImpl(query._repo,query._path,newParams,query._orderByCalled);}}/**
 * Creates a `QueryConstraint` with the specified ending point (exclusive).
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The ending point is exclusive. If only a value is provided, children
 * with a value less than the specified value will be included in the query.
 * If a key is specified, then children must have a value less than or equal
 * to the specified value and a key name less than the specified key.
 *
 * @param value - The value to end before. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to end before, among the children with the
 * previously specified priority. This argument is only allowed if ordering by
 * child, value, or priority.
 */function endBefore(value,key){validateKey('endBefore','key',key,true);return new QueryEndBeforeConstraint(value,key);}class QueryStartAtConstraint extends QueryConstraint{constructor(_value,_key){super();this._value=_value;this._key=_key;}_apply(query){validateFirebaseDataArg('startAt',this._value,query._path,true);const newParams=queryParamsStartAt(query._queryParams,this._value,this._key);validateLimit(newParams);validateQueryEndpoints(newParams);if(query._queryParams.hasStart()){throw new Error('startAt: Starting point was already set (by another call to startAt, '+'startBefore or equalTo).');}return new QueryImpl(query._repo,query._path,newParams,query._orderByCalled);}}/**
 * Creates a `QueryConstraint` with the specified starting point.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The starting point is inclusive, so children with exactly the specified value
 * will be included in the query. The optional key argument can be used to
 * further limit the range of the query. If it is specified, then children that
 * have exactly the specified value must also have a key name greater than or
 * equal to the specified key.
 *
 * You can read more about `startAt()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to start at. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start at. This argument is only allowed if
 * ordering by child, value, or priority.
 */function startAt(value=null,key){validateKey('startAt','key',key,true);return new QueryStartAtConstraint(value,key);}class QueryStartAfterConstraint extends QueryConstraint{constructor(_value,_key){super();this._value=_value;this._key=_key;}_apply(query){validateFirebaseDataArg('startAfter',this._value,query._path,false);const newParams=queryParamsStartAfter(query._queryParams,this._value,this._key);validateLimit(newParams);validateQueryEndpoints(newParams);if(query._queryParams.hasStart()){throw new Error('startAfter: Starting point was already set (by another call to startAt, '+'startAfter, or equalTo).');}return new QueryImpl(query._repo,query._path,newParams,query._orderByCalled);}}/**
 * Creates a `QueryConstraint` with the specified starting point (exclusive).
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The starting point is exclusive. If only a value is provided, children
 * with a value greater than the specified value will be included in the query.
 * If a key is specified, then children must have a value greater than or equal
 * to the specified value and a a key name greater than the specified key.
 *
 * @param value - The value to start after. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start after. This argument is only allowed if
 * ordering by child, value, or priority.
 */function startAfter(value,key){validateKey('startAfter','key',key,true);return new QueryStartAfterConstraint(value,key);}class QueryLimitToFirstConstraint extends QueryConstraint{constructor(_limit){super();this._limit=_limit;}_apply(query){if(query._queryParams.hasLimit()){throw new Error('limitToFirst: Limit was already set (by another call to limitToFirst '+'or limitToLast).');}return new QueryImpl(query._repo,query._path,queryParamsLimitToFirst(query._queryParams,this._limit),query._orderByCalled);}}/**
 * Creates a new `QueryConstraint` that if limited to the first specific number
 * of children.
 *
 * The `limitToFirst()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the first 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToFirst()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param limit - The maximum number of nodes to include in this query.
 */function limitToFirst(limit){if(typeof limit!=='number'||Math.floor(limit)!==limit||limit<=0){throw new Error('limitToFirst: First argument must be a positive integer.');}return new QueryLimitToFirstConstraint(limit);}class QueryLimitToLastConstraint extends QueryConstraint{constructor(_limit){super();this._limit=_limit;}_apply(query){if(query._queryParams.hasLimit()){throw new Error('limitToLast: Limit was already set (by another call to limitToFirst '+'or limitToLast).');}return new QueryImpl(query._repo,query._path,queryParamsLimitToLast(query._queryParams,this._limit),query._orderByCalled);}}/**
 * Creates a new `QueryConstraint` that is limited to return only the last
 * specified number of children.
 *
 * The `limitToLast()` method is used to set a maximum number of children to be
 * synced for a given callback. If we set a limit of 100, we will initially only
 * receive up to 100 `child_added` events. If we have fewer than 100 messages
 * stored in our Database, a `child_added` event will fire for each message.
 * However, if we have over 100 messages, we will only receive a `child_added`
 * event for the last 100 ordered messages. As items change, we will receive
 * `child_removed` events for each item that drops out of the active list so
 * that the total number stays at 100.
 *
 * You can read more about `limitToLast()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param limit - The maximum number of nodes to include in this query.
 */function limitToLast(limit){if(typeof limit!=='number'||Math.floor(limit)!==limit||limit<=0){throw new Error('limitToLast: First argument must be a positive integer.');}return new QueryLimitToLastConstraint(limit);}class QueryOrderByChildConstraint extends QueryConstraint{constructor(_path){super();this._path=_path;}_apply(query){validateNoPreviousOrderByCall(query,'orderByChild');const parsedPath=new Path(this._path);if(pathIsEmpty(parsedPath)){throw new Error('orderByChild: cannot pass in empty path. Use orderByValue() instead.');}const index=new PathIndex(parsedPath);const newParams=queryParamsOrderBy(query._queryParams,index);validateQueryEndpoints(newParams);return new QueryImpl(query._repo,query._path,newParams,/*orderByCalled=*/true);}}/**
 * Creates a new `QueryConstraint` that orders by the specified child key.
 *
 * Queries can only order by one key at a time. Calling `orderByChild()`
 * multiple times on the same query is an error.
 *
 * Firebase queries allow you to order your data by any child key on the fly.
 * However, if you know in advance what your indexes will be, you can define
 * them via the .indexOn rule in your Security Rules for better performance. See
 * the{@link https://firebase.google.com/docs/database/security/indexing-data}
 * rule for more information.
 *
 * You can read more about `orderByChild()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 *
 * @param path - The path to order by.
 */function orderByChild(path){if(path==='$key'){throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');}else if(path==='$priority'){throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');}else if(path==='$value'){throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');}validatePathString('orderByChild','path',path,false);return new QueryOrderByChildConstraint(path);}class QueryOrderByKeyConstraint extends QueryConstraint{_apply(query){validateNoPreviousOrderByCall(query,'orderByKey');const newParams=queryParamsOrderBy(query._queryParams,KEY_INDEX);validateQueryEndpoints(newParams);return new QueryImpl(query._repo,query._path,newParams,/*orderByCalled=*/true);}}/**
 * Creates a new `QueryConstraint` that orders by the key.
 *
 * Sorts the results of a query by their (ascending) key values.
 *
 * You can read more about `orderByKey()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 */function orderByKey(){return new QueryOrderByKeyConstraint();}class QueryOrderByPriorityConstraint extends QueryConstraint{_apply(query){validateNoPreviousOrderByCall(query,'orderByPriority');const newParams=queryParamsOrderBy(query._queryParams,PRIORITY_INDEX);validateQueryEndpoints(newParams);return new QueryImpl(query._repo,query._path,newParams,/*orderByCalled=*/true);}}/**
 * Creates a new `QueryConstraint` that orders by priority.
 *
 * Applications need not use priority but can order collections by
 * ordinary properties (see
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}
 * for alternatives to priority.
 */function orderByPriority(){return new QueryOrderByPriorityConstraint();}class QueryOrderByValueConstraint extends QueryConstraint{_apply(query){validateNoPreviousOrderByCall(query,'orderByValue');const newParams=queryParamsOrderBy(query._queryParams,VALUE_INDEX);validateQueryEndpoints(newParams);return new QueryImpl(query._repo,query._path,newParams,/*orderByCalled=*/true);}}/**
 * Creates a new `QueryConstraint` that orders by value.
 *
 * If the children of a query are all scalar values (string, number, or
 * boolean), you can order the results by their (ascending) values.
 *
 * You can read more about `orderByValue()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#sort_data | Sort data}.
 */function orderByValue(){return new QueryOrderByValueConstraint();}class QueryEqualToValueConstraint extends QueryConstraint{constructor(_value,_key){super();this._value=_value;this._key=_key;}_apply(query){validateFirebaseDataArg('equalTo',this._value,query._path,false);if(query._queryParams.hasStart()){throw new Error('equalTo: Starting point was already set (by another call to startAt/startAfter or '+'equalTo).');}if(query._queryParams.hasEnd()){throw new Error('equalTo: Ending point was already set (by another call to endAt/endBefore or '+'equalTo).');}return new QueryEndAtConstraint(this._value,this._key)._apply(new QueryStartAtConstraint(this._value,this._key)._apply(query));}}/**
 * Creates a `QueryConstraint` that includes children that match the specified
 * value.
 *
 * Using `startAt()`, `startAfter()`, `endBefore()`, `endAt()` and `equalTo()`
 * allows you to choose arbitrary starting and ending points for your queries.
 *
 * The optional key argument can be used to further limit the range of the
 * query. If it is specified, then children that have exactly the specified
 * value must also have exactly the specified key as their key name. This can be
 * used to filter result sets with many matches for the same value.
 *
 * You can read more about `equalTo()` in
 * {@link https://firebase.google.com/docs/database/web/lists-of-data#filtering_data | Filtering data}.
 *
 * @param value - The value to match for. The argument type depends on which
 * `orderBy*()` function was used in this query. Specify a value that matches
 * the `orderBy*()` type. When used in combination with `orderByKey()`, the
 * value must be a string.
 * @param key - The child key to start at, among the children with the
 * previously specified priority. This argument is only allowed if ordering by
 * child, value, or priority.
 */function equalTo(value,key){validateKey('equalTo','key',key,true);return new QueryEqualToValueConstraint(value,key);}/**
 * Creates a new immutable instance of `Query` that is extended to also include
 * additional query constraints.
 *
 * @param query - The Query instance to use as a base for the new constraints.
 * @param queryConstraints - The list of `QueryConstraint`s to apply.
 * @throws if any of the provided query constraints cannot be combined with the
 * existing or new constraints.
 */function query(query,...queryConstraints){let queryImpl=(0,_util.getModularInstance)(query);for(const constraint of queryConstraints){queryImpl=constraint._apply(queryImpl);}return queryImpl;}/**
 * Define reference constructor in various modules
 *
 * We are doing this here to avoid several circular
 * dependency issues
 */syncPointSetReferenceConstructor(ReferenceImpl);syncTreeSetReferenceConstructor(ReferenceImpl);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * This variable is also defined in the firebase Node.js Admin SDK. Before
 * modifying this definition, consult the definition in:
 *
 * https://github.com/firebase/firebase-admin-node
 *
 * and make sure the two are consistent.
 */const FIREBASE_DATABASE_EMULATOR_HOST_VAR='FIREBASE_DATABASE_EMULATOR_HOST';/**
 * Creates and caches `Repo` instances.
 */const repos={};/**
 * If true, any new `Repo` will be created to use `ReadonlyRestClient` (for testing purposes).
 */let useRestClient=false;/**
 * Update an existing `Repo` in place to point to a new host/port.
 */function repoManagerApplyEmulatorSettings(repo,host,port,tokenProvider){repo.repoInfo_=new RepoInfo(`${host}:${port}`,/* secure= */false,repo.repoInfo_.namespace,repo.repoInfo_.webSocketOnly,repo.repoInfo_.nodeAdmin,repo.repoInfo_.persistenceKey,repo.repoInfo_.includeNamespaceInQueryParams);if(tokenProvider){repo.authTokenProvider_=tokenProvider;}}/**
 * This function should only ever be called to CREATE a new database instance.
 * @internal
 */function repoManagerDatabaseFromApp(app,authProvider,appCheckProvider,url,nodeAdmin){let dbUrl=url||app.options.databaseURL;if(dbUrl===undefined){if(!app.options.projectId){fatal("Can't determine Firebase Database URL. Be sure to include "+' a Project ID when calling firebase.initializeApp().');}log('Using default host for project ',app.options.projectId);dbUrl=`${app.options.projectId}-default-rtdb.firebaseio.com`;}let parsedUrl=parseRepoInfo(dbUrl,nodeAdmin);let repoInfo=parsedUrl.repoInfo;let isEmulator;let dbEmulatorHost=undefined;if(typeof process!=='undefined'&&process.env){dbEmulatorHost=process.env[FIREBASE_DATABASE_EMULATOR_HOST_VAR];}if(dbEmulatorHost){isEmulator=true;dbUrl=`http://${dbEmulatorHost}?ns=${repoInfo.namespace}`;parsedUrl=parseRepoInfo(dbUrl,nodeAdmin);repoInfo=parsedUrl.repoInfo;}else{isEmulator=!parsedUrl.repoInfo.secure;}const authTokenProvider=nodeAdmin&&isEmulator?new EmulatorTokenProvider(EmulatorTokenProvider.OWNER):new FirebaseAuthTokenProvider(app.name,app.options,authProvider);validateUrl('Invalid Firebase Database URL',parsedUrl);if(!pathIsEmpty(parsedUrl.path)){fatal('Database URL must point to the root of a Firebase Database '+'(not including a child path).');}const repo=repoManagerCreateRepo(repoInfo,app,authTokenProvider,new AppCheckTokenProvider(app.name,appCheckProvider));return new Database(repo,app);}/**
 * Remove the repo and make sure it is disconnected.
 *
 */function repoManagerDeleteRepo(repo,appName){const appRepos=repos[appName];// This should never happen...
if(!appRepos||appRepos[repo.key]!==repo){fatal(`Database ${appName}(${repo.repoInfo_}) has already been deleted.`);}repoInterrupt(repo);delete appRepos[repo.key];}/**
 * Ensures a repo doesn't already exist and then creates one using the
 * provided app.
 *
 * @param repoInfo - The metadata about the Repo
 * @returns The Repo object for the specified server / repoName.
 */function repoManagerCreateRepo(repoInfo,app,authTokenProvider,appCheckProvider){let appRepos=repos[app.name];if(!appRepos){appRepos={};repos[app.name]=appRepos;}let repo=appRepos[repoInfo.toURLString()];if(repo){fatal('Database initialized multiple times. Please make sure the format of the database URL matches with each database() call.');}repo=new Repo(repoInfo,useRestClient,authTokenProvider,appCheckProvider);appRepos[repoInfo.toURLString()]=repo;return repo;}/**
 * Forces us to use ReadonlyRestClient instead of PersistentConnection for new Repos.
 */function repoManagerForceRestClient(forceRestClient){useRestClient=forceRestClient;}/**
 * Class representing a Firebase Realtime Database.
 */class Database{/** @hideconstructor */constructor(_repoInternal,/** The {@link @firebase/app#FirebaseApp} associated with this Realtime Database instance. */app){this._repoInternal=_repoInternal;this.app=app;/** Represents a `Database` instance. */this['type']='database';/** Track if the instance has been used (root or repo accessed) */this._instanceStarted=false;}get _repo(){if(!this._instanceStarted){repoStart(this._repoInternal,this.app.options.appId,this.app.options['databaseAuthVariableOverride']);this._instanceStarted=true;}return this._repoInternal;}get _root(){if(!this._rootInternal){this._rootInternal=new ReferenceImpl(this._repo,newEmptyPath());}return this._rootInternal;}_delete(){if(this._rootInternal!==null){repoManagerDeleteRepo(this._repo,this.app.name);this._repoInternal=null;this._rootInternal=null;}return Promise.resolve();}_checkNotDeleted(apiName){if(this._rootInternal===null){fatal('Cannot call '+apiName+' on a deleted database.');}}}exports.Database=Database;function checkTransportInit(){if(TransportManager.IS_TRANSPORT_INITIALIZED){warn('Transport has already been initialized. Please call this function before calling ref or setting up a listener');}}/**
 * Force the use of websockets instead of longPolling.
 */function forceWebSockets(){checkTransportInit();BrowserPollConnection.forceDisallow();}/**
 * Force the use of longPolling instead of websockets. This will be ignored if websocket protocol is used in databaseURL.
 */function forceLongPolling(){checkTransportInit();WebSocketConnection.forceDisallow();BrowserPollConnection.forceAllow();}/**
 * Returns the instance of the Realtime Database SDK that is associated
 * with the provided {@link @firebase/app#FirebaseApp}. Initializes a new instance with
 * with default settings if no instance exists or if the existing instance uses
 * a custom database URL.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned Realtime
 * Database instance is associated with.
 * @param url - The URL of the Realtime Database instance to connect to. If not
 * provided, the SDK connects to the default instance of the Firebase App.
 * @returns The `Database` instance of the provided app.
 */function getDatabase(app=(0,_app.getApp)(),url){const db=(0,_app._getProvider)(app,'database').getImmediate({identifier:url});if(!db._instanceStarted){const emulator=(0,_util.getDefaultEmulatorHostnameAndPort)('database');if(emulator){connectDatabaseEmulator(db,...emulator);}}return db;}/**
 * Modify the provided instance to communicate with the Realtime Database
 * emulator.
 *
 * <p>Note: This method must be called before performing any other operation.
 *
 * @param db - The instance to modify.
 * @param host - The emulator host (ex: localhost)
 * @param port - The emulator port (ex: 8080)
 * @param options.mockUserToken - the mock auth token to use for unit testing Security Rules
 */function connectDatabaseEmulator(db,host,port,options={}){db=(0,_util.getModularInstance)(db);db._checkNotDeleted('useEmulator');if(db._instanceStarted){fatal('Cannot call useEmulator() after instance has already been initialized.');}const repo=db._repoInternal;let tokenProvider=undefined;if(repo.repoInfo_.nodeAdmin){if(options.mockUserToken){fatal('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".');}tokenProvider=new EmulatorTokenProvider(EmulatorTokenProvider.OWNER);}else if(options.mockUserToken){const token=typeof options.mockUserToken==='string'?options.mockUserToken:(0,_util.createMockUserToken)(options.mockUserToken,db.app.options.projectId);tokenProvider=new EmulatorTokenProvider(token);}// Modify the repo to apply emulator settings
repoManagerApplyEmulatorSettings(repo,host,port,tokenProvider);}/**
 * Disconnects from the server (all Database operations will be completed
 * offline).
 *
 * The client automatically maintains a persistent connection to the Database
 * server, which will remain active indefinitely and reconnect when
 * disconnected. However, the `goOffline()` and `goOnline()` methods may be used
 * to control the client connection in cases where a persistent connection is
 * undesirable.
 *
 * While offline, the client will no longer receive data updates from the
 * Database. However, all Database operations performed locally will continue to
 * immediately fire events, allowing your application to continue behaving
 * normally. Additionally, each operation performed locally will automatically
 * be queued and retried upon reconnection to the Database server.
 *
 * To reconnect to the Database and begin receiving remote events, see
 * `goOnline()`.
 *
 * @param db - The instance to disconnect.
 */function goOffline(db){db=(0,_util.getModularInstance)(db);db._checkNotDeleted('goOffline');repoInterrupt(db._repo);}/**
 * Reconnects to the server and synchronizes the offline Database state
 * with the server state.
 *
 * This method should be used after disabling the active connection with
 * `goOffline()`. Once reconnected, the client will transmit the proper data
 * and fire the appropriate events so that your client "catches up"
 * automatically.
 *
 * @param db - The instance to reconnect.
 */function goOnline(db){db=(0,_util.getModularInstance)(db);db._checkNotDeleted('goOnline');repoResume(db._repo);}function enableLogging(logger,persistent){enableLogging$1(logger,persistent);}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function registerDatabase(variant){setSDKVersion(_app.SDK_VERSION);(0,_app._registerComponent)(new _component.Component('database',(container,{instanceIdentifier:url})=>{const app=container.getProvider('app').getImmediate();const authProvider=container.getProvider('auth-internal');const appCheckProvider=container.getProvider('app-check-internal');return repoManagerDatabaseFromApp(app,authProvider,appCheckProvider,url);},"PUBLIC"/* ComponentType.PUBLIC */).setMultipleInstances(true));(0,_app.registerVersion)(name,version,variant);// BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
(0,_app.registerVersion)(name,version,'esm2017');}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const SERVER_TIMESTAMP={'.sv':'timestamp'};/**
 * Returns a placeholder value for auto-populating the current timestamp (time
 * since the Unix epoch, in milliseconds) as determined by the Firebase
 * servers.
 */function serverTimestamp(){return SERVER_TIMESTAMP;}/**
 * Returns a placeholder value that can be used to atomically increment the
 * current database value by the provided delta.
 *
 * @param delta - the amount to modify the current value atomically.
 * @returns A placeholder value for modifying data atomically server-side.
 */function increment(delta){return{'.sv':{'increment':delta}};}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A type for the resolve value of {@link runTransaction}.
 */class TransactionResult{/** @hideconstructor */constructor(/** Whether the transaction was successfully committed. */committed,/** The resulting data snapshot. */snapshot){this.committed=committed;this.snapshot=snapshot;}/** Returns a JSON-serializable representation of this object. */toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()};}}/**
 * Atomically modifies the data at this location.
 *
 * Atomically modify the data at this location. Unlike a normal `set()`, which
 * just overwrites the data regardless of its previous value, `runTransaction()` is
 * used to modify the existing value to a new value, ensuring there are no
 * conflicts with other clients writing to the same location at the same time.
 *
 * To accomplish this, you pass `runTransaction()` an update function which is
 * used to transform the current value into a new value. If another client
 * writes to the location before your new value is successfully written, your
 * update function will be called again with the new current value, and the
 * write will be retried. This will happen repeatedly until your write succeeds
 * without conflict or you abort the transaction by not returning a value from
 * your update function.
 *
 * Note: Modifying data with `set()` will cancel any pending transactions at
 * that location, so extreme care should be taken if mixing `set()` and
 * `runTransaction()` to update the same data.
 *
 * Note: When using transactions with Security and Firebase Rules in place, be
 * aware that a client needs `.read` access in addition to `.write` access in
 * order to perform a transaction. This is because the client-side nature of
 * transactions requires the client to read the data in order to transactionally
 * update it.
 *
 * @param ref - The location to atomically modify.
 * @param transactionUpdate - A developer-supplied function which will be passed
 * the current data stored at this location (as a JavaScript object). The
 * function should return the new value it would like written (as a JavaScript
 * object). If `undefined` is returned (i.e. you return with no arguments) the
 * transaction will be aborted and the data at this location will not be
 * modified.
 * @param options - An options object to configure transactions.
 * @returns A `Promise` that can optionally be used instead of the `onComplete`
 * callback to handle success and failure.
 */exports.TransactionResult=TransactionResult;function runTransaction(ref,// eslint-disable-next-line @typescript-eslint/no-explicit-any
transactionUpdate,options){var _a;ref=(0,_util.getModularInstance)(ref);validateWritablePath('Reference.transaction',ref._path);if(ref.key==='.length'||ref.key==='.keys'){throw'Reference.transaction failed: '+ref.key+' is a read-only object.';}const applyLocally=(_a=options===null||options===void 0?void 0:options.applyLocally)!==null&&_a!==void 0?_a:true;const deferred=new _util.Deferred();const promiseComplete=(error,committed,node)=>{let dataSnapshot=null;if(error){deferred.reject(error);}else{dataSnapshot=new DataSnapshot(node,new ReferenceImpl(ref._repo,ref._path),PRIORITY_INDEX);deferred.resolve(new TransactionResult(committed,dataSnapshot));}};// Add a watch to make sure we get server updates.
const unwatcher=onValue(ref,()=>{});repoStartTransaction(ref._repo,ref._path,transactionUpdate,promiseComplete,unwatcher,applyLocally);return deferred.promise;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */PersistentConnection;// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.simpleListen=function(pathString,onComplete){this.sendRequest('q',{p:pathString},onComplete);};// eslint-disable-next-line @typescript-eslint/no-explicit-any
PersistentConnection.prototype.echo=function(data,onEcho){this.sendRequest('echo',{d:data},onEcho);};// RealTimeConnection properties that we use in tests.
Connection;/**
 * @internal
 */const hijackHash=function(newHash){const oldPut=PersistentConnection.prototype.put;PersistentConnection.prototype.put=function(pathString,data,onComplete,hash){if(hash!==undefined){hash=newHash();}oldPut.call(this,pathString,data,onComplete,hash);};return function(){PersistentConnection.prototype.put=oldPut;};};exports._TEST_ACCESS_hijackHash=hijackHash;RepoInfo;/**
 * Forces the RepoManager to create Repos that use ReadonlyRestClient instead of PersistentConnection.
 * @internal
 */const forceRestClient=function(forceRestClient){repoManagerForceRestClient(forceRestClient);};/**
 * Firebase Realtime Database
 *
 * @packageDocumentation
 */exports._TEST_ACCESS_forceRestClient=forceRestClient;registerDatabase();

}).call(this)}).call(this,require('_process'))
},{"@firebase/app":3,"@firebase/component":4,"@firebase/logger":6,"@firebase/util":7,"_process":48}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogLevel = void 0;
exports.setLogLevel = setLogLevel;
exports.setUserLogHandler = setUserLogHandler;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A container for all of the Logger instances
 */
const instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */
var LogLevel;
exports.LogLevel = LogLevel;
(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */
const defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */
const ConsoleMethod = {
  [LogLevel.DEBUG]: 'log',
  [LogLevel.VERBOSE]: 'log',
  [LogLevel.INFO]: 'info',
  [LogLevel.WARN]: 'warn',
  [LogLevel.ERROR]: 'error'
};
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */
const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }
  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];
  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};
class Logger {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */
    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */
    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */
    this._userLogHandler = null;
    /**
     * Capture the current instance for later use
     */
    instances.push(this);
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(val) {
    this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(val) {
    if (typeof val !== 'function') {
      throw new TypeError('Value assigned to `logHandler` must be a function');
    }
    this._logHandler = val;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
    this._logHandler(this, LogLevel.DEBUG, ...args);
  }
  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }
  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
    this._logHandler(this, LogLevel.INFO, ...args);
  }
  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
    this._logHandler(this, LogLevel.WARN, ...args);
  }
  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
    this._logHandler(this, LogLevel.ERROR, ...args);
  }
}
exports.Logger = Logger;
function setLogLevel(level) {
  instances.forEach(inst => {
    inst.setLogLevel(level);
  });
}
function setUserLogHandler(logCallback, options) {
  for (const instance of instances) {
    let customLogLevel = null;
    if (options && options.level) {
      customLogLevel = levelStringToEnum[options.level];
    }
    if (logCallback === null) {
      instance.userLogHandler = null;
    } else {
      instance.userLogHandler = (instance, level, ...args) => {
        const message = args.map(arg => {
          if (arg == null) {
            return null;
          } else if (typeof arg === 'string') {
            return arg;
          } else if (typeof arg === 'number' || typeof arg === 'boolean') {
            return arg.toString();
          } else if (arg instanceof Error) {
            return arg.message;
          } else {
            try {
              return JSON.stringify(arg);
            } catch (ignored) {
              return null;
            }
          }
        }).filter(arg => arg).join(' ');
        if (level >= (customLogLevel !== null && customLogLevel !== void 0 ? customLogLevel : instance.logLevel)) {
          logCallback({
            level: LogLevel[level].toLowerCase(),
            message,
            args,
            type: instance.name
          });
        }
      };
    }
  }
}

},{}],7:[function(require,module,exports){
(function (process,global){(function (){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sha1 = exports.RANDOM_FACTOR = exports.MAX_VALUE_MILLIS = exports.FirebaseError = exports.ErrorFactory = exports.Deferred = exports.CONSTANTS = void 0;
exports.areCookiesEnabled = areCookiesEnabled;
exports.assertionError = exports.assert = void 0;
exports.async = async;
exports.base64urlEncodeWithoutPadding = exports.base64Encode = exports.base64Decode = exports.base64 = void 0;
exports.calculateBackoffMillis = calculateBackoffMillis;
exports.contains = contains;
exports.createMockUserToken = createMockUserToken;
exports.createSubscribe = createSubscribe;
exports.decode = void 0;
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.extractQuerystring = extractQuerystring;
exports.getExperimentalSetting = exports.getDefaults = exports.getDefaultEmulatorHostnameAndPort = exports.getDefaultEmulatorHost = exports.getDefaultAppConfig = void 0;
exports.getGlobal = getGlobal;
exports.getModularInstance = getModularInstance;
exports.getUA = getUA;
exports.isAdmin = void 0;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isIndexedDBAvailable = isIndexedDBAvailable;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isSafari = isSafari;
exports.isUWP = isUWP;
exports.issuedAtTime = exports.isValidTimestamp = exports.isValidFormat = void 0;
exports.jsonEval = jsonEval;
exports.map = map;
exports.ordinal = ordinal;
exports.promiseWithTimeout = promiseWithTimeout;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringToByteArray = exports.stringLength = void 0;
exports.stringify = stringify;
exports.validateArgCount = exports.uuidv4 = void 0;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateIndexedDBOpenable = validateIndexedDBOpenable;
exports.validateNamespace = validateNamespace;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
const CONSTANTS = {
  /**
   * @define {boolean} Whether this is the client Node.js SDK.
   */
  NODE_CLIENT: false,
  /**
   * @define {boolean} Whether this is the Admin Node.js SDK.
   */
  NODE_ADMIN: false,
  /**
   * Firebase SDK Version
   */
  SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
exports.CONSTANTS = CONSTANTS;
const assert = function (assertion, message) {
  if (!assertion) {
    throw assertionError(message);
  }
};
/**
 * Returns an Error object suitable for throwing.
 */
exports.assert = assert;
const assertionError = function (message) {
  return new Error('Firebase Database (' + CONSTANTS.SDK_VERSION + ') INTERNAL ASSERT FAILED: ' + message);
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.assertionError = assertionError;
const stringToByteArray$1 = function (str) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if ((c & 0xfc00) === 0xd800 && i + 1 < str.length && (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
      // Surrogate Pair
      c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
const byteArrayToString = function (bytes) {
  // TODO(user): Use native implementations if/when available
  const out = [];
  let pos = 0,
    c = 0;
  while (pos < bytes.length) {
    const c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
const base64 = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + '+/=';
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + '-_.';
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob === 'function',
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error('encodeByteArray takes an array as a parameter');
    }
    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];
    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 0x0f) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 0x3f;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join('');
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(input, webSafe) {
    // Shortcut for Mozilla browsers that implement
    // a native base64 encoder in the form of "btoa/atob"
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];
    for (let i = 0; i < input.length;) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }
      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 0xf0 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 0xc0 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      // We want quick mappings back and forth, so we precompute two maps.
      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        // Be forgiving when decoding and correctly decode both encodings.
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
/**
 * URL-safe base64 encoding
 */
exports.base64 = base64;
const base64Encode = function (str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 encoding (without "." padding in the end).
 * e.g. Used in JSON Web Token (JWT) parts.
 */
exports.base64Encode = base64Encode;
const base64urlEncodeWithoutPadding = function (str) {
  // Use base64url encoding and remove padding in the end (dot characters).
  return base64Encode(str).replace(/\./g, '');
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
exports.base64urlEncodeWithoutPadding = base64urlEncodeWithoutPadding;
const base64Decode = function (str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error('base64Decode failed: ', e);
  }
  return null;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
exports.base64Decode = base64Decode;
function deepCopy(value) {
  return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 *
 * Note: we don't merge __proto__ to prevent prototype pollution
 */
function deepExtend(target, source) {
  if (!(source instanceof Object)) {
    return source;
  }
  switch (source.constructor) {
    case Date:
      // Treat Dates like scalars; if the target date object had any child
      // properties - they will be lost!
      const dateValue = source;
      return new Date(dateValue.getTime());
    case Object:
      if (target === undefined) {
        target = {};
      }
      break;
    case Array:
      // Always copy the array source and overwrite the target.
      target = [];
      break;
    default:
      // Not a plain Object - treat it as a scalar.
      return source;
  }
  for (const prop in source) {
    // use isValidKey to guard against prototype pollution. See https://snyk.io/vuln/SNYK-JS-LODASH-450202
    if (!source.hasOwnProperty(prop) || !isValidKey(prop)) {
      continue;
    }
    target[prop] = deepExtend(target[prop], source[prop]);
  }
  return target;
}
function isValidKey(key) {
  return key !== '__proto__';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Polyfill for `globalThis` object.
 * @returns the `globalThis` object for the given environment.
 * @public
 */
function getGlobal() {
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('Unable to locate global object.');
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
/**
 * Attempt to read defaults from a JSON string provided to
 * process(.)env(.)__FIREBASE_DEFAULTS__ or a JSON file whose path is in
 * process(.)env(.)__FIREBASE_DEFAULTS_PATH__
 * The dots are in parens because certain compilers (Vite?) cannot
 * handle seeing that variable in comments.
 * See https://github.com/firebase/firebase-js-sdk/issues/6838
 */
const getDefaultsFromEnvVariable = () => {
  if (typeof process === 'undefined' || typeof process.env === 'undefined') {
    return;
  }
  const defaultsJsonString = process.env.__FIREBASE_DEFAULTS__;
  if (defaultsJsonString) {
    return JSON.parse(defaultsJsonString);
  }
};
const getDefaultsFromCookie = () => {
  if (typeof document === 'undefined') {
    return;
  }
  let match;
  try {
    match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch (e) {
    // Some environments such as Angular Universal SSR have a
    // `document` object but error on accessing `document.cookie`.
    return;
  }
  const decoded = match && base64Decode(match[1]);
  return decoded && JSON.parse(decoded);
};
/**
 * Get the __FIREBASE_DEFAULTS__ object. It checks in order:
 * (1) if such an object exists as a property of `globalThis`
 * (2) if such an object was provided on a shell environment variable
 * (3) if such an object exists in a cookie
 * @public
 */
const getDefaults = () => {
  try {
    return getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
  } catch (e) {
    /**
     * Catch-all for being unable to get __FIREBASE_DEFAULTS__ due
     * to any environment case we have not accounted for. Log to
     * info instead of swallowing so we can find these unknown cases
     * and add paths for them if needed.
     */
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
};
/**
 * Returns emulator host stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a URL host formatted like `127.0.0.1:9999` or `[::1]:4000` if available
 * @public
 */
exports.getDefaults = getDefaults;
const getDefaultEmulatorHost = productName => {
  var _a, _b;
  return (_b = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
/**
 * Returns emulator hostname and port stored in the __FIREBASE_DEFAULTS__ object
 * for the given product.
 * @returns a pair of hostname and port like `["::1", 4000]` if available
 * @public
 */
exports.getDefaultEmulatorHost = getDefaultEmulatorHost;
const getDefaultEmulatorHostnameAndPort = productName => {
  const host = getDefaultEmulatorHost(productName);
  if (!host) {
    return undefined;
  }
  const separatorIndex = host.lastIndexOf(':'); // Finding the last since IPv6 addr also has colons.
  if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
    throw new Error(`Invalid host ${host} with no separate hostname and port!`);
  }
  // eslint-disable-next-line no-restricted-globals
  const port = parseInt(host.substring(separatorIndex + 1), 10);
  if (host[0] === '[') {
    // Bracket-quoted `[ipv6addr]:port` => return "ipv6addr" (without brackets).
    return [host.substring(1, separatorIndex - 1), port];
  } else {
    return [host.substring(0, separatorIndex), port];
  }
};
/**
 * Returns Firebase app config stored in the __FIREBASE_DEFAULTS__ object.
 * @public
 */
exports.getDefaultEmulatorHostnameAndPort = getDefaultEmulatorHostnameAndPort;
const getDefaultAppConfig = () => {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.config;
};
/**
 * Returns an experimental setting on the __FIREBASE_DEFAULTS__ object (properties
 * prefixed by "_")
 * @public
 */
exports.getDefaultAppConfig = getDefaultAppConfig;
const getExperimentalSetting = name => {
  var _a;
  return (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a[`_${name}`];
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.getExperimentalSetting = getExperimentalSetting;
class Deferred {
  constructor() {
    this.reject = () => {};
    this.resolve = () => {};
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }
      if (typeof callback === 'function') {
        // Attaching noop handler just in case developer wasn't expecting
        // promises
        this.promise.catch(() => {});
        // Some of our callbacks don't expect a value and our own tests
        // assert that the parameter length is 1
        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.Deferred = Deferred;
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  // Unsecured JWTs use "none" as the algorithm.
  const header = {
    alg: 'none',
    type: 'JWT'
  };
  const project = projectId || 'demo-project';
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  const payload = Object.assign({
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: 'custom',
      identities: {}
    }
  }, token);
  // Unsecured JWTs use the empty string as a signature.
  const signature = '';
  return [base64urlEncodeWithoutPadding(JSON.stringify(header)), base64urlEncodeWithoutPadding(JSON.stringify(payload)), signature].join('.');
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
  return typeof window !== 'undefined' &&
  // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected or specified.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
  var _a;
  const forceEnvironment = (_a = getDefaults()) === null || _a === void 0 ? void 0 : _a.forceEnvironment;
  if (forceEnvironment === 'node') {
    return true;
  } else if (forceEnvironment === 'browser') {
    return false;
  }
  try {
    return Object.prototype.toString.call(global.process) === '[object process]';
  } catch (e) {
    return false;
  }
}
/**
 * Detect Browser Environment
 */
function isBrowser() {
  return typeof self === 'object' && self.self === self;
}
function isBrowserExtension() {
  const runtime = typeof chrome === 'object' ? chrome.runtime : typeof browser === 'object' ? browser.runtime : undefined;
  return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
  return typeof navigator === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */
function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
  const ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
  return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}
/** Returns true if we are running in Safari. */
function isSafari() {
  return !isNode() && navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');
}
/**
 * This method checks if indexedDB is supported by current browser/service worker context
 * @return true if indexedDB is supported by current browser/service worker context
 */
function isIndexedDBAvailable() {
  try {
    return typeof indexedDB === 'object';
  } catch (e) {
    return false;
  }
}
/**
 * This method validates browser/sw context for indexedDB by opening a dummy indexedDB database and reject
 * if errors occur during the database open operation.
 *
 * @throws exception if current browser/sw context can't run idb.open (ex: Safari iframe, Firefox
 * private browsing)
 */
function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = 'validate-browser-context-for-indexeddb-analytics-module';
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        // delete database only when it doesn't pre-exist
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };
      request.onerror = () => {
        var _a;
        reject(((_a = request.error) === null || _a === void 0 ? void 0 : _a.message) || '');
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 *
 * This method checks whether cookie is enabled within current browser
 * @return true if cookie is enabled within current browser
 */
function areCookiesEnabled() {
  if (typeof navigator === 'undefined' || !navigator.cookieEnabled) {
    return false;
  }
  return true;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if ((e as FirebaseError)?.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */
const ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
class FirebaseError extends Error {
  constructor( /** The error code for this error. */
  code, message, /** Custom data for this error. */
  customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    /** The custom name for all FirebaseErrors. */
    this.name = ERROR_NAME;
    // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, FirebaseError.prototype);
    // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }
}
exports.FirebaseError = FirebaseError;
class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }
  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : 'Error';
    // Service Name: Error message (service/code).
    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }
}
exports.ErrorFactory = ErrorFactory;
function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}
const PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
  return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
  return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
const decode = function (token) {
  let header = {},
    claims = {},
    data = {},
    signature = '';
  try {
    const parts = token.split('.');
    header = jsonEval(base64Decode(parts[0]) || '');
    claims = jsonEval(base64Decode(parts[1]) || '');
    signature = parts[2];
    data = claims['d'] || {};
    delete claims['d'];
  } catch (e) {}
  return {
    header,
    claims,
    data,
    signature
  };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
exports.decode = decode;
const isValidTimestamp = function (token) {
  const claims = decode(token).claims;
  const now = Math.floor(new Date().getTime() / 1000);
  let validSince = 0,
    validUntil = 0;
  if (typeof claims === 'object') {
    if (claims.hasOwnProperty('nbf')) {
      validSince = claims['nbf'];
    } else if (claims.hasOwnProperty('iat')) {
      validSince = claims['iat'];
    }
    if (claims.hasOwnProperty('exp')) {
      validUntil = claims['exp'];
    } else {
      // token will expire after 24h by default
      validUntil = validSince + 86400;
    }
  }
  return !!now && !!validSince && !!validUntil && now >= validSince && now <= validUntil;
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
exports.isValidTimestamp = isValidTimestamp;
const issuedAtTime = function (token) {
  const claims = decode(token).claims;
  if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
    return claims['iat'];
  }
  return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
exports.issuedAtTime = issuedAtTime;
const isValidFormat = function (token) {
  const decoded = decode(token),
    claims = decoded.claims;
  return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
exports.isValidFormat = isValidFormat;
const isAdmin = function (token) {
  const claims = decode(token).claims;
  return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
exports.isAdmin = isAdmin;
function contains(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  } else {
    return undefined;
  }
}
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function map(obj, fn, contextObj) {
  const res = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      res[key] = fn.call(contextObj, obj[key], key, obj);
    }
  }
  return res;
}
/**
 * Deep equal two objects. Support Arrays and Objects.
 */
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  for (const k of aKeys) {
    if (!bKeys.includes(k)) {
      return false;
    }
    const aProp = a[k];
    const bProp = b[k];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (const k of bKeys) {
    if (!aKeys.includes(k)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && typeof thing === 'object';
}

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Rejects if the given promise doesn't resolve in timeInMS milliseconds.
 * @internal
 */
function promiseWithTimeout(promise, timeInMS = 2000) {
  const deferredPromise = new Deferred();
  setTimeout(() => deferredPromise.reject('timeout!'), timeInMS);
  promise.then(deferredPromise.resolve, deferredPromise.reject);
  return deferredPromise.promise;
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
  const params = [];
  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach(arrayVal => {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }
  return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
  const obj = {};
  const tokens = querystring.replace(/^\?/, '').split('&');
  tokens.forEach(token => {
    if (token) {
      const [key, value] = token.split('=');
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
/**
 * Extract the query string part of a URL, including the leading question mark (if present).
 */
function extractQuerystring(url) {
  const queryStart = url.indexOf('?');
  if (!queryStart) {
    return '';
  }
  const fragmentStart = url.indexOf('#', queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : undefined);
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
class Sha1 {
  constructor() {
    /**
     * Holds the previous values of accumulated variables a-e in the compress_
     * function.
     * @private
     */
    this.chain_ = [];
    /**
     * A buffer holding the partially computed hash result.
     * @private
     */
    this.buf_ = [];
    /**
     * An array of 80 bytes, each a part of the message to be hashed.  Referred to
     * as the message schedule in the docs.
     * @private
     */
    this.W_ = [];
    /**
     * Contains data needed to pad messages less than 64 bytes.
     * @private
     */
    this.pad_ = [];
    /**
     * @private {number}
     */
    this.inbuf_ = 0;
    /**
     * @private {number}
     */
    this.total_ = 0;
    this.blockSize = 512 / 8;
    this.pad_[0] = 128;
    for (let i = 1; i < this.blockSize; ++i) {
      this.pad_[i] = 0;
    }
    this.reset();
  }
  reset() {
    this.chain_[0] = 0x67452301;
    this.chain_[1] = 0xefcdab89;
    this.chain_[2] = 0x98badcfe;
    this.chain_[3] = 0x10325476;
    this.chain_[4] = 0xc3d2e1f0;
    this.inbuf_ = 0;
    this.total_ = 0;
  }
  /**
   * Internal compress helper function.
   * @param buf Block to compress.
   * @param offset Offset of the block in the buffer.
   * @private
   */
  compress_(buf, offset) {
    if (!offset) {
      offset = 0;
    }
    const W = this.W_;
    // get 16 big endian words
    if (typeof buf === 'string') {
      for (let i = 0; i < 16; i++) {
        // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
        // have a bug that turns the post-increment ++ operator into pre-increment
        // during JIT compilation.  We have code that depends heavily on SHA-1 for
        // correctness and which is affected by this bug, so I've removed all uses
        // of post-increment ++ in which the result value is used.  We can revert
        // this change once the Safari bug
        // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
        // most clients have been updated.
        W[i] = buf.charCodeAt(offset) << 24 | buf.charCodeAt(offset + 1) << 16 | buf.charCodeAt(offset + 2) << 8 | buf.charCodeAt(offset + 3);
        offset += 4;
      }
    } else {
      for (let i = 0; i < 16; i++) {
        W[i] = buf[offset] << 24 | buf[offset + 1] << 16 | buf[offset + 2] << 8 | buf[offset + 3];
        offset += 4;
      }
    }
    // expand to 80 words
    for (let i = 16; i < 80; i++) {
      const t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      W[i] = (t << 1 | t >>> 31) & 0xffffffff;
    }
    let a = this.chain_[0];
    let b = this.chain_[1];
    let c = this.chain_[2];
    let d = this.chain_[3];
    let e = this.chain_[4];
    let f, k;
    // TODO(user): Try to unroll this loop to speed up the computation.
    for (let i = 0; i < 80; i++) {
      if (i < 40) {
        if (i < 20) {
          f = d ^ b & (c ^ d);
          k = 0x5a827999;
        } else {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        }
      } else {
        if (i < 60) {
          f = b & c | d & (b | c);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }
      }
      const t = (a << 5 | a >>> 27) + f + e + k + W[i] & 0xffffffff;
      e = d;
      d = c;
      c = (b << 30 | b >>> 2) & 0xffffffff;
      b = a;
      a = t;
    }
    this.chain_[0] = this.chain_[0] + a & 0xffffffff;
    this.chain_[1] = this.chain_[1] + b & 0xffffffff;
    this.chain_[2] = this.chain_[2] + c & 0xffffffff;
    this.chain_[3] = this.chain_[3] + d & 0xffffffff;
    this.chain_[4] = this.chain_[4] + e & 0xffffffff;
  }
  update(bytes, length) {
    // TODO(johnlenz): tighten the function signature and remove this check
    if (bytes == null) {
      return;
    }
    if (length === undefined) {
      length = bytes.length;
    }
    const lengthMinusBlock = length - this.blockSize;
    let n = 0;
    // Using local instead of member variables gives ~5% speedup on Firefox 16.
    const buf = this.buf_;
    let inbuf = this.inbuf_;
    // The outer while loop should execute at most twice.
    while (n < length) {
      // When we have no data in the block to top up, we can directly process the
      // input buffer (assuming it contains sufficient data). This gives ~25%
      // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
      // the data is provided in large chunks (or in multiples of 64 bytes).
      if (inbuf === 0) {
        while (n <= lengthMinusBlock) {
          this.compress_(bytes, n);
          n += this.blockSize;
        }
      }
      if (typeof bytes === 'string') {
        while (n < length) {
          buf[inbuf] = bytes.charCodeAt(n);
          ++inbuf;
          ++n;
          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0;
            // Jump to the outer loop so we use the full-block optimization.
            break;
          }
        }
      } else {
        while (n < length) {
          buf[inbuf] = bytes[n];
          ++inbuf;
          ++n;
          if (inbuf === this.blockSize) {
            this.compress_(buf);
            inbuf = 0;
            // Jump to the outer loop so we use the full-block optimization.
            break;
          }
        }
      }
    }
    this.inbuf_ = inbuf;
    this.total_ += length;
  }
  /** @override */
  digest() {
    const digest = [];
    let totalBits = this.total_ * 8;
    // Add pad 0x80 0x00*.
    if (this.inbuf_ < 56) {
      this.update(this.pad_, 56 - this.inbuf_);
    } else {
      this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
    }
    // Add # bits.
    for (let i = this.blockSize - 1; i >= 56; i--) {
      this.buf_[i] = totalBits & 255;
      totalBits /= 256; // Don't use bit-shifting here!
    }

    this.compress_(this.buf_);
    let n = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 24; j >= 0; j -= 8) {
        digest[n] = this.chain_[i] >> j & 255;
        ++n;
      }
    }
    return digest;
  }
}

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
exports.Sha1 = Sha1;
function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
class ObserverProxy {
  /**
   * @param executor Function which can make calls to a single Observer
   *     as a proxy.
   * @param onNoObservers Callback when count of Observers goes to zero.
   */
  constructor(executor, onNoObservers) {
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0;
    // Micro-task scheduling by calling task.then().
    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers;
    // Call the executor asynchronously so subscribers that are called
    // synchronously after the creation of the subscribe function
    // can still receive the very first value generated in the executor.
    this.task.then(() => {
      executor(this);
    }).catch(e => {
      this.error(e);
    });
  }
  next(value) {
    this.forEachObserver(observer => {
      observer.next(value);
    });
  }
  error(error) {
    this.forEachObserver(observer => {
      observer.error(error);
    });
    this.close(error);
  }
  complete() {
    this.forEachObserver(observer => {
      observer.complete();
    });
    this.close();
  }
  /**
   * Subscribe function that can be used to add an Observer to the fan-out list.
   *
   * - We require that no event is sent to a subscriber sychronously to their
   *   call to subscribe().
   */
  subscribe(nextOrObserver, error, complete) {
    let observer;
    if (nextOrObserver === undefined && error === undefined && complete === undefined) {
      throw new Error('Missing Observer.');
    }
    // Assemble an Observer object when passed as callback functions.
    if (implementsAnyMethods(nextOrObserver, ['next', 'error', 'complete'])) {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }
    if (observer.next === undefined) {
      observer.next = noop;
    }
    if (observer.error === undefined) {
      observer.error = noop;
    }
    if (observer.complete === undefined) {
      observer.complete = noop;
    }
    const unsub = this.unsubscribeOne.bind(this, this.observers.length);
    // Attempt to subscribe to a terminated Observable - we
    // just respond to the Observer with the final error or complete
    // event.
    if (this.finalized) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.task.then(() => {
        try {
          if (this.finalError) {
            observer.error(this.finalError);
          } else {
            observer.complete();
          }
        } catch (e) {
          // nothing
        }
        return;
      });
    }
    this.observers.push(observer);
    return unsub;
  }
  // Unsubscribe is synchronous - we guarantee that no events are sent to
  // any unsubscribed Observer.
  unsubscribeOne(i) {
    if (this.observers === undefined || this.observers[i] === undefined) {
      return;
    }
    delete this.observers[i];
    this.observerCount -= 1;
    if (this.observerCount === 0 && this.onNoObservers !== undefined) {
      this.onNoObservers(this);
    }
  }
  forEachObserver(fn) {
    if (this.finalized) {
      // Already closed by previous event....just eat the additional values.
      return;
    }
    // Since sendOne calls asynchronously - there is no chance that
    // this.observers will become undefined.
    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn);
    }
  }
  // Call the Observer via one of it's callback function. We are careful to
  // confirm that the observe has not been unsubscribed since this asynchronous
  // function had been queued.
  sendOne(i, fn) {
    // Execute the callback asynchronously
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.task.then(() => {
      if (this.observers !== undefined && this.observers[i] !== undefined) {
        try {
          fn(this.observers[i]);
        } catch (e) {
          // Ignore exceptions raised in Observers or missing methods of an
          // Observer.
          // Log error to console. b/31404806
          if (typeof console !== 'undefined' && console.error) {
            console.error(e);
          }
        }
      }
    });
  }
  close(err) {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    if (err !== undefined) {
      this.finalError = err;
    }
    // Proxy is no longer needed - garbage collect references
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.task.then(() => {
      this.observers = undefined;
      this.onNoObservers = undefined;
    });
  }
}
/** Turn synchronous function into one called asynchronously. */
// eslint-disable-next-line @typescript-eslint/ban-types
function async(fn, onError) {
  return (...args) => {
    Promise.resolve(true).then(() => {
      fn(...args);
    }).catch(error => {
      if (onError) {
        onError(error);
      }
    });
  };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  for (const method of methods) {
    if (method in obj && typeof obj[method] === 'function') {
      return true;
    }
  }
  return false;
}
function noop() {
  // do nothing
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
const validateArgCount = function (fnName, minCount, maxCount, argCount) {
  let argError;
  if (argCount < minCount) {
    argError = 'at least ' + minCount;
  } else if (argCount > maxCount) {
    argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
  }
  if (argError) {
    const error = fnName + ' failed: Was called with ' + argCount + (argCount === 1 ? ' argument.' : ' arguments.') + ' Expects ' + argError + '.';
    throw new Error(error);
  }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argName The name of the argument
 * @return The prefix to add to the error thrown for validation.
 */
exports.validateArgCount = validateArgCount;
function errorPrefix(fnName, argName) {
  return `${fnName} failed: ${argName} argument `;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, namespace, optional) {
  if (optional && !namespace) {
    return;
  }
  if (typeof namespace !== 'string') {
    //TODO: I should do more validation here. We only allow certain chars in namespaces.
    throw new Error(errorPrefix(fnName, 'namespace') + 'must be a valid firebase namespace.');
  }
}
function validateCallback(fnName, argumentName,
// eslint-disable-next-line @typescript-eslint/ban-types
callback, optional) {
  if (optional && !callback) {
    return;
  }
  if (typeof callback !== 'function') {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid function.');
  }
}
function validateContextObject(fnName, argumentName, context, optional) {
  if (optional && !context) {
    return;
  }
  if (typeof context !== 'object' || context === null) {
    throw new Error(errorPrefix(fnName, argumentName) + 'must be a valid context object.');
  }
}

/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
const stringToByteArray = function (str) {
  const out = [];
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    // Is this the lead surrogate in a surrogate pair?
    if (c >= 0xd800 && c <= 0xdbff) {
      const high = c - 0xd800; // the high 10 bits.
      i++;
      assert(i < str.length, 'Surrogate pair missing trail surrogate.');
      const low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
      c = 0x10000 + (high << 10) + low;
    }
    if (c < 128) {
      out[p++] = c;
    } else if (c < 2048) {
      out[p++] = c >> 6 | 192;
      out[p++] = c & 63 | 128;
    } else if (c < 65536) {
      out[p++] = c >> 12 | 224;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    } else {
      out[p++] = c >> 18 | 240;
      out[p++] = c >> 12 & 63 | 128;
      out[p++] = c >> 6 & 63 | 128;
      out[p++] = c & 63 | 128;
    }
  }
  return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
exports.stringToByteArray = stringToByteArray;
const stringLength = function (str) {
  let p = 0;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 128) {
      p++;
    } else if (c < 2048) {
      p += 2;
    } else if (c >= 0xd800 && c <= 0xdbff) {
      // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
      p += 4;
      i++; // skip trail surrogate.
    } else {
      p += 3;
    }
  }
  return p;
};

/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Copied from https://stackoverflow.com/a/2117523
 * Generates a new uuid.
 * @public
 */
exports.stringLength = stringLength;
const uuidv4 = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0,
      v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The amount of milliseconds to exponentially increase.
 */
exports.uuidv4 = uuidv4;
const DEFAULT_INTERVAL_MILLIS = 1000;
/**
 * The factor to backoff by.
 * Should be a number greater than 1.
 */
const DEFAULT_BACKOFF_FACTOR = 2;
/**
 * The maximum milliseconds to increase to.
 *
 * <p>Visible for testing
 */
const MAX_VALUE_MILLIS = 4 * 60 * 60 * 1000; // Four hours, like iOS and Android.
/**
 * The percentage of backoff time to randomize by.
 * See
 * http://go/safe-client-behavior#step-1-determine-the-appropriate-retry-interval-to-handle-spike-traffic
 * for context.
 *
 * <p>Visible for testing
 */
exports.MAX_VALUE_MILLIS = MAX_VALUE_MILLIS;
const RANDOM_FACTOR = 0.5;
/**
 * Based on the backoff method from
 * https://github.com/google/closure-library/blob/master/closure/goog/math/exponentialbackoff.js.
 * Extracted here so we don't need to pass metadata and a stateful ExponentialBackoff object around.
 */
exports.RANDOM_FACTOR = RANDOM_FACTOR;
function calculateBackoffMillis(backoffCount, intervalMillis = DEFAULT_INTERVAL_MILLIS, backoffFactor = DEFAULT_BACKOFF_FACTOR) {
  // Calculates an exponentially increasing value.
  // Deviation: calculates value from count and a constant interval, so we only need to save value
  // and count to restore state.
  const currBaseValue = intervalMillis * Math.pow(backoffFactor, backoffCount);
  // A random "fuzz" to avoid waves of retries.
  // Deviation: randomFactor is required.
  const randomWait = Math.round(
  // A fraction of the backoff value to add/subtract.
  // Deviation: changes multiplication order to improve readability.
  RANDOM_FACTOR * currBaseValue * (
  // A random float (rounded to int by Math.round above) in the range [-1, 1]. Determines
  // if we add or subtract.
  Math.random() - 0.5) * 2);
  // Limits backoff to max to avoid effectively permanent backoff.
  return Math.min(MAX_VALUE_MILLIS, currBaseValue + randomWait);
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provide English ordinal letters after a number
 */
function ordinal(i) {
  if (!Number.isFinite(i)) {
    return `${i}`;
  }
  return i + indicator(i);
}
function indicator(i) {
  i = Math.abs(i);
  const cent = i % 100;
  if (cent >= 10 && cent <= 20) {
    return 'th';
  }
  const dec = i % 10;
  if (dec === 1) {
    return 'st';
  }
  if (dec === 2) {
    return 'nd';
  }
  if (dec === 3) {
    return 'rd';
  }
  return 'th';
}

/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}

}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":48}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            var t;

	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));
},{"./cipher-core":10,"./core":11,"./enc-base64":12,"./evpkdf":15,"./md5":20}],10:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./evpkdf"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./evpkdf"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            var block;

	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            var modeCreator;

	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            var finalProcessedBlocks;

	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            var wordArray;

	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            var salt;

	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));
},{"./core":11,"./evpkdf":15}],11:[function(require,module,exports){
(function (global){(function (){
"use strict";

;
(function (root, factory) {
  if (typeof exports === "object") {
    // CommonJS
    module.exports = exports = factory();
  } else if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory);
  } else {
    // Global (browser)
    root.CryptoJS = factory();
  }
})(void 0, function () {
  /*globals window, global, require*/

  /**
   * CryptoJS core components.
   */
  var CryptoJS = CryptoJS || function (Math, undefined) {
    var crypto;

    // Native crypto from window (Browser)
    if (typeof window !== 'undefined' && window.crypto) {
      crypto = window.crypto;
    }

    // Native crypto in web worker (Browser)
    if (typeof self !== 'undefined' && self.crypto) {
      crypto = self.crypto;
    }

    // Native crypto from worker
    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
      crypto = globalThis.crypto;
    }

    // Native (experimental IE 11) crypto from window (Browser)
    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
      crypto = window.msCrypto;
    }

    // Native crypto from global (NodeJS)
    if (!crypto && typeof global !== 'undefined' && global.crypto) {
      crypto = global.crypto;
    }

    // Native crypto import via require (NodeJS)
    if (!crypto && typeof require === 'function') {
      try {
        crypto = require('crypto');
      } catch (err) {}
    }

    /*
     * Cryptographically secure pseudorandom number generator
     *
     * As Math.random() is cryptographically not safe to use
     */
    var cryptoSecureRandomInt = function () {
      if (crypto) {
        // Use getRandomValues method (Browser)
        if (typeof crypto.getRandomValues === 'function') {
          try {
            return crypto.getRandomValues(new Uint32Array(1))[0];
          } catch (err) {}
        }

        // Use randomBytes method (NodeJS)
        if (typeof crypto.randomBytes === 'function') {
          try {
            return crypto.randomBytes(4).readInt32LE();
          } catch (err) {}
        }
      }
      throw new Error('Native crypto module could not be used to get secure random number.');
    };

    /*
     * Local polyfill of Object.create
      */
    var create = Object.create || function () {
      function F() {}
      return function (obj) {
        var subtype;
        F.prototype = obj;
        subtype = new F();
        F.prototype = null;
        return subtype;
      };
    }();

    /**
     * CryptoJS namespace.
     */
    var C = {};

    /**
     * Library namespace.
     */
    var C_lib = C.lib = {};

    /**
     * Base object for prototypal inheritance.
     */
    var Base = C_lib.Base = function () {
      return {
        /**
         * Creates a new object that inherits from this object.
         *
         * @param {Object} overrides Properties to copy into the new object.
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         field: 'value',
         *
         *         method: function () {
         *         }
         *     });
         */
        extend: function (overrides) {
          // Spawn
          var subtype = create(this);

          // Augment
          if (overrides) {
            subtype.mixIn(overrides);
          }

          // Create default initializer
          if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
            subtype.init = function () {
              subtype.$super.init.apply(this, arguments);
            };
          }

          // Initializer's prototype is the subtype object
          subtype.init.prototype = subtype;

          // Reference supertype
          subtype.$super = this;
          return subtype;
        },
        /**
         * Extends this object and runs the init method.
         * Arguments to create() will be passed to init().
         *
         * @return {Object} The new object.
         *
         * @static
         *
         * @example
         *
         *     var instance = MyType.create();
         */
        create: function () {
          var instance = this.extend();
          instance.init.apply(instance, arguments);
          return instance;
        },
        /**
         * Initializes a newly created object.
         * Override this method to add some logic when your objects are created.
         *
         * @example
         *
         *     var MyType = CryptoJS.lib.Base.extend({
         *         init: function () {
         *             // ...
         *         }
         *     });
         */
        init: function () {},
        /**
         * Copies properties into this object.
         *
         * @param {Object} properties The properties to mix in.
         *
         * @example
         *
         *     MyType.mixIn({
         *         field: 'value'
         *     });
         */
        mixIn: function (properties) {
          for (var propertyName in properties) {
            if (properties.hasOwnProperty(propertyName)) {
              this[propertyName] = properties[propertyName];
            }
          }

          // IE won't copy toString using the loop above
          if (properties.hasOwnProperty('toString')) {
            this.toString = properties.toString;
          }
        },
        /**
         * Creates a copy of this object.
         *
         * @return {Object} The clone.
         *
         * @example
         *
         *     var clone = instance.clone();
         */
        clone: function () {
          return this.init.prototype.extend(this);
        }
      };
    }();

    /**
     * An array of 32-bit words.
     *
     * @property {Array} words The array of 32-bit words.
     * @property {number} sigBytes The number of significant bytes in this word array.
     */
    var WordArray = C_lib.WordArray = Base.extend({
      /**
       * Initializes a newly created word array.
       *
       * @param {Array} words (Optional) An array of 32-bit words.
       * @param {number} sigBytes (Optional) The number of significant bytes in the words.
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.create();
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
       *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
       */
      init: function (words, sigBytes) {
        words = this.words = words || [];
        if (sigBytes != undefined) {
          this.sigBytes = sigBytes;
        } else {
          this.sigBytes = words.length * 4;
        }
      },
      /**
       * Converts this word array to a string.
       *
       * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
       *
       * @return {string} The stringified word array.
       *
       * @example
       *
       *     var string = wordArray + '';
       *     var string = wordArray.toString();
       *     var string = wordArray.toString(CryptoJS.enc.Utf8);
       */
      toString: function (encoder) {
        return (encoder || Hex).stringify(this);
      },
      /**
       * Concatenates a word array to this word array.
       *
       * @param {WordArray} wordArray The word array to append.
       *
       * @return {WordArray} This word array.
       *
       * @example
       *
       *     wordArray1.concat(wordArray2);
       */
      concat: function (wordArray) {
        // Shortcuts
        var thisWords = this.words;
        var thatWords = wordArray.words;
        var thisSigBytes = this.sigBytes;
        var thatSigBytes = wordArray.sigBytes;

        // Clamp excess bits
        this.clamp();

        // Concat
        if (thisSigBytes % 4) {
          // Copy one byte at a time
          for (var i = 0; i < thatSigBytes; i++) {
            var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
            thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
          }
        } else {
          // Copy one word at a time
          for (var j = 0; j < thatSigBytes; j += 4) {
            thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
          }
        }
        this.sigBytes += thatSigBytes;

        // Chainable
        return this;
      },
      /**
       * Removes insignificant bits.
       *
       * @example
       *
       *     wordArray.clamp();
       */
      clamp: function () {
        // Shortcuts
        var words = this.words;
        var sigBytes = this.sigBytes;

        // Clamp
        words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
        words.length = Math.ceil(sigBytes / 4);
      },
      /**
       * Creates a copy of this word array.
       *
       * @return {WordArray} The clone.
       *
       * @example
       *
       *     var clone = wordArray.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);
        clone.words = this.words.slice(0);
        return clone;
      },
      /**
       * Creates a word array filled with random bytes.
       *
       * @param {number} nBytes The number of random bytes to generate.
       *
       * @return {WordArray} The random word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.lib.WordArray.random(16);
       */
      random: function (nBytes) {
        var words = [];
        for (var i = 0; i < nBytes; i += 4) {
          words.push(cryptoSecureRandomInt());
        }
        return new WordArray.init(words, nBytes);
      }
    });

    /**
     * Encoder namespace.
     */
    var C_enc = C.enc = {};

    /**
     * Hex encoding strategy.
     */
    var Hex = C_enc.Hex = {
      /**
       * Converts a word array to a hex string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The hex string.
       *
       * @static
       *
       * @example
       *
       *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var hexChars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          hexChars.push((bite >>> 4).toString(16));
          hexChars.push((bite & 0x0f).toString(16));
        }
        return hexChars.join('');
      },
      /**
       * Converts a hex string to a word array.
       *
       * @param {string} hexStr The hex string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
       */
      parse: function (hexStr) {
        // Shortcut
        var hexStrLength = hexStr.length;

        // Convert
        var words = [];
        for (var i = 0; i < hexStrLength; i += 2) {
          words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
        }
        return new WordArray.init(words, hexStrLength / 2);
      }
    };

    /**
     * Latin1 encoding strategy.
     */
    var Latin1 = C_enc.Latin1 = {
      /**
       * Converts a word array to a Latin1 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The Latin1 string.
       *
       * @static
       *
       * @example
       *
       *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
       */
      stringify: function (wordArray) {
        // Shortcuts
        var words = wordArray.words;
        var sigBytes = wordArray.sigBytes;

        // Convert
        var latin1Chars = [];
        for (var i = 0; i < sigBytes; i++) {
          var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
          latin1Chars.push(String.fromCharCode(bite));
        }
        return latin1Chars.join('');
      },
      /**
       * Converts a Latin1 string to a word array.
       *
       * @param {string} latin1Str The Latin1 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
       */
      parse: function (latin1Str) {
        // Shortcut
        var latin1StrLength = latin1Str.length;

        // Convert
        var words = [];
        for (var i = 0; i < latin1StrLength; i++) {
          words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
        }
        return new WordArray.init(words, latin1StrLength);
      }
    };

    /**
     * UTF-8 encoding strategy.
     */
    var Utf8 = C_enc.Utf8 = {
      /**
       * Converts a word array to a UTF-8 string.
       *
       * @param {WordArray} wordArray The word array.
       *
       * @return {string} The UTF-8 string.
       *
       * @static
       *
       * @example
       *
       *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
       */
      stringify: function (wordArray) {
        try {
          return decodeURIComponent(escape(Latin1.stringify(wordArray)));
        } catch (e) {
          throw new Error('Malformed UTF-8 data');
        }
      },
      /**
       * Converts a UTF-8 string to a word array.
       *
       * @param {string} utf8Str The UTF-8 string.
       *
       * @return {WordArray} The word array.
       *
       * @static
       *
       * @example
       *
       *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
       */
      parse: function (utf8Str) {
        return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
      }
    };

    /**
     * Abstract buffered block algorithm template.
     *
     * The property blockSize must be implemented in a concrete subtype.
     *
     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
     */
    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
      /**
       * Resets this block algorithm's data buffer to its initial state.
       *
       * @example
       *
       *     bufferedBlockAlgorithm.reset();
       */
      reset: function () {
        // Initial values
        this._data = new WordArray.init();
        this._nDataBytes = 0;
      },
      /**
       * Adds new data to this block algorithm's buffer.
       *
       * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
       *
       * @example
       *
       *     bufferedBlockAlgorithm._append('data');
       *     bufferedBlockAlgorithm._append(wordArray);
       */
      _append: function (data) {
        // Convert string to WordArray, else assume WordArray already
        if (typeof data == 'string') {
          data = Utf8.parse(data);
        }

        // Append
        this._data.concat(data);
        this._nDataBytes += data.sigBytes;
      },
      /**
       * Processes available data blocks.
       *
       * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
       *
       * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
       *
       * @return {WordArray} The processed data.
       *
       * @example
       *
       *     var processedData = bufferedBlockAlgorithm._process();
       *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
       */
      _process: function (doFlush) {
        var processedWords;

        // Shortcuts
        var data = this._data;
        var dataWords = data.words;
        var dataSigBytes = data.sigBytes;
        var blockSize = this.blockSize;
        var blockSizeBytes = blockSize * 4;

        // Count blocks ready
        var nBlocksReady = dataSigBytes / blockSizeBytes;
        if (doFlush) {
          // Round up to include partial blocks
          nBlocksReady = Math.ceil(nBlocksReady);
        } else {
          // Round down to include only full blocks,
          // less the number of blocks that must remain in the buffer
          nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
        }

        // Count words ready
        var nWordsReady = nBlocksReady * blockSize;

        // Count bytes ready
        var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

        // Process blocks
        if (nWordsReady) {
          for (var offset = 0; offset < nWordsReady; offset += blockSize) {
            // Perform concrete-algorithm logic
            this._doProcessBlock(dataWords, offset);
          }

          // Remove processed words
          processedWords = dataWords.splice(0, nWordsReady);
          data.sigBytes -= nBytesReady;
        }

        // Return processed words
        return new WordArray.init(processedWords, nBytesReady);
      },
      /**
       * Creates a copy of this object.
       *
       * @return {Object} The clone.
       *
       * @example
       *
       *     var clone = bufferedBlockAlgorithm.clone();
       */
      clone: function () {
        var clone = Base.clone.call(this);
        clone._data = this._data.clone();
        return clone;
      },
      _minBufferSize: 0
    });

    /**
     * Abstract hasher template.
     *
     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
     */
    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
      /**
       * Configuration options.
       */
      cfg: Base.extend(),
      /**
       * Initializes a newly created hasher.
       *
       * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
       *
       * @example
       *
       *     var hasher = CryptoJS.algo.SHA256.create();
       */
      init: function (cfg) {
        // Apply config defaults
        this.cfg = this.cfg.extend(cfg);

        // Set initial values
        this.reset();
      },
      /**
       * Resets this hasher to its initial state.
       *
       * @example
       *
       *     hasher.reset();
       */
      reset: function () {
        // Reset data buffer
        BufferedBlockAlgorithm.reset.call(this);

        // Perform concrete-hasher logic
        this._doReset();
      },
      /**
       * Updates this hasher with a message.
       *
       * @param {WordArray|string} messageUpdate The message to append.
       *
       * @return {Hasher} This hasher.
       *
       * @example
       *
       *     hasher.update('message');
       *     hasher.update(wordArray);
       */
      update: function (messageUpdate) {
        // Append
        this._append(messageUpdate);

        // Update the hash
        this._process();

        // Chainable
        return this;
      },
      /**
       * Finalizes the hash computation.
       * Note that the finalize operation is effectively a destructive, read-once operation.
       *
       * @param {WordArray|string} messageUpdate (Optional) A final message update.
       *
       * @return {WordArray} The hash.
       *
       * @example
       *
       *     var hash = hasher.finalize();
       *     var hash = hasher.finalize('message');
       *     var hash = hasher.finalize(wordArray);
       */
      finalize: function (messageUpdate) {
        // Final message update
        if (messageUpdate) {
          this._append(messageUpdate);
        }

        // Perform concrete-hasher logic
        var hash = this._doFinalize();
        return hash;
      },
      blockSize: 512 / 32,
      /**
       * Creates a shortcut function to a hasher's object interface.
       *
       * @param {Hasher} hasher The hasher to create a helper for.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
       */
      _createHelper: function (hasher) {
        return function (message, cfg) {
          return new hasher.init(cfg).finalize(message);
        };
      },
      /**
       * Creates a shortcut function to the HMAC's object interface.
       *
       * @param {Hasher} hasher The hasher to use in this HMAC helper.
       *
       * @return {Function} The shortcut function.
       *
       * @static
       *
       * @example
       *
       *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
       */
      _createHmacHelper: function (hasher) {
        return function (message, key) {
          return new C_algo.HMAC.init(hasher, key).finalize(message);
        };
      }
    });

    /**
     * Algorithm namespace.
     */
    var C_algo = C.algo = {};
    return C;
  }(Math);
  return CryptoJS;
});

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"crypto":8}],12:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              var bitsCombined = bits1 | bits2;
	              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));
},{"./core":11}],13:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64url encoding strategy.
	     */
	    var Base64url = C_enc.Base64url = {
	        /**
	         * Converts a word array to a Base64url string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @param {boolean} urlSafe Whether to use url safe
	         *
	         * @return {string} The Base64url string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64url.stringify(wordArray);
	         */
	        stringify: function (wordArray, urlSafe=true) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = urlSafe ? this._safe_map : this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64url string to a word array.
	         *
	         * @param {string} base64Str The Base64url string.
	         *
	         * @param {boolean} urlSafe Whether to use url safe
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64url.parse(base64String);
	         */
	        parse: function (base64Str, urlSafe=true) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = urlSafe ? this._safe_map : this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                reverseMap = this._reverseMap = [];
	                for (var j = 0; j < map.length; j++) {
	                    reverseMap[map.charCodeAt(j)] = j;
	                }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
	        _safe_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_',
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	        var words = [];
	        var nBytes = 0;
	        for (var i = 0; i < base64StrLength; i++) {
	            if (i % 4) {
	                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	                var bitsCombined = bits1 | bits2;
	                words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
	                nBytes++;
	            }
	        }
	        return WordArray.create(words, nBytes);
	    }
	}());

	return CryptoJS.enc.Base64url;

}));
},{"./core":11}],14:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * UTF-16 BE encoding strategy.
	     */
	    var Utf16BE = C_enc.Utf16 = C_enc.Utf16BE = {
	        /**
	         * Converts a word array to a UTF-16 BE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 BE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16String = CryptoJS.enc.Utf16.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = (words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff;
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 BE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 BE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16.parse(utf16String);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= utf16Str.charCodeAt(i) << (16 - (i % 2) * 16);
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    /**
	     * UTF-16 LE encoding strategy.
	     */
	    C_enc.Utf16LE = {
	        /**
	         * Converts a word array to a UTF-16 LE string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-16 LE string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf16Str = CryptoJS.enc.Utf16LE.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var utf16Chars = [];
	            for (var i = 0; i < sigBytes; i += 2) {
	                var codePoint = swapEndian((words[i >>> 2] >>> (16 - (i % 4) * 8)) & 0xffff);
	                utf16Chars.push(String.fromCharCode(codePoint));
	            }

	            return utf16Chars.join('');
	        },

	        /**
	         * Converts a UTF-16 LE string to a word array.
	         *
	         * @param {string} utf16Str The UTF-16 LE string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf16LE.parse(utf16Str);
	         */
	        parse: function (utf16Str) {
	            // Shortcut
	            var utf16StrLength = utf16Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < utf16StrLength; i++) {
	                words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << (16 - (i % 2) * 16));
	            }

	            return WordArray.create(words, utf16StrLength * 2);
	        }
	    };

	    function swapEndian(word) {
	        return ((word << 8) & 0xff00ff00) | ((word >>> 8) & 0x00ff00ff);
	    }
	}());


	return CryptoJS.enc.Utf16;

}));
},{"./core":11}],15:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            var block;

	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));
},{"./core":11,"./hmac":17,"./sha1":36}],16:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var CipherParams = C_lib.CipherParams;
	    var C_enc = C.enc;
	    var Hex = C_enc.Hex;
	    var C_format = C.format;

	    var HexFormatter = C_format.Hex = {
	        /**
	         * Converts the ciphertext of a cipher params object to a hexadecimally encoded string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The hexadecimally encoded string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.format.Hex.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            return cipherParams.ciphertext.toString(Hex);
	        },

	        /**
	         * Converts a hexadecimally encoded ciphertext string to a cipher params object.
	         *
	         * @param {string} input The hexadecimally encoded string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.Hex.parse(hexString);
	         */
	        parse: function (input) {
	            var ciphertext = Hex.parse(input);
	            return CipherParams.create({ ciphertext: ciphertext });
	        }
	    };
	}());


	return CryptoJS.format.Hex;

}));
},{"./cipher-core":10,"./core":11}],17:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));
},{"./core":11}],18:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"), require("./lib-typedarrays"), require("./enc-utf16"), require("./enc-base64"), require("./enc-base64url"), require("./md5"), require("./sha1"), require("./sha256"), require("./sha224"), require("./sha512"), require("./sha384"), require("./sha3"), require("./ripemd160"), require("./hmac"), require("./pbkdf2"), require("./evpkdf"), require("./cipher-core"), require("./mode-cfb"), require("./mode-ctr"), require("./mode-ctr-gladman"), require("./mode-ofb"), require("./mode-ecb"), require("./pad-ansix923"), require("./pad-iso10126"), require("./pad-iso97971"), require("./pad-zeropadding"), require("./pad-nopadding"), require("./format-hex"), require("./aes"), require("./tripledes"), require("./rc4"), require("./rabbit"), require("./rabbit-legacy"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core", "./lib-typedarrays", "./enc-utf16", "./enc-base64", "./enc-base64url", "./md5", "./sha1", "./sha256", "./sha224", "./sha512", "./sha384", "./sha3", "./ripemd160", "./hmac", "./pbkdf2", "./evpkdf", "./cipher-core", "./mode-cfb", "./mode-ctr", "./mode-ctr-gladman", "./mode-ofb", "./mode-ecb", "./pad-ansix923", "./pad-iso10126", "./pad-iso97971", "./pad-zeropadding", "./pad-nopadding", "./format-hex", "./aes", "./tripledes", "./rc4", "./rabbit", "./rabbit-legacy"], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS;

}));
},{"./aes":9,"./cipher-core":10,"./core":11,"./enc-base64":12,"./enc-base64url":13,"./enc-utf16":14,"./evpkdf":15,"./format-hex":16,"./hmac":17,"./lib-typedarrays":19,"./md5":20,"./mode-cfb":21,"./mode-ctr":23,"./mode-ctr-gladman":22,"./mode-ecb":24,"./mode-ofb":25,"./pad-ansix923":26,"./pad-iso10126":27,"./pad-iso97971":28,"./pad-nopadding":29,"./pad-zeropadding":30,"./pbkdf2":31,"./rabbit":33,"./rabbit-legacy":32,"./rc4":34,"./ripemd160":35,"./sha1":36,"./sha224":37,"./sha256":38,"./sha3":39,"./sha384":40,"./sha512":41,"./tripledes":42,"./x64-core":43}],19:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Check if typed arrays are supported
	    if (typeof ArrayBuffer != 'function') {
	        return;
	    }

	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;

	    // Reference original init
	    var superInit = WordArray.init;

	    // Augment WordArray.init to handle typed arrays
	    var subInit = WordArray.init = function (typedArray) {
	        // Convert buffers to uint8
	        if (typedArray instanceof ArrayBuffer) {
	            typedArray = new Uint8Array(typedArray);
	        }

	        // Convert other array views to uint8
	        if (
	            typedArray instanceof Int8Array ||
	            (typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray) ||
	            typedArray instanceof Int16Array ||
	            typedArray instanceof Uint16Array ||
	            typedArray instanceof Int32Array ||
	            typedArray instanceof Uint32Array ||
	            typedArray instanceof Float32Array ||
	            typedArray instanceof Float64Array
	        ) {
	            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
	        }

	        // Handle Uint8Array
	        if (typedArray instanceof Uint8Array) {
	            // Shortcut
	            var typedArrayByteLength = typedArray.byteLength;

	            // Extract bytes
	            var words = [];
	            for (var i = 0; i < typedArrayByteLength; i++) {
	                words[i >>> 2] |= typedArray[i] << (24 - (i % 4) * 8);
	            }

	            // Initialize this word array
	            superInit.call(this, words, typedArrayByteLength);
	        } else {
	            // Else call normal init
	            superInit.apply(this, arguments);
	        }
	    };

	    subInit.prototype = WordArray;
	}());


	return CryptoJS.lib.WordArray;

}));
},{"./core":11}],20:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));
},{"./core":11}],21:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Cipher Feedback block mode.
	 */
	CryptoJS.mode.CFB = (function () {
	    var CFB = CryptoJS.lib.BlockCipherMode.extend();

	    CFB.Encryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // Remember this block to use with next block
	            this._prevBlock = words.slice(offset, offset + blockSize);
	        }
	    });

	    CFB.Decryptor = CFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher;
	            var blockSize = cipher.blockSize;

	            // Remember this block to use with next block
	            var thisBlock = words.slice(offset, offset + blockSize);

	            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);

	            // This block becomes the previous block
	            this._prevBlock = thisBlock;
	        }
	    });

	    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
	        var keystream;

	        // Shortcut
	        var iv = this._iv;

	        // Generate keystream
	        if (iv) {
	            keystream = iv.slice(0);

	            // Remove IV for subsequent blocks
	            this._iv = undefined;
	        } else {
	            keystream = this._prevBlock;
	        }
	        cipher.encryptBlock(keystream, 0);

	        // Encrypt
	        for (var i = 0; i < blockSize; i++) {
	            words[offset + i] ^= keystream[i];
	        }
	    }

	    return CFB;
	}());


	return CryptoJS.mode.CFB;

}));
},{"./cipher-core":10,"./core":11}],22:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/** @preserve
	 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
	 * derived from CryptoJS.mode.CTR
	 * Jan Hruby jhruby.web@gmail.com
	 */
	CryptoJS.mode.CTRGladman = (function () {
	    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

		function incWord(word)
		{
			if (((word >> 24) & 0xff) === 0xff) { //overflow
			var b1 = (word >> 16)&0xff;
			var b2 = (word >> 8)&0xff;
			var b3 = word & 0xff;

			if (b1 === 0xff) // overflow b1
			{
			b1 = 0;
			if (b2 === 0xff)
			{
				b2 = 0;
				if (b3 === 0xff)
				{
					b3 = 0;
				}
				else
				{
					++b3;
				}
			}
			else
			{
				++b2;
			}
			}
			else
			{
			++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
			}
			else
			{
			word += (0x01 << 24);
			}
			return word;
		}

		function incCounter(counter)
		{
			if ((counter[0] = incWord(counter[0])) === 0)
			{
				// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
				counter[1] = incWord(counter[1]);
			}
			return counter;
		}

	    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }

				incCounter(counter);

				var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTRGladman.Decryptor = Encryptor;

	    return CTRGladman;
	}());




	return CryptoJS.mode.CTRGladman;

}));
},{"./cipher-core":10,"./core":11}],23:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Counter block mode.
	 */
	CryptoJS.mode.CTR = (function () {
	    var CTR = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = CTR.Encryptor = CTR.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var counter = this._counter;

	            // Generate keystream
	            if (iv) {
	                counter = this._counter = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            var keystream = counter.slice(0);
	            cipher.encryptBlock(keystream, 0);

	            // Increment counter
	            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    CTR.Decryptor = Encryptor;

	    return CTR;
	}());


	return CryptoJS.mode.CTR;

}));
},{"./cipher-core":10,"./core":11}],24:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Electronic Codebook block mode.
	 */
	CryptoJS.mode.ECB = (function () {
	    var ECB = CryptoJS.lib.BlockCipherMode.extend();

	    ECB.Encryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.encryptBlock(words, offset);
	        }
	    });

	    ECB.Decryptor = ECB.extend({
	        processBlock: function (words, offset) {
	            this._cipher.decryptBlock(words, offset);
	        }
	    });

	    return ECB;
	}());


	return CryptoJS.mode.ECB;

}));
},{"./cipher-core":10,"./core":11}],25:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Output Feedback block mode.
	 */
	CryptoJS.mode.OFB = (function () {
	    var OFB = CryptoJS.lib.BlockCipherMode.extend();

	    var Encryptor = OFB.Encryptor = OFB.extend({
	        processBlock: function (words, offset) {
	            // Shortcuts
	            var cipher = this._cipher
	            var blockSize = cipher.blockSize;
	            var iv = this._iv;
	            var keystream = this._keystream;

	            // Generate keystream
	            if (iv) {
	                keystream = this._keystream = iv.slice(0);

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            }
	            cipher.encryptBlock(keystream, 0);

	            // Encrypt
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= keystream[i];
	            }
	        }
	    });

	    OFB.Decryptor = Encryptor;

	    return OFB;
	}());


	return CryptoJS.mode.OFB;

}));
},{"./cipher-core":10,"./core":11}],26:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * ANSI X.923 padding strategy.
	 */
	CryptoJS.pad.AnsiX923 = {
	    pad: function (data, blockSize) {
	        // Shortcuts
	        var dataSigBytes = data.sigBytes;
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;

	        // Compute last byte position
	        var lastBytePos = dataSigBytes + nPaddingBytes - 1;

	        // Pad
	        data.clamp();
	        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
	        data.sigBytes += nPaddingBytes;
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Ansix923;

}));
},{"./cipher-core":10,"./core":11}],27:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * ISO 10126 padding strategy.
	 */
	CryptoJS.pad.Iso10126 = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Count padding bytes
	        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	        // Pad
	        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).
	             concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
	    },

	    unpad: function (data) {
	        // Get number of padding bytes from last byte
	        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	        // Remove padding
	        data.sigBytes -= nPaddingBytes;
	    }
	};


	return CryptoJS.pad.Iso10126;

}));
},{"./cipher-core":10,"./core":11}],28:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * ISO/IEC 9797-1 Padding Method 2.
	 */
	CryptoJS.pad.Iso97971 = {
	    pad: function (data, blockSize) {
	        // Add 0x80 byte
	        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));

	        // Zero pad the rest
	        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
	    },

	    unpad: function (data) {
	        // Remove zero padding
	        CryptoJS.pad.ZeroPadding.unpad(data);

	        // Remove one more byte -- the 0x80 byte
	        data.sigBytes--;
	    }
	};


	return CryptoJS.pad.Iso97971;

}));
},{"./cipher-core":10,"./core":11}],29:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * A noop padding strategy.
	 */
	CryptoJS.pad.NoPadding = {
	    pad: function () {
	    },

	    unpad: function () {
	    }
	};


	return CryptoJS.pad.NoPadding;

}));
},{"./cipher-core":10,"./core":11}],30:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/**
	 * Zero padding strategy.
	 */
	CryptoJS.pad.ZeroPadding = {
	    pad: function (data, blockSize) {
	        // Shortcut
	        var blockSizeBytes = blockSize * 4;

	        // Pad
	        data.clamp();
	        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
	    },

	    unpad: function (data) {
	        // Shortcut
	        var dataWords = data.words;

	        // Unpad
	        var i = data.sigBytes - 1;
	        for (var i = data.sigBytes - 1; i >= 0; i--) {
	            if (((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
	                data.sigBytes = i + 1;
	                break;
	            }
	        }
	    }
	};


	return CryptoJS.pad.ZeroPadding;

}));
},{"./cipher-core":10,"./core":11}],31:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha1"), require("./hmac"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha1", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA1 = C_algo.SHA1;
	    var HMAC = C_algo.HMAC;

	    /**
	     * Password-Based Key Derivation Function 2 algorithm.
	     */
	    var PBKDF2 = C_algo.PBKDF2 = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hasher to use. Default: SHA1
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: SHA1,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.PBKDF2.create();
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.PBKDF2.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Computes the Password-Based Key Derivation Function 2.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init HMAC
	            var hmac = HMAC.create(cfg.hasher, password);

	            // Initial values
	            var derivedKey = WordArray.create();
	            var blockIndex = WordArray.create([0x00000001]);

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var blockIndexWords = blockIndex.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                var block = hmac.update(salt).finalize(blockIndex);
	                hmac.reset();

	                // Shortcuts
	                var blockWords = block.words;
	                var blockWordsLength = blockWords.length;

	                // Iterations
	                var intermediate = block;
	                for (var i = 1; i < iterations; i++) {
	                    intermediate = hmac.finalize(intermediate);
	                    hmac.reset();

	                    // Shortcut
	                    var intermediateWords = intermediate.words;

	                    // XOR intermediate with block
	                    for (var j = 0; j < blockWordsLength; j++) {
	                        blockWords[j] ^= intermediateWords[j];
	                    }
	                }

	                derivedKey.concat(block);
	                blockIndexWords[0]++;
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Computes the Password-Based Key Derivation Function 2.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.PBKDF2(password, salt);
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.PBKDF2 = function (password, salt, cfg) {
	        return PBKDF2.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.PBKDF2;

}));
},{"./core":11,"./hmac":17,"./sha1":36}],32:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm.
	     *
	     * This is a legacy version that neglected to convert the key to little-endian.
	     * This error doesn't affect the cipher's security,
	     * but it does affect its compatibility with other implementations.
	     */
	    var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
	     */
	    C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
	}());


	return CryptoJS.RabbitLegacy;

}));
},{"./cipher-core":10,"./core":11,"./enc-base64":12,"./evpkdf":15,"./md5":20}],33:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    // Reusable objects
	    var S  = [];
	    var C_ = [];
	    var G  = [];

	    /**
	     * Rabbit stream cipher algorithm
	     */
	    var Rabbit = C_algo.Rabbit = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var K = this._key.words;
	            var iv = this.cfg.iv;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                K[i] = (((K[i] << 8)  | (K[i] >>> 24)) & 0x00ff00ff) |
	                       (((K[i] << 24) | (K[i] >>> 8))  & 0xff00ff00);
	            }

	            // Generate initial state values
	            var X = this._X = [
	                K[0], (K[3] << 16) | (K[2] >>> 16),
	                K[1], (K[0] << 16) | (K[3] >>> 16),
	                K[2], (K[1] << 16) | (K[0] >>> 16),
	                K[3], (K[2] << 16) | (K[1] >>> 16)
	            ];

	            // Generate initial counter values
	            var C = this._C = [
	                (K[2] << 16) | (K[2] >>> 16), (K[0] & 0xffff0000) | (K[1] & 0x0000ffff),
	                (K[3] << 16) | (K[3] >>> 16), (K[1] & 0xffff0000) | (K[2] & 0x0000ffff),
	                (K[0] << 16) | (K[0] >>> 16), (K[2] & 0xffff0000) | (K[3] & 0x0000ffff),
	                (K[1] << 16) | (K[1] >>> 16), (K[3] & 0xffff0000) | (K[0] & 0x0000ffff)
	            ];

	            // Carry bit
	            this._b = 0;

	            // Iterate the system four times
	            for (var i = 0; i < 4; i++) {
	                nextState.call(this);
	            }

	            // Modify the counters
	            for (var i = 0; i < 8; i++) {
	                C[i] ^= X[(i + 4) & 7];
	            }

	            // IV setup
	            if (iv) {
	                // Shortcuts
	                var IV = iv.words;
	                var IV_0 = IV[0];
	                var IV_1 = IV[1];

	                // Generate four subvectors
	                var i0 = (((IV_0 << 8) | (IV_0 >>> 24)) & 0x00ff00ff) | (((IV_0 << 24) | (IV_0 >>> 8)) & 0xff00ff00);
	                var i2 = (((IV_1 << 8) | (IV_1 >>> 24)) & 0x00ff00ff) | (((IV_1 << 24) | (IV_1 >>> 8)) & 0xff00ff00);
	                var i1 = (i0 >>> 16) | (i2 & 0xffff0000);
	                var i3 = (i2 << 16)  | (i0 & 0x0000ffff);

	                // Modify counter values
	                C[0] ^= i0;
	                C[1] ^= i1;
	                C[2] ^= i2;
	                C[3] ^= i3;
	                C[4] ^= i0;
	                C[5] ^= i1;
	                C[6] ^= i2;
	                C[7] ^= i3;

	                // Iterate the system four times
	                for (var i = 0; i < 4; i++) {
	                    nextState.call(this);
	                }
	            }
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var X = this._X;

	            // Iterate the system
	            nextState.call(this);

	            // Generate four keystream words
	            S[0] = X[0] ^ (X[5] >>> 16) ^ (X[3] << 16);
	            S[1] = X[2] ^ (X[7] >>> 16) ^ (X[5] << 16);
	            S[2] = X[4] ^ (X[1] >>> 16) ^ (X[7] << 16);
	            S[3] = X[6] ^ (X[3] >>> 16) ^ (X[1] << 16);

	            for (var i = 0; i < 4; i++) {
	                // Swap endian
	                S[i] = (((S[i] << 8)  | (S[i] >>> 24)) & 0x00ff00ff) |
	                       (((S[i] << 24) | (S[i] >>> 8))  & 0xff00ff00);

	                // Encrypt
	                M[offset + i] ^= S[i];
	            }
	        },

	        blockSize: 128/32,

	        ivSize: 64/32
	    });

	    function nextState() {
	        // Shortcuts
	        var X = this._X;
	        var C = this._C;

	        // Save old counter values
	        for (var i = 0; i < 8; i++) {
	            C_[i] = C[i];
	        }

	        // Calculate new counter values
	        C[0] = (C[0] + 0x4d34d34d + this._b) | 0;
	        C[1] = (C[1] + 0xd34d34d3 + ((C[0] >>> 0) < (C_[0] >>> 0) ? 1 : 0)) | 0;
	        C[2] = (C[2] + 0x34d34d34 + ((C[1] >>> 0) < (C_[1] >>> 0) ? 1 : 0)) | 0;
	        C[3] = (C[3] + 0x4d34d34d + ((C[2] >>> 0) < (C_[2] >>> 0) ? 1 : 0)) | 0;
	        C[4] = (C[4] + 0xd34d34d3 + ((C[3] >>> 0) < (C_[3] >>> 0) ? 1 : 0)) | 0;
	        C[5] = (C[5] + 0x34d34d34 + ((C[4] >>> 0) < (C_[4] >>> 0) ? 1 : 0)) | 0;
	        C[6] = (C[6] + 0x4d34d34d + ((C[5] >>> 0) < (C_[5] >>> 0) ? 1 : 0)) | 0;
	        C[7] = (C[7] + 0xd34d34d3 + ((C[6] >>> 0) < (C_[6] >>> 0) ? 1 : 0)) | 0;
	        this._b = (C[7] >>> 0) < (C_[7] >>> 0) ? 1 : 0;

	        // Calculate the g-values
	        for (var i = 0; i < 8; i++) {
	            var gx = X[i] + C[i];

	            // Construct high and low argument for squaring
	            var ga = gx & 0xffff;
	            var gb = gx >>> 16;

	            // Calculate high and low result of squaring
	            var gh = ((((ga * ga) >>> 17) + ga * gb) >>> 15) + gb * gb;
	            var gl = (((gx & 0xffff0000) * gx) | 0) + (((gx & 0x0000ffff) * gx) | 0);

	            // High XOR low
	            G[i] = gh ^ gl;
	        }

	        // Calculate new state values
	        X[0] = (G[0] + ((G[7] << 16) | (G[7] >>> 16)) + ((G[6] << 16) | (G[6] >>> 16))) | 0;
	        X[1] = (G[1] + ((G[0] << 8)  | (G[0] >>> 24)) + G[7]) | 0;
	        X[2] = (G[2] + ((G[1] << 16) | (G[1] >>> 16)) + ((G[0] << 16) | (G[0] >>> 16))) | 0;
	        X[3] = (G[3] + ((G[2] << 8)  | (G[2] >>> 24)) + G[1]) | 0;
	        X[4] = (G[4] + ((G[3] << 16) | (G[3] >>> 16)) + ((G[2] << 16) | (G[2] >>> 16))) | 0;
	        X[5] = (G[5] + ((G[4] << 8)  | (G[4] >>> 24)) + G[3]) | 0;
	        X[6] = (G[6] + ((G[5] << 16) | (G[5] >>> 16)) + ((G[4] << 16) | (G[4] >>> 16))) | 0;
	        X[7] = (G[7] + ((G[6] << 8)  | (G[6] >>> 24)) + G[5]) | 0;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
	     */
	    C.Rabbit = StreamCipher._createHelper(Rabbit);
	}());


	return CryptoJS.Rabbit;

}));
},{"./cipher-core":10,"./core":11,"./enc-base64":12,"./evpkdf":15,"./md5":20}],34:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var StreamCipher = C_lib.StreamCipher;
	    var C_algo = C.algo;

	    /**
	     * RC4 stream cipher algorithm.
	     */
	    var RC4 = C_algo.RC4 = StreamCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            var keySigBytes = key.sigBytes;

	            // Init sbox
	            var S = this._S = [];
	            for (var i = 0; i < 256; i++) {
	                S[i] = i;
	            }

	            // Key setup
	            for (var i = 0, j = 0; i < 256; i++) {
	                var keyByteIndex = i % keySigBytes;
	                var keyByte = (keyWords[keyByteIndex >>> 2] >>> (24 - (keyByteIndex % 4) * 8)) & 0xff;

	                j = (j + S[i] + keyByte) % 256;

	                // Swap
	                var t = S[i];
	                S[i] = S[j];
	                S[j] = t;
	            }

	            // Counters
	            this._i = this._j = 0;
	        },

	        _doProcessBlock: function (M, offset) {
	            M[offset] ^= generateKeystreamWord.call(this);
	        },

	        keySize: 256/32,

	        ivSize: 0
	    });

	    function generateKeystreamWord() {
	        // Shortcuts
	        var S = this._S;
	        var i = this._i;
	        var j = this._j;

	        // Generate keystream word
	        var keystreamWord = 0;
	        for (var n = 0; n < 4; n++) {
	            i = (i + 1) % 256;
	            j = (j + S[i]) % 256;

	            // Swap
	            var t = S[i];
	            S[i] = S[j];
	            S[j] = t;

	            keystreamWord |= S[(S[i] + S[j]) % 256] << (24 - n * 8);
	        }

	        // Update counters
	        this._i = i;
	        this._j = j;

	        return keystreamWord;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4 = StreamCipher._createHelper(RC4);

	    /**
	     * Modified RC4 stream cipher algorithm.
	     */
	    var RC4Drop = C_algo.RC4Drop = RC4.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} drop The number of keystream words to drop. Default 192
	         */
	        cfg: RC4.cfg.extend({
	            drop: 192
	        }),

	        _doReset: function () {
	            RC4._doReset.call(this);

	            // Drop
	            for (var i = this.cfg.drop; i > 0; i--) {
	                generateKeystreamWord.call(this);
	            }
	        }
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
	     */
	    C.RC4Drop = StreamCipher._createHelper(RC4Drop);
	}());


	return CryptoJS.RC4;

}));
},{"./cipher-core":10,"./core":11,"./enc-base64":12,"./evpkdf":15,"./md5":20}],35:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	/** @preserve
	(c) 2012 by Cédric Mesnil. All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	    - Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	    - Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var _zl = WordArray.create([
	        0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15,
	        7,  4, 13,  1, 10,  6, 15,  3, 12,  0,  9,  5,  2, 14, 11,  8,
	        3, 10, 14,  4,  9, 15,  8,  1,  2,  7,  0,  6, 13, 11,  5, 12,
	        1,  9, 11, 10,  0,  8, 12,  4, 13,  3,  7, 15, 14,  5,  6,  2,
	        4,  0,  5,  9,  7, 12,  2, 10, 14,  1,  3,  8, 11,  6, 15, 13]);
	    var _zr = WordArray.create([
	        5, 14,  7,  0,  9,  2, 11,  4, 13,  6, 15,  8,  1, 10,  3, 12,
	        6, 11,  3,  7,  0, 13,  5, 10, 14, 15,  8, 12,  4,  9,  1,  2,
	        15,  5,  1,  3,  7, 14,  6,  9, 11,  8, 12,  2, 10,  0,  4, 13,
	        8,  6,  4,  1,  3, 11, 15,  0,  5, 12,  2, 13,  9,  7, 10, 14,
	        12, 15, 10,  4,  1,  5,  8,  7,  6,  2, 13, 14,  0,  3,  9, 11]);
	    var _sl = WordArray.create([
	         11, 14, 15, 12,  5,  8,  7,  9, 11, 13, 14, 15,  6,  7,  9,  8,
	        7, 6,   8, 13, 11,  9,  7, 15,  7, 12, 15,  9, 11,  7, 13, 12,
	        11, 13,  6,  7, 14,  9, 13, 15, 14,  8, 13,  6,  5, 12,  7,  5,
	          11, 12, 14, 15, 14, 15,  9,  8,  9, 14,  5,  6,  8,  6,  5, 12,
	        9, 15,  5, 11,  6,  8, 13, 12,  5, 12, 13, 14, 11,  8,  5,  6 ]);
	    var _sr = WordArray.create([
	        8,  9,  9, 11, 13, 15, 15,  5,  7,  7,  8, 11, 14, 14, 12,  6,
	        9, 13, 15,  7, 12,  8,  9, 11,  7,  7, 12,  7,  6, 15, 13, 11,
	        9,  7, 15, 11,  8,  6,  6, 14, 12, 13,  5, 14, 13, 13,  7,  5,
	        15,  5,  8, 11, 14, 14,  6, 14,  6,  9, 12,  9, 12,  5, 15,  8,
	        8,  5, 12,  9, 12,  5, 14,  6,  8, 13,  6,  5, 15, 13, 11, 11 ]);

	    var _hl =  WordArray.create([ 0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]);
	    var _hr =  WordArray.create([ 0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]);

	    /**
	     * RIPEMD160 hash algorithm.
	     */
	    var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
	        _doReset: function () {
	            this._hash  = WordArray.create([0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]);
	        },

	        _doProcessBlock: function (M, offset) {

	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                // Swap
	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }
	            // Shortcut
	            var H  = this._hash.words;
	            var hl = _hl.words;
	            var hr = _hr.words;
	            var zl = _zl.words;
	            var zr = _zr.words;
	            var sl = _sl.words;
	            var sr = _sr.words;

	            // Working variables
	            var al, bl, cl, dl, el;
	            var ar, br, cr, dr, er;

	            ar = al = H[0];
	            br = bl = H[1];
	            cr = cl = H[2];
	            dr = dl = H[3];
	            er = el = H[4];
	            // Computation
	            var t;
	            for (var i = 0; i < 80; i += 1) {
	                t = (al +  M[offset+zl[i]])|0;
	                if (i<16){
		            t +=  f1(bl,cl,dl) + hl[0];
	                } else if (i<32) {
		            t +=  f2(bl,cl,dl) + hl[1];
	                } else if (i<48) {
		            t +=  f3(bl,cl,dl) + hl[2];
	                } else if (i<64) {
		            t +=  f4(bl,cl,dl) + hl[3];
	                } else {// if (i<80) {
		            t +=  f5(bl,cl,dl) + hl[4];
	                }
	                t = t|0;
	                t =  rotl(t,sl[i]);
	                t = (t+el)|0;
	                al = el;
	                el = dl;
	                dl = rotl(cl, 10);
	                cl = bl;
	                bl = t;

	                t = (ar + M[offset+zr[i]])|0;
	                if (i<16){
		            t +=  f5(br,cr,dr) + hr[0];
	                } else if (i<32) {
		            t +=  f4(br,cr,dr) + hr[1];
	                } else if (i<48) {
		            t +=  f3(br,cr,dr) + hr[2];
	                } else if (i<64) {
		            t +=  f2(br,cr,dr) + hr[3];
	                } else {// if (i<80) {
		            t +=  f1(br,cr,dr) + hr[4];
	                }
	                t = t|0;
	                t =  rotl(t,sr[i]) ;
	                t = (t+er)|0;
	                ar = er;
	                er = dr;
	                dr = rotl(cr, 10);
	                cr = br;
	                br = t;
	            }
	            // Intermediate hash value
	            t    = (H[1] + cl + dr)|0;
	            H[1] = (H[2] + dl + er)|0;
	            H[2] = (H[3] + el + ar)|0;
	            H[3] = (H[4] + al + br)|0;
	            H[4] = (H[0] + bl + cr)|0;
	            H[0] =  t;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotal << 8)  | (nBitsTotal >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotal << 24) | (nBitsTotal >>> 8))  & 0xff00ff00)
	            );
	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 5; i++) {
	                // Shortcut
	                var H_i = H[i];

	                // Swap
	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });


	    function f1(x, y, z) {
	        return ((x) ^ (y) ^ (z));

	    }

	    function f2(x, y, z) {
	        return (((x)&(y)) | ((~x)&(z)));
	    }

	    function f3(x, y, z) {
	        return (((x) | (~(y))) ^ (z));
	    }

	    function f4(x, y, z) {
	        return (((x) & (z)) | ((y)&(~(z))));
	    }

	    function f5(x, y, z) {
	        return ((x) ^ ((y) |(~(z))));

	    }

	    function rotl(x,n) {
	        return (x<<n) | (x>>>(32-n));
	    }


	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.RIPEMD160('message');
	     *     var hash = CryptoJS.RIPEMD160(wordArray);
	     */
	    C.RIPEMD160 = Hasher._createHelper(RIPEMD160);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacRIPEMD160(message, key);
	     */
	    C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
	}(Math));


	return CryptoJS.RIPEMD160;

}));
},{"./core":11}],36:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));
},{"./core":11}],37:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./sha256"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha256"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var SHA256 = C_algo.SHA256;

	    /**
	     * SHA-224 hash algorithm.
	     */
	    var SHA224 = C_algo.SHA224 = SHA256.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
	                0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA256._doFinalize.call(this);

	            hash.sigBytes -= 4;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA224('message');
	     *     var hash = CryptoJS.SHA224(wordArray);
	     */
	    C.SHA224 = SHA256._createHelper(SHA224);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA224(message, key);
	     */
	    C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
	}());


	return CryptoJS.SHA224;

}));
},{"./core":11,"./sha256":38}],38:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));
},{"./core":11}],39:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var C_algo = C.algo;

	    // Constants tables
	    var RHO_OFFSETS = [];
	    var PI_INDEXES  = [];
	    var ROUND_CONSTANTS = [];

	    // Compute Constants
	    (function () {
	        // Compute rho offset constants
	        var x = 1, y = 0;
	        for (var t = 0; t < 24; t++) {
	            RHO_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;

	            var newX = y % 5;
	            var newY = (2 * x + 3 * y) % 5;
	            x = newX;
	            y = newY;
	        }

	        // Compute pi index constants
	        for (var x = 0; x < 5; x++) {
	            for (var y = 0; y < 5; y++) {
	                PI_INDEXES[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
	            }
	        }

	        // Compute round constants
	        var LFSR = 0x01;
	        for (var i = 0; i < 24; i++) {
	            var roundConstantMsw = 0;
	            var roundConstantLsw = 0;

	            for (var j = 0; j < 7; j++) {
	                if (LFSR & 0x01) {
	                    var bitPosition = (1 << j) - 1;
	                    if (bitPosition < 32) {
	                        roundConstantLsw ^= 1 << bitPosition;
	                    } else /* if (bitPosition >= 32) */ {
	                        roundConstantMsw ^= 1 << (bitPosition - 32);
	                    }
	                }

	                // Compute next LFSR
	                if (LFSR & 0x80) {
	                    // Primitive polynomial over GF(2): x^8 + x^6 + x^5 + x^4 + 1
	                    LFSR = (LFSR << 1) ^ 0x71;
	                } else {
	                    LFSR <<= 1;
	                }
	            }

	            ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
	        }
	    }());

	    // Reusable objects for temporary values
	    var T = [];
	    (function () {
	        for (var i = 0; i < 25; i++) {
	            T[i] = X64Word.create();
	        }
	    }());

	    /**
	     * SHA-3 hash algorithm.
	     */
	    var SHA3 = C_algo.SHA3 = Hasher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} outputLength
	         *   The desired number of bits in the output hash.
	         *   Only values permitted are: 224, 256, 384, 512.
	         *   Default: 512
	         */
	        cfg: Hasher.cfg.extend({
	            outputLength: 512
	        }),

	        _doReset: function () {
	            var state = this._state = []
	            for (var i = 0; i < 25; i++) {
	                state[i] = new X64Word.init();
	            }

	            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var state = this._state;
	            var nBlockSizeLanes = this.blockSize / 2;

	            // Absorb
	            for (var i = 0; i < nBlockSizeLanes; i++) {
	                // Shortcuts
	                var M2i  = M[offset + 2 * i];
	                var M2i1 = M[offset + 2 * i + 1];

	                // Swap endian
	                M2i = (
	                    (((M2i << 8)  | (M2i >>> 24)) & 0x00ff00ff) |
	                    (((M2i << 24) | (M2i >>> 8))  & 0xff00ff00)
	                );
	                M2i1 = (
	                    (((M2i1 << 8)  | (M2i1 >>> 24)) & 0x00ff00ff) |
	                    (((M2i1 << 24) | (M2i1 >>> 8))  & 0xff00ff00)
	                );

	                // Absorb message into state
	                var lane = state[i];
	                lane.high ^= M2i1;
	                lane.low  ^= M2i;
	            }

	            // Rounds
	            for (var round = 0; round < 24; round++) {
	                // Theta
	                for (var x = 0; x < 5; x++) {
	                    // Mix column lanes
	                    var tMsw = 0, tLsw = 0;
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        tMsw ^= lane.high;
	                        tLsw ^= lane.low;
	                    }

	                    // Temporary values
	                    var Tx = T[x];
	                    Tx.high = tMsw;
	                    Tx.low  = tLsw;
	                }
	                for (var x = 0; x < 5; x++) {
	                    // Shortcuts
	                    var Tx4 = T[(x + 4) % 5];
	                    var Tx1 = T[(x + 1) % 5];
	                    var Tx1Msw = Tx1.high;
	                    var Tx1Lsw = Tx1.low;

	                    // Mix surrounding columns
	                    var tMsw = Tx4.high ^ ((Tx1Msw << 1) | (Tx1Lsw >>> 31));
	                    var tLsw = Tx4.low  ^ ((Tx1Lsw << 1) | (Tx1Msw >>> 31));
	                    for (var y = 0; y < 5; y++) {
	                        var lane = state[x + 5 * y];
	                        lane.high ^= tMsw;
	                        lane.low  ^= tLsw;
	                    }
	                }

	                // Rho Pi
	                for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
	                    var tMsw;
	                    var tLsw;

	                    // Shortcuts
	                    var lane = state[laneIndex];
	                    var laneMsw = lane.high;
	                    var laneLsw = lane.low;
	                    var rhoOffset = RHO_OFFSETS[laneIndex];

	                    // Rotate lanes
	                    if (rhoOffset < 32) {
	                        tMsw = (laneMsw << rhoOffset) | (laneLsw >>> (32 - rhoOffset));
	                        tLsw = (laneLsw << rhoOffset) | (laneMsw >>> (32 - rhoOffset));
	                    } else /* if (rhoOffset >= 32) */ {
	                        tMsw = (laneLsw << (rhoOffset - 32)) | (laneMsw >>> (64 - rhoOffset));
	                        tLsw = (laneMsw << (rhoOffset - 32)) | (laneLsw >>> (64 - rhoOffset));
	                    }

	                    // Transpose lanes
	                    var TPiLane = T[PI_INDEXES[laneIndex]];
	                    TPiLane.high = tMsw;
	                    TPiLane.low  = tLsw;
	                }

	                // Rho pi at x = y = 0
	                var T0 = T[0];
	                var state0 = state[0];
	                T0.high = state0.high;
	                T0.low  = state0.low;

	                // Chi
	                for (var x = 0; x < 5; x++) {
	                    for (var y = 0; y < 5; y++) {
	                        // Shortcuts
	                        var laneIndex = x + 5 * y;
	                        var lane = state[laneIndex];
	                        var TLane = T[laneIndex];
	                        var Tx1Lane = T[((x + 1) % 5) + 5 * y];
	                        var Tx2Lane = T[((x + 2) % 5) + 5 * y];

	                        // Mix rows
	                        lane.high = TLane.high ^ (~Tx1Lane.high & Tx2Lane.high);
	                        lane.low  = TLane.low  ^ (~Tx1Lane.low  & Tx2Lane.low);
	                    }
	                }

	                // Iota
	                var lane = state[0];
	                var roundConstant = ROUND_CONSTANTS[round];
	                lane.high ^= roundConstant.high;
	                lane.low  ^= roundConstant.low;
	            }
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;
	            var blockSizeBits = this.blockSize * 32;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x1 << (24 - nBitsLeft % 32);
	            dataWords[((Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits) >>> 5) - 1] |= 0x80;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var state = this._state;
	            var outputLengthBytes = this.cfg.outputLength / 8;
	            var outputLengthLanes = outputLengthBytes / 8;

	            // Squeeze
	            var hashWords = [];
	            for (var i = 0; i < outputLengthLanes; i++) {
	                // Shortcuts
	                var lane = state[i];
	                var laneMsw = lane.high;
	                var laneLsw = lane.low;

	                // Swap endian
	                laneMsw = (
	                    (((laneMsw << 8)  | (laneMsw >>> 24)) & 0x00ff00ff) |
	                    (((laneMsw << 24) | (laneMsw >>> 8))  & 0xff00ff00)
	                );
	                laneLsw = (
	                    (((laneLsw << 8)  | (laneLsw >>> 24)) & 0x00ff00ff) |
	                    (((laneLsw << 24) | (laneLsw >>> 8))  & 0xff00ff00)
	                );

	                // Squeeze state to retrieve hash
	                hashWords.push(laneLsw);
	                hashWords.push(laneMsw);
	            }

	            // Return final computed hash
	            return new WordArray.init(hashWords, outputLengthBytes);
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);

	            var state = clone._state = this._state.slice(0);
	            for (var i = 0; i < 25; i++) {
	                state[i] = state[i].clone();
	            }

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA3('message');
	     *     var hash = CryptoJS.SHA3(wordArray);
	     */
	    C.SHA3 = Hasher._createHelper(SHA3);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA3(message, key);
	     */
	    C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
	}(Math));


	return CryptoJS.SHA3;

}));
},{"./core":11,"./x64-core":43}],40:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"), require("./sha512"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core", "./sha512"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;
	    var SHA512 = C_algo.SHA512;

	    /**
	     * SHA-384 hash algorithm.
	     */
	    var SHA384 = C_algo.SHA384 = SHA512.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0xcbbb9d5d, 0xc1059ed8), new X64Word.init(0x629a292a, 0x367cd507),
	                new X64Word.init(0x9159015a, 0x3070dd17), new X64Word.init(0x152fecd8, 0xf70e5939),
	                new X64Word.init(0x67332667, 0xffc00b31), new X64Word.init(0x8eb44a87, 0x68581511),
	                new X64Word.init(0xdb0c2e0d, 0x64f98fa7), new X64Word.init(0x47b5481d, 0xbefa4fa4)
	            ]);
	        },

	        _doFinalize: function () {
	            var hash = SHA512._doFinalize.call(this);

	            hash.sigBytes -= 16;

	            return hash;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA384('message');
	     *     var hash = CryptoJS.SHA384(wordArray);
	     */
	    C.SHA384 = SHA512._createHelper(SHA384);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA384(message, key);
	     */
	    C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
	}());


	return CryptoJS.SHA384;

}));
},{"./core":11,"./sha512":41,"./x64-core":43}],41:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./x64-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./x64-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Hasher = C_lib.Hasher;
	    var C_x64 = C.x64;
	    var X64Word = C_x64.Word;
	    var X64WordArray = C_x64.WordArray;
	    var C_algo = C.algo;

	    function X64Word_create() {
	        return X64Word.create.apply(X64Word, arguments);
	    }

	    // Constants
	    var K = [
	        X64Word_create(0x428a2f98, 0xd728ae22), X64Word_create(0x71374491, 0x23ef65cd),
	        X64Word_create(0xb5c0fbcf, 0xec4d3b2f), X64Word_create(0xe9b5dba5, 0x8189dbbc),
	        X64Word_create(0x3956c25b, 0xf348b538), X64Word_create(0x59f111f1, 0xb605d019),
	        X64Word_create(0x923f82a4, 0xaf194f9b), X64Word_create(0xab1c5ed5, 0xda6d8118),
	        X64Word_create(0xd807aa98, 0xa3030242), X64Word_create(0x12835b01, 0x45706fbe),
	        X64Word_create(0x243185be, 0x4ee4b28c), X64Word_create(0x550c7dc3, 0xd5ffb4e2),
	        X64Word_create(0x72be5d74, 0xf27b896f), X64Word_create(0x80deb1fe, 0x3b1696b1),
	        X64Word_create(0x9bdc06a7, 0x25c71235), X64Word_create(0xc19bf174, 0xcf692694),
	        X64Word_create(0xe49b69c1, 0x9ef14ad2), X64Word_create(0xefbe4786, 0x384f25e3),
	        X64Word_create(0x0fc19dc6, 0x8b8cd5b5), X64Word_create(0x240ca1cc, 0x77ac9c65),
	        X64Word_create(0x2de92c6f, 0x592b0275), X64Word_create(0x4a7484aa, 0x6ea6e483),
	        X64Word_create(0x5cb0a9dc, 0xbd41fbd4), X64Word_create(0x76f988da, 0x831153b5),
	        X64Word_create(0x983e5152, 0xee66dfab), X64Word_create(0xa831c66d, 0x2db43210),
	        X64Word_create(0xb00327c8, 0x98fb213f), X64Word_create(0xbf597fc7, 0xbeef0ee4),
	        X64Word_create(0xc6e00bf3, 0x3da88fc2), X64Word_create(0xd5a79147, 0x930aa725),
	        X64Word_create(0x06ca6351, 0xe003826f), X64Word_create(0x14292967, 0x0a0e6e70),
	        X64Word_create(0x27b70a85, 0x46d22ffc), X64Word_create(0x2e1b2138, 0x5c26c926),
	        X64Word_create(0x4d2c6dfc, 0x5ac42aed), X64Word_create(0x53380d13, 0x9d95b3df),
	        X64Word_create(0x650a7354, 0x8baf63de), X64Word_create(0x766a0abb, 0x3c77b2a8),
	        X64Word_create(0x81c2c92e, 0x47edaee6), X64Word_create(0x92722c85, 0x1482353b),
	        X64Word_create(0xa2bfe8a1, 0x4cf10364), X64Word_create(0xa81a664b, 0xbc423001),
	        X64Word_create(0xc24b8b70, 0xd0f89791), X64Word_create(0xc76c51a3, 0x0654be30),
	        X64Word_create(0xd192e819, 0xd6ef5218), X64Word_create(0xd6990624, 0x5565a910),
	        X64Word_create(0xf40e3585, 0x5771202a), X64Word_create(0x106aa070, 0x32bbd1b8),
	        X64Word_create(0x19a4c116, 0xb8d2d0c8), X64Word_create(0x1e376c08, 0x5141ab53),
	        X64Word_create(0x2748774c, 0xdf8eeb99), X64Word_create(0x34b0bcb5, 0xe19b48a8),
	        X64Word_create(0x391c0cb3, 0xc5c95a63), X64Word_create(0x4ed8aa4a, 0xe3418acb),
	        X64Word_create(0x5b9cca4f, 0x7763e373), X64Word_create(0x682e6ff3, 0xd6b2b8a3),
	        X64Word_create(0x748f82ee, 0x5defb2fc), X64Word_create(0x78a5636f, 0x43172f60),
	        X64Word_create(0x84c87814, 0xa1f0ab72), X64Word_create(0x8cc70208, 0x1a6439ec),
	        X64Word_create(0x90befffa, 0x23631e28), X64Word_create(0xa4506ceb, 0xde82bde9),
	        X64Word_create(0xbef9a3f7, 0xb2c67915), X64Word_create(0xc67178f2, 0xe372532b),
	        X64Word_create(0xca273ece, 0xea26619c), X64Word_create(0xd186b8c7, 0x21c0c207),
	        X64Word_create(0xeada7dd6, 0xcde0eb1e), X64Word_create(0xf57d4f7f, 0xee6ed178),
	        X64Word_create(0x06f067aa, 0x72176fba), X64Word_create(0x0a637dc5, 0xa2c898a6),
	        X64Word_create(0x113f9804, 0xbef90dae), X64Word_create(0x1b710b35, 0x131c471b),
	        X64Word_create(0x28db77f5, 0x23047d84), X64Word_create(0x32caab7b, 0x40c72493),
	        X64Word_create(0x3c9ebe0a, 0x15c9bebc), X64Word_create(0x431d67c4, 0x9c100d4c),
	        X64Word_create(0x4cc5d4be, 0xcb3e42b6), X64Word_create(0x597f299c, 0xfc657e2a),
	        X64Word_create(0x5fcb6fab, 0x3ad6faec), X64Word_create(0x6c44198c, 0x4a475817)
	    ];

	    // Reusable objects
	    var W = [];
	    (function () {
	        for (var i = 0; i < 80; i++) {
	            W[i] = X64Word_create();
	        }
	    }());

	    /**
	     * SHA-512 hash algorithm.
	     */
	    var SHA512 = C_algo.SHA512 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new X64WordArray.init([
	                new X64Word.init(0x6a09e667, 0xf3bcc908), new X64Word.init(0xbb67ae85, 0x84caa73b),
	                new X64Word.init(0x3c6ef372, 0xfe94f82b), new X64Word.init(0xa54ff53a, 0x5f1d36f1),
	                new X64Word.init(0x510e527f, 0xade682d1), new X64Word.init(0x9b05688c, 0x2b3e6c1f),
	                new X64Word.init(0x1f83d9ab, 0xfb41bd6b), new X64Word.init(0x5be0cd19, 0x137e2179)
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcuts
	            var H = this._hash.words;

	            var H0 = H[0];
	            var H1 = H[1];
	            var H2 = H[2];
	            var H3 = H[3];
	            var H4 = H[4];
	            var H5 = H[5];
	            var H6 = H[6];
	            var H7 = H[7];

	            var H0h = H0.high;
	            var H0l = H0.low;
	            var H1h = H1.high;
	            var H1l = H1.low;
	            var H2h = H2.high;
	            var H2l = H2.low;
	            var H3h = H3.high;
	            var H3l = H3.low;
	            var H4h = H4.high;
	            var H4l = H4.low;
	            var H5h = H5.high;
	            var H5l = H5.low;
	            var H6h = H6.high;
	            var H6l = H6.low;
	            var H7h = H7.high;
	            var H7l = H7.low;

	            // Working variables
	            var ah = H0h;
	            var al = H0l;
	            var bh = H1h;
	            var bl = H1l;
	            var ch = H2h;
	            var cl = H2l;
	            var dh = H3h;
	            var dl = H3l;
	            var eh = H4h;
	            var el = H4l;
	            var fh = H5h;
	            var fl = H5l;
	            var gh = H6h;
	            var gl = H6l;
	            var hh = H7h;
	            var hl = H7l;

	            // Rounds
	            for (var i = 0; i < 80; i++) {
	                var Wil;
	                var Wih;

	                // Shortcut
	                var Wi = W[i];

	                // Extend message
	                if (i < 16) {
	                    Wih = Wi.high = M[offset + i * 2]     | 0;
	                    Wil = Wi.low  = M[offset + i * 2 + 1] | 0;
	                } else {
	                    // Gamma0
	                    var gamma0x  = W[i - 15];
	                    var gamma0xh = gamma0x.high;
	                    var gamma0xl = gamma0x.low;
	                    var gamma0h  = ((gamma0xh >>> 1) | (gamma0xl << 31)) ^ ((gamma0xh >>> 8) | (gamma0xl << 24)) ^ (gamma0xh >>> 7);
	                    var gamma0l  = ((gamma0xl >>> 1) | (gamma0xh << 31)) ^ ((gamma0xl >>> 8) | (gamma0xh << 24)) ^ ((gamma0xl >>> 7) | (gamma0xh << 25));

	                    // Gamma1
	                    var gamma1x  = W[i - 2];
	                    var gamma1xh = gamma1x.high;
	                    var gamma1xl = gamma1x.low;
	                    var gamma1h  = ((gamma1xh >>> 19) | (gamma1xl << 13)) ^ ((gamma1xh << 3) | (gamma1xl >>> 29)) ^ (gamma1xh >>> 6);
	                    var gamma1l  = ((gamma1xl >>> 19) | (gamma1xh << 13)) ^ ((gamma1xl << 3) | (gamma1xh >>> 29)) ^ ((gamma1xl >>> 6) | (gamma1xh << 26));

	                    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
	                    var Wi7  = W[i - 7];
	                    var Wi7h = Wi7.high;
	                    var Wi7l = Wi7.low;

	                    var Wi16  = W[i - 16];
	                    var Wi16h = Wi16.high;
	                    var Wi16l = Wi16.low;

	                    Wil = gamma0l + Wi7l;
	                    Wih = gamma0h + Wi7h + ((Wil >>> 0) < (gamma0l >>> 0) ? 1 : 0);
	                    Wil = Wil + gamma1l;
	                    Wih = Wih + gamma1h + ((Wil >>> 0) < (gamma1l >>> 0) ? 1 : 0);
	                    Wil = Wil + Wi16l;
	                    Wih = Wih + Wi16h + ((Wil >>> 0) < (Wi16l >>> 0) ? 1 : 0);

	                    Wi.high = Wih;
	                    Wi.low  = Wil;
	                }

	                var chh  = (eh & fh) ^ (~eh & gh);
	                var chl  = (el & fl) ^ (~el & gl);
	                var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
	                var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

	                var sigma0h = ((ah >>> 28) | (al << 4))  ^ ((ah << 30)  | (al >>> 2)) ^ ((ah << 25) | (al >>> 7));
	                var sigma0l = ((al >>> 28) | (ah << 4))  ^ ((al << 30)  | (ah >>> 2)) ^ ((al << 25) | (ah >>> 7));
	                var sigma1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((eh << 23) | (el >>> 9));
	                var sigma1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((el << 23) | (eh >>> 9));

	                // t1 = h + sigma1 + ch + K[i] + W[i]
	                var Ki  = K[i];
	                var Kih = Ki.high;
	                var Kil = Ki.low;

	                var t1l = hl + sigma1l;
	                var t1h = hh + sigma1h + ((t1l >>> 0) < (hl >>> 0) ? 1 : 0);
	                var t1l = t1l + chl;
	                var t1h = t1h + chh + ((t1l >>> 0) < (chl >>> 0) ? 1 : 0);
	                var t1l = t1l + Kil;
	                var t1h = t1h + Kih + ((t1l >>> 0) < (Kil >>> 0) ? 1 : 0);
	                var t1l = t1l + Wil;
	                var t1h = t1h + Wih + ((t1l >>> 0) < (Wil >>> 0) ? 1 : 0);

	                // t2 = sigma0 + maj
	                var t2l = sigma0l + majl;
	                var t2h = sigma0h + majh + ((t2l >>> 0) < (sigma0l >>> 0) ? 1 : 0);

	                // Update working variables
	                hh = gh;
	                hl = gl;
	                gh = fh;
	                gl = fl;
	                fh = eh;
	                fl = el;
	                el = (dl + t1l) | 0;
	                eh = (dh + t1h + ((el >>> 0) < (dl >>> 0) ? 1 : 0)) | 0;
	                dh = ch;
	                dl = cl;
	                ch = bh;
	                cl = bl;
	                bh = ah;
	                bl = al;
	                al = (t1l + t2l) | 0;
	                ah = (t1h + t2h + ((al >>> 0) < (t1l >>> 0) ? 1 : 0)) | 0;
	            }

	            // Intermediate hash value
	            H0l = H0.low  = (H0l + al);
	            H0.high = (H0h + ah + ((H0l >>> 0) < (al >>> 0) ? 1 : 0));
	            H1l = H1.low  = (H1l + bl);
	            H1.high = (H1h + bh + ((H1l >>> 0) < (bl >>> 0) ? 1 : 0));
	            H2l = H2.low  = (H2l + cl);
	            H2.high = (H2h + ch + ((H2l >>> 0) < (cl >>> 0) ? 1 : 0));
	            H3l = H3.low  = (H3l + dl);
	            H3.high = (H3h + dh + ((H3l >>> 0) < (dl >>> 0) ? 1 : 0));
	            H4l = H4.low  = (H4l + el);
	            H4.high = (H4h + eh + ((H4l >>> 0) < (el >>> 0) ? 1 : 0));
	            H5l = H5.low  = (H5l + fl);
	            H5.high = (H5h + fh + ((H5l >>> 0) < (fl >>> 0) ? 1 : 0));
	            H6l = H6.low  = (H6l + gl);
	            H6.high = (H6h + gh + ((H6l >>> 0) < (gl >>> 0) ? 1 : 0));
	            H7l = H7.low  = (H7l + hl);
	            H7.high = (H7h + hh + ((H7l >>> 0) < (hl >>> 0) ? 1 : 0));
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 30] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 128) >>> 10) << 5) + 31] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Convert hash to 32-bit word array before returning
	            var hash = this._hash.toX32();

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        },

	        blockSize: 1024/32
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA512('message');
	     *     var hash = CryptoJS.SHA512(wordArray);
	     */
	    C.SHA512 = Hasher._createHelper(SHA512);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA512(message, key);
	     */
	    C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
	}());


	return CryptoJS.SHA512;

}));
},{"./core":11,"./x64-core":43}],42:[function(require,module,exports){
;(function (root, factory, undef) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"), require("./enc-base64"), require("./md5"), require("./evpkdf"), require("./cipher-core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./enc-base64", "./md5", "./evpkdf", "./cipher-core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Permuted Choice 1 constants
	    var PC1 = [
	        57, 49, 41, 33, 25, 17, 9,  1,
	        58, 50, 42, 34, 26, 18, 10, 2,
	        59, 51, 43, 35, 27, 19, 11, 3,
	        60, 52, 44, 36, 63, 55, 47, 39,
	        31, 23, 15, 7,  62, 54, 46, 38,
	        30, 22, 14, 6,  61, 53, 45, 37,
	        29, 21, 13, 5,  28, 20, 12, 4
	    ];

	    // Permuted Choice 2 constants
	    var PC2 = [
	        14, 17, 11, 24, 1,  5,
	        3,  28, 15, 6,  21, 10,
	        23, 19, 12, 4,  26, 8,
	        16, 7,  27, 20, 13, 2,
	        41, 52, 31, 37, 47, 55,
	        30, 40, 51, 45, 33, 48,
	        44, 49, 39, 56, 34, 53,
	        46, 42, 50, 36, 29, 32
	    ];

	    // Cumulative bit shift constants
	    var BIT_SHIFTS = [1,  2,  4,  6,  8,  10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];

	    // SBOXes and round permutation constants
	    var SBOX_P = [
	        {
	            0x0: 0x808200,
	            0x10000000: 0x8000,
	            0x20000000: 0x808002,
	            0x30000000: 0x2,
	            0x40000000: 0x200,
	            0x50000000: 0x808202,
	            0x60000000: 0x800202,
	            0x70000000: 0x800000,
	            0x80000000: 0x202,
	            0x90000000: 0x800200,
	            0xa0000000: 0x8200,
	            0xb0000000: 0x808000,
	            0xc0000000: 0x8002,
	            0xd0000000: 0x800002,
	            0xe0000000: 0x0,
	            0xf0000000: 0x8202,
	            0x8000000: 0x0,
	            0x18000000: 0x808202,
	            0x28000000: 0x8202,
	            0x38000000: 0x8000,
	            0x48000000: 0x808200,
	            0x58000000: 0x200,
	            0x68000000: 0x808002,
	            0x78000000: 0x2,
	            0x88000000: 0x800200,
	            0x98000000: 0x8200,
	            0xa8000000: 0x808000,
	            0xb8000000: 0x800202,
	            0xc8000000: 0x800002,
	            0xd8000000: 0x8002,
	            0xe8000000: 0x202,
	            0xf8000000: 0x800000,
	            0x1: 0x8000,
	            0x10000001: 0x2,
	            0x20000001: 0x808200,
	            0x30000001: 0x800000,
	            0x40000001: 0x808002,
	            0x50000001: 0x8200,
	            0x60000001: 0x200,
	            0x70000001: 0x800202,
	            0x80000001: 0x808202,
	            0x90000001: 0x808000,
	            0xa0000001: 0x800002,
	            0xb0000001: 0x8202,
	            0xc0000001: 0x202,
	            0xd0000001: 0x800200,
	            0xe0000001: 0x8002,
	            0xf0000001: 0x0,
	            0x8000001: 0x808202,
	            0x18000001: 0x808000,
	            0x28000001: 0x800000,
	            0x38000001: 0x200,
	            0x48000001: 0x8000,
	            0x58000001: 0x800002,
	            0x68000001: 0x2,
	            0x78000001: 0x8202,
	            0x88000001: 0x8002,
	            0x98000001: 0x800202,
	            0xa8000001: 0x202,
	            0xb8000001: 0x808200,
	            0xc8000001: 0x800200,
	            0xd8000001: 0x0,
	            0xe8000001: 0x8200,
	            0xf8000001: 0x808002
	        },
	        {
	            0x0: 0x40084010,
	            0x1000000: 0x4000,
	            0x2000000: 0x80000,
	            0x3000000: 0x40080010,
	            0x4000000: 0x40000010,
	            0x5000000: 0x40084000,
	            0x6000000: 0x40004000,
	            0x7000000: 0x10,
	            0x8000000: 0x84000,
	            0x9000000: 0x40004010,
	            0xa000000: 0x40000000,
	            0xb000000: 0x84010,
	            0xc000000: 0x80010,
	            0xd000000: 0x0,
	            0xe000000: 0x4010,
	            0xf000000: 0x40080000,
	            0x800000: 0x40004000,
	            0x1800000: 0x84010,
	            0x2800000: 0x10,
	            0x3800000: 0x40004010,
	            0x4800000: 0x40084010,
	            0x5800000: 0x40000000,
	            0x6800000: 0x80000,
	            0x7800000: 0x40080010,
	            0x8800000: 0x80010,
	            0x9800000: 0x0,
	            0xa800000: 0x4000,
	            0xb800000: 0x40080000,
	            0xc800000: 0x40000010,
	            0xd800000: 0x84000,
	            0xe800000: 0x40084000,
	            0xf800000: 0x4010,
	            0x10000000: 0x0,
	            0x11000000: 0x40080010,
	            0x12000000: 0x40004010,
	            0x13000000: 0x40084000,
	            0x14000000: 0x40080000,
	            0x15000000: 0x10,
	            0x16000000: 0x84010,
	            0x17000000: 0x4000,
	            0x18000000: 0x4010,
	            0x19000000: 0x80000,
	            0x1a000000: 0x80010,
	            0x1b000000: 0x40000010,
	            0x1c000000: 0x84000,
	            0x1d000000: 0x40004000,
	            0x1e000000: 0x40000000,
	            0x1f000000: 0x40084010,
	            0x10800000: 0x84010,
	            0x11800000: 0x80000,
	            0x12800000: 0x40080000,
	            0x13800000: 0x4000,
	            0x14800000: 0x40004000,
	            0x15800000: 0x40084010,
	            0x16800000: 0x10,
	            0x17800000: 0x40000000,
	            0x18800000: 0x40084000,
	            0x19800000: 0x40000010,
	            0x1a800000: 0x40004010,
	            0x1b800000: 0x80010,
	            0x1c800000: 0x0,
	            0x1d800000: 0x4010,
	            0x1e800000: 0x40080010,
	            0x1f800000: 0x84000
	        },
	        {
	            0x0: 0x104,
	            0x100000: 0x0,
	            0x200000: 0x4000100,
	            0x300000: 0x10104,
	            0x400000: 0x10004,
	            0x500000: 0x4000004,
	            0x600000: 0x4010104,
	            0x700000: 0x4010000,
	            0x800000: 0x4000000,
	            0x900000: 0x4010100,
	            0xa00000: 0x10100,
	            0xb00000: 0x4010004,
	            0xc00000: 0x4000104,
	            0xd00000: 0x10000,
	            0xe00000: 0x4,
	            0xf00000: 0x100,
	            0x80000: 0x4010100,
	            0x180000: 0x4010004,
	            0x280000: 0x0,
	            0x380000: 0x4000100,
	            0x480000: 0x4000004,
	            0x580000: 0x10000,
	            0x680000: 0x10004,
	            0x780000: 0x104,
	            0x880000: 0x4,
	            0x980000: 0x100,
	            0xa80000: 0x4010000,
	            0xb80000: 0x10104,
	            0xc80000: 0x10100,
	            0xd80000: 0x4000104,
	            0xe80000: 0x4010104,
	            0xf80000: 0x4000000,
	            0x1000000: 0x4010100,
	            0x1100000: 0x10004,
	            0x1200000: 0x10000,
	            0x1300000: 0x4000100,
	            0x1400000: 0x100,
	            0x1500000: 0x4010104,
	            0x1600000: 0x4000004,
	            0x1700000: 0x0,
	            0x1800000: 0x4000104,
	            0x1900000: 0x4000000,
	            0x1a00000: 0x4,
	            0x1b00000: 0x10100,
	            0x1c00000: 0x4010000,
	            0x1d00000: 0x104,
	            0x1e00000: 0x10104,
	            0x1f00000: 0x4010004,
	            0x1080000: 0x4000000,
	            0x1180000: 0x104,
	            0x1280000: 0x4010100,
	            0x1380000: 0x0,
	            0x1480000: 0x10004,
	            0x1580000: 0x4000100,
	            0x1680000: 0x100,
	            0x1780000: 0x4010004,
	            0x1880000: 0x10000,
	            0x1980000: 0x4010104,
	            0x1a80000: 0x10104,
	            0x1b80000: 0x4000004,
	            0x1c80000: 0x4000104,
	            0x1d80000: 0x4010000,
	            0x1e80000: 0x4,
	            0x1f80000: 0x10100
	        },
	        {
	            0x0: 0x80401000,
	            0x10000: 0x80001040,
	            0x20000: 0x401040,
	            0x30000: 0x80400000,
	            0x40000: 0x0,
	            0x50000: 0x401000,
	            0x60000: 0x80000040,
	            0x70000: 0x400040,
	            0x80000: 0x80000000,
	            0x90000: 0x400000,
	            0xa0000: 0x40,
	            0xb0000: 0x80001000,
	            0xc0000: 0x80400040,
	            0xd0000: 0x1040,
	            0xe0000: 0x1000,
	            0xf0000: 0x80401040,
	            0x8000: 0x80001040,
	            0x18000: 0x40,
	            0x28000: 0x80400040,
	            0x38000: 0x80001000,
	            0x48000: 0x401000,
	            0x58000: 0x80401040,
	            0x68000: 0x0,
	            0x78000: 0x80400000,
	            0x88000: 0x1000,
	            0x98000: 0x80401000,
	            0xa8000: 0x400000,
	            0xb8000: 0x1040,
	            0xc8000: 0x80000000,
	            0xd8000: 0x400040,
	            0xe8000: 0x401040,
	            0xf8000: 0x80000040,
	            0x100000: 0x400040,
	            0x110000: 0x401000,
	            0x120000: 0x80000040,
	            0x130000: 0x0,
	            0x140000: 0x1040,
	            0x150000: 0x80400040,
	            0x160000: 0x80401000,
	            0x170000: 0x80001040,
	            0x180000: 0x80401040,
	            0x190000: 0x80000000,
	            0x1a0000: 0x80400000,
	            0x1b0000: 0x401040,
	            0x1c0000: 0x80001000,
	            0x1d0000: 0x400000,
	            0x1e0000: 0x40,
	            0x1f0000: 0x1000,
	            0x108000: 0x80400000,
	            0x118000: 0x80401040,
	            0x128000: 0x0,
	            0x138000: 0x401000,
	            0x148000: 0x400040,
	            0x158000: 0x80000000,
	            0x168000: 0x80001040,
	            0x178000: 0x40,
	            0x188000: 0x80000040,
	            0x198000: 0x1000,
	            0x1a8000: 0x80001000,
	            0x1b8000: 0x80400040,
	            0x1c8000: 0x1040,
	            0x1d8000: 0x80401000,
	            0x1e8000: 0x400000,
	            0x1f8000: 0x401040
	        },
	        {
	            0x0: 0x80,
	            0x1000: 0x1040000,
	            0x2000: 0x40000,
	            0x3000: 0x20000000,
	            0x4000: 0x20040080,
	            0x5000: 0x1000080,
	            0x6000: 0x21000080,
	            0x7000: 0x40080,
	            0x8000: 0x1000000,
	            0x9000: 0x20040000,
	            0xa000: 0x20000080,
	            0xb000: 0x21040080,
	            0xc000: 0x21040000,
	            0xd000: 0x0,
	            0xe000: 0x1040080,
	            0xf000: 0x21000000,
	            0x800: 0x1040080,
	            0x1800: 0x21000080,
	            0x2800: 0x80,
	            0x3800: 0x1040000,
	            0x4800: 0x40000,
	            0x5800: 0x20040080,
	            0x6800: 0x21040000,
	            0x7800: 0x20000000,
	            0x8800: 0x20040000,
	            0x9800: 0x0,
	            0xa800: 0x21040080,
	            0xb800: 0x1000080,
	            0xc800: 0x20000080,
	            0xd800: 0x21000000,
	            0xe800: 0x1000000,
	            0xf800: 0x40080,
	            0x10000: 0x40000,
	            0x11000: 0x80,
	            0x12000: 0x20000000,
	            0x13000: 0x21000080,
	            0x14000: 0x1000080,
	            0x15000: 0x21040000,
	            0x16000: 0x20040080,
	            0x17000: 0x1000000,
	            0x18000: 0x21040080,
	            0x19000: 0x21000000,
	            0x1a000: 0x1040000,
	            0x1b000: 0x20040000,
	            0x1c000: 0x40080,
	            0x1d000: 0x20000080,
	            0x1e000: 0x0,
	            0x1f000: 0x1040080,
	            0x10800: 0x21000080,
	            0x11800: 0x1000000,
	            0x12800: 0x1040000,
	            0x13800: 0x20040080,
	            0x14800: 0x20000000,
	            0x15800: 0x1040080,
	            0x16800: 0x80,
	            0x17800: 0x21040000,
	            0x18800: 0x40080,
	            0x19800: 0x21040080,
	            0x1a800: 0x0,
	            0x1b800: 0x21000000,
	            0x1c800: 0x1000080,
	            0x1d800: 0x40000,
	            0x1e800: 0x20040000,
	            0x1f800: 0x20000080
	        },
	        {
	            0x0: 0x10000008,
	            0x100: 0x2000,
	            0x200: 0x10200000,
	            0x300: 0x10202008,
	            0x400: 0x10002000,
	            0x500: 0x200000,
	            0x600: 0x200008,
	            0x700: 0x10000000,
	            0x800: 0x0,
	            0x900: 0x10002008,
	            0xa00: 0x202000,
	            0xb00: 0x8,
	            0xc00: 0x10200008,
	            0xd00: 0x202008,
	            0xe00: 0x2008,
	            0xf00: 0x10202000,
	            0x80: 0x10200000,
	            0x180: 0x10202008,
	            0x280: 0x8,
	            0x380: 0x200000,
	            0x480: 0x202008,
	            0x580: 0x10000008,
	            0x680: 0x10002000,
	            0x780: 0x2008,
	            0x880: 0x200008,
	            0x980: 0x2000,
	            0xa80: 0x10002008,
	            0xb80: 0x10200008,
	            0xc80: 0x0,
	            0xd80: 0x10202000,
	            0xe80: 0x202000,
	            0xf80: 0x10000000,
	            0x1000: 0x10002000,
	            0x1100: 0x10200008,
	            0x1200: 0x10202008,
	            0x1300: 0x2008,
	            0x1400: 0x200000,
	            0x1500: 0x10000000,
	            0x1600: 0x10000008,
	            0x1700: 0x202000,
	            0x1800: 0x202008,
	            0x1900: 0x0,
	            0x1a00: 0x8,
	            0x1b00: 0x10200000,
	            0x1c00: 0x2000,
	            0x1d00: 0x10002008,
	            0x1e00: 0x10202000,
	            0x1f00: 0x200008,
	            0x1080: 0x8,
	            0x1180: 0x202000,
	            0x1280: 0x200000,
	            0x1380: 0x10000008,
	            0x1480: 0x10002000,
	            0x1580: 0x2008,
	            0x1680: 0x10202008,
	            0x1780: 0x10200000,
	            0x1880: 0x10202000,
	            0x1980: 0x10200008,
	            0x1a80: 0x2000,
	            0x1b80: 0x202008,
	            0x1c80: 0x200008,
	            0x1d80: 0x0,
	            0x1e80: 0x10000000,
	            0x1f80: 0x10002008
	        },
	        {
	            0x0: 0x100000,
	            0x10: 0x2000401,
	            0x20: 0x400,
	            0x30: 0x100401,
	            0x40: 0x2100401,
	            0x50: 0x0,
	            0x60: 0x1,
	            0x70: 0x2100001,
	            0x80: 0x2000400,
	            0x90: 0x100001,
	            0xa0: 0x2000001,
	            0xb0: 0x2100400,
	            0xc0: 0x2100000,
	            0xd0: 0x401,
	            0xe0: 0x100400,
	            0xf0: 0x2000000,
	            0x8: 0x2100001,
	            0x18: 0x0,
	            0x28: 0x2000401,
	            0x38: 0x2100400,
	            0x48: 0x100000,
	            0x58: 0x2000001,
	            0x68: 0x2000000,
	            0x78: 0x401,
	            0x88: 0x100401,
	            0x98: 0x2000400,
	            0xa8: 0x2100000,
	            0xb8: 0x100001,
	            0xc8: 0x400,
	            0xd8: 0x2100401,
	            0xe8: 0x1,
	            0xf8: 0x100400,
	            0x100: 0x2000000,
	            0x110: 0x100000,
	            0x120: 0x2000401,
	            0x130: 0x2100001,
	            0x140: 0x100001,
	            0x150: 0x2000400,
	            0x160: 0x2100400,
	            0x170: 0x100401,
	            0x180: 0x401,
	            0x190: 0x2100401,
	            0x1a0: 0x100400,
	            0x1b0: 0x1,
	            0x1c0: 0x0,
	            0x1d0: 0x2100000,
	            0x1e0: 0x2000001,
	            0x1f0: 0x400,
	            0x108: 0x100400,
	            0x118: 0x2000401,
	            0x128: 0x2100001,
	            0x138: 0x1,
	            0x148: 0x2000000,
	            0x158: 0x100000,
	            0x168: 0x401,
	            0x178: 0x2100400,
	            0x188: 0x2000001,
	            0x198: 0x2100000,
	            0x1a8: 0x0,
	            0x1b8: 0x2100401,
	            0x1c8: 0x100401,
	            0x1d8: 0x400,
	            0x1e8: 0x2000400,
	            0x1f8: 0x100001
	        },
	        {
	            0x0: 0x8000820,
	            0x1: 0x20000,
	            0x2: 0x8000000,
	            0x3: 0x20,
	            0x4: 0x20020,
	            0x5: 0x8020820,
	            0x6: 0x8020800,
	            0x7: 0x800,
	            0x8: 0x8020000,
	            0x9: 0x8000800,
	            0xa: 0x20800,
	            0xb: 0x8020020,
	            0xc: 0x820,
	            0xd: 0x0,
	            0xe: 0x8000020,
	            0xf: 0x20820,
	            0x80000000: 0x800,
	            0x80000001: 0x8020820,
	            0x80000002: 0x8000820,
	            0x80000003: 0x8000000,
	            0x80000004: 0x8020000,
	            0x80000005: 0x20800,
	            0x80000006: 0x20820,
	            0x80000007: 0x20,
	            0x80000008: 0x8000020,
	            0x80000009: 0x820,
	            0x8000000a: 0x20020,
	            0x8000000b: 0x8020800,
	            0x8000000c: 0x0,
	            0x8000000d: 0x8020020,
	            0x8000000e: 0x8000800,
	            0x8000000f: 0x20000,
	            0x10: 0x20820,
	            0x11: 0x8020800,
	            0x12: 0x20,
	            0x13: 0x800,
	            0x14: 0x8000800,
	            0x15: 0x8000020,
	            0x16: 0x8020020,
	            0x17: 0x20000,
	            0x18: 0x0,
	            0x19: 0x20020,
	            0x1a: 0x8020000,
	            0x1b: 0x8000820,
	            0x1c: 0x8020820,
	            0x1d: 0x20800,
	            0x1e: 0x820,
	            0x1f: 0x8000000,
	            0x80000010: 0x20000,
	            0x80000011: 0x800,
	            0x80000012: 0x8020020,
	            0x80000013: 0x20820,
	            0x80000014: 0x20,
	            0x80000015: 0x8020000,
	            0x80000016: 0x8000000,
	            0x80000017: 0x8000820,
	            0x80000018: 0x8020820,
	            0x80000019: 0x8000020,
	            0x8000001a: 0x8000800,
	            0x8000001b: 0x0,
	            0x8000001c: 0x20800,
	            0x8000001d: 0x820,
	            0x8000001e: 0x20020,
	            0x8000001f: 0x8020800
	        }
	    ];

	    // Masks that select the SBOX input
	    var SBOX_MASK = [
	        0xf8000001, 0x1f800000, 0x01f80000, 0x001f8000,
	        0x0001f800, 0x00001f80, 0x000001f8, 0x8000001f
	    ];

	    /**
	     * DES block cipher algorithm.
	     */
	    var DES = C_algo.DES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;

	            // Select 56 bits according to PC1
	            var keyBits = [];
	            for (var i = 0; i < 56; i++) {
	                var keyBitPos = PC1[i] - 1;
	                keyBits[i] = (keyWords[keyBitPos >>> 5] >>> (31 - keyBitPos % 32)) & 1;
	            }

	            // Assemble 16 subkeys
	            var subKeys = this._subKeys = [];
	            for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
	                // Create subkey
	                var subKey = subKeys[nSubKey] = [];

	                // Shortcut
	                var bitShift = BIT_SHIFTS[nSubKey];

	                // Select 48 bits according to PC2
	                for (var i = 0; i < 24; i++) {
	                    // Select from the left 28 key bits
	                    subKey[(i / 6) | 0] |= keyBits[((PC2[i] - 1) + bitShift) % 28] << (31 - i % 6);

	                    // Select from the right 28 key bits
	                    subKey[4 + ((i / 6) | 0)] |= keyBits[28 + (((PC2[i + 24] - 1) + bitShift) % 28)] << (31 - i % 6);
	                }

	                // Since each subkey is applied to an expanded 32-bit input,
	                // the subkey can be broken into 8 values scaled to 32-bits,
	                // which allows the key to be used without expansion
	                subKey[0] = (subKey[0] << 1) | (subKey[0] >>> 31);
	                for (var i = 1; i < 7; i++) {
	                    subKey[i] = subKey[i] >>> ((i - 1) * 4 + 3);
	                }
	                subKey[7] = (subKey[7] << 5) | (subKey[7] >>> 27);
	            }

	            // Compute inverse subkeys
	            var invSubKeys = this._invSubKeys = [];
	            for (var i = 0; i < 16; i++) {
	                invSubKeys[i] = subKeys[15 - i];
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._subKeys);
	        },

	        decryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._invSubKeys);
	        },

	        _doCryptBlock: function (M, offset, subKeys) {
	            // Get input
	            this._lBlock = M[offset];
	            this._rBlock = M[offset + 1];

	            // Initial permutation
	            exchangeLR.call(this, 4,  0x0f0f0f0f);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeLR.call(this, 1,  0x55555555);

	            // Rounds
	            for (var round = 0; round < 16; round++) {
	                // Shortcuts
	                var subKey = subKeys[round];
	                var lBlock = this._lBlock;
	                var rBlock = this._rBlock;

	                // Feistel function
	                var f = 0;
	                for (var i = 0; i < 8; i++) {
	                    f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
	                }
	                this._lBlock = rBlock;
	                this._rBlock = lBlock ^ f;
	            }

	            // Undo swap from last round
	            var t = this._lBlock;
	            this._lBlock = this._rBlock;
	            this._rBlock = t;

	            // Final permutation
	            exchangeLR.call(this, 1,  0x55555555);
	            exchangeRL.call(this, 8,  0x00ff00ff);
	            exchangeRL.call(this, 2,  0x33333333);
	            exchangeLR.call(this, 16, 0x0000ffff);
	            exchangeLR.call(this, 4,  0x0f0f0f0f);

	            // Set output
	            M[offset] = this._lBlock;
	            M[offset + 1] = this._rBlock;
	        },

	        keySize: 64/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    // Swap bits across the left and right words
	    function exchangeLR(offset, mask) {
	        var t = ((this._lBlock >>> offset) ^ this._rBlock) & mask;
	        this._rBlock ^= t;
	        this._lBlock ^= t << offset;
	    }

	    function exchangeRL(offset, mask) {
	        var t = ((this._rBlock >>> offset) ^ this._lBlock) & mask;
	        this._lBlock ^= t;
	        this._rBlock ^= t << offset;
	    }

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
	     */
	    C.DES = BlockCipher._createHelper(DES);

	    /**
	     * Triple-DES block cipher algorithm.
	     */
	    var TripleDES = C_algo.TripleDES = BlockCipher.extend({
	        _doReset: function () {
	            // Shortcuts
	            var key = this._key;
	            var keyWords = key.words;
	            // Make sure the key length is valid (64, 128 or >= 192 bit)
	            if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) {
	                throw new Error('Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.');
	            }

	            // Extend the key according to the keying options defined in 3DES standard
	            var key1 = keyWords.slice(0, 2);
	            var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
	            var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);

	            // Create DES instances
	            this._des1 = DES.createEncryptor(WordArray.create(key1));
	            this._des2 = DES.createEncryptor(WordArray.create(key2));
	            this._des3 = DES.createEncryptor(WordArray.create(key3));
	        },

	        encryptBlock: function (M, offset) {
	            this._des1.encryptBlock(M, offset);
	            this._des2.decryptBlock(M, offset);
	            this._des3.encryptBlock(M, offset);
	        },

	        decryptBlock: function (M, offset) {
	            this._des3.decryptBlock(M, offset);
	            this._des2.encryptBlock(M, offset);
	            this._des1.decryptBlock(M, offset);
	        },

	        keySize: 192/32,

	        ivSize: 64/32,

	        blockSize: 64/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
	     */
	    C.TripleDES = BlockCipher._createHelper(TripleDES);
	}());


	return CryptoJS.TripleDES;

}));
},{"./cipher-core":10,"./core":11,"./enc-base64":12,"./evpkdf":15,"./md5":20}],43:[function(require,module,exports){
;(function (root, factory) {
	if (typeof exports === "object") {
		// CommonJS
		module.exports = exports = factory(require("./core"));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var X32WordArray = C_lib.WordArray;

	    /**
	     * x64 namespace.
	     */
	    var C_x64 = C.x64 = {};

	    /**
	     * A 64-bit word.
	     */
	    var X64Word = C_x64.Word = Base.extend({
	        /**
	         * Initializes a newly created 64-bit word.
	         *
	         * @param {number} high The high 32 bits.
	         * @param {number} low The low 32 bits.
	         *
	         * @example
	         *
	         *     var x64Word = CryptoJS.x64.Word.create(0x00010203, 0x04050607);
	         */
	        init: function (high, low) {
	            this.high = high;
	            this.low = low;
	        }

	        /**
	         * Bitwise NOTs this word.
	         *
	         * @return {X64Word} A new x64-Word object after negating.
	         *
	         * @example
	         *
	         *     var negated = x64Word.not();
	         */
	        // not: function () {
	            // var high = ~this.high;
	            // var low = ~this.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ANDs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to AND with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ANDing.
	         *
	         * @example
	         *
	         *     var anded = x64Word.and(anotherX64Word);
	         */
	        // and: function (word) {
	            // var high = this.high & word.high;
	            // var low = this.low & word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise ORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to OR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after ORing.
	         *
	         * @example
	         *
	         *     var ored = x64Word.or(anotherX64Word);
	         */
	        // or: function (word) {
	            // var high = this.high | word.high;
	            // var low = this.low | word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Bitwise XORs this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to XOR with this word.
	         *
	         * @return {X64Word} A new x64-Word object after XORing.
	         *
	         * @example
	         *
	         *     var xored = x64Word.xor(anotherX64Word);
	         */
	        // xor: function (word) {
	            // var high = this.high ^ word.high;
	            // var low = this.low ^ word.low;

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the left.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftL(25);
	         */
	        // shiftL: function (n) {
	            // if (n < 32) {
	                // var high = (this.high << n) | (this.low >>> (32 - n));
	                // var low = this.low << n;
	            // } else {
	                // var high = this.low << (n - 32);
	                // var low = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Shifts this word n bits to the right.
	         *
	         * @param {number} n The number of bits to shift.
	         *
	         * @return {X64Word} A new x64-Word object after shifting.
	         *
	         * @example
	         *
	         *     var shifted = x64Word.shiftR(7);
	         */
	        // shiftR: function (n) {
	            // if (n < 32) {
	                // var low = (this.low >>> n) | (this.high << (32 - n));
	                // var high = this.high >>> n;
	            // } else {
	                // var low = this.high >>> (n - 32);
	                // var high = 0;
	            // }

	            // return X64Word.create(high, low);
	        // },

	        /**
	         * Rotates this word n bits to the left.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotL(25);
	         */
	        // rotL: function (n) {
	            // return this.shiftL(n).or(this.shiftR(64 - n));
	        // },

	        /**
	         * Rotates this word n bits to the right.
	         *
	         * @param {number} n The number of bits to rotate.
	         *
	         * @return {X64Word} A new x64-Word object after rotating.
	         *
	         * @example
	         *
	         *     var rotated = x64Word.rotR(7);
	         */
	        // rotR: function (n) {
	            // return this.shiftR(n).or(this.shiftL(64 - n));
	        // },

	        /**
	         * Adds this word with the passed word.
	         *
	         * @param {X64Word} word The x64-Word to add with this word.
	         *
	         * @return {X64Word} A new x64-Word object after adding.
	         *
	         * @example
	         *
	         *     var added = x64Word.add(anotherX64Word);
	         */
	        // add: function (word) {
	            // var low = (this.low + word.low) | 0;
	            // var carry = (low >>> 0) < (this.low >>> 0) ? 1 : 0;
	            // var high = (this.high + word.high + carry) | 0;

	            // return X64Word.create(high, low);
	        // }
	    });

	    /**
	     * An array of 64-bit words.
	     *
	     * @property {Array} words The array of CryptoJS.x64.Word objects.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var X64WordArray = C_x64.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of CryptoJS.x64.Word objects.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create();
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ]);
	         *
	         *     var wordArray = CryptoJS.x64.WordArray.create([
	         *         CryptoJS.x64.Word.create(0x00010203, 0x04050607),
	         *         CryptoJS.x64.Word.create(0x18191a1b, 0x1c1d1e1f)
	         *     ], 10);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 8;
	            }
	        },

	        /**
	         * Converts this 64-bit word array to a 32-bit word array.
	         *
	         * @return {CryptoJS.lib.WordArray} This word array's data as a 32-bit word array.
	         *
	         * @example
	         *
	         *     var x32WordArray = x64WordArray.toX32();
	         */
	        toX32: function () {
	            // Shortcuts
	            var x64Words = this.words;
	            var x64WordsLength = x64Words.length;

	            // Convert
	            var x32Words = [];
	            for (var i = 0; i < x64WordsLength; i++) {
	                var x64Word = x64Words[i];
	                x32Words.push(x64Word.high);
	                x32Words.push(x64Word.low);
	            }

	            return X32WordArray.create(x32Words, this.sigBytes);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {X64WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = x64WordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);

	            // Clone "words" array
	            var words = clone.words = this.words.slice(0);

	            // Clone each X64Word object
	            var wordsLength = words.length;
	            for (var i = 0; i < wordsLength; i++) {
	                words[i] = words[i].clone();
	            }

	            return clone;
	        }
	    });
	}());


	return CryptoJS;

}));
},{"./core":11}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _app = require("@firebase/app");
Object.keys(_app).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _app[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _app[key];
    }
  });
});
var name = "firebase";
var version = "9.16.0";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(0, _app.registerVersion)(name, version, 'app');

},{"@firebase/app":3}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _database = require("@firebase/database");
Object.keys(_database).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _database[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _database[key];
    }
  });
});

},{"@firebase/database":5}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDB = deleteDB;
exports.openDB = openDB;
Object.defineProperty(exports, "unwrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.u;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.w;
  }
});
var _wrapIdbValue = require("./wrap-idb-value.js");
/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0, _wrapIdbValue.w)(request);
  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0, _wrapIdbValue.w)(request.result), event.oldVersion, event.newVersion, (0, _wrapIdbValue.w)(request.transaction));
    });
  }
  if (blocked) request.addEventListener('blocked', () => blocked());
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) db.addEventListener('versionchange', () => blocking());
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) request.addEventListener('blocked', () => blocked());
  return (0, _wrapIdbValue.w)(request).then(() => undefined);
}
const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }
  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (
  // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift());
    // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)
    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
(0, _wrapIdbValue.r)(oldTraps => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));

},{"./wrap-idb-value.js":47}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.i = exports.a = void 0;
exports.r = replaceTraps;
exports.u = void 0;
exports.w = wrap;
const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);
exports.i = instanceOfAny;
let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
exports.a = reverseTransformCache;
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  promise.then(value => {
    // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
    // (see wrapFunction).
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
    // Catching to avoid "Uncaught Promise exceptions"
  }).catch(() => {});
  // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };
    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  });
  // Cache it for later retrieval.
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target);
      // Polyfill for objectStoreNames because of Edge.
      if (prop === 'objectStoreNames') {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      // Make tx.store return the only store in the transaction, or undefined if there are many.
      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    // Else transform whatever we get back.
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
  if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
    return function (storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.
  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value);
  // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).
  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
  // Return the same value back if we're not going to transform it.
  return value;
}
function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value);
  // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.
  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value);
  // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = value => reverseTransformCache.get(value);
exports.u = unwrap;

},{}],48:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[2]);
