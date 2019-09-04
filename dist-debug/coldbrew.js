(function () {
const SCRIPT_SOURCE = (typeof BLOB_SCRIPT_SOURCE !== 'undefined' && BLOB_SCRIPT_SOURCE) || (typeof document !== 'undefined' && document.currentScript.src) || (typeof self !== 'undefined' && self.location && self.location.href) || (this.thread && this.thread.__filename) || __filename;
(function COLDBREW_TOP_SCOPE_FUNC(shouldExportColdbrew = true, coldbrewObjectReference={}) {
const COLDBREW_TOP_SCOPE = {};
const Coldbrew = coldbrewObjectReference;
const IS_NODE_JS = typeof process !== 'undefined'
const IS_WORKER_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && typeof self.Module === 'undefined' && !IS_NODE_JS) || ((typeof process !== 'undefined') && process.env._COLDBREW_WORKER_FORK_);
const IS_THREAD_SCRIPT = (typeof window === 'undefined' && typeof self !== 'undefined' && typeof self.Module !== 'undefined' && self.Module.ENVIRONMENT_IS_PTHREAD);
if (typeof window !== 'undefined') var COLDBREW_GLOBAL_SCOPE = window;
if (typeof self !== 'undefined' && !IS_NODE_JS) var COLDBREW_GLOBAL_SCOPE = self;
if (typeof global !== 'undefined') var COLDBREW_GLOBAL_SCOPE = global;
// Internally patch Worker so that it works by using
// a forked process in Node.js (since Node.js workers
// are still experimental).
//
// Moreover, this Worker class keeps track of all references
// to created workers so that they can be batch terminated
// when Coldbrew is unloaded. With the built-in Worker class,
// if you lose a reference to the worker object, there is no
// way to terminate that running worker AFAIK.
var _coldbrew_oldWorker = COLDBREW_GLOBAL_SCOPE.Worker;
var _coldbrew_allWorkers = [];
var Worker = new Proxy(function(){}, {
  construct: function (target, args) {
    var worker = null;
    var underlyingWorker = null;
    if (typeof _coldbrew_oldWorker === 'undefined' && IS_NODE_JS) {
      const fork = require('child_process').fork;
      require('node-comlink').patchMessageChannel();
      const NodeMessageAdapter = require('node-comlink').NodeMessageAdapter;
      underlyingWorker = fork(args[0], { env : { _COLDBREW_WORKER_FORK_ : 1 } });
      worker = new NodeMessageAdapter(underlyingWorker);
    } else {
      worker = new (_coldbrew_oldWorker.bind.apply(_coldbrew_oldWorker, [_coldbrew_oldWorker].concat(args)));
      underlyingWorker = worker;
    }
    _coldbrew_allWorkers.push(worker);
    worker.underlyingWorker = underlyingWorker;
    return worker;
  },
  get: function(target, prop) {
    if (prop === 'terminateAllWorkers') {
      return function() {
        _coldbrew_allWorkers.forEach(function(worker) {
          if (worker.underlyingWorker && worker.underlyingWorker.kill) {
            worker.underlyingWorker.kill();
          }
          if (worker.terminate) {
            worker.terminate();
          }
        });
        _coldbrew_allWorkers = [];
      };
    }
    return Reflect.get(_coldbrew_oldWorker, prop);
  },
  set: function(target, prop, value) {
    Reflect.set(_coldbrew_oldWorker, prop, value);
  },
  ownKeys: function(target) {
    return Reflect.ownKeys(_coldbrew_oldWorker);
  },
  has: function(target, prop) {
    return Reflect.has(_coldbrew_oldWorker, prop);
  },
  deleteProperty: function(target, prop) {
    Reflect.deleteProperty(_coldbrew_oldWorker, prop);
  }
});
COLDBREW_TOP_SCOPE.Worker = Worker;

var _Coldbrew_coldbrew_internal_ = (function() {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  return (
function(_Coldbrew_coldbrew_internal_) {
  _Coldbrew_coldbrew_internal_ = _Coldbrew_coldbrew_internal_ || {};

function GROWABLE_HEAP_STORE_I8(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAP8[ptr] = value;
}

function GROWABLE_HEAP_STORE_I16(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAP16[ptr >> 1] = value;
}

function GROWABLE_HEAP_STORE_I32(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAP32[ptr >> 2] = value;
}

function GROWABLE_HEAP_STORE_F32(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAPF32[ptr >> 2] = value;
}

function GROWABLE_HEAP_STORE_F64(ptr, value) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 HEAPF64[ptr >> 3] = value;
}

function GROWABLE_HEAP_LOAD_I8(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP8[ptr];
}

function GROWABLE_HEAP_LOAD_U8(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU8[ptr];
}

function GROWABLE_HEAP_LOAD_I32(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAP32[ptr >> 2];
}

function GROWABLE_HEAP_LOAD_U32(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPU32[ptr >> 2];
}

function GROWABLE_HEAP_LOAD_F64(ptr) {
 if (wasmMemory.buffer != buffer) {
  updateGlobalBufferAndViews(wasmMemory.buffer);
 }
 return HEAPF64[ptr >> 3];
}

var Module = typeof _Coldbrew_coldbrew_internal_ !== "undefined" ? _Coldbrew_coldbrew_internal_ : {};

if (!Module.expectedDataFileDownloads) {
 Module.expectedDataFileDownloads = 0;
 Module.finishedDataFileDownloads = 0;
}

Module.expectedDataFileDownloads++;

(function() {
 var loadPackage = function(metadata) {
  var PACKAGE_PATH;
  if (typeof window === "object") {
   PACKAGE_PATH = window["encodeURIComponent"](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/");
  } else if (typeof location !== "undefined") {
   PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/");
  } else {
   throw "using preloaded data can only be done on a web page or in a web worker";
  }
  var PACKAGE_NAME = ""+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"";
  var REMOTE_PACKAGE_BASE = ""+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"";
  if (typeof Module["locateFilePackage"] === "function" && !Module["locateFile"]) {
   Module["locateFile"] = Module["locateFilePackage"];
   err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)");
  }
  var REMOTE_PACKAGE_NAME = Module["locateFile"] ? Module["locateFile"](REMOTE_PACKAGE_BASE, "") : REMOTE_PACKAGE_BASE;
  var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
  var PACKAGE_UUID = metadata.package_uuid;
  function fetchRemotePackage(packageName, packageSize, callback, errback) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", packageName, true);
   xhr.responseType = "arraybuffer";
   xhr.onprogress = function(event) {
    var url = packageName;
    var size = packageSize;
    if (event.total) size = event.total;
    if (event.loaded) {
     if (!xhr.addedTotal) {
      xhr.addedTotal = true;
      if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
      Module.dataFileDownloads[url] = {
       loaded: event.loaded,
       total: size
      };
     } else {
      Module.dataFileDownloads[url].loaded = event.loaded;
     }
     var total = 0;
     var loaded = 0;
     var num = 0;
     for (var download in Module.dataFileDownloads) {
      var data = Module.dataFileDownloads[download];
      total += data.total;
      loaded += data.loaded;
      num++;
     }
     total = Math.ceil(total * Module.expectedDataFileDownloads / num);
     if (Module["setStatus"]) Module["setStatus"]("Downloading data... (" + loaded + "/" + total + ")");
    } else if (!Module.dataFileDownloads) {
     if (Module["setStatus"]) Module["setStatus"]("Downloading data...");
    }
   };
   xhr.onerror = function(event) {
    throw new Error("NetworkError for: " + packageName);
   };
   xhr.onload = function(event) {
    if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || xhr.status == 0 && xhr.response) {
     var packageData = xhr.response;
     Promise.resolve(packageData).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") }).then(callback);
    } else {
     throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
   };
   xhr.send(null);
  }
  function handleError(error) {
   console.error("package error:", error);
  }
  var fetchedCallback = null;
  var fetched = Module["getPreloadedPackage"] ? Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;
  if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
   if (fetchedCallback) {
    fetchedCallback(data);
    fetchedCallback = null;
   } else {
    fetched = data;
   }
  }, handleError);
  function runWithFS() {
   function assert(check, msg) {
    if (!check) throw msg + new Error().stack;
   }
   Module["FS_createPath"]("/", "usr", true, true);
   Module["FS_createPath"]("/usr", "local", true, true);
   Module["FS_createPath"]("/usr/local", "lib", true, true);
   Module["FS_createPath"]("/usr/local/lib", "python3.5", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "xml", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "dom", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "etree", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "parsers", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/xml", "sax", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "site-packages", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "lib2to3", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/lib2to3", "pgen2", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/lib2to3", "fixes", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "xmlrpc", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "html", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "asyncio", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "unittest", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "multiprocessing", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/multiprocessing", "dummy", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "venv", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/venv", "scripts", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/venv/scripts", "posix", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "turtledemo", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "dbm", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "wsgiref", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "curses", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "encodings", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "http", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "collections", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "json", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "sqlite3", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/sqlite3", "test", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "urllib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "importlib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "ctypes", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/ctypes", "macholib", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/ctypes", "test", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "logging", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "email", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/email", "mime", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5", "concurrent", true, true);
   Module["FS_createPath"]("/usr/local/lib/python3.5/concurrent", "futures", true, true);
   Module["FS_createPath"]("/", "coldbrew", true, true);
   Module["FS_createPath"]("/coldbrew", "examples", true, true);
   function DataRequest(start, end, audio) {
    this.start = start;
    this.end = end;
    this.audio = audio;
   }
   DataRequest.prototype = {
    requests: {},
    open: function(mode, name) {
     this.name = name;
     this.requests[name] = this;
     Module["addRunDependency"]("fp " + this.name);
    },
    send: function() {},
    onload: function() {
     var byteArray = this.byteArray.subarray(this.start, this.end);
     this.finish(byteArray);
    },
    finish: function(byteArray) {
     var that = this;
     Module["FS_createDataFile"](this.name, null, byteArray, true, true, true);
     Module["removeRunDependency"]("fp " + that.name);
     this.requests[this.name] = null;
    }
   };
   var files = metadata.files;
   for (var i = 0; i < files.length; ++i) {
    new DataRequest(files[i].start, files[i].end, files[i].audio).open("GET", files[i].filename);
   }
   function processPackageData(arrayBuffer) {
    Module.finishedDataFileDownloads++;
    assert(arrayBuffer, "Loading data file failed.");
    assert(arrayBuffer instanceof ArrayBuffer, "bad input to processPackageData");
    var byteArray = new Uint8Array(arrayBuffer);
    DataRequest.prototype.byteArray = byteArray;
    var files = metadata.files;
    for (var i = 0; i < files.length; ++i) {
     DataRequest.prototype.requests[files[i].filename].onload();
    }
    Module["removeRunDependency"]("datafile_"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"");
   }
   Module["addRunDependency"]("datafile_"+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.data"+"");
   if (!Module.preloadResults) Module.preloadResults = {};
   Module.preloadResults[PACKAGE_NAME] = {
    fromCache: false
   };
   if (fetched) {
    processPackageData(fetched);
    fetched = null;
   } else {
    fetchedCallback = processPackageData;
   }
  }
  if (Module["calledRun"]) {
   runWithFS();
  } else {
   if (!Module["preRun"]) Module["preRun"] = [];
   Module["preRun"].push(runWithFS);
  }
 };
 loadPackage({
  "files": [ {
   "filename": "/usr/local/lib/python3.5/functools.py",
   "start": 0,
   "end": 28776,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/plistlib.py",
   "start": 28776,
   "end": 60247,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/socketserver.py",
   "start": 60247,
   "end": 84913,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_threading_local.py",
   "start": 84913,
   "end": 92323,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/linecache.py",
   "start": 92323,
   "end": 97635,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/codeop.py",
   "start": 97635,
   "end": 103629,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/macurl2path.py",
   "start": 103629,
   "end": 106361,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/webbrowser.py",
   "start": 106361,
   "end": 127782,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/doctest.py",
   "start": 127782,
   "end": 231818,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dummy_threading.py",
   "start": 231818,
   "end": 234633,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/uuid.py",
   "start": 234633,
   "end": 257894,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/weakref.py",
   "start": 257894,
   "end": 277302,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sre_constants.py",
   "start": 277302,
   "end": 283750,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pyclbr.py",
   "start": 283750,
   "end": 297314,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pipes.py",
   "start": 297314,
   "end": 306230,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_pydecimal.py",
   "start": 306230,
   "end": 534030,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/imaplib.py",
   "start": 534030,
   "end": 586003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/operator.py",
   "start": 586003,
   "end": 596866,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_sitebuiltins.py",
   "start": 596866,
   "end": 599981,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/numbers.py",
   "start": 599981,
   "end": 610224,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_pyio.py",
   "start": 610224,
   "end": 698192,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/re.py",
   "start": 698192,
   "end": 713693,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/codecs.py",
   "start": 713693,
   "end": 749924,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/bz2.py",
   "start": 749924,
   "end": 762348,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/warnings.py",
   "start": 762348,
   "end": 778198,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/stat.py",
   "start": 778198,
   "end": 783236,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ssl.py",
   "start": 783236,
   "end": 825193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tarfile.py",
   "start": 825193,
   "end": 918121,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/selectors.py",
   "start": 918121,
   "end": 937289,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_osx_support.py",
   "start": 937289,
   "end": 956397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pydoc.py",
   "start": 956397,
   "end": 1059631,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/colorsys.py",
   "start": 1059631,
   "end": 1063695,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_dummy_thread.py",
   "start": 1063695,
   "end": 1068813,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/csv.py",
   "start": 1068813,
   "end": 1084941,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_markupbase.py",
   "start": 1084941,
   "end": 1099539,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site.py",
   "start": 1099539,
   "end": 1120780,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/argparse.py",
   "start": 1120780,
   "end": 1210907,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/datetime.py",
   "start": 1210907,
   "end": 1286805,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/aifc.py",
   "start": 1286805,
   "end": 1318383,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sched.py",
   "start": 1318383,
   "end": 1324599,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/io.py",
   "start": 1324599,
   "end": 1327995,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tabnanny.py",
   "start": 1327995,
   "end": 1339394,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/poplib.py",
   "start": 1339394,
   "end": 1353903,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ast.py",
   "start": 1353903,
   "end": 1365904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_sysconfigdata.py",
   "start": 1365904,
   "end": 1385847,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/struct.py",
   "start": 1385847,
   "end": 1386104,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xdrlib.py",
   "start": 1386104,
   "end": 1392017,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/rlcompleter.py",
   "start": 1392017,
   "end": 1398324,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/copy.py",
   "start": 1398324,
   "end": 1407270,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_bootlocale.py",
   "start": 1407270,
   "end": 1408571,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_collections_abc.py",
   "start": 1408571,
   "end": 1433277,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/enum.py",
   "start": 1433277,
   "end": 1455503,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/token.py",
   "start": 1455503,
   "end": 1458578,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/imghdr.py",
   "start": 1458578,
   "end": 1462336,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/base64.py",
   "start": 1462336,
   "end": 1482778,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pprint.py",
   "start": 1482778,
   "end": 1503638,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/configparser.py",
   "start": 1503638,
   "end": 1557090,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/smtplib.py",
   "start": 1557090,
   "end": 1600685,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/string.py",
   "start": 1600685,
   "end": 1612539,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/nntplib.py",
   "start": 1612539,
   "end": 1655617,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sndhdr.py",
   "start": 1655617,
   "end": 1662035,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/keyword.py",
   "start": 1662035,
   "end": 1664246,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/getopt.py",
   "start": 1664246,
   "end": 1671735,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/signal.py",
   "start": 1671735,
   "end": 1673858,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/genericpath.py",
   "start": 1673858,
   "end": 1678222,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tty.py",
   "start": 1678222,
   "end": 1679101,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/mimetypes.py",
   "start": 1679101,
   "end": 1699948,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/symbol.py",
   "start": 1699948,
   "end": 1702043,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/antigravity.py",
   "start": 1702043,
   "end": 1702518,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/typing.py",
   "start": 1702518,
   "end": 1762037,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/optparse.py",
   "start": 1762037,
   "end": 1822381,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/threading.py",
   "start": 1822381,
   "end": 1871299,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/shelve.py",
   "start": 1871299,
   "end": 1879827,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/mailbox.py",
   "start": 1879827,
   "end": 1958245,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sysconfig.py",
   "start": 1958245,
   "end": 1982584,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/code.py",
   "start": 1982584,
   "end": 1992702,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cgitb.py",
   "start": 1992702,
   "end": 2004725,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/gettext.py",
   "start": 2004725,
   "end": 2022919,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/netrc.py",
   "start": 2022919,
   "end": 2028667,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pathlib.py",
   "start": 2028667,
   "end": 2075658,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/locale.py",
   "start": 2075658,
   "end": 2150371,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/binhex.py",
   "start": 2150371,
   "end": 2164325,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/inspect.py",
   "start": 2164325,
   "end": 2277643,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pkgutil.py",
   "start": 2277643,
   "end": 2298853,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/statistics.py",
   "start": 2298853,
   "end": 2318386,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/hmac.py",
   "start": 2318386,
   "end": 2323449,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/formatter.py",
   "start": 2323449,
   "end": 2338592,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/LICENSE.txt",
   "start": 2338592,
   "end": 2351359,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/abc.py",
   "start": 2351359,
   "end": 2359987,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sunau.py",
   "start": 2359987,
   "end": 2378082,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/shlex.py",
   "start": 2378082,
   "end": 2389503,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/opcode.py",
   "start": 2389503,
   "end": 2395388,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_compat_pickle.py",
   "start": 2395388,
   "end": 2403944,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/__phello__.foo.py",
   "start": 2403944,
   "end": 2404008,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/macpath.py",
   "start": 2404008,
   "end": 2409915,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cProfile.py",
   "start": 2409915,
   "end": 2415228,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/filecmp.py",
   "start": 2415228,
   "end": 2425058,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wave.py",
   "start": 2425058,
   "end": 2442740,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/mailcap.py",
   "start": 2442740,
   "end": 2450177,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/fnmatch.py",
   "start": 2450177,
   "end": 2453340,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pstats.py",
   "start": 2453340,
   "end": 2479656,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/runpy.py",
   "start": 2479656,
   "end": 2491050,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/queue.py",
   "start": 2491050,
   "end": 2499830,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/zipapp.py",
   "start": 2499830,
   "end": 2506987,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tempfile.py",
   "start": 2506987,
   "end": 2533623,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/traceback.py",
   "start": 2533623,
   "end": 2555817,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/decimal.py",
   "start": 2555817,
   "end": 2556137,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/glob.py",
   "start": 2556137,
   "end": 2561209,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pickle.py",
   "start": 2561209,
   "end": 2617057,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pickletools.py",
   "start": 2617057,
   "end": 2708818,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/shutil.py",
   "start": 2708818,
   "end": 2748681,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cgi.py",
   "start": 2748681,
   "end": 2784717,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/bdb.py",
   "start": 2784717,
   "end": 2808071,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtle.py",
   "start": 2808071,
   "end": 2951570,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/py_compile.py",
   "start": 2951570,
   "end": 2958751,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/stringprep.py",
   "start": 2958751,
   "end": 2971668,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/contextlib.py",
   "start": 2971668,
   "end": 2983929,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ipaddress.py",
   "start": 2983929,
   "end": 3059518,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/getpass.py",
   "start": 3059518,
   "end": 3065570,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pty.py",
   "start": 3065570,
   "end": 3070333,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/fractions.py",
   "start": 3070333,
   "end": 3094723,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/symtable.py",
   "start": 3094723,
   "end": 3101914,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/zipfile.py",
   "start": 3101914,
   "end": 3175586,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ntpath.py",
   "start": 3175586,
   "end": 3198379,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/profile.py",
   "start": 3198379,
   "end": 3220400,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_compression.py",
   "start": 3220400,
   "end": 3225740,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/smtpd.py",
   "start": 3225740,
   "end": 3261102,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/compileall.py",
   "start": 3261102,
   "end": 3272797,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/trace.py",
   "start": 3272797,
   "end": 3304338,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/chunk.py",
   "start": 3304338,
   "end": 3309763,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asynchat.py",
   "start": 3309763,
   "end": 3321734,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/pdb.py",
   "start": 3321734,
   "end": 3382721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/nturl2path.py",
   "start": 3382721,
   "end": 3385165,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/__future__.py",
   "start": 3385165,
   "end": 3390006,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tracemalloc.py",
   "start": 3390006,
   "end": 3405647,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sre_compile.py",
   "start": 3405647,
   "end": 3424057,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sre_parse.py",
   "start": 3424057,
   "end": 3459021,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/copyreg.py",
   "start": 3459021,
   "end": 3465854,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/this.py",
   "start": 3465854,
   "end": 3466857,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/reprlib.py",
   "start": 3466857,
   "end": 3472193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/subprocess.py",
   "start": 3472193,
   "end": 3540600,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/gzip.py",
   "start": 3540600,
   "end": 3560860,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/types.py",
   "start": 3560860,
   "end": 3569659,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/imp.py",
   "start": 3569659,
   "end": 3580290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/hashlib.py",
   "start": 3580290,
   "end": 3588269,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/quopri.py",
   "start": 3588269,
   "end": 3595523,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/socket.py",
   "start": 3595523,
   "end": 3622618,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/calendar.py",
   "start": 3622618,
   "end": 3645559,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/platform.py",
   "start": 3645559,
   "end": 3693615,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/fileinput.py",
   "start": 3693615,
   "end": 3707874,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_strptime.py",
   "start": 3707874,
   "end": 3730059,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/_weakrefset.py",
   "start": 3730059,
   "end": 3735764,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/tokenize.py",
   "start": 3735764,
   "end": 3763554,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dis.py",
   "start": 3763554,
   "end": 3780904,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/crypt.py",
   "start": 3780904,
   "end": 3782783,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/uu.py",
   "start": 3782783,
   "end": 3789538,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/bisect.py",
   "start": 3789538,
   "end": 3792133,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/cmd.py",
   "start": 3792133,
   "end": 3806993,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncore.py",
   "start": 3806993,
   "end": 3827097,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lzma.py",
   "start": 3827097,
   "end": 3840022,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/timeit.py",
   "start": 3840022,
   "end": 3852414,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/os.py",
   "start": 3852414,
   "end": 3889384,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/posixpath.py",
   "start": 3889384,
   "end": 3904265,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/telnetlib.py",
   "start": 3904265,
   "end": 3927281,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/random.py",
   "start": 3927281,
   "end": 3953368,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ftplib.py",
   "start": 3953368,
   "end": 3988193,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/heapq.py",
   "start": 3988193,
   "end": 4011122,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/textwrap.py",
   "start": 4011122,
   "end": 4030776,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/difflib.py",
   "start": 4030776,
   "end": 4114976,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/modulefinder.py",
   "start": 4114976,
   "end": 4138061,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/__init__.py",
   "start": 4138061,
   "end": 4138618,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/pulldom.py",
   "start": 4138618,
   "end": 4150379,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/expatbuilder.py",
   "start": 4150379,
   "end": 4186134,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/domreg.py",
   "start": 4186134,
   "end": 4189536,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/xmlbuilder.py",
   "start": 4189536,
   "end": 4202494,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/__init__.py",
   "start": 4202494,
   "end": 4206513,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/minicompat.py",
   "start": 4206513,
   "end": 4209880,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/NodeFilter.py",
   "start": 4209880,
   "end": 4210816,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/dom/minidom.py",
   "start": 4210816,
   "end": 4277635,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/ElementInclude.py",
   "start": 4277635,
   "end": 4282786,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/ElementPath.py",
   "start": 4282786,
   "end": 4292710,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/cElementTree.py",
   "start": 4292710,
   "end": 4292792,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/__init__.py",
   "start": 4292792,
   "end": 4294396,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/etree/ElementTree.py",
   "start": 4294396,
   "end": 4351905,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/parsers/expat.py",
   "start": 4351905,
   "end": 4352153,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/parsers/__init__.py",
   "start": 4352153,
   "end": 4352320,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/handler.py",
   "start": 4352320,
   "end": 4366242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/saxutils.py",
   "start": 4366242,
   "end": 4378447,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/__init__.py",
   "start": 4378447,
   "end": 4382040,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/_exceptions.py",
   "start": 4382040,
   "end": 4386825,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/expatreader.py",
   "start": 4386825,
   "end": 4402211,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xml/sax/xmlreader.py",
   "start": 4402211,
   "end": 4414895,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_ssl.py",
   "start": 4414895,
   "end": 4416176,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_posixsubprocess.py",
   "start": 4416176,
   "end": 4416176,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/ColdbrewHTTPShim.py",
   "start": 4416176,
   "end": 4420435,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/_socket.py",
   "start": 4420435,
   "end": 4422025,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/select.py",
   "start": 4422025,
   "end": 4422101,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/Coldbrew.py",
   "start": 4422101,
   "end": 4449934,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/site-packages/README",
   "start": 4449934,
   "end": 4450053,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/refactor.py",
   "start": 4450053,
   "end": 4478087,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/Grammar3.5.2.final.0.pickle",
   "start": 4478087,
   "end": 4499660,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/PatternGrammar.txt",
   "start": 4499660,
   "end": 4500453,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pygram.py",
   "start": 4500453,
   "end": 4501567,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixer_util.py",
   "start": 4501567,
   "end": 4516804,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/PatternGrammar3.5.2.final.0.pickle",
   "start": 4516804,
   "end": 4518259,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/__main__.py",
   "start": 4518259,
   "end": 4518326,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/patcomp.py",
   "start": 4518326,
   "end": 4525396,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/__init__.py",
   "start": 4525396,
   "end": 4525403,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pytree.py",
   "start": 4525403,
   "end": 4553455,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/Grammar.txt",
   "start": 4553455,
   "end": 4560206,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixer_base.py",
   "start": 4560206,
   "end": 4566911,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/main.py",
   "start": 4566911,
   "end": 4578549,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/btm_matcher.py",
   "start": 4578549,
   "end": 4585382,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/btm_utils.py",
   "start": 4585382,
   "end": 4595348,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/grammar.py",
   "start": 4595348,
   "end": 4600714,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/parse.py",
   "start": 4600714,
   "end": 4608767,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/token.py",
   "start": 4608767,
   "end": 4610053,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/literals.py",
   "start": 4610053,
   "end": 4611668,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/conv.py",
   "start": 4611668,
   "end": 4621310,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/__init__.py",
   "start": 4621310,
   "end": 4621453,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/pgen.py",
   "start": 4621453,
   "end": 4635233,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/tokenize.py",
   "start": 4635233,
   "end": 4657037,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/pgen2/driver.py",
   "start": 4657037,
   "end": 4662190,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_xrange.py",
   "start": 4662190,
   "end": 4664884,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_ws_comma.py",
   "start": 4664884,
   "end": 4665974,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_long.py",
   "start": 4665974,
   "end": 4666450,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_urllib.py",
   "start": 4666450,
   "end": 4674834,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_itertools_imports.py",
   "start": 4674834,
   "end": 4676920,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_throw.py",
   "start": 4676920,
   "end": 4678502,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_repr.py",
   "start": 4678502,
   "end": 4679115,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_types.py",
   "start": 4679115,
   "end": 4680912,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_print.py",
   "start": 4680912,
   "end": 4683766,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_ne.py",
   "start": 4683766,
   "end": 4684337,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_renames.py",
   "start": 4684337,
   "end": 4686558,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_raw_input.py",
   "start": 4686558,
   "end": 4687012,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_funcattrs.py",
   "start": 4687012,
   "end": 4687656,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_methodattrs.py",
   "start": 4687656,
   "end": 4688262,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_xreadlines.py",
   "start": 4688262,
   "end": 4688951,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_unicode.py",
   "start": 4688951,
   "end": 4690207,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_itertools.py",
   "start": 4690207,
   "end": 4691755,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_basestring.py",
   "start": 4691755,
   "end": 4692075,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_reduce.py",
   "start": 4692075,
   "end": 4692912,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_dict.py",
   "start": 4692912,
   "end": 4696723,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_idioms.py",
   "start": 4696723,
   "end": 4701599,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_apply.py",
   "start": 4701599,
   "end": 4703500,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_next.py",
   "start": 4703500,
   "end": 4706674,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_filter.py",
   "start": 4706674,
   "end": 4708776,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_paren.py",
   "start": 4708776,
   "end": 4710003,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_operator.py",
   "start": 4710003,
   "end": 4713474,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_standarderror.py",
   "start": 4713474,
   "end": 4713923,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/__init__.py",
   "start": 4713923,
   "end": 4713970,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_buffer.py",
   "start": 4713970,
   "end": 4714560,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_input.py",
   "start": 4714560,
   "end": 4715268,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_callable.py",
   "start": 4715268,
   "end": 4716419,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_metaclass.py",
   "start": 4716419,
   "end": 4724622,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_exitfunc.py",
   "start": 4724622,
   "end": 4727117,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_exec.py",
   "start": 4727117,
   "end": 4728118,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_future.py",
   "start": 4728118,
   "end": 4728665,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_raise.py",
   "start": 4728665,
   "end": 4731591,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_imports.py",
   "start": 4731591,
   "end": 4737275,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_sys_exc.py",
   "start": 4737275,
   "end": 4738309,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_zip.py",
   "start": 4738309,
   "end": 4739211,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_intern.py",
   "start": 4739211,
   "end": 4739985,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_has_key.py",
   "start": 4739985,
   "end": 4743207,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_tuple_params.py",
   "start": 4743207,
   "end": 4748772,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_getcwdu.py",
   "start": 4748772,
   "end": 4749223,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_execfile.py",
   "start": 4749223,
   "end": 4751213,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_numliterals.py",
   "start": 4751213,
   "end": 4751981,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_imports2.py",
   "start": 4751981,
   "end": 4752270,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_reload.py",
   "start": 4752270,
   "end": 4752963,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_asserts.py",
   "start": 4752963,
   "end": 4753947,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_import.py",
   "start": 4753947,
   "end": 4757203,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_except.py",
   "start": 4757203,
   "end": 4760547,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_nonzero.py",
   "start": 4760547,
   "end": 4761144,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_isinstance.py",
   "start": 4761144,
   "end": 4762752,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_set_literal.py",
   "start": 4762752,
   "end": 4764449,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/lib2to3/fixes/fix_map.py",
   "start": 4764449,
   "end": 4767507,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/server.py",
   "start": 4767507,
   "end": 4804146,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/client.py",
   "start": 4804146,
   "end": 4852444,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/xmlrpc/__init__.py",
   "start": 4852444,
   "end": 4852482,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/__init__.py",
   "start": 4852482,
   "end": 4857238,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/parser.py",
   "start": 4857238,
   "end": 4874965,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/html/entities.py",
   "start": 4874965,
   "end": 4950280,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/windows_events.py",
   "start": 4950280,
   "end": 4977974,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/constants.py",
   "start": 4977974,
   "end": 4978169,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/futures.py",
   "start": 4978169,
   "end": 4994761,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/tasks.py",
   "start": 4994761,
   "end": 5020328,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/coroutines.py",
   "start": 5020328,
   "end": 5029921,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/proactor_events.py",
   "start": 5029921,
   "end": 5049868,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/transports.py",
   "start": 5049868,
   "end": 5059721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/compat.py",
   "start": 5059721,
   "end": 5060264,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/windows_utils.py",
   "start": 5060264,
   "end": 5067108,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/protocols.py",
   "start": 5067108,
   "end": 5071620,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/events.py",
   "start": 5071620,
   "end": 5093125,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/sslproto.py",
   "start": 5093125,
   "end": 5118560,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/__init__.py",
   "start": 5118560,
   "end": 5119996,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/streams.py",
   "start": 5119996,
   "end": 5144415,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/test_utils.py",
   "start": 5144415,
   "end": 5157436,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/base_subprocess.py",
   "start": 5157436,
   "end": 5166379,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/queues.py",
   "start": 5166379,
   "end": 5174226,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/unix_events.py",
   "start": 5174226,
   "end": 5209013,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/base_events.py",
   "start": 5209013,
   "end": 5260875,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/subprocess.py",
   "start": 5260875,
   "end": 5268069,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/locks.py",
   "start": 5268069,
   "end": 5282870,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/selector_events.py",
   "start": 5282870,
   "end": 5322596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/asyncio/log.py",
   "start": 5322596,
   "end": 5322720,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/signals.py",
   "start": 5322720,
   "end": 5325123,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/result.py",
   "start": 5325123,
   "end": 5332565,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/util.py",
   "start": 5332565,
   "end": 5337998,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/case.py",
   "start": 5337998,
   "end": 5394530,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/runner.py",
   "start": 5394530,
   "end": 5402280,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/loader.py",
   "start": 5402280,
   "end": 5424508,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/__main__.py",
   "start": 5424508,
   "end": 5424993,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/__init__.py",
   "start": 5424993,
   "end": 5428133,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/suite.py",
   "start": 5428133,
   "end": 5438612,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/main.py",
   "start": 5438612,
   "end": 5449097,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/unittest/mock.py",
   "start": 5449097,
   "end": 5527290,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_fork.py",
   "start": 5527290,
   "end": 5529617,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/resource_sharer.py",
   "start": 5529617,
   "end": 5534935,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/sharedctypes.py",
   "start": 5534935,
   "end": 5541163,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_spawn_win32.py",
   "start": 5541163,
   "end": 5544161,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/synchronize.py",
   "start": 5544161,
   "end": 5556213,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/util.py",
   "start": 5556213,
   "end": 5567466,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/__init__.py",
   "start": 5567466,
   "end": 5568389,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/semaphore_tracker.py",
   "start": 5568389,
   "end": 5573209,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/forkserver.py",
   "start": 5573209,
   "end": 5581172,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/managers.py",
   "start": 5581172,
   "end": 5617132,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/process.py",
   "start": 5617132,
   "end": 5626091,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/spawn.py",
   "start": 5626091,
   "end": 5634939,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/reduction.py",
   "start": 5634939,
   "end": 5643047,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/context.py",
   "start": 5643047,
   "end": 5653716,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/queues.py",
   "start": 5653716,
   "end": 5664882,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/heap.py",
   "start": 5664882,
   "end": 5673207,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/pool.py",
   "start": 5673207,
   "end": 5697930,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_spawn_posix.py",
   "start": 5697930,
   "end": 5699845,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/connection.py",
   "start": 5699845,
   "end": 5730702,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/popen_forkserver.py",
   "start": 5730702,
   "end": 5732669,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/dummy/__init__.py",
   "start": 5732669,
   "end": 5735565,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/multiprocessing/dummy/connection.py",
   "start": 5735565,
   "end": 5737148,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/__main__.py",
   "start": 5737148,
   "end": 5737293,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/__init__.py",
   "start": 5737293,
   "end": 5756900,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate.fish",
   "start": 5756900,
   "end": 5759312,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate.csh",
   "start": 5759312,
   "end": 5760588,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/venv/scripts/posix/activate",
   "start": 5760588,
   "end": 5762746,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/colormixer.py",
   "start": 5762746,
   "end": 5764085,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/wikipedia.py",
   "start": 5764085,
   "end": 5765432,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/tree.py",
   "start": 5765432,
   "end": 5766857,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/penrose.py",
   "start": 5766857,
   "end": 5770397,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/paint.py",
   "start": 5770397,
   "end": 5771688,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/bytedesign.py",
   "start": 5771688,
   "end": 5775932,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/yinyang.py",
   "start": 5775932,
   "end": 5776753,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/two_canvases.py",
   "start": 5776753,
   "end": 5777873,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/turtle.cfg",
   "start": 5777873,
   "end": 5778033,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/forest.py",
   "start": 5778033,
   "end": 5780983,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/peace.py",
   "start": 5780983,
   "end": 5782049,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/__main__.py",
   "start": 5782049,
   "end": 5796335,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/nim.py",
   "start": 5796335,
   "end": 5802848,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/__init__.py",
   "start": 5802848,
   "end": 5803162,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/planet_and_moon.py",
   "start": 5803162,
   "end": 5806010,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/fractalcurves.py",
   "start": 5806010,
   "end": 5809467,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/clock.py",
   "start": 5809467,
   "end": 5812668,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/sorting_animate.py",
   "start": 5812668,
   "end": 5817720,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/minimal_hanoi.py",
   "start": 5817720,
   "end": 5819771,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/chaos.py",
   "start": 5819771,
   "end": 5820722,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/lindenmayer.py",
   "start": 5820722,
   "end": 5823156,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/turtledemo/round_dance.py",
   "start": 5823156,
   "end": 5824960,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/dumb.py",
   "start": 5824960,
   "end": 5835931,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/__init__.py",
   "start": 5835931,
   "end": 5841714,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/ndbm.py",
   "start": 5841714,
   "end": 5841784,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/dbm/gnu.py",
   "start": 5841784,
   "end": 5841856,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/headers.py",
   "start": 5841856,
   "end": 5848622,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/util.py",
   "start": 5848622,
   "end": 5854256,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/__init__.py",
   "start": 5854256,
   "end": 5854843,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/handlers.py",
   "start": 5854843,
   "end": 5875844,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/validate.py",
   "start": 5875844,
   "end": 5891007,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/wsgiref/simple_server.py",
   "start": 5891007,
   "end": 5896395,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/__init__.py",
   "start": 5896395,
   "end": 5899761,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/textpad.py",
   "start": 5899761,
   "end": 5907100,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/ascii.py",
   "start": 5907100,
   "end": 5909707,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/panel.py",
   "start": 5909707,
   "end": 5909794,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/curses/has_key.py",
   "start": 5909794,
   "end": 5915428,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp856.py",
   "start": 5915428,
   "end": 5927851,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp950.py",
   "start": 5927851,
   "end": 5928874,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1256.py",
   "start": 5928874,
   "end": 5941688,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gbk.py",
   "start": 5941688,
   "end": 5942703,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp875.py",
   "start": 5942703,
   "end": 5955557,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_roman.py",
   "start": 5955557,
   "end": 5969037,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_3.py",
   "start": 5969037,
   "end": 5982126,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp874.py",
   "start": 5982126,
   "end": 5994721,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_r.py",
   "start": 5994721,
   "end": 6008500,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_6.py",
   "start": 6008500,
   "end": 6019333,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp500.py",
   "start": 6019333,
   "end": 6032454,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp932.py",
   "start": 6032454,
   "end": 6033477,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_2.py",
   "start": 6033477,
   "end": 6034538,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16_be.py",
   "start": 6034538,
   "end": 6035575,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1254.py",
   "start": 6035575,
   "end": 6049077,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_iceland.py",
   "start": 6049077,
   "end": 6062575,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_turkish.py",
   "start": 6062575,
   "end": 6076088,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1257.py",
   "start": 6076088,
   "end": 6089462,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/undefined.py",
   "start": 6089462,
   "end": 6090761,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1255.py",
   "start": 6090761,
   "end": 6103227,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_5.py",
   "start": 6103227,
   "end": 6116242,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_7.py",
   "start": 6116242,
   "end": 6129086,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_t.py",
   "start": 6129086,
   "end": 6142279,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32_be.py",
   "start": 6142279,
   "end": 6143209,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gb2312.py",
   "start": 6143209,
   "end": 6144236,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_15.py",
   "start": 6144236,
   "end": 6157448,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1251.py",
   "start": 6157448,
   "end": 6170809,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp037.py",
   "start": 6170809,
   "end": 6183930,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/ptcp154.py",
   "start": 6183930,
   "end": 6197945,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32_le.py",
   "start": 6197945,
   "end": 6198875,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/big5hkscs.py",
   "start": 6198875,
   "end": 6199914,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_croatian.py",
   "start": 6199914,
   "end": 6213547,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp862.py",
   "start": 6213547,
   "end": 6246917,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/kz1048.py",
   "start": 6246917,
   "end": 6260640,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hz.py",
   "start": 6260640,
   "end": 6261651,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp864.py",
   "start": 6261651,
   "end": 6295314,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_4.py",
   "start": 6295314,
   "end": 6308690,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1258.py",
   "start": 6308690,
   "end": 6322054,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp852.py",
   "start": 6322054,
   "end": 6357056,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp775.py",
   "start": 6357056,
   "end": 6391532,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/johab.py",
   "start": 6391532,
   "end": 6392555,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1252.py",
   "start": 6392555,
   "end": 6406066,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/tis_620.py",
   "start": 6406066,
   "end": 6418366,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/aliases.py",
   "start": 6418366,
   "end": 6433908,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jis_2004.py",
   "start": 6433908,
   "end": 6434959,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1140.py",
   "start": 6434959,
   "end": 6448064,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp850.py",
   "start": 6448064,
   "end": 6482169,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp65001.py",
   "start": 6482169,
   "end": 6483275,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_11.py",
   "start": 6483275,
   "end": 6495610,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_3.py",
   "start": 6495610,
   "end": 6496671,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/idna.py",
   "start": 6496671,
   "end": 6505841,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp855.py",
   "start": 6505841,
   "end": 6539691,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/zlib_codec.py",
   "start": 6539691,
   "end": 6541895,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp857.py",
   "start": 6541895,
   "end": 6575803,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_10.py",
   "start": 6575803,
   "end": 6589392,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp865.py",
   "start": 6589392,
   "end": 6624010,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/bz2_codec.py",
   "start": 6624010,
   "end": 6626259,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp866.py",
   "start": 6626259,
   "end": 6660655,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp737.py",
   "start": 6660655,
   "end": 6695336,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp273.py",
   "start": 6695336,
   "end": 6709468,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jisx0213.py",
   "start": 6709468,
   "end": 6710519,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_kr.py",
   "start": 6710519,
   "end": 6711546,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16.py",
   "start": 6711546,
   "end": 6716782,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp949.py",
   "start": 6716782,
   "end": 6717805,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/rot_13.py",
   "start": 6717805,
   "end": 6720233,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/punycode.py",
   "start": 6720233,
   "end": 6727114,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp437.py",
   "start": 6727114,
   "end": 6761678,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp863.py",
   "start": 6761678,
   "end": 6795930,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/unicode_escape.py",
   "start": 6795930,
   "end": 6797114,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/__init__.py",
   "start": 6797114,
   "end": 6802181,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_16_le.py",
   "start": 6802181,
   "end": 6803218,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_32.py",
   "start": 6803218,
   "end": 6808347,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_9.py",
   "start": 6808347,
   "end": 6821503,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_14.py",
   "start": 6821503,
   "end": 6835155,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1006.py",
   "start": 6835155,
   "end": 6848723,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jis.py",
   "start": 6848723,
   "end": 6849762,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_kr.py",
   "start": 6849762,
   "end": 6850815,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_16.py",
   "start": 6850815,
   "end": 6864372,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/base64_codec.py",
   "start": 6864372,
   "end": 6865905,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_8.py",
   "start": 6865905,
   "end": 6866910,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/latin_1.py",
   "start": 6866910,
   "end": 6868174,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jisx0213.py",
   "start": 6868174,
   "end": 6869233,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hex_codec.py",
   "start": 6869233,
   "end": 6870741,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp858.py",
   "start": 6870741,
   "end": 6904756,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/quopri_codec.py",
   "start": 6904756,
   "end": 6906281,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_arabic.py",
   "start": 6906281,
   "end": 6942748,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_2004.py",
   "start": 6942748,
   "end": 6943821,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp720.py",
   "start": 6943821,
   "end": 6957507,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1026.py",
   "start": 6957507,
   "end": 6970620,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_farsi.py",
   "start": 6970620,
   "end": 6985790,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/gb18030.py",
   "start": 6985790,
   "end": 6986821,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_8_sig.py",
   "start": 6986821,
   "end": 6990954,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_greek.py",
   "start": 6990954,
   "end": 7004675,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mbcs.py",
   "start": 7004675,
   "end": 7005886,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp869.py",
   "start": 7005886,
   "end": 7038851,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1250.py",
   "start": 7038851,
   "end": 7052537,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/utf_7.py",
   "start": 7052537,
   "end": 7053483,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/charmap.py",
   "start": 7053483,
   "end": 7055567,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/big5.py",
   "start": 7055567,
   "end": 7056586,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_8.py",
   "start": 7056586,
   "end": 7067622,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_romanian.py",
   "start": 7067622,
   "end": 7081283,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1125.py",
   "start": 7081283,
   "end": 7115880,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_ext.py",
   "start": 7115880,
   "end": 7116949,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/ascii.py",
   "start": 7116949,
   "end": 7118197,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp861.py",
   "start": 7118197,
   "end": 7152830,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/shift_jis_2004.py",
   "start": 7152830,
   "end": 7153889,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/unicode_internal.py",
   "start": 7153889,
   "end": 7155085,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp_1.py",
   "start": 7155085,
   "end": 7156146,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_cyrillic.py",
   "start": 7156146,
   "end": 7169600,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp1253.py",
   "start": 7169600,
   "end": 7182694,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_2.py",
   "start": 7182694,
   "end": 7196098,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/koi8_u.py",
   "start": 7196098,
   "end": 7209860,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/hp_roman8.py",
   "start": 7209860,
   "end": 7223335,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_1.py",
   "start": 7223335,
   "end": 7236511,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/euc_jp.py",
   "start": 7236511,
   "end": 7237538,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_latin2.py",
   "start": 7237538,
   "end": 7251656,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/raw_unicode_escape.py",
   "start": 7251656,
   "end": 7252864,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso8859_13.py",
   "start": 7252864,
   "end": 7266135,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/iso2022_jp.py",
   "start": 7266135,
   "end": 7267188,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/uu_codec.py",
   "start": 7267188,
   "end": 7269909,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp860.py",
   "start": 7269909,
   "end": 7304590,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/palmos.py",
   "start": 7304590,
   "end": 7318109,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/mac_centeuro.py",
   "start": 7318109,
   "end": 7332211,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/encodings/cp424.py",
   "start": 7332211,
   "end": 7344266,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/server.py",
   "start": 7344266,
   "end": 7388252,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/client.py",
   "start": 7388252,
   "end": 7436966,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/__init__.py",
   "start": 7436966,
   "end": 7442919,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/cookies.py",
   "start": 7442919,
   "end": 7464229,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/http/cookiejar.py",
   "start": 7464229,
   "end": 7540609,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/abc.py",
   "start": 7540609,
   "end": 7540677,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/__main__.py",
   "start": 7540677,
   "end": 7541952,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/collections/__init__.py",
   "start": 7541952,
   "end": 7587630,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/encoder.py",
   "start": 7587630,
   "end": 7603591,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/__init__.py",
   "start": 7603591,
   "end": 7616913,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/tool.py",
   "start": 7616913,
   "end": 7618558,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/decoder.py",
   "start": 7618558,
   "end": 7631140,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/json/scanner.py",
   "start": 7631140,
   "end": 7633556,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/dump.py",
   "start": 7633556,
   "end": 7636381,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/dbapi2.py",
   "start": 7636381,
   "end": 7639068,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/__init__.py",
   "start": 7639068,
   "end": 7640086,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/regression.py",
   "start": 7640086,
   "end": 7653007,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/dump.py",
   "start": 7653007,
   "end": 7655847,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/hooks.py",
   "start": 7655847,
   "end": 7665261,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/dbapi.py",
   "start": 7665261,
   "end": 7696669,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/userfunctions.py",
   "start": 7696669,
   "end": 7712587,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/transactions.py",
   "start": 7712587,
   "end": 7719925,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/factory.py",
   "start": 7719925,
   "end": 7730596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/__init__.py",
   "start": 7730596,
   "end": 7730596,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/sqlite3/test/types.py",
   "start": 7730596,
   "end": 7744813,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/parse.py",
   "start": 7744813,
   "end": 7779165,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/robotparser.py",
   "start": 7779165,
   "end": 7786129,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/error.py",
   "start": 7786129,
   "end": 7788892,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/__init__.py",
   "start": 7788892,
   "end": 7788892,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/request.py",
   "start": 7788892,
   "end": 7885798,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/urllib/response.py",
   "start": 7885798,
   "end": 7888097,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/util.py",
   "start": 7888097,
   "end": 7898902,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/machinery.py",
   "start": 7898902,
   "end": 7899746,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/abc.py",
   "start": 7899746,
   "end": 7910528,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/__init__.py",
   "start": 7910528,
   "end": 7916396,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/_bootstrap.py",
   "start": 7916396,
   "end": 7954304,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/importlib/_bootstrap_external.py",
   "start": 7954304,
   "end": 8007834,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/wintypes.py",
   "start": 8007834,
   "end": 8013462,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/util.py",
   "start": 8013462,
   "end": 8022718,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/_endian.py",
   "start": 8022718,
   "end": 8024718,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/__init__.py",
   "start": 8024718,
   "end": 8041565,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/fetch_macholib",
   "start": 8041565,
   "end": 8041649,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/dylib.py",
   "start": 8041649,
   "end": 8043477,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/__init__.py",
   "start": 8043477,
   "end": 8043631,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/framework.py",
   "start": 8043631,
   "end": 8045832,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/README.ctypes",
   "start": 8045832,
   "end": 8046128,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/dyld.py",
   "start": 8046128,
   "end": 8051035,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/macholib/fetch_macholib.bat",
   "start": 8051035,
   "end": 8051110,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_errno.py",
   "start": 8051110,
   "end": 8053412,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_returnfuncptrs.py",
   "start": 8053412,
   "end": 8056315,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_arrays.py",
   "start": 8056315,
   "end": 8062095,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_keeprefs.py",
   "start": 8062095,
   "end": 8066153,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_python_api.py",
   "start": 8066153,
   "end": 8069019,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_refcounts.py",
   "start": 8069019,
   "end": 8071595,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_internals.py",
   "start": 8071595,
   "end": 8074226,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_as_parameter.py",
   "start": 8074226,
   "end": 8080998,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_loading.py",
   "start": 8080998,
   "end": 8085515,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_memfunctions.py",
   "start": 8085515,
   "end": 8088808,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_funcptr.py",
   "start": 8088808,
   "end": 8092719,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_objects.py",
   "start": 8092719,
   "end": 8094401,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_delattr.py",
   "start": 8094401,
   "end": 8094934,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_random_things.py",
   "start": 8094934,
   "end": 8097761,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_frombuffer.py",
   "start": 8097761,
   "end": 8102007,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_libc.py",
   "start": 8102007,
   "end": 8103012,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_structures.py",
   "start": 8103012,
   "end": 8118792,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_parameters.py",
   "start": 8118792,
   "end": 8124988,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_win32.py",
   "start": 8124988,
   "end": 8130275,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_bytes.py",
   "start": 8130275,
   "end": 8132199,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_wintypes.py",
   "start": 8132199,
   "end": 8133665,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_sizes.py",
   "start": 8133665,
   "end": 8134480,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_buffers.py",
   "start": 8134480,
   "end": 8136764,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pep3118.py",
   "start": 8136764,
   "end": 8144599,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_find.py",
   "start": 8144599,
   "end": 8147432,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_incomplete.py",
   "start": 8147432,
   "end": 8148455,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/__main__.py",
   "start": 8148455,
   "end": 8148523,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_stringptr.py",
   "start": 8148523,
   "end": 8151059,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_repr.py",
   "start": 8151059,
   "end": 8151901,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/__init__.py",
   "start": 8151901,
   "end": 8152300,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_init.py",
   "start": 8152300,
   "end": 8153339,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_checkretval.py",
   "start": 8153339,
   "end": 8154307,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_macholib.py",
   "start": 8154307,
   "end": 8156137,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_bitfields.py",
   "start": 8156137,
   "end": 8166217,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_unicode.py",
   "start": 8166217,
   "end": 8167978,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_simplesubclasses.py",
   "start": 8167978,
   "end": 8169267,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pickling.py",
   "start": 8169267,
   "end": 8171485,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_numbers.py",
   "start": 8171485,
   "end": 8180776,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_anon.py",
   "start": 8180776,
   "end": 8182827,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_slicing.py",
   "start": 8182827,
   "end": 8188842,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_values.py",
   "start": 8188842,
   "end": 8192683,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_callbacks.py",
   "start": 8192683,
   "end": 8200531,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_varsize_struct.py",
   "start": 8200531,
   "end": 8202373,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_strings.py",
   "start": 8202373,
   "end": 8209508,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_byteswap.py",
   "start": 8209508,
   "end": 8220919,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_unaligned_structures.py",
   "start": 8220919,
   "end": 8222134,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_cast.py",
   "start": 8222134,
   "end": 8225322,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_struct_fields.py",
   "start": 8225322,
   "end": 8226825,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_prototypes.py",
   "start": 8226825,
   "end": 8233670,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_array_in_pointer.py",
   "start": 8233670,
   "end": 8235408,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_functions.py",
   "start": 8235408,
   "end": 8247963,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_cfuncs.py",
   "start": 8247963,
   "end": 8255643,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/ctypes/test/test_pointers.py",
   "start": 8255643,
   "end": 8262755,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/config.py",
   "start": 8262755,
   "end": 8298699,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/__init__.py",
   "start": 8298699,
   "end": 8368112,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/logging/handlers.py",
   "start": 8368112,
   "end": 8424736,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/encoders.py",
   "start": 8424736,
   "end": 8426522,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/headerregistry.py",
   "start": 8426522,
   "end": 8446686,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_header_value_parser.py",
   "start": 8446686,
   "end": 8551888,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/feedparser.py",
   "start": 8551888,
   "end": 8574753,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_parseaddr.py",
   "start": 8574753,
   "end": 8591952,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_encoded_words.py",
   "start": 8591952,
   "end": 8599866,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/charset.py",
   "start": 8599866,
   "end": 8617017,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/message.py",
   "start": 8617017,
   "end": 8662785,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/base64mime.py",
   "start": 8662785,
   "end": 8666343,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/generator.py",
   "start": 8666343,
   "end": 8686331,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/utils.py",
   "start": 8686331,
   "end": 8700019,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/errors.py",
   "start": 8700019,
   "end": 8703554,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/architecture.rst",
   "start": 8703554,
   "end": 8713114,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/__init__.py",
   "start": 8713114,
   "end": 8714880,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/iterators.py",
   "start": 8714880,
   "end": 8717015,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/contentmanager.py",
   "start": 8717015,
   "end": 8727613,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/_policybase.py",
   "start": 8727613,
   "end": 8742285,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/policy.py",
   "start": 8742285,
   "end": 8752266,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/header.py",
   "start": 8752266,
   "end": 8776366,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/parser.py",
   "start": 8776366,
   "end": 8781409,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/quoprimime.py",
   "start": 8781409,
   "end": 8791268,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/application.py",
   "start": 8791268,
   "end": 8792524,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/message.py",
   "start": 8792524,
   "end": 8793810,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/base.py",
   "start": 8793810,
   "end": 8794604,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/nonmultipart.py",
   "start": 8794604,
   "end": 8795295,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/__init__.py",
   "start": 8795295,
   "end": 8795295,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/image.py",
   "start": 8795295,
   "end": 8797059,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/text.py",
   "start": 8797059,
   "end": 8798539,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/audio.py",
   "start": 8798539,
   "end": 8801213,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/email/mime/multipart.py",
   "start": 8801213,
   "end": 8802786,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/__init__.py",
   "start": 8802786,
   "end": 8802824,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/thread.py",
   "start": 8802824,
   "end": 8807689,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/_base.py",
   "start": 8807689,
   "end": 8827715,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/__init__.py",
   "start": 8827715,
   "end": 8828515,
   "audio": 0
  }, {
   "filename": "/usr/local/lib/python3.5/concurrent/futures/process.py",
   "start": 8828515,
   "end": 8848650,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/threads.py",
   "start": 8848650,
   "end": 8849368,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/fib.py",
   "start": 8849368,
   "end": 8851243,
   "audio": 0
  }, {
   "filename": "/coldbrew/examples/add.py",
   "start": 8851243,
   "end": 8851665,
   "audio": 0
  } ],
  "remote_package_size": 8851665,
  "package_uuid": "b52dc8da-b5c4-4f9a-9378-d62ff3648bb4"
 });
})();

setTimeout(function() {
 var _coldbrew_oldSetTimeout = Browser.safeSetTimeout;
 var _coldbrew_resumeReportError = function(e) {
  console.error("FATAL – Coldbrew tried to true sleep using Asyncify, with a function pointer on the stack before unwinding. Please report an issue at https://git.io/fjANP and share the *full stack trace with DEBUG mode on* of this error.");
 };
 Browser.safeSetTimeout = function() {
  var args = arguments;
  if (args[1] < 0) {
   if (Coldbrew._resume_ie) {
    Coldbrew._resume_ie = false;
    Coldbrew.resume = Coldbrew._resumeWarn;
    try {
     args[0]();
    } catch (e) {
     _coldbrew_resumeReportError(e);
    }
   } else {
    Coldbrew.resume = function() {
     Coldbrew._resume_ie = false;
     Coldbrew.resume = Coldbrew._resumeWarn;
     try {
      args[0]();
     } catch (e) {
      _coldbrew_resumeReportError(e);
     }
    };
   }
   return -1;
  }
  return _coldbrew_oldSetTimeout.apply(null, args);
 };
 if (true) {
  var _coldbrew_oldAllocateUnusedWorkers = PThread.allocateUnusedWorkers;
  PThread.allocateUnusedWorkers = function() {
   var args = arguments;
   if (args[0] === 4) {
    args[0] = COLDBREW_TOP_SCOPE.PTHREAD_POOL_SIZE;
   }
   return _coldbrew_oldAllocateUnusedWorkers.apply(null, args);
  };
 }
}, 0);

var Worker = COLDBREW_TOP_SCOPE.Worker;

Module.noInitialRun = true;

Module.print = function(text) {
 if (Coldbrew.forwardOut) {
  Coldbrew.onStandardOut(text);
 }
};

Module.printErr = function(text) {
 if (Coldbrew.forwardErr) {
  Coldbrew.onStandardErr(text);
 }
};

Module.preInit = [ function() {
 if (true) {
  Module.mainScriptUrlOrBlob = SCRIPT_SOURCE;
 }
 Coldbrew.preInit(Module);
} ];

Module.preRun.push(function() {
 Coldbrew.preRun(Module);
 Coldbrew._mountFS(Module);
});

Module.onRuntimeInitialized = function() {
 Coldbrew._onRuntimeInitialized(Module);
};

var moduleOverrides = {};

var key;

for (key in Module) {
 if (Module.hasOwnProperty(key)) {
  moduleOverrides[key] = Module[key];
 }
}

var arguments_ = [];

var thisProgram = "./this.program";

var quit_ = function(status, toThrow) {
 throw toThrow;
};

var ENVIRONMENT_IS_WEB = false;

var ENVIRONMENT_IS_WORKER = false;

var ENVIRONMENT_IS_NODE = false;

var ENVIRONMENT_HAS_NODE = false;

var ENVIRONMENT_IS_SHELL = false;

ENVIRONMENT_IS_WEB = typeof window === "object";

ENVIRONMENT_IS_WORKER = typeof importScripts === "function";

ENVIRONMENT_HAS_NODE = typeof process === "object" && typeof process.versions === "object" && typeof process.versions.node === "string";

ENVIRONMENT_IS_NODE = ENVIRONMENT_HAS_NODE && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;

ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module["ENVIRONMENT"]) {
 throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
}

var ENVIRONMENT_IS_PTHREAD = Module.ENVIRONMENT_IS_PTHREAD || false;

if (!ENVIRONMENT_IS_PTHREAD) {
 var PthreadWorkerInit = {};
} else {
 var buffer = _Coldbrew_coldbrew_internal_.buffer;
 var tempDoublePtr = _Coldbrew_coldbrew_internal_.tempDoublePtr;
 var STATICTOP = _Coldbrew_coldbrew_internal_.STATICTOP;
 var DYNAMIC_BASE = _Coldbrew_coldbrew_internal_.DYNAMIC_BASE;
 var DYNAMICTOP_PTR = _Coldbrew_coldbrew_internal_.DYNAMICTOP_PTR;
 var PthreadWorkerInit = _Coldbrew_coldbrew_internal_.PthreadWorkerInit;
}

var scriptDirectory = "";

function locateFile(path) {
 if (Module["locateFile"]) {
  return Module["locateFile"](path, scriptDirectory);
 }
 return scriptDirectory + path;
}

var read_, readAsync, readBinary, setWindowTitle;

if (ENVIRONMENT_IS_NODE) {
 scriptDirectory = __dirname + "/";
 var nodeFS;
 var nodePath;
 read_ = function shell_read(filename, binary) {
  var ret;
  if (!nodeFS) nodeFS = require("fs");
  if (!nodePath) nodePath = require("path");
  filename = nodePath["normalize"](filename);
  ret = nodeFS["readFileSync"](filename);
  return binary ? ret : ret.toString();
 };
 readBinary = function readBinary(filename) {
  var ret = read_(filename, true);
  if (!ret.buffer) {
   ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
 };
 if (process["argv"].length > 1) {
  thisProgram = process["argv"][1].replace(/\\/g, "/");
 }
 arguments_ = process["argv"].slice(2);
 process["on"]("uncaughtException", function(ex) {
  if (!(ex instanceof ExitStatus)) {
   throw ex;
  }
 });
 process["on"]("unhandledRejection", abort);
 quit_ = function(status) {
  process["exit"](status);
 };
 Module["inspect"] = function() {
  return "[Emscripten Module object]";
 };
} else if (ENVIRONMENT_IS_SHELL) {
 if (typeof read != "undefined") {
  read_ = function shell_read(f) {
   return read(f);
  };
 }
 readBinary = function readBinary(f) {
  var data;
  if (typeof readbuffer === "function") {
   return new Uint8Array(readbuffer(f));
  }
  data = read(f, "binary");
  assert(typeof data === "object");
  return data;
 };
 if (typeof scriptArgs != "undefined") {
  arguments_ = scriptArgs;
 } else if (typeof arguments != "undefined") {
  arguments_ = arguments;
 }
 if (typeof quit === "function") {
  quit_ = function(status) {
   quit(status);
  };
 }
 if (typeof print !== "undefined") {
  if (typeof console === "undefined") console = {};
  console.log = print;
  console.warn = console.error = typeof printErr !== "undefined" ? printErr : print;
 }
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
 if (ENVIRONMENT_IS_WORKER) {
  scriptDirectory = self.location.href;
 } else if (document.currentScript) {
  scriptDirectory = document.currentScript.src;
 }
 if (_scriptDir) {
  scriptDirectory = _scriptDir;
 }
 if (scriptDirectory.indexOf("blob:") !== 0) {
  scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
 } else {
  scriptDirectory = "";
 }
 read_ = function shell_read(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send(null);
  return xhr.responseText;
 };
 if (ENVIRONMENT_IS_WORKER) {
  readBinary = function readBinary(url) {
   var xhr = new XMLHttpRequest();
   xhr.open("GET", url, false);
   xhr.responseType = "arraybuffer";
   xhr.send(null);
   return new Uint8Array(xhr.response);
  };
 }
 readAsync = function readAsync(url, onload, onerror) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function xhr_onload() {
   if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
    onload(xhr.response);
    return;
   }
   onerror();
  };
  xhr.onerror = onerror;
  xhr.send(null);
 };
 setWindowTitle = function(title) {
  document.title = title;
 };
} else {
 throw new Error("environment detection error");
}

var out = Module["print"] || console.log.bind(console);

var err = Module["printErr"] || console.warn.bind(console);

for (key in moduleOverrides) {
 if (moduleOverrides.hasOwnProperty(key)) {
  Module[key] = moduleOverrides[key];
 }
}

moduleOverrides = null;

if (Module["arguments"]) arguments_ = Module["arguments"];

if (!Object.getOwnPropertyDescriptor(Module, "arguments")) Object.defineProperty(Module, "arguments", {
 get: function() {
  abort("Module.arguments has been replaced with plain arguments_");
 }
});

if (Module["thisProgram"]) thisProgram = Module["thisProgram"];

if (!Object.getOwnPropertyDescriptor(Module, "thisProgram")) Object.defineProperty(Module, "thisProgram", {
 get: function() {
  abort("Module.thisProgram has been replaced with plain thisProgram");
 }
});

if (Module["quit"]) quit_ = Module["quit"];

if (!Object.getOwnPropertyDescriptor(Module, "quit")) Object.defineProperty(Module, "quit", {
 get: function() {
  abort("Module.quit has been replaced with plain quit_");
 }
});

assert(typeof Module["memoryInitializerPrefixURL"] === "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["pthreadMainPrefixURL"] === "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["cdInitializerPrefixURL"] === "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["filePackagePrefixURL"] === "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");

assert(typeof Module["read"] === "undefined", "Module.read option was removed (modify read_ in JS)");

assert(typeof Module["readAsync"] === "undefined", "Module.readAsync option was removed (modify readAsync in JS)");

assert(typeof Module["readBinary"] === "undefined", "Module.readBinary option was removed (modify readBinary in JS)");

assert(typeof Module["setWindowTitle"] === "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");

if (!Object.getOwnPropertyDescriptor(Module, "read")) Object.defineProperty(Module, "read", {
 get: function() {
  abort("Module.read has been replaced with plain read_");
 }
});

if (!Object.getOwnPropertyDescriptor(Module, "readAsync")) Object.defineProperty(Module, "readAsync", {
 get: function() {
  abort("Module.readAsync has been replaced with plain readAsync");
 }
});

if (!Object.getOwnPropertyDescriptor(Module, "readBinary")) Object.defineProperty(Module, "readBinary", {
 get: function() {
  abort("Module.readBinary has been replaced with plain readBinary");
 }
});

assert(ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER, "Pthreads do not work in non-browser environments yet (need Web Workers, or an alternative to them)");

stackSave = stackRestore = stackAlloc = function() {
 abort("cannot use the stack before compiled code is ready to run, and has provided stack access");
};

function dynamicAlloc(size) {
 assert(DYNAMICTOP_PTR);
 assert(!ENVIRONMENT_IS_PTHREAD);
 var ret = GROWABLE_HEAP_LOAD_I32(DYNAMICTOP_PTR | 0);
 var end = ret + size + 15 & -16;
 if (end > _emscripten_get_heap_size()) {
  abort("failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly");
 }
 GROWABLE_HEAP_STORE_I32(DYNAMICTOP_PTR | 0, end);
 return ret;
}

function getNativeTypeSize(type) {
 switch (type) {
 case "i1":
 case "i8":
  return 1;

 case "i16":
  return 2;

 case "i32":
  return 4;

 case "i64":
  return 8;

 case "float":
  return 4;

 case "double":
  return 8;

 default:
  {
   if (type[type.length - 1] === "*") {
    return 4;
   } else if (type[0] === "i") {
    var bits = parseInt(type.substr(1));
    assert(bits % 8 === 0, "getNativeTypeSize invalid bits " + bits + ", type " + type);
    return bits / 8;
   } else {
    return 0;
   }
  }
 }
}

function warnOnce(text) {
 if (!warnOnce.shown) warnOnce.shown = {};
 if (!warnOnce.shown[text]) {
  warnOnce.shown[text] = 1;
  err(text);
 }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
 tempRet0 = value;
};

function establishStackSpace(base, max) {
 stackRestore(max);
}

var Atomics_load = Atomics.load;

var Atomics_store = Atomics.store;

var Atomics_compareExchange = Atomics.compareExchange;

var wasmBinary;

if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];

if (!Object.getOwnPropertyDescriptor(Module, "wasmBinary")) Object.defineProperty(Module, "wasmBinary", {
 get: function() {
  abort("Module.wasmBinary has been replaced with plain wasmBinary");
 }
});

var noExitRuntime;

if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];

if (!Object.getOwnPropertyDescriptor(Module, "noExitRuntime")) Object.defineProperty(Module, "noExitRuntime", {
 get: function() {
  abort("Module.noExitRuntime has been replaced with plain noExitRuntime");
 }
});

if (typeof WebAssembly !== "object") {
 abort("No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.");
}

function setValue(ptr, value, type, noSafe) {
 type = type || "i8";
 if (type.charAt(type.length - 1) === "*") type = "i32";
 switch (type) {
 case "i1":
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  break;

 case "i8":
  GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
  break;

 case "i16":
  GROWABLE_HEAP_STORE_I16(ptr | 0, value);
  break;

 case "i32":
  GROWABLE_HEAP_STORE_I32(ptr | 0, value);
  break;

 case "i64":
  tempI64 = [ value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(ptr | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, tempI64[1]);
  break;

 case "float":
  GROWABLE_HEAP_STORE_F32(ptr | 0, value);
  break;

 case "double":
  GROWABLE_HEAP_STORE_F64(ptr | 0, value);
  break;

 default:
  abort("invalid type for setValue: " + type);
 }
}

var wasmMemory;

var wasmTable;

var wasmModule;

var ABORT = false;

var EXITSTATUS = 0;

function assert(condition, text) {
 if (!condition) {
  abort("Assertion failed: " + text);
 }
}

function getCFunc(ident) {
 var func = Module["_" + ident];
 assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
 return func;
}

function ccall(ident, returnType, argTypes, args, opts) {
 var toC = {
  "string": function(str) {
   var ret = 0;
   if (str !== null && str !== undefined && str !== 0) {
    var len = (str.length << 2) + 1;
    ret = stackAlloc(len);
    stringToUTF8(str, ret, len);
   }
   return ret;
  },
  "array": function(arr) {
   var ret = stackAlloc(arr.length);
   writeArrayToMemory(arr, ret);
   return ret;
  }
 };
 function convertReturnValue(ret) {
  if (returnType === "string") return UTF8ToString(ret);
  if (returnType === "boolean") return Boolean(ret);
  return ret;
 }
 var func = getCFunc(ident);
 var cArgs = [];
 var stack = 0;
 assert(returnType !== "array", 'Return type should not be "array".');
 if (args) {
  for (var i = 0; i < args.length; i++) {
   var converter = toC[argTypes[i]];
   if (converter) {
    if (stack === 0) stack = stackSave();
    cArgs[i] = converter(args[i]);
   } else {
    cArgs[i] = args[i];
   }
  }
 }
 var ret = func.apply(null, cArgs);
 if (typeof Asyncify === "object" && Asyncify.currData) {
  assert(opts && opts.async, "The call to " + ident + " is running asynchronously. If this was intended, add the async option to the ccall/cwrap call.");
  assert(Asyncify.asyncFinalizers.length === 0, "Cannot have multiple async ccalls in flight at once");
  return new Promise(function(resolve) {
   Asyncify.asyncFinalizers.push(function(ret) {
    if (stack !== 0) stackRestore(stack);
    resolve(convertReturnValue(ret));
   });
  });
 }
 ret = convertReturnValue(ret);
 if (stack !== 0) stackRestore(stack);
 if (opts && opts.async) return Promise.resolve(ret);
 return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
 return function() {
  return ccall(ident, returnType, argTypes, arguments, opts);
 };
}

var ALLOC_NORMAL = 0;

var ALLOC_NONE = 3;

function allocate(slab, types, allocator, ptr) {
 var zeroinit, size;
 if (typeof slab === "number") {
  zeroinit = true;
  size = slab;
 } else {
  zeroinit = false;
  size = slab.length;
 }
 var singleType = typeof types === "string" ? types : null;
 var ret;
 if (allocator == ALLOC_NONE) {
  ret = ptr;
 } else {
  ret = [ _malloc, stackAlloc, dynamicAlloc ][allocator](Math.max(size, singleType ? 1 : types.length));
 }
 if (zeroinit) {
  var stop;
  ptr = ret;
  assert((ret & 3) == 0);
  stop = ret + (size & ~3);
  for (;ptr < stop; ptr += 4) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, 0);
  }
  stop = ret + size;
  while (ptr < stop) {
   GROWABLE_HEAP_STORE_I8(ptr++ >> 0 | 0, 0);
  }
  return ret;
 }
 if (singleType === "i8") {
  if (slab.subarray || slab.slice) {
   HEAPU8.set(slab, ret);
  } else {
   HEAPU8.set(new Uint8Array(slab), ret);
  }
  return ret;
 }
 var i = 0, type, typeSize, previousType;
 while (i < size) {
  var curr = slab[i];
  type = singleType || types[i];
  if (type === 0) {
   i++;
   continue;
  }
  assert(type, "Must know what type to store in allocate!");
  if (type == "i64") type = "i32";
  setValue(ret + i, curr, type);
  if (previousType !== type) {
   typeSize = getNativeTypeSize(type);
   previousType = type;
  }
  i += typeSize;
 }
 return ret;
}

function getMemory(size) {
 if (!runtimeInitialized) return dynamicAlloc(size);
 return _malloc(size);
}

function AsciiToString(ptr) {
 var str = "";
 while (1) {
  var ch = GROWABLE_HEAP_LOAD_U8(ptr++ >> 0 | 0);
  if (!ch) return str;
  str += String.fromCharCode(ch);
 }
}

function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
 var endIdx = idx + maxBytesToRead;
 var str = "";
 while (!(idx >= endIdx)) {
  var u0 = u8Array[idx++];
  if (!u0) return str;
  if (!(u0 & 128)) {
   str += String.fromCharCode(u0);
   continue;
  }
  var u1 = u8Array[idx++] & 63;
  if ((u0 & 224) == 192) {
   str += String.fromCharCode((u0 & 31) << 6 | u1);
   continue;
  }
  var u2 = u8Array[idx++] & 63;
  if ((u0 & 240) == 224) {
   u0 = (u0 & 15) << 12 | u1 << 6 | u2;
  } else {
   if ((u0 & 248) != 240) warnOnce("Invalid UTF-8 leading byte 0x" + u0.toString(16) + " encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!");
   u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
  }
  if (u0 < 65536) {
   str += String.fromCharCode(u0);
  } else {
   var ch = u0 - 65536;
   str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
  }
 }
 return str;
}

function UTF8ToString(ptr, maxBytesToRead) {
 return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
}

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
 if (!(maxBytesToWrite > 0)) return 0;
 var startIdx = outIdx;
 var endIdx = outIdx + maxBytesToWrite - 1;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) {
   var u1 = str.charCodeAt(++i);
   u = 65536 + ((u & 1023) << 10) | u1 & 1023;
  }
  if (u <= 127) {
   if (outIdx >= endIdx) break;
   outU8Array[outIdx++] = u;
  } else if (u <= 2047) {
   if (outIdx + 1 >= endIdx) break;
   outU8Array[outIdx++] = 192 | u >> 6;
   outU8Array[outIdx++] = 128 | u & 63;
  } else if (u <= 65535) {
   if (outIdx + 2 >= endIdx) break;
   outU8Array[outIdx++] = 224 | u >> 12;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  } else {
   if (outIdx + 3 >= endIdx) break;
   if (u >= 2097152) warnOnce("Invalid Unicode code point 0x" + u.toString(16) + " encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).");
   outU8Array[outIdx++] = 240 | u >> 18;
   outU8Array[outIdx++] = 128 | u >> 12 & 63;
   outU8Array[outIdx++] = 128 | u >> 6 & 63;
   outU8Array[outIdx++] = 128 | u & 63;
  }
 }
 outU8Array[outIdx] = 0;
 return outIdx - startIdx;
}

function stringToUTF8(str, outPtr, maxBytesToWrite) {
 assert(typeof maxBytesToWrite == "number", "stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!");
 return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
}

function lengthBytesUTF8(str) {
 var len = 0;
 for (var i = 0; i < str.length; ++i) {
  var u = str.charCodeAt(i);
  if (u >= 55296 && u <= 57343) u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
  if (u <= 127) ++len; else if (u <= 2047) len += 2; else if (u <= 65535) len += 3; else len += 4;
 }
 return len;
}

function allocateUTF8(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = _malloc(size);
 if (ret) stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}

function allocateUTF8OnStack(str) {
 var size = lengthBytesUTF8(str) + 1;
 var ret = stackAlloc(size);
 stringToUTF8Array(str, HEAP8, ret, size);
 return ret;
}

function writeArrayToMemory(array, buffer) {
 assert(array.length >= 0, "writeArrayToMemory array must have a length (should be an array or typed array)");
 HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
 for (var i = 0; i < str.length; ++i) {
  assert(str.charCodeAt(i) === str.charCodeAt(i) & 255);
  GROWABLE_HEAP_STORE_I8(buffer++ >> 0 | 0, str.charCodeAt(i));
 }
 if (!dontAddNull) GROWABLE_HEAP_STORE_I8(buffer >> 0 | 0, 0);
}

var PAGE_SIZE = 16384;

var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
 if (x % multiple > 0) {
  x += multiple - x % multiple;
 }
 return x;
}

var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

function updateGlobalBufferAndViews(buf) {
 buffer = buf;
 Module["HEAP8"] = HEAP8 = new Int8Array(buf);
 Module["HEAP16"] = HEAP16 = new Int16Array(buf);
 Module["HEAP32"] = HEAP32 = new Int32Array(buf);
 Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
 Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
 Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
 Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
 Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
}

if (!ENVIRONMENT_IS_PTHREAD) {
 var STACK_BASE = 6962592, STACKTOP = STACK_BASE, STACK_MAX = 1719712, DYNAMIC_BASE = 6962592, DYNAMICTOP_PTR = 1719696;
 assert(STACK_BASE % 16 === 0, "stack must start aligned");
 assert(DYNAMIC_BASE % 16 === 0, "heap must start aligned");
}

var TOTAL_STACK = 5242880;

if (Module["TOTAL_STACK"]) assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");

var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 15728640;

if (!Object.getOwnPropertyDescriptor(Module, "TOTAL_MEMORY")) Object.defineProperty(Module, "TOTAL_MEMORY", {
 get: function() {
  abort("Module.TOTAL_MEMORY has been replaced with plain INITIAL_TOTAL_MEMORY");
 }
});

assert(INITIAL_TOTAL_MEMORY >= TOTAL_STACK, "TOTAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_TOTAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");

assert(typeof Int32Array !== "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined, "JS engine does not provide full typed array support");

if (ENVIRONMENT_IS_PTHREAD) {
 wasmMemory = Module["wasmMemory"];
} else {
 if (Module["wasmMemory"]) {
  wasmMemory = Module["wasmMemory"];
 } else {
  wasmMemory = new WebAssembly.Memory({
   "initial": INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE,
   "maximum": 2130706432 / WASM_PAGE_SIZE,
   "shared": true
  });
  assert(wasmMemory.buffer instanceof SharedArrayBuffer, "requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag");
 }
}

if (wasmMemory) {
 buffer = wasmMemory.buffer;
}

INITIAL_TOTAL_MEMORY = buffer.byteLength;

assert(INITIAL_TOTAL_MEMORY % WASM_PAGE_SIZE === 0);

assert(65536 % WASM_PAGE_SIZE === 0);

updateGlobalBufferAndViews(buffer);

if (!ENVIRONMENT_IS_PTHREAD) {
 GROWABLE_HEAP_STORE_I32(DYNAMICTOP_PTR | 0, DYNAMIC_BASE);
}

function writeStackCookie() {
 assert((STACK_MAX & 3) == 0);
 GROWABLE_HEAP_STORE_I32(((STACK_MAX >> 2) + 1) * 4 | 0, 34821223);
 GROWABLE_HEAP_STORE_I32(((STACK_MAX >> 2) + 2) * 4 | 0, 2310721022);
}

function checkStackCookie() {
 var cookie1 = GROWABLE_HEAP_LOAD_U32(((STACK_MAX >> 2) + 1) * 4 | 0);
 var cookie2 = GROWABLE_HEAP_LOAD_U32(((STACK_MAX >> 2) + 2) * 4 | 0);
 if (cookie1 != 34821223 || cookie2 != 2310721022) {
  abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x" + cookie2.toString(16) + " " + cookie1.toString(16));
 }
 if (GROWABLE_HEAP_LOAD_I32(0 * 4 | 0) !== 1668509029) abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
}

if (!ENVIRONMENT_IS_PTHREAD) {
 GROWABLE_HEAP_STORE_I32(0 * 4 | 0, 1668509029);
} else {
 if (GROWABLE_HEAP_LOAD_I32(0 * 4 | 0) !== 1668509029) abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
}

GROWABLE_HEAP_STORE_I16(1 * 2 | 0, 25459);

if (GROWABLE_HEAP_LOAD_U8(2 | 0) !== 115 || GROWABLE_HEAP_LOAD_U8(3 | 0) !== 99) throw "Runtime error: expected the system to be little-endian!";

function callRuntimeCallbacks(callbacks) {
 while (callbacks.length > 0) {
  var callback = callbacks.shift();
  if (typeof callback == "function") {
   callback();
   continue;
  }
  var func = callback.func;
  if (typeof func === "number") {
   if (callback.arg === undefined) {
    Module["dynCall_v"](func);
   } else {
    Module["dynCall_vi"](func, callback.arg);
   }
  } else {
   func(callback.arg === undefined ? null : callback.arg);
  }
 }
}

var __ATPRERUN__ = [];

var __ATINIT__ = [];

var __ATMAIN__ = [];

var __ATEXIT__ = [];

var __ATPOSTRUN__ = [];

var runtimeInitialized = false;

var runtimeExited = false;

if (ENVIRONMENT_IS_PTHREAD) runtimeInitialized = true;

function preRun() {
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["preRun"]) {
  if (typeof Module["preRun"] == "function") Module["preRun"] = [ Module["preRun"] ];
  while (Module["preRun"].length) {
   addOnPreRun(Module["preRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
 checkStackCookie();
 assert(!runtimeInitialized);
 runtimeInitialized = true;
 if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
 TTY.init();
 PIPEFS.root = FS.mount(PIPEFS, {}, null);
 callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
 checkStackCookie();
 if (ENVIRONMENT_IS_PTHREAD) return;
 FS.ignorePermissions = false;
 callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
 checkStackCookie();
 if (ENVIRONMENT_IS_PTHREAD) return;
 runtimeExited = true;
}

function postRun() {
 checkStackCookie();
 if (ENVIRONMENT_IS_PTHREAD) return;
 if (Module["postRun"]) {
  if (typeof Module["postRun"] == "function") Module["postRun"] = [ Module["postRun"] ];
  while (Module["postRun"].length) {
   addOnPostRun(Module["postRun"].shift());
  }
 }
 callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
 __ATPRERUN__.unshift(cb);
}

function addOnPostRun(cb) {
 __ATPOSTRUN__.unshift(cb);
}

assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");

var Math_abs = Math.abs;

var Math_ceil = Math.ceil;

var Math_floor = Math.floor;

var Math_min = Math.min;

var runDependencies = 0;

var runDependencyWatcher = null;

var dependenciesFulfilled = null;

var runDependencyTracking = {};

function getUniqueRunDependency(id) {
 var orig = id;
 while (1) {
  if (!runDependencyTracking[id]) return id;
  id = orig + Math.random();
 }
 return id;
}

function addRunDependency(id) {
 assert(!ENVIRONMENT_IS_PTHREAD, "addRunDependency cannot be used in a pthread worker");
 runDependencies++;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(!runDependencyTracking[id]);
  runDependencyTracking[id] = 1;
  if (runDependencyWatcher === null && typeof setInterval !== "undefined") {
   runDependencyWatcher = setInterval(function() {
    if (ABORT) {
     clearInterval(runDependencyWatcher);
     runDependencyWatcher = null;
     return;
    }
    var shown = false;
    for (var dep in runDependencyTracking) {
     if (!shown) {
      shown = true;
      err("still waiting on run dependencies:");
     }
     err("dependency: " + dep);
    }
    if (shown) {
     err("(end of list)");
    }
   }, 1e4);
  }
 } else {
  err("warning: run dependency added without ID");
 }
}

function removeRunDependency(id) {
 runDependencies--;
 if (Module["monitorRunDependencies"]) {
  Module["monitorRunDependencies"](runDependencies);
 }
 if (id) {
  assert(runDependencyTracking[id]);
  delete runDependencyTracking[id];
 } else {
  err("warning: run dependency removed without ID");
 }
 if (runDependencies == 0) {
  if (runDependencyWatcher !== null) {
   clearInterval(runDependencyWatcher);
   runDependencyWatcher = null;
  }
  if (dependenciesFulfilled) {
   var callback = dependenciesFulfilled;
   dependenciesFulfilled = null;
   callback();
  }
 }
}

Module["preloadedImages"] = {};

Module["preloadedAudios"] = {};

if (!ENVIRONMENT_IS_PTHREAD) addOnPreRun(function() {
 if (typeof SharedArrayBuffer !== "undefined") {
  addRunDependency("pthreads");
  PThread.allocateUnusedWorkers(4, function() {
   removeRunDependency("pthreads");
  });
 }
});

var dataURIPrefix = "data:application/octet-stream;base64,";

function isDataURI(filename) {
 return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
}

var wasmBinaryFile = ""+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "origin")+COLDBREW_TOP_SCOPE.parseUrl(SCRIPT_SOURCE, "pathname").split("/").slice(0, -1).join("/")+"/coldbrew.wasm"+"";

if (!isDataURI(wasmBinaryFile)) {
 wasmBinaryFile = wasmBinaryFile;
}

function getBinary() {
 try {
  if (wasmBinary) {
   return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
   return readBinary(wasmBinaryFile);
  } else {
   throw "both async and sync fetching of the wasm failed";
  }
 } catch (err) {
  abort(err);
 }
}

function getBinaryPromise() {
 if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === "function") {
  return fetch(wasmBinaryFile, {
   credentials: "same-origin"
  }).then(function(response) {
   if (!response["ok"]) {
    throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
   }
   return Promise.resolve(response["arrayBuffer"]()).then(JSZip.loadAsync).then(function(zip) { return zip.files[Object.keys(zip.files)].async("arraybuffer") });
  }).catch(function() {
   return getBinary();
  });
 }
 return new Promise(function(resolve, reject) {
  resolve(getBinary());
 });
}

function createWasm(env) {
 var info = {
  "env": env
 };
 function receiveInstance(instance, module) {
  var exports = instance.exports;
  exports = Asyncify.instrumentWasmExports(exports);
  Module["asm"] = exports;
  wasmModule = module;
  if (!ENVIRONMENT_IS_PTHREAD) removeRunDependency("wasm-instantiate");
 }
 if (!ENVIRONMENT_IS_PTHREAD) {
  addRunDependency("wasm-instantiate");
 }
 var trueModule = Module;
 function receiveInstantiatedSource(output) {
  assert(Module === trueModule, "the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?");
  trueModule = null;
  receiveInstance(output["instance"], output["module"]);
 }
 function instantiateArrayBuffer(receiver) {
  return getBinaryPromise().then(function(binary) {
   return WebAssembly.instantiate(binary, info);
  }).then(receiver, function(reason) {
   err("failed to asynchronously prepare wasm: " + reason);
   abort(reason);
  });
 }
 function instantiateAsync() {
  if (!wasmBinary && undefined === "function" && !isDataURI(wasmBinaryFile) && typeof fetch === "function") {
   fetch(wasmBinaryFile, {
    credentials: "same-origin"
   }).then(function(response) {
    var result = WebAssembly.instantiateStreaming(response, info);
    return result.then(receiveInstantiatedSource, function(reason) {
     err("wasm streaming compile failed: " + reason);
     err("falling back to ArrayBuffer instantiation");
     instantiateArrayBuffer(receiveInstantiatedSource);
    });
   });
  } else {
   return instantiateArrayBuffer(receiveInstantiatedSource);
  }
 }
 if (Module["instantiateWasm"]) {
  try {
   var exports = Module["instantiateWasm"](info, receiveInstance);
   exports = Asyncify.instrumentWasmExports(exports);
   return exports;
  } catch (e) {
   err("Module.instantiateWasm callback failed with error: " + e);
   return false;
  }
 }
 instantiateAsync();
 return {};
}

Module["asm"] = function(global, env, providedBuffer) {
 env["memory"] = wasmMemory || Module["wasmMemory"];
 env["table"] = wasmTable = new WebAssembly.Table({
  "initial": 3267,
  "maximum": 3267 + 0,
  "element": "anyfunc"
 });
 var exports = createWasm(env);
 assert(exports, "binaryen setup failed (no wasm support?)");
 return exports;
};

var tempDouble;

var tempI64;

var ASM_CONSTS = [ function() {
 throw "Canceled!";
}, function() {
 postMessage({
  cmd: "processQueuedMainThreadWork"
 });
}, function($0) {
 if (!ENVIRONMENT_IS_PTHREAD) {
  if (!PThread.pthreads[$0] || !PThread.pthreads[$0].worker) {
   return 0;
  }
  PThread.pthreads[$0].worker.postMessage({
   cmd: "processThreadQueue"
  });
 } else {
  postMessage({
   targetThread: $0,
   cmd: "processThreadQueue"
  });
 }
 return 1;
}, function() {
 return !!Module["canvas"];
}, function() {
 noExitRuntime = true;
} ];

function _emscripten_asm_const_iii(code, sig_ptr, argbuf) {
 var sig = AsciiToString(sig_ptr);
 var args = [];
 var align_to = function(ptr, align) {
  return ptr + align - 1 & ~(align - 1);
 };
 var buf = argbuf;
 for (var i = 0; i < sig.length; i++) {
  var c = sig[i];
  if (c == "d" || c == "f") {
   buf = align_to(buf, 8);
   args.push(GROWABLE_HEAP_LOAD_F64(buf | 0));
   buf += 8;
  } else if (c == "i") {
   buf = align_to(buf, 4);
   args.push(GROWABLE_HEAP_LOAD_I32(buf | 0));
   buf += 4;
  }
 }
 return ASM_CONSTS[code].apply(null, args);
}

function initPthreadsJS() {
 PThread.initRuntime();
}

if (!ENVIRONMENT_IS_PTHREAD) __ATINIT__.push({
 func: function() {
  ___wasm_call_ctors();
 }
});

function demangle(func) {
 var originalAsyncifyState = Asyncify.state;
 try {
  warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");
  return func;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $demangle was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function demangleAll(text) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var regex = /\b_Z[\w\d_]+/g;
  return text.replace(regex, function(x) {
   var y = demangle(x);
   return x === y ? x : y + " [" + x + "]";
  });
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $demangleAll was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var PROCINFO = {
 ppid: 1,
 pid: 42,
 sid: 42,
 pgid: 42
};

var __pthread_ptr = 0;

var __pthread_is_main_runtime_thread = 0;

var __pthread_is_main_browser_thread = 0;

function __register_pthread_ptr(pthreadPtr, isMainBrowserThread, isMainRuntimeThread) {
 var originalAsyncifyState = Asyncify.state;
 try {
  pthreadPtr = pthreadPtr | 0;
  isMainBrowserThread = isMainBrowserThread | 0;
  isMainRuntimeThread = isMainRuntimeThread | 0;
  __pthread_ptr = pthreadPtr;
  __pthread_is_main_browser_thread = isMainBrowserThread;
  __pthread_is_main_runtime_thread = isMainRuntimeThread;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _register_pthread_ptr was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

Module["__register_pthread_ptr"] = __register_pthread_ptr;

var ERRNO_CODES = {
 EPERM: 1,
 ENOENT: 2,
 ESRCH: 3,
 EINTR: 4,
 EIO: 5,
 ENXIO: 6,
 E2BIG: 7,
 ENOEXEC: 8,
 EBADF: 9,
 ECHILD: 10,
 EAGAIN: 11,
 EWOULDBLOCK: 11,
 ENOMEM: 12,
 EACCES: 13,
 EFAULT: 14,
 ENOTBLK: 15,
 EBUSY: 16,
 EEXIST: 17,
 EXDEV: 18,
 ENODEV: 19,
 ENOTDIR: 20,
 EISDIR: 21,
 EINVAL: 22,
 ENFILE: 23,
 EMFILE: 24,
 ENOTTY: 25,
 ETXTBSY: 26,
 EFBIG: 27,
 ENOSPC: 28,
 ESPIPE: 29,
 EROFS: 30,
 EMLINK: 31,
 EPIPE: 32,
 EDOM: 33,
 ERANGE: 34,
 ENOMSG: 42,
 EIDRM: 43,
 ECHRNG: 44,
 EL2NSYNC: 45,
 EL3HLT: 46,
 EL3RST: 47,
 ELNRNG: 48,
 EUNATCH: 49,
 ENOCSI: 50,
 EL2HLT: 51,
 EDEADLK: 35,
 ENOLCK: 37,
 EBADE: 52,
 EBADR: 53,
 EXFULL: 54,
 ENOANO: 55,
 EBADRQC: 56,
 EBADSLT: 57,
 EDEADLOCK: 35,
 EBFONT: 59,
 ENOSTR: 60,
 ENODATA: 61,
 ETIME: 62,
 ENOSR: 63,
 ENONET: 64,
 ENOPKG: 65,
 EREMOTE: 66,
 ENOLINK: 67,
 EADV: 68,
 ESRMNT: 69,
 ECOMM: 70,
 EPROTO: 71,
 EMULTIHOP: 72,
 EDOTDOT: 73,
 EBADMSG: 74,
 ENOTUNIQ: 76,
 EBADFD: 77,
 EREMCHG: 78,
 ELIBACC: 79,
 ELIBBAD: 80,
 ELIBSCN: 81,
 ELIBMAX: 82,
 ELIBEXEC: 83,
 ENOSYS: 38,
 ENOTEMPTY: 39,
 ENAMETOOLONG: 36,
 ELOOP: 40,
 EOPNOTSUPP: 95,
 EPFNOSUPPORT: 96,
 ECONNRESET: 104,
 ENOBUFS: 105,
 EAFNOSUPPORT: 97,
 EPROTOTYPE: 91,
 ENOTSOCK: 88,
 ENOPROTOOPT: 92,
 ESHUTDOWN: 108,
 ECONNREFUSED: 111,
 EADDRINUSE: 98,
 ECONNABORTED: 103,
 ENETUNREACH: 101,
 ENETDOWN: 100,
 ETIMEDOUT: 110,
 EHOSTDOWN: 112,
 EHOSTUNREACH: 113,
 EINPROGRESS: 115,
 EALREADY: 114,
 EDESTADDRREQ: 89,
 EMSGSIZE: 90,
 EPROTONOSUPPORT: 93,
 ESOCKTNOSUPPORT: 94,
 EADDRNOTAVAIL: 99,
 ENETRESET: 102,
 EISCONN: 106,
 ENOTCONN: 107,
 ETOOMANYREFS: 109,
 EUSERS: 87,
 EDQUOT: 122,
 ESTALE: 116,
 ENOTSUP: 95,
 ENOMEDIUM: 123,
 EILSEQ: 84,
 EOVERFLOW: 75,
 ECANCELED: 125,
 ENOTRECOVERABLE: 131,
 EOWNERDEAD: 130,
 ESTRPIPE: 86
};

var __main_thread_futex_wait_address;

if (ENVIRONMENT_IS_PTHREAD) __main_thread_futex_wait_address = PthreadWorkerInit.__main_thread_futex_wait_address; else PthreadWorkerInit.__main_thread_futex_wait_address = __main_thread_futex_wait_address = 1719680;

function _emscripten_futex_wake(addr, count) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (addr <= 0 || addr > HEAP8.length || addr & 3 != 0 || count < 0) return -22;
  if (count == 0) return 0;
  if (count >= 2147483647) count = Infinity;
  var mainThreadWaitAddress = Atomics.load(HEAP32, __main_thread_futex_wait_address >> 2);
  var mainThreadWoken = 0;
  if (mainThreadWaitAddress == addr) {
   var loadedAddr = Atomics.compareExchange(HEAP32, __main_thread_futex_wait_address >> 2, mainThreadWaitAddress, 0);
   if (loadedAddr == mainThreadWaitAddress) {
    --count;
    mainThreadWoken = 1;
    if (count <= 0) return 1;
   }
  }
  var ret = Atomics.notify(HEAP32, addr >> 2, count);
  if (ret >= 0) return ret + mainThreadWoken;
  throw "Atomics.notify returned an unexpected value " + ret;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_futex_wake was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var PThread = {
 MAIN_THREAD_ID: 1,
 mainThreadInfo: {
  schedPolicy: 0,
  schedPrio: 0
 },
 unusedWorkerPool: [],
 runningWorkers: [],
 initRuntime: function() {
  __register_pthread_ptr(PThread.mainThreadBlock, !ENVIRONMENT_IS_WORKER, 1);
  _emscripten_register_main_browser_thread_id(PThread.mainThreadBlock);
 },
 initMainThreadBlock: function() {
  if (ENVIRONMENT_IS_PTHREAD) return undefined;
  PThread.mainThreadBlock = 1718896;
  for (var i = 0; i < 244 / 4; ++i) GROWABLE_HEAP_STORE_I32((PThread.mainThreadBlock / 4 + i) * 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(PThread.mainThreadBlock + 24 | 0, PThread.mainThreadBlock);
  var headPtr = PThread.mainThreadBlock + 168;
  GROWABLE_HEAP_STORE_I32(headPtr | 0, headPtr);
  var tlsMemory = 1719152;
  for (var i = 0; i < 128; ++i) GROWABLE_HEAP_STORE_I32((tlsMemory / 4 + i) * 4 | 0, 0);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 116 >> 2, tlsMemory);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 52 >> 2, PThread.mainThreadBlock);
  Atomics.store(HEAPU32, PThread.mainThreadBlock + 56 >> 2, PROCINFO.pid);
 },
 pthreads: {},
 pthreadIdCounter: 2,
 exitHandlers: null,
 setThreadStatus: function() {},
 runExitHandlers: function() {
  if (PThread.exitHandlers !== null) {
   while (PThread.exitHandlers.length > 0) {
    PThread.exitHandlers.pop()();
   }
   PThread.exitHandlers = null;
  }
  if (ENVIRONMENT_IS_PTHREAD && threadInfoStruct) ___pthread_tsd_run_dtors();
 },
 threadExit: function(exitCode) {
  var tb = _pthread_self();
  if (tb) {
   Atomics.store(HEAPU32, tb + 4 >> 2, exitCode);
   Atomics.store(HEAPU32, tb + 0 >> 2, 1);
   Atomics.store(HEAPU32, tb + 72 >> 2, 1);
   Atomics.store(HEAPU32, tb + 76 >> 2, 0);
   PThread.runExitHandlers();
   _emscripten_futex_wake(tb + 0, 2147483647);
   __register_pthread_ptr(0, 0, 0);
   threadInfoStruct = 0;
   if (ENVIRONMENT_IS_PTHREAD) {
    postMessage({
     cmd: "exit"
    });
   }
  }
 },
 threadCancel: function() {
  PThread.runExitHandlers();
  Atomics.store(HEAPU32, threadInfoStruct + 4 >> 2, -1);
  Atomics.store(HEAPU32, threadInfoStruct + 0 >> 2, 1);
  _emscripten_futex_wake(threadInfoStruct + 0, 2147483647);
  threadInfoStruct = selfThreadId = 0;
  __register_pthread_ptr(0, 0, 0);
  postMessage({
   cmd: "cancelDone"
  });
 },
 terminateAllThreads: function() {
  for (var t in PThread.pthreads) {
   var pthread = PThread.pthreads[t];
   if (pthread) {
    PThread.freeThreadData(pthread);
    if (pthread.worker) pthread.worker.terminate();
   }
  }
  PThread.pthreads = {};
  for (var t in PThread.unusedWorkerPool) {
   var pthread = PThread.unusedWorkerPool[t];
   if (pthread) {
    PThread.freeThreadData(pthread);
    if (pthread.worker) pthread.worker.terminate();
   }
  }
  PThread.unusedWorkerPool = [];
  for (var t in PThread.runningWorkers) {
   var pthread = PThread.runningWorkers[t];
   if (pthread) {
    PThread.freeThreadData(pthread);
    if (pthread.worker) pthread.worker.terminate();
   }
  }
  PThread.runningWorkers = [];
 },
 freeThreadData: function(pthread) {
  if (!pthread) return;
  if (pthread.threadInfoStruct) {
   var tlsMemory = GROWABLE_HEAP_LOAD_I32(pthread.threadInfoStruct + 116 | 0);
   GROWABLE_HEAP_STORE_I32(pthread.threadInfoStruct + 116 | 0, 0);
   _free(tlsMemory);
   _free(pthread.threadInfoStruct);
  }
  pthread.threadInfoStruct = 0;
  if (pthread.allocatedOwnStack && pthread.stackBase) _free(pthread.stackBase);
  pthread.stackBase = 0;
  if (pthread.worker) pthread.worker.pthread = null;
 },
 returnWorkerToPool: function(worker) {
  delete PThread.pthreads[worker.pthread.thread];
  PThread.unusedWorkerPool.push(worker);
  PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker.pthread), 1);
  PThread.freeThreadData(worker.pthread);
  worker.pthread = undefined;
 },
 receiveObjectTransfer: function(data) {},
 allocateUnusedWorkers: function(numWorkers, onFinishedLoading) {
  if (typeof SharedArrayBuffer === "undefined") return;
  var numWorkersLoaded = 0;
  var pthreadMainJs = "coldbrew.worker.js";
  pthreadMainJs = URL.createObjectURL(new Blob(["const BLOB_SCRIPT_SOURCE='"+SCRIPT_SOURCE+"';\n\n"+"// Copyright 2015 The Emscripten Authors.  All rights reserved.\n// Emscripten is available under two separate licenses, the MIT license and the\n// University of Illinois/NCSA Open Source License.  Both these licenses can be\n// found in the LICENSE file.\n\n// Pthread Web Worker startup routine:\n// This is the entry point file that is loaded first by each Web Worker\n// that executes pthreads on the Emscripten application.\n\n// Thread-local:\nvar threadInfoStruct = 0; // Info area for this thread in Emscripten HEAP (shared). If zero, this worker is not currently hosting an executing pthread.\nvar selfThreadId = 0; // The ID of this thread. 0 if not hosting a pthread.\nvar parentThreadId = 0; // The ID of the parent pthread that launched this thread.\n\n// Thread-local: Each thread has its own allocated stack space.\nvar STACK_BASE = 0;\nvar STACKTOP = 0;\nvar STACK_MAX = 0;\n\n// These are system-wide memory area parameters that are set at main runtime startup in main thread, and stay constant throughout the application.\nvar buffer; // All pthreads share the same Emscripten HEAP as SharedArrayBuffer with the main execution thread.\nvar DYNAMICTOP_PTR = 0;\nvar DYNAMIC_BASE = 0;\n\nvar noExitRuntime;\n\nvar PthreadWorkerInit = {};\n\n// performance.now() is specced to return a wallclock time in msecs since that Web Worker/main thread launched. However for pthreads this can cause\n// subtle problems in emscripten_get_now() as this essentially would measure time from pthread_create(), meaning that the clocks between each threads\n// would be wildly out of sync. Therefore sync all pthreads to the clock on the main browser thread, so that different threads see a somewhat\n// coherent clock across each of them (+/- 0.1msecs in testing)\nvar __performance_now_clock_drift = 0;\n\n// Cannot use console.log or console.error in a web worker, since that would risk a browser deadlock! https://bugzilla.mozilla.org/show_bug.cgi?id=1049091\n// Therefore implement custom logging facility for threads running in a worker, which queue the messages to main thread to print.\nvar Module = {};\n\n// These modes need to assign to these variables because of how scoping works in them.\nvar PThread;\nvar HEAPU32;\n\nfunction assert(condition, text) {\n  if (!condition) abort('Assertion failed: ' + text);\n}\n\n// When error objects propagate from Web Worker to main thread, they lose helpful call stack and thread ID information, so print out errors early here,\n// before that happens.\nthis.addEventListener('error', function(e) {\n  if (e.message.indexOf('SimulateInfiniteLoop') != -1) return e.preventDefault();\n\n  var errorSource = ' in ' + e.filename + ':' + e.lineno + ':' + e.colno;\n  console.error('Pthread ' + selfThreadId + ' uncaught exception' + (e.filename || e.lineno || e.colno ? errorSource : \"\") + ': ' + e.message + '. Error object:');\n  console.error(e.error);\n});\n\nfunction threadPrintErr() {\n  var text = Array.prototype.slice.call(arguments).join(' ');\n  console.error(text);\n  console.error(new Error().stack);\n}\nfunction threadAlert() {\n  var text = Array.prototype.slice.call(arguments).join(' ');\n  postMessage({cmd: 'alert', text: text, threadId: selfThreadId});\n}\nvar err = threadPrintErr;\nthis.alert = threadAlert;\n\n// When using postMessage to send an object, it is processed by the structured clone algorithm.\n// The prototype, and hence methods, on that object is then lost. This function adds back the lost prototype.\n// This does not work with nested objects that has prototypes, but it suffices for WasmSourceMap and WasmOffsetConverter.\nfunction resetPrototype(constructor, attrs) {\n  var object = Object.create(constructor.prototype);\n  for (var key in attrs) {\n    if (attrs.hasOwnProperty(key)) {\n      object[key] = attrs[key];\n    }\n  }\n  return object;\n}\n\nModule['instantiateWasm'] = function(info, receiveInstance) {\n  // Instantiate from the module posted from the main thread.\n  // We can just use sync instantiation in the worker.\n  var instance = new WebAssembly.Instance(wasmModule, info);\n  // We don't need the module anymore; new threads will be spawned from the main thread.\n  wasmModule = null;\n  receiveInstance(instance); // The second 'module' parameter is intentionally null here, we don't need to keep a ref to the Module object from here.\n  return instance.exports;\n};\n\nvar wasmModule;\nvar wasmMemory;\n\nthis.onmessage = function(e) {\n  try {\n    if (e.data.cmd === 'load') { // Preload command that is called once per worker to parse and load the Emscripten code.\n\n      // Initialize the global \"process\"-wide fields:\n      Module['DYNAMIC_BASE'] = DYNAMIC_BASE = e.data.DYNAMIC_BASE;\n      Module['DYNAMICTOP_PTR'] = DYNAMICTOP_PTR = e.data.DYNAMICTOP_PTR;\n\n      // The Wasm module will have import fields for STACKTOP and STACK_MAX. At 'load' stage of Worker startup, we are just\n      // spawning this Web Worker to act as a host for future created pthreads, i.e. we do not have a pthread to start up here yet.\n      // (A single Worker can also host multiple pthreads throughout its lifetime, shutting down a pthread will not shut down its hosting Worker,\n      // but the Worker is reused for later spawned pthreads). The 'run' stage below will actually start running a pthread.\n      // The stack space for a pthread is allocated and deallocated when a pthread is actually run, not yet at Worker 'load' stage.\n      // However, the WebAssembly module we are loading up here has import fields for STACKTOP and STACK_MAX, which it needs to get filled in\n      // immediately at Wasm Module instantiation time. The values of these will not get used until pthread is actually running some code, so\n      // we'll proceed to set up temporary invalid values for these fields for import purposes. Then whenever a pthread is launched at 'run' stage\n      // below, these values are rewritten to establish proper stack area for the particular pthread.\n      Module['STACK_MAX'] = Module['STACKTOP']  = 0x7FFFFFFF;\n\n      // Module and memory were sent from main thread\n      Module['wasmModule'] = wasmModule = e.data.wasmModule;\n      Module['wasmMemory'] = wasmMemory = e.data.wasmMemory;\n      Module['buffer'] = buffer = Module['wasmMemory'].buffer;\n\n      Module['PthreadWorkerInit'] = PthreadWorkerInit = e.data.PthreadWorkerInit;\n      Module['ENVIRONMENT_IS_PTHREAD'] = true;\n\n      if (typeof e.data.urlOrBlob === 'string') {\n        importScripts(e.data.urlOrBlob);\n      } else {\n        var objectUrl = URL.createObjectURL(e.data.urlOrBlob);\n        importScripts(objectUrl);\n        URL.revokeObjectURL(objectUrl);\n      }\n      Module = _Coldbrew_coldbrew_internal_(Module);\n      PThread = Module['PThread'];\n      HEAPU32 = Module['HEAPU32'];\n\n      if (typeof FS !== 'undefined' && typeof FS.createStandardStreams === 'function') FS.createStandardStreams();\n      postMessage({ cmd: 'loaded' });\n    } else if (e.data.cmd === 'objectTransfer') {\n      PThread.receiveObjectTransfer(e.data);\n    } else if (e.data.cmd === 'run') { // This worker was idle, and now should start executing its pthread entry point.\n      __performance_now_clock_drift = performance.now() - e.data.time; // Sync up to the clock of the main thread.\n      threadInfoStruct = e.data.threadInfoStruct;\n      Module['__register_pthread_ptr'](threadInfoStruct, /*isMainBrowserThread=*/0, /*isMainRuntimeThread=*/0); // Pass the thread address inside the asm.js scope to store it for fast access that avoids the need for a FFI out.\n      selfThreadId = e.data.selfThreadId;\n      parentThreadId = e.data.parentThreadId;\n      // Establish the stack frame for this thread in global scope\n      // The stack grows downwards\n      var max = e.data.stackBase;\n      var top = e.data.stackBase + e.data.stackSize;\n      Module['STACK_BASE'] = STACK_BASE = top;\n      Module['STACKTOP'] = STACKTOP = top;\n      Module['STACK_MAX'] = STACK_MAX = max;\n      assert(threadInfoStruct);\n      assert(selfThreadId);\n      assert(parentThreadId);\n      assert(STACK_BASE != 0);\n      assert(max === e.data.stackBase);\n      assert(top > max);\n      // Call inside asm.js/wasm module to set up the stack frame for this pthread in asm.js/wasm module scope\n      Module['establishStackSpace'](e.data.stackBase, e.data.stackBase + e.data.stackSize);\n      // Also call inside JS module to set up the stack frame for this pthread in JS module scope\n      Module['establishStackSpaceInJsModule'](e.data.stackBase, e.data.stackBase + e.data.stackSize);\n      Module['_emscripten_tls_init']();\n      Module['writeStackCookie']();\n\n      PThread.receiveObjectTransfer(e.data);\n      PThread.setThreadStatus(Module['_pthread_self'](), 1/*EM_THREAD_STATUS_RUNNING*/);\n\n      try {\n        // pthread entry points are always of signature 'void *ThreadMain(void *arg)'\n        // Native codebases sometimes spawn threads with other thread entry point signatures,\n        // such as void ThreadMain(void *arg), void *ThreadMain(), or void ThreadMain().\n        // That is not acceptable per C/C++ specification, but x86 compiler ABI extensions\n        // enable that to work. If you find the following line to crash, either change the signature\n        // to \"proper\" void *ThreadMain(void *arg) form, or try linking with the Emscripten linker\n        // flag -s EMULATE_FUNCTION_POINTER_CASTS=1 to add in emulation for this x86 ABI extension.\n        var result = Module['dynCall_ii'](e.data.start_routine, e.data.arg);\n\n        Module['checkStackCookie']();\n\n      } catch(e) {\n        if (e === 'Canceled!') {\n          PThread.threadCancel();\n          return;\n        } else if (e === 'SimulateInfiniteLoop' || e === 'pthread_exit') {\n          return;\n        } else {\n          Atomics.store(HEAPU32, (threadInfoStruct + 4 /*C_STRUCTS.pthread.threadExitCode*/ ) >> 2, (e instanceof Module['ExitStatus']) ? e.status : -2 /*A custom entry specific to Emscripten denoting that the thread crashed.*/);\n          Atomics.store(HEAPU32, (threadInfoStruct + 0 /*C_STRUCTS.pthread.threadStatus*/ ) >> 2, 1); // Mark the thread as no longer running.\n          if (typeof(Module['_emscripten_futex_wake']) !== \"function\") {\n            err(\"Thread Initialisation failed.\");\n            throw e;\n          }\n          Module['_emscripten_futex_wake'](threadInfoStruct + 0 /*C_STRUCTS.pthread.threadStatus*/, 0x7FFFFFFF/*INT_MAX*/); // Wake all threads waiting on this thread to finish.\n          if (!(e instanceof Module['ExitStatus'])) throw e;\n        }\n      }\n      // The thread might have finished without calling pthread_exit(). If so, then perform the exit operation ourselves.\n      // (This is a no-op if explicit pthread_exit() had been called prior.)\n      if (!noExitRuntime) PThread.threadExit(result);\n    } else if (e.data.cmd === 'cancel') { // Main thread is asking for a pthread_cancel() on this thread.\n      if (threadInfoStruct && PThread.thisThreadCancelState == 0/*PTHREAD_CANCEL_ENABLE*/) {\n        PThread.threadCancel();\n      }\n    } else if (e.data.target === 'setimmediate') {\n      // no-op\n    } else if (e.data.cmd === 'processThreadQueue') {\n      if (threadInfoStruct) { // If this thread is actually running?\n        Module['_emscripten_current_thread_process_queued_calls']();\n      }\n    } else {\n      err('worker.js received unknown command ' + e.data.cmd);\n      console.error(e.data);\n    }\n  } catch(e) {\n    console.error('worker.js onmessage() captured an uncaught exception: ' + e);\n    console.error(e.stack);\n    throw e;\n  }\n};\n\n\n"], {type: 'application/javascript'}));
  for (var i = 0; i < numWorkers; ++i) {
   var worker = new Worker(pthreadMainJs);
   (function(worker) {
    worker.onmessage = function(e) {
     var d = e.data;
     if (worker.pthread) PThread.currentProxiedOperationCallerThread = worker.pthread.threadInfoStruct;
     if (d.targetThread && d.targetThread != _pthread_self()) {
      var thread = PThread.pthreads[d.targetThread];
      if (thread) {
       thread.worker.postMessage(e.data, d.transferList);
      } else {
       console.error('Internal error! Worker sent a message "' + d.cmd + '" to target pthread ' + d.targetThread + ", but that thread no longer exists!");
      }
      PThread.currentProxiedOperationCallerThread = undefined;
      return;
     }
     if (d.cmd === "processQueuedMainThreadWork") {
      _emscripten_main_thread_process_queued_calls();
     } else if (d.cmd === "spawnThread") {
      __spawn_thread(e.data);
     } else if (d.cmd === "cleanupThread") {
      __cleanup_thread(d.thread);
     } else if (d.cmd === "killThread") {
      __kill_thread(d.thread);
     } else if (d.cmd === "cancelThread") {
      __cancel_thread(d.thread);
     } else if (d.cmd === "loaded") {
      worker.loaded = true;
      if (worker.runPthread) {
       worker.runPthread();
       delete worker.runPthread;
      }
      ++numWorkersLoaded;
      if (numWorkersLoaded === numWorkers && onFinishedLoading) {
       onFinishedLoading();
      }
     } else if (d.cmd === "print") {
      out("Thread " + d.threadId + ": " + d.text);
     } else if (d.cmd === "printErr") {
      err("Thread " + d.threadId + ": " + d.text);
     } else if (d.cmd === "alert") {
      alert("Thread " + d.threadId + ": " + d.text);
     } else if (d.cmd === "exit") {
      var detached = worker.pthread && Atomics.load(HEAPU32, worker.pthread.thread + 80 >> 2);
      if (detached) {
       PThread.returnWorkerToPool(worker);
      }
     } else if (d.cmd === "exitProcess") {
      noExitRuntime = false;
      try {
       exit(d.returnCode);
      } catch (e) {
       if (e instanceof ExitStatus) return;
       throw e;
      }
     } else if (d.cmd === "cancelDone") {
      PThread.returnWorkerToPool(worker);
     } else if (d.cmd === "objectTransfer") {
      PThread.receiveObjectTransfer(e.data);
     } else if (e.data.target === "setimmediate") {
      worker.postMessage(e.data);
     } else {
      err("worker sent an unknown command " + d.cmd);
     }
     PThread.currentProxiedOperationCallerThread = undefined;
    };
    worker.onerror = function(e) {
     err("pthread sent an error! " + e.filename + ":" + e.lineno + ": " + e.message);
    };
   })(worker);
   worker.postMessage({
    cmd: "load",
    urlOrBlob: Module["mainScriptUrlOrBlob"] || _scriptDir,
    wasmMemory: wasmMemory,
    wasmModule: wasmModule,
    DYNAMIC_BASE: DYNAMIC_BASE,
    DYNAMICTOP_PTR: DYNAMICTOP_PTR,
    PthreadWorkerInit: PthreadWorkerInit
   });
   PThread.unusedWorkerPool.push(worker);
  }
 },
 getNewWorker: function() {
  if (PThread.unusedWorkerPool.length == 0) PThread.allocateUnusedWorkers(1);
  if (PThread.unusedWorkerPool.length > 0) return PThread.unusedWorkerPool.pop(); else return null;
 },
 busySpinWait: function(msecs) {
  var t = performance.now() + msecs;
  while (performance.now() < t) {}
 }
};

function establishStackSpaceInJsModule(stackBase, stackMax) {
 var originalAsyncifyState = Asyncify.state;
 try {
  STACK_BASE = stackBase;
  STACKTOP = stackMax;
  STACK_MAX = stackBase;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $establishStackSpaceInJsModule was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

Module["establishStackSpaceInJsModule"] = establishStackSpaceInJsModule;

function jsStackTrace() {
 var originalAsyncifyState = Asyncify.state;
 try {
  var err = new Error();
  if (!err.stack) {
   try {
    throw new Error(0);
   } catch (e) {
    err = e;
   }
   if (!err.stack) {
    return "(no stack trace available)";
   }
  }
  return err.stack.toString();
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $jsStackTrace was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function stackTrace() {
 var originalAsyncifyState = Asyncify.state;
 try {
  var js = jsStackTrace();
  if (Module["extraStackTrace"]) js += "\n" + Module["extraStackTrace"]();
  return demangleAll(js);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $stackTrace was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___assert_fail(condition, filename, line, func) {
 var originalAsyncifyState = Asyncify.state;
 try {
  abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [ filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function" ]);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __assert_fail was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var ENV = {};

function ___buildEnvironment(environ) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var MAX_ENV_VALUES = 64;
  var TOTAL_ENV_SIZE = 1024;
  var poolPtr;
  var envPtr;
  if (!___buildEnvironment.called) {
   ___buildEnvironment.called = true;
   ENV["USER"] = ENV["LOGNAME"] = "web_user";
   ENV["PATH"] = "/";
   ENV["PWD"] = "/";
   ENV["HOME"] = "/home/web_user";
   ENV["LANG"] = (typeof navigator === "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
   ENV["_"] = thisProgram;
   poolPtr = getMemory(TOTAL_ENV_SIZE);
   envPtr = getMemory(MAX_ENV_VALUES * 4);
   GROWABLE_HEAP_STORE_I32(envPtr | 0, poolPtr);
   GROWABLE_HEAP_STORE_I32(environ | 0, envPtr);
  } else {
   envPtr = GROWABLE_HEAP_LOAD_I32(environ | 0);
   poolPtr = GROWABLE_HEAP_LOAD_I32(envPtr | 0);
  }
  var strings = [];
  var totalSize = 0;
  for (var key in ENV) {
   if (typeof ENV[key] === "string") {
    var line = key + "=" + ENV[key];
    strings.push(line);
    totalSize += line.length;
   }
  }
  if (totalSize > TOTAL_ENV_SIZE) {
   throw new Error("Environment size exceeded TOTAL_ENV_SIZE!");
  }
  var ptrSize = 4;
  for (var i = 0; i < strings.length; i++) {
   var line = strings[i];
   writeAsciiToMemory(line, poolPtr);
   GROWABLE_HEAP_STORE_I32(envPtr + i * ptrSize | 0, poolPtr);
   poolPtr += line.length + 1;
  }
  GROWABLE_HEAP_STORE_I32(envPtr + strings.length * ptrSize | 0, 0);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __buildEnvironment was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___call_main(argc, argv) {
 var returnCode = _main(argc, argv);
 if (!noExitRuntime) postMessage({
  cmd: "exitProcess",
  returnCode: returnCode
 });
 return returnCode;
}

function _emscripten_get_now() {
 var originalAsyncifyState = Asyncify.state;
 try {
  abort();
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_get_now was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_get_now_is_monotonic() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return 0 || ENVIRONMENT_IS_NODE || typeof dateNow !== "undefined" || typeof performance === "object" && performance && typeof performance["now"] === "function";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_get_now_is_monotonic was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___setErrNo(value) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (Module["___errno_location"]) GROWABLE_HEAP_STORE_I32(Module["___errno_location"]() | 0, value); else err("failed to set errno from JS");
  return value;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __setErrNo was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _clock_gettime(clk_id, tp) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var now;
  if (clk_id === 0) {
   now = Date.now();
  } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
   now = _emscripten_get_now();
  } else {
   ___setErrNo(22);
   return -1;
  }
  GROWABLE_HEAP_STORE_I32(tp | 0, now / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(tp + 4 | 0, now % 1e3 * 1e3 * 1e3 | 0);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import clock_gettime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___clock_gettime(a0, a1) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _clock_gettime(a0, a1);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __clock_gettime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___libc_current_sigrtmax() {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of __libc_current_sigrtmax");
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __libc_current_sigrtmax was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___libc_current_sigrtmin() {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of __libc_current_sigrtmin");
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __libc_current_sigrtmin was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___lock() {
 var originalAsyncifyState = Asyncify.state;
 try {} finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __lock was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___map_file(pathname, size) {
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(1);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __map_file was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var PATH = {
 splitPath: function(filename) {
  var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  return splitPathRe.exec(filename).slice(1);
 },
 normalizeArray: function(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
   var last = parts[i];
   if (last === ".") {
    parts.splice(i, 1);
   } else if (last === "..") {
    parts.splice(i, 1);
    up++;
   } else if (up) {
    parts.splice(i, 1);
    up--;
   }
  }
  if (allowAboveRoot) {
   for (;up; up--) {
    parts.unshift("..");
   }
  }
  return parts;
 },
 normalize: function(path) {
  var isAbsolute = path.charAt(0) === "/", trailingSlash = path.substr(-1) === "/";
  path = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), !isAbsolute).join("/");
  if (!path && !isAbsolute) {
   path = ".";
  }
  if (path && trailingSlash) {
   path += "/";
  }
  return (isAbsolute ? "/" : "") + path;
 },
 dirname: function(path) {
  var result = PATH.splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
   return ".";
  }
  if (dir) {
   dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
 },
 basename: function(path) {
  if (path === "/") return "/";
  var lastSlash = path.lastIndexOf("/");
  if (lastSlash === -1) return path;
  return path.substr(lastSlash + 1);
 },
 extname: function(path) {
  return PATH.splitPath(path)[3];
 },
 join: function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return PATH.normalize(paths.join("/"));
 },
 join2: function(l, r) {
  return PATH.normalize(l + "/" + r);
 }
};

var PATH_FS = {
 resolve: function() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
   var path = i >= 0 ? arguments[i] : FS.cwd();
   if (typeof path !== "string") {
    throw new TypeError("Arguments to path.resolve must be strings");
   } else if (!path) {
    return "";
   }
   resolvedPath = path + "/" + resolvedPath;
   resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter(function(p) {
   return !!p;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
 },
 relative: function(from, to) {
  from = PATH_FS.resolve(from).substr(1);
  to = PATH_FS.resolve(to).substr(1);
  function trim(arr) {
   var start = 0;
   for (;start < arr.length; start++) {
    if (arr[start] !== "") break;
   }
   var end = arr.length - 1;
   for (;end >= 0; end--) {
    if (arr[end] !== "") break;
   }
   if (start > end) return [];
   return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
   if (fromParts[i] !== toParts[i]) {
    samePartsLength = i;
    break;
   }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
   outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
 }
};

var TTY = {
 ttys: [],
 init: function() {},
 shutdown: function() {},
 register: function(dev, ops) {
  TTY.ttys[dev] = {
   input: [],
   output: [],
   ops: ops
  };
  FS.registerDevice(dev, TTY.stream_ops);
 },
 stream_ops: {
  open: function(stream) {
   var tty = TTY.ttys[stream.node.rdev];
   if (!tty) {
    throw new FS.ErrnoError(19);
   }
   stream.tty = tty;
   stream.seekable = false;
  },
  close: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  flush: function(stream) {
   stream.tty.ops.flush(stream.tty);
  },
  read: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.get_char) {
    throw new FS.ErrnoError(6);
   }
   var bytesRead = 0;
   for (var i = 0; i < length; i++) {
    var result;
    try {
     result = stream.tty.ops.get_char(stream.tty);
    } catch (e) {
     throw new FS.ErrnoError(5);
    }
    if (result === undefined && bytesRead === 0) {
     throw new FS.ErrnoError(11);
    }
    if (result === null || result === undefined) break;
    bytesRead++;
    buffer[offset + i] = result;
   }
   if (bytesRead) {
    stream.node.timestamp = Date.now();
   }
   return bytesRead;
  },
  write: function(stream, buffer, offset, length, pos) {
   if (!stream.tty || !stream.tty.ops.put_char) {
    throw new FS.ErrnoError(6);
   }
   try {
    for (var i = 0; i < length; i++) {
     stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
    }
   } catch (e) {
    throw new FS.ErrnoError(5);
   }
   if (length) {
    stream.node.timestamp = Date.now();
   }
   return i;
  }
 },
 default_tty_ops: {
  get_char: function(tty) {
   if (!tty.input.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
     var BUFSIZE = 256;
     var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
     var bytesRead = 0;
     var isPosixPlatform = process.platform != "win32";
     var fd = process.stdin.fd;
     if (isPosixPlatform) {
      var usingDevice = false;
      try {
       fd = fs.openSync("/dev/stdin", "r");
       usingDevice = true;
      } catch (e) {}
     }
     try {
      bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
     } catch (e) {
      if (e.toString().indexOf("EOF") != -1) bytesRead = 0; else throw e;
     }
     if (usingDevice) {
      fs.closeSync(fd);
     }
     if (bytesRead > 0) {
      result = buf.slice(0, bytesRead).toString("utf-8");
     } else {
      result = null;
     }
    } else if (typeof window != "undefined" && typeof window.prompt == "function") {
     result = window.prompt("Input: ");
     if (result !== null) {
      result += "\n";
     }
    } else if (typeof readline == "function") {
     result = readline();
     if (result !== null) {
      result += "\n";
     }
    }
    if (!result) {
     return null;
    }
    tty.input = intArrayFromString(result, true);
   }
   return tty.input.shift();
  },
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    out(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 },
 default_tty1_ops: {
  put_char: function(tty, val) {
   if (val === null || val === 10) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   } else {
    if (val != 0) tty.output.push(val);
   }
  },
  flush: function(tty) {
   if (tty.output && tty.output.length > 0) {
    err(UTF8ArrayToString(tty.output, 0));
    tty.output = [];
   }
  }
 }
};

var MEMFS = {
 ops_table: null,
 mount: function(mount) {
  return MEMFS.createNode(null, "/", 16384 | 511, 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
   throw new FS.ErrnoError(1);
  }
  if (!MEMFS.ops_table) {
   MEMFS.ops_table = {
    dir: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      lookup: MEMFS.node_ops.lookup,
      mknod: MEMFS.node_ops.mknod,
      rename: MEMFS.node_ops.rename,
      unlink: MEMFS.node_ops.unlink,
      rmdir: MEMFS.node_ops.rmdir,
      readdir: MEMFS.node_ops.readdir,
      symlink: MEMFS.node_ops.symlink
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek
     }
    },
    file: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: {
      llseek: MEMFS.stream_ops.llseek,
      read: MEMFS.stream_ops.read,
      write: MEMFS.stream_ops.write,
      allocate: MEMFS.stream_ops.allocate,
      mmap: MEMFS.stream_ops.mmap,
      msync: MEMFS.stream_ops.msync
     }
    },
    link: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr,
      readlink: MEMFS.node_ops.readlink
     },
     stream: {}
    },
    chrdev: {
     node: {
      getattr: MEMFS.node_ops.getattr,
      setattr: MEMFS.node_ops.setattr
     },
     stream: FS.chrdev_stream_ops
    }
   };
  }
  var node = FS.createNode(parent, name, mode, dev);
  if (FS.isDir(node.mode)) {
   node.node_ops = MEMFS.ops_table.dir.node;
   node.stream_ops = MEMFS.ops_table.dir.stream;
   node.contents = {};
  } else if (FS.isFile(node.mode)) {
   node.node_ops = MEMFS.ops_table.file.node;
   node.stream_ops = MEMFS.ops_table.file.stream;
   node.usedBytes = 0;
   node.contents = null;
  } else if (FS.isLink(node.mode)) {
   node.node_ops = MEMFS.ops_table.link.node;
   node.stream_ops = MEMFS.ops_table.link.stream;
  } else if (FS.isChrdev(node.mode)) {
   node.node_ops = MEMFS.ops_table.chrdev.node;
   node.stream_ops = MEMFS.ops_table.chrdev.stream;
  }
  node.timestamp = Date.now();
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 getFileDataAsRegularArray: function(node) {
  if (node.contents && node.contents.subarray) {
   var arr = [];
   for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
   return arr;
  }
  return node.contents;
 },
 getFileDataAsTypedArray: function(node) {
  if (!node.contents) return new Uint8Array();
  if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
  return new Uint8Array(node.contents);
 },
 expandFileStorage: function(node, newCapacity) {
  var prevCapacity = node.contents ? node.contents.length : 0;
  if (prevCapacity >= newCapacity) return;
  var CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) | 0);
  if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
  var oldContents = node.contents;
  node.contents = new Uint8Array(newCapacity);
  if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  return;
 },
 resizeFileStorage: function(node, newSize) {
  if (node.usedBytes == newSize) return;
  if (newSize == 0) {
   node.contents = null;
   node.usedBytes = 0;
   return;
  }
  if (!node.contents || node.contents.subarray) {
   var oldContents = node.contents;
   node.contents = new Uint8Array(new ArrayBuffer(newSize));
   if (oldContents) {
    node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
   }
   node.usedBytes = newSize;
   return;
  }
  if (!node.contents) node.contents = [];
  if (node.contents.length > newSize) node.contents.length = newSize; else while (node.contents.length < newSize) node.contents.push(0);
  node.usedBytes = newSize;
 },
 node_ops: {
  getattr: function(node) {
   var attr = {};
   attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
   attr.ino = node.id;
   attr.mode = node.mode;
   attr.nlink = 1;
   attr.uid = 0;
   attr.gid = 0;
   attr.rdev = node.rdev;
   if (FS.isDir(node.mode)) {
    attr.size = 4096;
   } else if (FS.isFile(node.mode)) {
    attr.size = node.usedBytes;
   } else if (FS.isLink(node.mode)) {
    attr.size = node.link.length;
   } else {
    attr.size = 0;
   }
   attr.atime = new Date(node.timestamp);
   attr.mtime = new Date(node.timestamp);
   attr.ctime = new Date(node.timestamp);
   attr.blksize = 4096;
   attr.blocks = Math.ceil(attr.size / attr.blksize);
   return attr;
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
   if (attr.size !== undefined) {
    MEMFS.resizeFileStorage(node, attr.size);
   }
  },
  lookup: function(parent, name) {
   throw FS.genericErrors[2];
  },
  mknod: function(parent, name, mode, dev) {
   return MEMFS.createNode(parent, name, mode, dev);
  },
  rename: function(old_node, new_dir, new_name) {
   if (FS.isDir(old_node.mode)) {
    var new_node;
    try {
     new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (new_node) {
     for (var i in new_node.contents) {
      throw new FS.ErrnoError(39);
     }
    }
   }
   delete old_node.parent.contents[old_node.name];
   old_node.name = new_name;
   new_dir.contents[new_name] = old_node;
   old_node.parent = new_dir;
  },
  unlink: function(parent, name) {
   delete parent.contents[name];
  },
  rmdir: function(parent, name) {
   var node = FS.lookupNode(parent, name);
   for (var i in node.contents) {
    throw new FS.ErrnoError(39);
   }
   delete parent.contents[name];
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newname, oldpath) {
   var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
   node.link = oldpath;
   return node;
  },
  readlink: function(node) {
   if (!FS.isLink(node.mode)) {
    throw new FS.ErrnoError(22);
   }
   return node.link;
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   var contents = stream.node.contents;
   if (position >= stream.node.usedBytes) return 0;
   var size = Math.min(stream.node.usedBytes - position, length);
   assert(size >= 0);
   if (size > 8 && contents.subarray) {
    buffer.set(contents.subarray(position, position + size), offset);
   } else {
    for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
   }
   return size;
  },
  write: function(stream, buffer, offset, length, position, canOwn) {
   if (canOwn) {
    warnOnce("file packager has copied file data into memory, but in memory growth we are forced to copy it again (see --no-heap-copy)");
   }
   canOwn = false;
   if (!length) return 0;
   var node = stream.node;
   node.timestamp = Date.now();
   if (buffer.subarray && (!node.contents || node.contents.subarray)) {
    if (canOwn) {
     assert(position === 0, "canOwn must imply no weird position inside the file");
     node.contents = buffer.subarray(offset, offset + length);
     node.usedBytes = length;
     return length;
    } else if (node.usedBytes === 0 && position === 0) {
     node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
     node.usedBytes = length;
     return length;
    } else if (position + length <= node.usedBytes) {
     node.contents.set(buffer.subarray(offset, offset + length), position);
     return length;
    }
   }
   MEMFS.expandFileStorage(node, position + length);
   if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); else {
    for (var i = 0; i < length; i++) {
     node.contents[position + i] = buffer[offset + i];
    }
   }
   node.usedBytes = Math.max(node.usedBytes, position + length);
   return length;
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.usedBytes;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(22);
   }
   return position;
  },
  allocate: function(stream, offset, length) {
   MEMFS.expandFileStorage(stream.node, offset + length);
   stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
  },
  mmap: function(stream, buffer, offset, length, position, prot, flags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(19);
   }
   var ptr;
   var allocated;
   var contents = stream.node.contents;
   if (!(flags & 2) && (contents.buffer === buffer || contents.buffer === buffer.buffer)) {
    allocated = false;
    ptr = contents.byteOffset;
   } else {
    if (position > 0 || position + length < stream.node.usedBytes) {
     if (contents.subarray) {
      contents = contents.subarray(position, position + length);
     } else {
      contents = Array.prototype.slice.call(contents, position, position + length);
     }
    }
    allocated = true;
    var fromHeap = buffer.buffer == HEAP8.buffer;
    ptr = _malloc(length);
    if (!ptr) {
     throw new FS.ErrnoError(12);
    }
    (fromHeap ? HEAP8 : buffer).set(contents, ptr);
   }
   return {
    ptr: ptr,
    allocated: allocated
   };
  },
  msync: function(stream, buffer, offset, length, mmapFlags) {
   if (!FS.isFile(stream.node.mode)) {
    throw new FS.ErrnoError(19);
   }
   if (mmapFlags & 2) {
    return 0;
   }
   var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
   return 0;
  }
 }
};

var IDBFS = {
 dbs: {},
 indexedDB: function() {
  if (typeof indexedDB !== "undefined") return indexedDB;
  var ret = null;
  if (typeof window === "object") ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  assert(ret, "IDBFS used, but indexedDB not supported");
  return ret;
 },
 DB_VERSION: 21,
 DB_STORE_NAME: "FILE_DATA",
 mount: function(mount) {
  return MEMFS.mount.apply(null, arguments);
 },
 syncfs: function(mount, populate, callback) {
  IDBFS.getLocalSet(mount, function(err, local) {
   if (err) return callback(err);
   IDBFS.getRemoteSet(mount, function(err, remote) {
    if (err) return callback(err);
    var src = populate ? remote : local;
    var dst = populate ? local : remote;
    IDBFS.reconcile(src, dst, callback);
   });
  });
 },
 getDB: function(name, callback) {
  var db = IDBFS.dbs[name];
  if (db) {
   return callback(null, db);
  }
  var req;
  try {
   req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
  } catch (e) {
   return callback(e);
  }
  if (!req) {
   return callback("Unable to connect to IndexedDB");
  }
  req.onupgradeneeded = function(e) {
   var db = e.target.result;
   var transaction = e.target.transaction;
   var fileStore;
   if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
    fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
   } else {
    fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
   }
   if (!fileStore.indexNames.contains("timestamp")) {
    fileStore.createIndex("timestamp", "timestamp", {
     unique: false
    });
   }
  };
  req.onsuccess = function() {
   db = req.result;
   IDBFS.dbs[name] = db;
   callback(null, db);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 getLocalSet: function(mount, callback) {
  var entries = {};
  function isRealDir(p) {
   return p !== "." && p !== "..";
  }
  function toAbsolute(root) {
   return function(p) {
    return PATH.join2(root, p);
   };
  }
  var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  while (check.length) {
   var path = check.pop();
   var stat;
   try {
    stat = FS.stat(path);
   } catch (e) {
    return callback(e);
   }
   if (FS.isDir(stat.mode)) {
    check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
   }
   entries[path] = {
    timestamp: stat.mtime
   };
  }
  return callback(null, {
   type: "local",
   entries: entries
  });
 },
 getRemoteSet: function(mount, callback) {
  var entries = {};
  IDBFS.getDB(mount.mountpoint, function(err, db) {
   if (err) return callback(err);
   try {
    var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readonly");
    transaction.onerror = function(e) {
     callback(this.error);
     e.preventDefault();
    };
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    var index = store.index("timestamp");
    index.openKeyCursor().onsuccess = function(event) {
     var cursor = event.target.result;
     if (!cursor) {
      return callback(null, {
       type: "remote",
       db: db,
       entries: entries
      });
     }
     entries[cursor.primaryKey] = {
      timestamp: cursor.key
     };
     cursor.continue();
    };
   } catch (e) {
    return callback(e);
   }
  });
 },
 loadLocalEntry: function(path, callback) {
  var stat, node;
  try {
   var lookup = FS.lookupPath(path);
   node = lookup.node;
   stat = FS.stat(path);
  } catch (e) {
   return callback(e);
  }
  if (FS.isDir(stat.mode)) {
   return callback(null, {
    timestamp: stat.mtime,
    mode: stat.mode
   });
  } else if (FS.isFile(stat.mode)) {
   node.contents = MEMFS.getFileDataAsTypedArray(node);
   return callback(null, {
    timestamp: stat.mtime,
    mode: stat.mode,
    contents: node.contents
   });
  } else {
   return callback(new Error("node type not supported"));
  }
 },
 storeLocalEntry: function(path, entry, callback) {
  try {
   if (FS.isDir(entry.mode)) {
    FS.mkdir(path, entry.mode);
   } else if (FS.isFile(entry.mode)) {
    FS.writeFile(path, entry.contents, {
     canOwn: true
    });
   } else {
    return callback(new Error("node type not supported"));
   }
   FS.chmod(path, entry.mode);
   FS.utime(path, entry.timestamp, entry.timestamp);
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 removeLocalEntry: function(path, callback) {
  try {
   var lookup = FS.lookupPath(path);
   var stat = FS.stat(path);
   if (FS.isDir(stat.mode)) {
    FS.rmdir(path);
   } else if (FS.isFile(stat.mode)) {
    FS.unlink(path);
   }
  } catch (e) {
   return callback(e);
  }
  callback(null);
 },
 loadRemoteEntry: function(store, path, callback) {
  var req = store.get(path);
  req.onsuccess = function(event) {
   callback(null, event.target.result);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 storeRemoteEntry: function(store, path, entry, callback) {
  var req = store.put(entry, path);
  req.onsuccess = function() {
   callback(null);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 removeRemoteEntry: function(store, path, callback) {
  var req = store.delete(path);
  req.onsuccess = function() {
   callback(null);
  };
  req.onerror = function(e) {
   callback(this.error);
   e.preventDefault();
  };
 },
 reconcile: function(src, dst, callback) {
  var total = 0;
  var create = [];
  Object.keys(src.entries).forEach(function(key) {
   var e = src.entries[key];
   var e2 = dst.entries[key];
   if (!e2 || e.timestamp > e2.timestamp) {
    create.push(key);
    total++;
   }
  });
  var remove = [];
  Object.keys(dst.entries).forEach(function(key) {
   var e = dst.entries[key];
   var e2 = src.entries[key];
   if (!e2) {
    remove.push(key);
    total++;
   }
  });
  if (!total) {
   return callback(null);
  }
  var errored = false;
  var db = src.type === "remote" ? src.db : dst.db;
  var transaction = db.transaction([ IDBFS.DB_STORE_NAME ], "readwrite");
  var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  function done(err) {
   if (err && !errored) {
    errored = true;
    return callback(err);
   }
  }
  transaction.onerror = function(e) {
   done(this.error);
   e.preventDefault();
  };
  transaction.oncomplete = function(e) {
   if (!errored) {
    callback(null);
   }
  };
  create.sort().forEach(function(path) {
   if (dst.type === "local") {
    IDBFS.loadRemoteEntry(store, path, function(err, entry) {
     if (err) return done(err);
     IDBFS.storeLocalEntry(path, entry, done);
    });
   } else {
    IDBFS.loadLocalEntry(path, function(err, entry) {
     if (err) return done(err);
     IDBFS.storeRemoteEntry(store, path, entry, done);
    });
   }
  });
  remove.sort().reverse().forEach(function(path) {
   if (dst.type === "local") {
    IDBFS.removeLocalEntry(path, done);
   } else {
    IDBFS.removeRemoteEntry(store, path, done);
   }
  });
 }
};

var NODEFS = {
 isWindows: false,
 staticInit: function() {
  NODEFS.isWindows = !!process.platform.match(/^win/);
  var flags = process["binding"]("constants");
  if (flags["fs"]) {
   flags = flags["fs"];
  }
  NODEFS.flagsForNodeMap = {
   1024: flags["O_APPEND"],
   64: flags["O_CREAT"],
   128: flags["O_EXCL"],
   0: flags["O_RDONLY"],
   2: flags["O_RDWR"],
   4096: flags["O_SYNC"],
   512: flags["O_TRUNC"],
   1: flags["O_WRONLY"]
  };
 },
 bufferFrom: function(arrayBuffer) {
  return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
 },
 mount: function(mount) {
  assert(ENVIRONMENT_HAS_NODE);
  return NODEFS.createNode(null, "/", NODEFS.getMode(mount.opts.root), 0);
 },
 createNode: function(parent, name, mode, dev) {
  if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
   throw new FS.ErrnoError(22);
  }
  var node = FS.createNode(parent, name, mode);
  node.node_ops = NODEFS.node_ops;
  node.stream_ops = NODEFS.stream_ops;
  return node;
 },
 getMode: function(path) {
  var stat;
  try {
   stat = fs.lstatSync(path);
   if (NODEFS.isWindows) {
    stat.mode = stat.mode | (stat.mode & 292) >> 2;
   }
  } catch (e) {
   if (!e.code) throw e;
   throw new FS.ErrnoError(-e.errno);
  }
  return stat.mode;
 },
 realPath: function(node) {
  var parts = [];
  while (node.parent !== node) {
   parts.push(node.name);
   node = node.parent;
  }
  parts.push(node.mount.opts.root);
  parts.reverse();
  return PATH.join.apply(null, parts);
 },
 flagsForNode: function(flags) {
  flags &= ~2097152;
  flags &= ~2048;
  flags &= ~32768;
  flags &= ~524288;
  var newFlags = 0;
  for (var k in NODEFS.flagsForNodeMap) {
   if (flags & k) {
    newFlags |= NODEFS.flagsForNodeMap[k];
    flags ^= k;
   }
  }
  if (!flags) {
   return newFlags;
  } else {
   throw new FS.ErrnoError(22);
  }
 },
 node_ops: {
  getattr: function(node) {
   var path = NODEFS.realPath(node);
   var stat;
   try {
    stat = fs.lstatSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
   if (NODEFS.isWindows && !stat.blksize) {
    stat.blksize = 4096;
   }
   if (NODEFS.isWindows && !stat.blocks) {
    stat.blocks = (stat.size + stat.blksize - 1) / stat.blksize | 0;
   }
   return {
    dev: stat.dev,
    ino: stat.ino,
    mode: stat.mode,
    nlink: stat.nlink,
    uid: stat.uid,
    gid: stat.gid,
    rdev: stat.rdev,
    size: stat.size,
    atime: stat.atime,
    mtime: stat.mtime,
    ctime: stat.ctime,
    blksize: stat.blksize,
    blocks: stat.blocks
   };
  },
  setattr: function(node, attr) {
   var path = NODEFS.realPath(node);
   try {
    if (attr.mode !== undefined) {
     fs.chmodSync(path, attr.mode);
     node.mode = attr.mode;
    }
    if (attr.timestamp !== undefined) {
     var date = new Date(attr.timestamp);
     fs.utimesSync(path, date, date);
    }
    if (attr.size !== undefined) {
     fs.truncateSync(path, attr.size);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  lookup: function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   var mode = NODEFS.getMode(path);
   return NODEFS.createNode(parent, name, mode);
  },
  mknod: function(parent, name, mode, dev) {
   var node = NODEFS.createNode(parent, name, mode, dev);
   var path = NODEFS.realPath(node);
   try {
    if (FS.isDir(node.mode)) {
     fs.mkdirSync(path, node.mode);
    } else {
     fs.writeFileSync(path, "", {
      mode: node.mode
     });
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
   return node;
  },
  rename: function(oldNode, newDir, newName) {
   var oldPath = NODEFS.realPath(oldNode);
   var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
   try {
    fs.renameSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  unlink: function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.unlinkSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  rmdir: function(parent, name) {
   var path = PATH.join2(NODEFS.realPath(parent), name);
   try {
    fs.rmdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  readdir: function(node) {
   var path = NODEFS.realPath(node);
   try {
    return fs.readdirSync(path);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  symlink: function(parent, newName, oldPath) {
   var newPath = PATH.join2(NODEFS.realPath(parent), newName);
   try {
    fs.symlinkSync(oldPath, newPath);
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  readlink: function(node) {
   var path = NODEFS.realPath(node);
   try {
    path = fs.readlinkSync(path);
    path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
    return path;
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  }
 },
 stream_ops: {
  open: function(stream) {
   var path = NODEFS.realPath(stream.node);
   try {
    if (FS.isFile(stream.node.mode)) {
     stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  close: function(stream) {
   try {
    if (FS.isFile(stream.node.mode) && stream.nfd) {
     fs.closeSync(stream.nfd);
    }
   } catch (e) {
    if (!e.code) throw e;
    throw new FS.ErrnoError(-e.errno);
   }
  },
  read: function(stream, buffer, offset, length, position) {
   if (length === 0) return 0;
   try {
    return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(-e.errno);
   }
  },
  write: function(stream, buffer, offset, length, position) {
   try {
    return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
   } catch (e) {
    throw new FS.ErrnoError(-e.errno);
   }
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     try {
      var stat = fs.fstatSync(stream.nfd);
      position += stat.size;
     } catch (e) {
      throw new FS.ErrnoError(-e.errno);
     }
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(22);
   }
   return position;
  }
 }
};

var WORKERFS = {
 DIR_MODE: 16895,
 FILE_MODE: 33279,
 reader: null,
 mount: function(mount) {
  assert(ENVIRONMENT_IS_WORKER);
  if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
  var root = WORKERFS.createNode(null, "/", WORKERFS.DIR_MODE, 0);
  var createdParents = {};
  function ensureParent(path) {
   var parts = path.split("/");
   var parent = root;
   for (var i = 0; i < parts.length - 1; i++) {
    var curr = parts.slice(0, i + 1).join("/");
    if (!createdParents[curr]) {
     createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
    }
    parent = createdParents[curr];
   }
   return parent;
  }
  function base(path) {
   var parts = path.split("/");
   return parts[parts.length - 1];
  }
  Array.prototype.forEach.call(mount.opts["files"] || [], function(file) {
   WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
  });
  (mount.opts["blobs"] || []).forEach(function(obj) {
   WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
  });
  (mount.opts["packages"] || []).forEach(function(pack) {
   pack["metadata"].files.forEach(function(file) {
    var name = file.filename.substr(1);
    WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack["blob"].slice(file.start, file.end));
   });
  });
  return root;
 },
 createNode: function(parent, name, mode, dev, contents, mtime) {
  var node = FS.createNode(parent, name, mode);
  node.mode = mode;
  node.node_ops = WORKERFS.node_ops;
  node.stream_ops = WORKERFS.stream_ops;
  node.timestamp = (mtime || new Date()).getTime();
  assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
  if (mode === WORKERFS.FILE_MODE) {
   node.size = contents.size;
   node.contents = contents;
  } else {
   node.size = 4096;
   node.contents = {};
  }
  if (parent) {
   parent.contents[name] = node;
  }
  return node;
 },
 node_ops: {
  getattr: function(node) {
   return {
    dev: 1,
    ino: undefined,
    mode: node.mode,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: undefined,
    size: node.size,
    atime: new Date(node.timestamp),
    mtime: new Date(node.timestamp),
    ctime: new Date(node.timestamp),
    blksize: 4096,
    blocks: Math.ceil(node.size / 4096)
   };
  },
  setattr: function(node, attr) {
   if (attr.mode !== undefined) {
    node.mode = attr.mode;
   }
   if (attr.timestamp !== undefined) {
    node.timestamp = attr.timestamp;
   }
  },
  lookup: function(parent, name) {
   throw new FS.ErrnoError(2);
  },
  mknod: function(parent, name, mode, dev) {
   throw new FS.ErrnoError(1);
  },
  rename: function(oldNode, newDir, newName) {
   throw new FS.ErrnoError(1);
  },
  unlink: function(parent, name) {
   throw new FS.ErrnoError(1);
  },
  rmdir: function(parent, name) {
   throw new FS.ErrnoError(1);
  },
  readdir: function(node) {
   var entries = [ ".", ".." ];
   for (var key in node.contents) {
    if (!node.contents.hasOwnProperty(key)) {
     continue;
    }
    entries.push(key);
   }
   return entries;
  },
  symlink: function(parent, newName, oldPath) {
   throw new FS.ErrnoError(1);
  },
  readlink: function(node) {
   throw new FS.ErrnoError(1);
  }
 },
 stream_ops: {
  read: function(stream, buffer, offset, length, position) {
   if (position >= stream.node.size) return 0;
   var chunk = stream.node.contents.slice(position, position + length);
   var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
   buffer.set(new Uint8Array(ab), offset);
   return chunk.size;
  },
  write: function(stream, buffer, offset, length, position) {
   throw new FS.ErrnoError(5);
  },
  llseek: function(stream, offset, whence) {
   var position = offset;
   if (whence === 1) {
    position += stream.position;
   } else if (whence === 2) {
    if (FS.isFile(stream.node.mode)) {
     position += stream.node.size;
    }
   }
   if (position < 0) {
    throw new FS.ErrnoError(22);
   }
   return position;
  }
 }
};

var ERRNO_MESSAGES = {
 0: "Success",
 1: "Not super-user",
 2: "No such file or directory",
 3: "No such process",
 4: "Interrupted system call",
 5: "I/O error",
 6: "No such device or address",
 7: "Arg list too long",
 8: "Exec format error",
 9: "Bad file number",
 10: "No children",
 11: "No more processes",
 12: "Not enough core",
 13: "Permission denied",
 14: "Bad address",
 15: "Block device required",
 16: "Mount device busy",
 17: "File exists",
 18: "Cross-device link",
 19: "No such device",
 20: "Not a directory",
 21: "Is a directory",
 22: "Invalid argument",
 23: "Too many open files in system",
 24: "Too many open files",
 25: "Not a typewriter",
 26: "Text file busy",
 27: "File too large",
 28: "No space left on device",
 29: "Illegal seek",
 30: "Read only file system",
 31: "Too many links",
 32: "Broken pipe",
 33: "Math arg out of domain of func",
 34: "Math result not representable",
 35: "File locking deadlock error",
 36: "File or path name too long",
 37: "No record locks available",
 38: "Function not implemented",
 39: "Directory not empty",
 40: "Too many symbolic links",
 42: "No message of desired type",
 43: "Identifier removed",
 44: "Channel number out of range",
 45: "Level 2 not synchronized",
 46: "Level 3 halted",
 47: "Level 3 reset",
 48: "Link number out of range",
 49: "Protocol driver not attached",
 50: "No CSI structure available",
 51: "Level 2 halted",
 52: "Invalid exchange",
 53: "Invalid request descriptor",
 54: "Exchange full",
 55: "No anode",
 56: "Invalid request code",
 57: "Invalid slot",
 59: "Bad font file fmt",
 60: "Device not a stream",
 61: "No data (for no delay io)",
 62: "Timer expired",
 63: "Out of streams resources",
 64: "Machine is not on the network",
 65: "Package not installed",
 66: "The object is remote",
 67: "The link has been severed",
 68: "Advertise error",
 69: "Srmount error",
 70: "Communication error on send",
 71: "Protocol error",
 72: "Multihop attempted",
 73: "Cross mount point (not really error)",
 74: "Trying to read unreadable message",
 75: "Value too large for defined data type",
 76: "Given log. name not unique",
 77: "f.d. invalid for this operation",
 78: "Remote address changed",
 79: "Can   access a needed shared lib",
 80: "Accessing a corrupted shared lib",
 81: ".lib section in a.out corrupted",
 82: "Attempting to link in too many libs",
 83: "Attempting to exec a shared library",
 84: "Illegal byte sequence",
 86: "Streams pipe error",
 87: "Too many users",
 88: "Socket operation on non-socket",
 89: "Destination address required",
 90: "Message too long",
 91: "Protocol wrong type for socket",
 92: "Protocol not available",
 93: "Unknown protocol",
 94: "Socket type not supported",
 95: "Not supported",
 96: "Protocol family not supported",
 97: "Address family not supported by protocol family",
 98: "Address already in use",
 99: "Address not available",
 100: "Network interface is not configured",
 101: "Network is unreachable",
 102: "Connection reset by network",
 103: "Connection aborted",
 104: "Connection reset by peer",
 105: "No buffer space available",
 106: "Socket is already connected",
 107: "Socket is not connected",
 108: "Can't send after socket shutdown",
 109: "Too many references",
 110: "Connection timed out",
 111: "Connection refused",
 112: "Host is down",
 113: "Host is unreachable",
 114: "Socket already connected",
 115: "Connection already in progress",
 116: "Stale file handle",
 122: "Quota exceeded",
 123: "No medium (in tape drive)",
 125: "Operation canceled",
 130: "Previous owner died",
 131: "State not recoverable"
};

var FS = {
 root: null,
 mounts: [],
 devices: {},
 streams: [],
 nextInode: 1,
 nameTable: null,
 currentPath: "/",
 initialized: false,
 ignorePermissions: true,
 trackingDelegate: {},
 tracking: {
  openFlags: {
   READ: 1,
   WRITE: 2
  }
 },
 ErrnoError: null,
 genericErrors: {},
 filesystems: null,
 syncFSRequests: 0,
 handleFSError: function(e) {
  if (!(e instanceof FS.ErrnoError)) throw e + " : " + stackTrace();
  return ___setErrNo(e.errno);
 },
 lookupPath: function(path, opts) {
  path = PATH_FS.resolve(FS.cwd(), path);
  opts = opts || {};
  if (!path) return {
   path: "",
   node: null
  };
  var defaults = {
   follow_mount: true,
   recurse_count: 0
  };
  for (var key in defaults) {
   if (opts[key] === undefined) {
    opts[key] = defaults[key];
   }
  }
  if (opts.recurse_count > 8) {
   throw new FS.ErrnoError(40);
  }
  var parts = PATH.normalizeArray(path.split("/").filter(function(p) {
   return !!p;
  }), false);
  var current = FS.root;
  var current_path = "/";
  for (var i = 0; i < parts.length; i++) {
   var islast = i === parts.length - 1;
   if (islast && opts.parent) {
    break;
   }
   current = FS.lookupNode(current, parts[i]);
   current_path = PATH.join2(current_path, parts[i]);
   if (FS.isMountpoint(current)) {
    if (!islast || islast && opts.follow_mount) {
     current = current.mounted.root;
    }
   }
   if (!islast || opts.follow) {
    var count = 0;
    while (FS.isLink(current.mode)) {
     var link = FS.readlink(current_path);
     current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
     var lookup = FS.lookupPath(current_path, {
      recurse_count: opts.recurse_count
     });
     current = lookup.node;
     if (count++ > 40) {
      throw new FS.ErrnoError(40);
     }
    }
   }
  }
  return {
   path: current_path,
   node: current
  };
 },
 getPath: function(node) {
  var path;
  while (true) {
   if (FS.isRoot(node)) {
    var mount = node.mount.mountpoint;
    if (!path) return mount;
    return mount[mount.length - 1] !== "/" ? mount + "/" + path : mount + path;
   }
   path = path ? node.name + "/" + path : node.name;
   node = node.parent;
  }
 },
 hashName: function(parentid, name) {
  var hash = 0;
  for (var i = 0; i < name.length; i++) {
   hash = (hash << 5) - hash + name.charCodeAt(i) | 0;
  }
  return (parentid + hash >>> 0) % FS.nameTable.length;
 },
 hashAddNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  node.name_next = FS.nameTable[hash];
  FS.nameTable[hash] = node;
 },
 hashRemoveNode: function(node) {
  var hash = FS.hashName(node.parent.id, node.name);
  if (FS.nameTable[hash] === node) {
   FS.nameTable[hash] = node.name_next;
  } else {
   var current = FS.nameTable[hash];
   while (current) {
    if (current.name_next === node) {
     current.name_next = node.name_next;
     break;
    }
    current = current.name_next;
   }
  }
 },
 lookupNode: function(parent, name) {
  var err = FS.mayLookup(parent);
  if (err) {
   throw new FS.ErrnoError(err, parent);
  }
  var hash = FS.hashName(parent.id, name);
  for (var node = FS.nameTable[hash]; node; node = node.name_next) {
   var nodeName = node.name;
   if (node.parent.id === parent.id && nodeName === name) {
    return node;
   }
  }
  return FS.lookup(parent, name);
 },
 createNode: function(parent, name, mode, rdev) {
  if (!FS.FSNode) {
   FS.FSNode = function(parent, name, mode, rdev) {
    if (!parent) {
     parent = this;
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
   };
   FS.FSNode.prototype = {};
   var readMode = 292 | 73;
   var writeMode = 146;
   Object.defineProperties(FS.FSNode.prototype, {
    read: {
     get: function() {
      return (this.mode & readMode) === readMode;
     },
     set: function(val) {
      val ? this.mode |= readMode : this.mode &= ~readMode;
     }
    },
    write: {
     get: function() {
      return (this.mode & writeMode) === writeMode;
     },
     set: function(val) {
      val ? this.mode |= writeMode : this.mode &= ~writeMode;
     }
    },
    isFolder: {
     get: function() {
      return FS.isDir(this.mode);
     }
    },
    isDevice: {
     get: function() {
      return FS.isChrdev(this.mode);
     }
    }
   });
  }
  var node = new FS.FSNode(parent, name, mode, rdev);
  FS.hashAddNode(node);
  return node;
 },
 destroyNode: function(node) {
  FS.hashRemoveNode(node);
 },
 isRoot: function(node) {
  return node === node.parent;
 },
 isMountpoint: function(node) {
  return !!node.mounted;
 },
 isFile: function(mode) {
  return (mode & 61440) === 32768;
 },
 isDir: function(mode) {
  return (mode & 61440) === 16384;
 },
 isLink: function(mode) {
  return (mode & 61440) === 40960;
 },
 isChrdev: function(mode) {
  return (mode & 61440) === 8192;
 },
 isBlkdev: function(mode) {
  return (mode & 61440) === 24576;
 },
 isFIFO: function(mode) {
  return (mode & 61440) === 4096;
 },
 isSocket: function(mode) {
  return (mode & 49152) === 49152;
 },
 flagModes: {
  "r": 0,
  "rs": 1052672,
  "r+": 2,
  "w": 577,
  "wx": 705,
  "xw": 705,
  "w+": 578,
  "wx+": 706,
  "xw+": 706,
  "a": 1089,
  "ax": 1217,
  "xa": 1217,
  "a+": 1090,
  "ax+": 1218,
  "xa+": 1218
 },
 modeStringToFlags: function(str) {
  var flags = FS.flagModes[str];
  if (typeof flags === "undefined") {
   throw new Error("Unknown file open mode: " + str);
  }
  return flags;
 },
 flagsToPermissionString: function(flag) {
  var perms = [ "r", "w", "rw" ][flag & 3];
  if (flag & 512) {
   perms += "w";
  }
  return perms;
 },
 nodePermissions: function(node, perms) {
  if (FS.ignorePermissions) {
   return 0;
  }
  if (perms.indexOf("r") !== -1 && !(node.mode & 292)) {
   return 13;
  } else if (perms.indexOf("w") !== -1 && !(node.mode & 146)) {
   return 13;
  } else if (perms.indexOf("x") !== -1 && !(node.mode & 73)) {
   return 13;
  }
  return 0;
 },
 mayLookup: function(dir) {
  var err = FS.nodePermissions(dir, "x");
  if (err) return err;
  if (!dir.node_ops.lookup) return 13;
  return 0;
 },
 mayCreate: function(dir, name) {
  try {
   var node = FS.lookupNode(dir, name);
   return 17;
  } catch (e) {}
  return FS.nodePermissions(dir, "wx");
 },
 mayDelete: function(dir, name, isdir) {
  var node;
  try {
   node = FS.lookupNode(dir, name);
  } catch (e) {
   return e.errno;
  }
  var err = FS.nodePermissions(dir, "wx");
  if (err) {
   return err;
  }
  if (isdir) {
   if (!FS.isDir(node.mode)) {
    return 20;
   }
   if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
    return 16;
   }
  } else {
   if (FS.isDir(node.mode)) {
    return 21;
   }
  }
  return 0;
 },
 mayOpen: function(node, flags) {
  if (!node) {
   return 2;
  }
  if (FS.isLink(node.mode)) {
   return 40;
  } else if (FS.isDir(node.mode)) {
   if (FS.flagsToPermissionString(flags) !== "r" || flags & 512) {
    return 21;
   }
  }
  return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
 },
 MAX_OPEN_FDS: 4096,
 nextfd: function(fd_start, fd_end) {
  fd_start = fd_start || 0;
  fd_end = fd_end || FS.MAX_OPEN_FDS;
  for (var fd = fd_start; fd <= fd_end; fd++) {
   if (!FS.streams[fd]) {
    return fd;
   }
  }
  throw new FS.ErrnoError(24);
 },
 getStream: function(fd) {
  return FS.streams[fd];
 },
 createStream: function(stream, fd_start, fd_end) {
  if (!FS.FSStream) {
   FS.FSStream = function() {};
   FS.FSStream.prototype = {};
   Object.defineProperties(FS.FSStream.prototype, {
    object: {
     get: function() {
      return this.node;
     },
     set: function(val) {
      this.node = val;
     }
    },
    isRead: {
     get: function() {
      return (this.flags & 2097155) !== 1;
     }
    },
    isWrite: {
     get: function() {
      return (this.flags & 2097155) !== 0;
     }
    },
    isAppend: {
     get: function() {
      return this.flags & 1024;
     }
    }
   });
  }
  var newStream = new FS.FSStream();
  for (var p in stream) {
   newStream[p] = stream[p];
  }
  stream = newStream;
  var fd = FS.nextfd(fd_start, fd_end);
  stream.fd = fd;
  FS.streams[fd] = stream;
  return stream;
 },
 closeStream: function(fd) {
  FS.streams[fd] = null;
 },
 chrdev_stream_ops: {
  open: function(stream) {
   var device = FS.getDevice(stream.node.rdev);
   stream.stream_ops = device.stream_ops;
   if (stream.stream_ops.open) {
    stream.stream_ops.open(stream);
   }
  },
  llseek: function() {
   throw new FS.ErrnoError(29);
  }
 },
 major: function(dev) {
  return dev >> 8;
 },
 minor: function(dev) {
  return dev & 255;
 },
 makedev: function(ma, mi) {
  return ma << 8 | mi;
 },
 registerDevice: function(dev, ops) {
  FS.devices[dev] = {
   stream_ops: ops
  };
 },
 getDevice: function(dev) {
  return FS.devices[dev];
 },
 getMounts: function(mount) {
  var mounts = [];
  var check = [ mount ];
  while (check.length) {
   var m = check.pop();
   mounts.push(m);
   check.push.apply(check, m.mounts);
  }
  return mounts;
 },
 syncfs: function(populate, callback) {
  if (typeof populate === "function") {
   callback = populate;
   populate = false;
  }
  FS.syncFSRequests++;
  if (FS.syncFSRequests > 1) {
   console.log("warning: " + FS.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
  }
  var mounts = FS.getMounts(FS.root.mount);
  var completed = 0;
  function doCallback(err) {
   assert(FS.syncFSRequests > 0);
   FS.syncFSRequests--;
   return callback(err);
  }
  function done(err) {
   if (err) {
    if (!done.errored) {
     done.errored = true;
     return doCallback(err);
    }
    return;
   }
   if (++completed >= mounts.length) {
    doCallback(null);
   }
  }
  mounts.forEach(function(mount) {
   if (!mount.type.syncfs) {
    return done(null);
   }
   mount.type.syncfs(mount, populate, done);
  });
 },
 mount: function(type, opts, mountpoint) {
  var root = mountpoint === "/";
  var pseudo = !mountpoint;
  var node;
  if (root && FS.root) {
   throw new FS.ErrnoError(16);
  } else if (!root && !pseudo) {
   var lookup = FS.lookupPath(mountpoint, {
    follow_mount: false
   });
   mountpoint = lookup.path;
   node = lookup.node;
   if (FS.isMountpoint(node)) {
    throw new FS.ErrnoError(16);
   }
   if (!FS.isDir(node.mode)) {
    throw new FS.ErrnoError(20);
   }
  }
  var mount = {
   type: type,
   opts: opts,
   mountpoint: mountpoint,
   mounts: []
  };
  var mountRoot = type.mount(mount);
  mountRoot.mount = mount;
  mount.root = mountRoot;
  if (root) {
   FS.root = mountRoot;
  } else if (node) {
   node.mounted = mount;
   if (node.mount) {
    node.mount.mounts.push(mount);
   }
  }
  return mountRoot;
 },
 unmount: function(mountpoint) {
  var lookup = FS.lookupPath(mountpoint, {
   follow_mount: false
  });
  if (!FS.isMountpoint(lookup.node)) {
   throw new FS.ErrnoError(22);
  }
  var node = lookup.node;
  var mount = node.mounted;
  var mounts = FS.getMounts(mount);
  Object.keys(FS.nameTable).forEach(function(hash) {
   var current = FS.nameTable[hash];
   while (current) {
    var next = current.name_next;
    if (mounts.indexOf(current.mount) !== -1) {
     FS.destroyNode(current);
    }
    current = next;
   }
  });
  node.mounted = null;
  var idx = node.mount.mounts.indexOf(mount);
  assert(idx !== -1);
  node.mount.mounts.splice(idx, 1);
 },
 lookup: function(parent, name) {
  return parent.node_ops.lookup(parent, name);
 },
 mknod: function(path, mode, dev) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  if (!name || name === "." || name === "..") {
   throw new FS.ErrnoError(22);
  }
  var err = FS.mayCreate(parent, name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.mknod) {
   throw new FS.ErrnoError(1);
  }
  return parent.node_ops.mknod(parent, name, mode, dev);
 },
 create: function(path, mode) {
  mode = mode !== undefined ? mode : 438;
  mode &= 4095;
  mode |= 32768;
  return FS.mknod(path, mode, 0);
 },
 mkdir: function(path, mode) {
  mode = mode !== undefined ? mode : 511;
  mode &= 511 | 512;
  mode |= 16384;
  return FS.mknod(path, mode, 0);
 },
 mkdirTree: function(path, mode) {
  var dirs = path.split("/");
  var d = "";
  for (var i = 0; i < dirs.length; ++i) {
   if (!dirs[i]) continue;
   d += "/" + dirs[i];
   try {
    FS.mkdir(d, mode);
   } catch (e) {
    if (e.errno != 17) throw e;
   }
  }
 },
 mkdev: function(path, mode, dev) {
  if (typeof dev === "undefined") {
   dev = mode;
   mode = 438;
  }
  mode |= 8192;
  return FS.mknod(path, mode, dev);
 },
 symlink: function(oldpath, newpath) {
  if (!PATH_FS.resolve(oldpath)) {
   throw new FS.ErrnoError(2);
  }
  var lookup = FS.lookupPath(newpath, {
   parent: true
  });
  var parent = lookup.node;
  if (!parent) {
   throw new FS.ErrnoError(2);
  }
  var newname = PATH.basename(newpath);
  var err = FS.mayCreate(parent, newname);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.symlink) {
   throw new FS.ErrnoError(1);
  }
  return parent.node_ops.symlink(parent, newname, oldpath);
 },
 rename: function(old_path, new_path) {
  var old_dirname = PATH.dirname(old_path);
  var new_dirname = PATH.dirname(new_path);
  var old_name = PATH.basename(old_path);
  var new_name = PATH.basename(new_path);
  var lookup, old_dir, new_dir;
  try {
   lookup = FS.lookupPath(old_path, {
    parent: true
   });
   old_dir = lookup.node;
   lookup = FS.lookupPath(new_path, {
    parent: true
   });
   new_dir = lookup.node;
  } catch (e) {
   throw new FS.ErrnoError(16);
  }
  if (!old_dir || !new_dir) throw new FS.ErrnoError(2);
  if (old_dir.mount !== new_dir.mount) {
   throw new FS.ErrnoError(18);
  }
  var old_node = FS.lookupNode(old_dir, old_name);
  var relative = PATH_FS.relative(old_path, new_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(22);
  }
  relative = PATH_FS.relative(new_path, old_dirname);
  if (relative.charAt(0) !== ".") {
   throw new FS.ErrnoError(39);
  }
  var new_node;
  try {
   new_node = FS.lookupNode(new_dir, new_name);
  } catch (e) {}
  if (old_node === new_node) {
   return;
  }
  var isdir = FS.isDir(old_node.mode);
  var err = FS.mayDelete(old_dir, old_name, isdir);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  err = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!old_dir.node_ops.rename) {
   throw new FS.ErrnoError(1);
  }
  if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
   throw new FS.ErrnoError(16);
  }
  if (new_dir !== old_dir) {
   err = FS.nodePermissions(old_dir, "w");
   if (err) {
    throw new FS.ErrnoError(err);
   }
  }
  try {
   if (FS.trackingDelegate["willMovePath"]) {
    FS.trackingDelegate["willMovePath"](old_path, new_path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
  FS.hashRemoveNode(old_node);
  try {
   old_dir.node_ops.rename(old_node, new_dir, new_name);
  } catch (e) {
   throw e;
  } finally {
   FS.hashAddNode(old_node);
  }
  try {
   if (FS.trackingDelegate["onMovePath"]) FS.trackingDelegate["onMovePath"](old_path, new_path);
  } catch (e) {
   console.log("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
  }
 },
 rmdir: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var err = FS.mayDelete(parent, name, true);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.rmdir) {
   throw new FS.ErrnoError(1);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(16);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.rmdir(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  if (!node.node_ops.readdir) {
   throw new FS.ErrnoError(20);
  }
  return node.node_ops.readdir(node);
 },
 unlink: function(path) {
  var lookup = FS.lookupPath(path, {
   parent: true
  });
  var parent = lookup.node;
  var name = PATH.basename(path);
  var node = FS.lookupNode(parent, name);
  var err = FS.mayDelete(parent, name, false);
  if (err) {
   throw new FS.ErrnoError(err);
  }
  if (!parent.node_ops.unlink) {
   throw new FS.ErrnoError(1);
  }
  if (FS.isMountpoint(node)) {
   throw new FS.ErrnoError(16);
  }
  try {
   if (FS.trackingDelegate["willDeletePath"]) {
    FS.trackingDelegate["willDeletePath"](path);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
  }
  parent.node_ops.unlink(parent, name);
  FS.destroyNode(node);
  try {
   if (FS.trackingDelegate["onDeletePath"]) FS.trackingDelegate["onDeletePath"](path);
  } catch (e) {
   console.log("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
  }
 },
 readlink: function(path) {
  var lookup = FS.lookupPath(path);
  var link = lookup.node;
  if (!link) {
   throw new FS.ErrnoError(2);
  }
  if (!link.node_ops.readlink) {
   throw new FS.ErrnoError(22);
  }
  return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
 },
 stat: function(path, dontFollow) {
  var lookup = FS.lookupPath(path, {
   follow: !dontFollow
  });
  var node = lookup.node;
  if (!node) {
   throw new FS.ErrnoError(2);
  }
  if (!node.node_ops.getattr) {
   throw new FS.ErrnoError(1);
  }
  return node.node_ops.getattr(node);
 },
 lstat: function(path) {
  return FS.stat(path, true);
 },
 chmod: function(path, mode, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(1);
  }
  node.node_ops.setattr(node, {
   mode: mode & 4095 | node.mode & ~4095,
   timestamp: Date.now()
  });
 },
 lchmod: function(path, mode) {
  FS.chmod(path, mode, true);
 },
 fchmod: function(fd, mode) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(9);
  }
  FS.chmod(stream.node, mode);
 },
 chown: function(path, uid, gid, dontFollow) {
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: !dontFollow
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(1);
  }
  node.node_ops.setattr(node, {
   timestamp: Date.now()
  });
 },
 lchown: function(path, uid, gid) {
  FS.chown(path, uid, gid, true);
 },
 fchown: function(fd, uid, gid) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(9);
  }
  FS.chown(stream.node, uid, gid);
 },
 truncate: function(path, len) {
  if (len < 0) {
   throw new FS.ErrnoError(22);
  }
  var node;
  if (typeof path === "string") {
   var lookup = FS.lookupPath(path, {
    follow: true
   });
   node = lookup.node;
  } else {
   node = path;
  }
  if (!node.node_ops.setattr) {
   throw new FS.ErrnoError(1);
  }
  if (FS.isDir(node.mode)) {
   throw new FS.ErrnoError(21);
  }
  if (!FS.isFile(node.mode)) {
   throw new FS.ErrnoError(22);
  }
  var err = FS.nodePermissions(node, "w");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  node.node_ops.setattr(node, {
   size: len,
   timestamp: Date.now()
  });
 },
 ftruncate: function(fd, len) {
  var stream = FS.getStream(fd);
  if (!stream) {
   throw new FS.ErrnoError(9);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(22);
  }
  FS.truncate(stream.node, len);
 },
 utime: function(path, atime, mtime) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  var node = lookup.node;
  node.node_ops.setattr(node, {
   timestamp: Math.max(atime, mtime)
  });
 },
 open: function(path, flags, mode, fd_start, fd_end) {
  if (path === "") {
   throw new FS.ErrnoError(2);
  }
  flags = typeof flags === "string" ? FS.modeStringToFlags(flags) : flags;
  mode = typeof mode === "undefined" ? 438 : mode;
  if (flags & 64) {
   mode = mode & 4095 | 32768;
  } else {
   mode = 0;
  }
  var node;
  if (typeof path === "object") {
   node = path;
  } else {
   path = PATH.normalize(path);
   try {
    var lookup = FS.lookupPath(path, {
     follow: !(flags & 131072)
    });
    node = lookup.node;
   } catch (e) {}
  }
  var created = false;
  if (flags & 64) {
   if (node) {
    if (flags & 128) {
     throw new FS.ErrnoError(17);
    }
   } else {
    node = FS.mknod(path, mode, 0);
    created = true;
   }
  }
  if (!node) {
   throw new FS.ErrnoError(2);
  }
  if (FS.isChrdev(node.mode)) {
   flags &= ~512;
  }
  if (flags & 65536 && !FS.isDir(node.mode)) {
   throw new FS.ErrnoError(20);
  }
  if (!created) {
   var err = FS.mayOpen(node, flags);
   if (err) {
    throw new FS.ErrnoError(err);
   }
  }
  if (flags & 512) {
   FS.truncate(node, 0);
  }
  flags &= ~(128 | 512);
  var stream = FS.createStream({
   node: node,
   path: FS.getPath(node),
   flags: flags,
   seekable: true,
   position: 0,
   stream_ops: node.stream_ops,
   ungotten: [],
   error: false
  }, fd_start, fd_end);
  if (stream.stream_ops.open) {
   stream.stream_ops.open(stream);
  }
  if (Module["logReadFiles"] && !(flags & 1)) {
   if (!FS.readFiles) FS.readFiles = {};
   if (!(path in FS.readFiles)) {
    FS.readFiles[path] = 1;
    console.log("FS.trackingDelegate error on read file: " + path);
   }
  }
  try {
   if (FS.trackingDelegate["onOpenFile"]) {
    var trackingFlags = 0;
    if ((flags & 2097155) !== 1) {
     trackingFlags |= FS.tracking.openFlags.READ;
    }
    if ((flags & 2097155) !== 0) {
     trackingFlags |= FS.tracking.openFlags.WRITE;
    }
    FS.trackingDelegate["onOpenFile"](path, trackingFlags);
   }
  } catch (e) {
   console.log("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
  }
  return stream;
 },
 close: function(stream) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if (stream.getdents) stream.getdents = null;
  try {
   if (stream.stream_ops.close) {
    stream.stream_ops.close(stream);
   }
  } catch (e) {
   throw e;
  } finally {
   FS.closeStream(stream.fd);
  }
  stream.fd = null;
 },
 isClosed: function(stream) {
  return stream.fd === null;
 },
 llseek: function(stream, offset, whence) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if (!stream.seekable || !stream.stream_ops.llseek) {
   throw new FS.ErrnoError(29);
  }
  if (whence != 0 && whence != 1 && whence != 2) {
   throw new FS.ErrnoError(22);
  }
  stream.position = stream.stream_ops.llseek(stream, offset, whence);
  stream.ungotten = [];
  return stream.position;
 },
 read: function(stream, buffer, offset, length, position) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(22);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(9);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(21);
  }
  if (!stream.stream_ops.read) {
   throw new FS.ErrnoError(22);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(29);
  }
  var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
  if (!seeking) stream.position += bytesRead;
  return bytesRead;
 },
 write: function(stream, buffer, offset, length, position, canOwn) {
  if (length < 0 || position < 0) {
   throw new FS.ErrnoError(22);
  }
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(9);
  }
  if (FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(21);
  }
  if (!stream.stream_ops.write) {
   throw new FS.ErrnoError(22);
  }
  if (stream.flags & 1024) {
   FS.llseek(stream, 0, 2);
  }
  var seeking = typeof position !== "undefined";
  if (!seeking) {
   position = stream.position;
  } else if (!stream.seekable) {
   throw new FS.ErrnoError(29);
  }
  var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
  if (!seeking) stream.position += bytesWritten;
  try {
   if (stream.path && FS.trackingDelegate["onWriteToFile"]) FS.trackingDelegate["onWriteToFile"](stream.path);
  } catch (e) {
   console.log("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
  }
  return bytesWritten;
 },
 allocate: function(stream, offset, length) {
  if (FS.isClosed(stream)) {
   throw new FS.ErrnoError(9);
  }
  if (offset < 0 || length <= 0) {
   throw new FS.ErrnoError(22);
  }
  if ((stream.flags & 2097155) === 0) {
   throw new FS.ErrnoError(9);
  }
  if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
   throw new FS.ErrnoError(19);
  }
  if (!stream.stream_ops.allocate) {
   throw new FS.ErrnoError(95);
  }
  stream.stream_ops.allocate(stream, offset, length);
 },
 mmap: function(stream, buffer, offset, length, position, prot, flags) {
  if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
   throw new FS.ErrnoError(13);
  }
  if ((stream.flags & 2097155) === 1) {
   throw new FS.ErrnoError(13);
  }
  if (!stream.stream_ops.mmap) {
   throw new FS.ErrnoError(19);
  }
  return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
 },
 msync: function(stream, buffer, offset, length, mmapFlags) {
  if (!stream || !stream.stream_ops.msync) {
   return 0;
  }
  return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
 },
 munmap: function(stream) {
  return 0;
 },
 ioctl: function(stream, cmd, arg) {
  if (!stream.stream_ops.ioctl) {
   throw new FS.ErrnoError(25);
  }
  return stream.stream_ops.ioctl(stream, cmd, arg);
 },
 readFile: function(path, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "r";
  opts.encoding = opts.encoding || "binary";
  if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
   throw new Error('Invalid encoding type "' + opts.encoding + '"');
  }
  var ret;
  var stream = FS.open(path, opts.flags);
  var stat = FS.stat(path);
  var length = stat.size;
  var buf = new Uint8Array(length);
  FS.read(stream, buf, 0, length, 0);
  if (opts.encoding === "utf8") {
   ret = UTF8ArrayToString(buf, 0);
  } else if (opts.encoding === "binary") {
   ret = buf;
  }
  FS.close(stream);
  return ret;
 },
 writeFile: function(path, data, opts) {
  opts = opts || {};
  opts.flags = opts.flags || "w";
  var stream = FS.open(path, opts.flags, opts.mode);
  if (typeof data === "string") {
   var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
   var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
   FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
  } else if (ArrayBuffer.isView(data)) {
   FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
  } else {
   throw new Error("Unsupported data type");
  }
  FS.close(stream);
 },
 cwd: function() {
  return FS.currentPath;
 },
 chdir: function(path) {
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  if (lookup.node === null) {
   throw new FS.ErrnoError(2);
  }
  if (!FS.isDir(lookup.node.mode)) {
   throw new FS.ErrnoError(20);
  }
  var err = FS.nodePermissions(lookup.node, "x");
  if (err) {
   throw new FS.ErrnoError(err);
  }
  FS.currentPath = lookup.path;
 },
 createDefaultDirectories: function() {
  FS.mkdir("/tmp");
  FS.mkdir("/home");
  FS.mkdir("/home/web_user");
 },
 createDefaultDevices: function() {
  FS.mkdir("/dev");
  FS.registerDevice(FS.makedev(1, 3), {
   read: function() {
    return 0;
   },
   write: function(stream, buffer, offset, length, pos) {
    return length;
   }
  });
  FS.mkdev("/dev/null", FS.makedev(1, 3));
  TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
  TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
  FS.mkdev("/dev/tty", FS.makedev(5, 0));
  FS.mkdev("/dev/tty1", FS.makedev(6, 0));
  var random_device;
  if (typeof crypto === "object" && typeof crypto["getRandomValues"] === "function") {
   var randomBuffer = new Uint8Array(1);
   random_device = function() {
    crypto.getRandomValues(randomBuffer);
    return randomBuffer[0];
   };
  } else if (ENVIRONMENT_IS_NODE) {
   try {
    var crypto_module = require("crypto");
    random_device = function() {
     return crypto_module["randomBytes"](1)[0];
    };
   } catch (e) {}
  } else {}
  if (!random_device) {
   random_device = function() {
    abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
   };
  }
  FS.createDevice("/dev", "random", random_device);
  FS.createDevice("/dev", "urandom", random_device);
  FS.mkdir("/dev/shm");
  FS.mkdir("/dev/shm/tmp");
 },
 createSpecialDirectories: function() {
  FS.mkdir("/proc");
  FS.mkdir("/proc/self");
  FS.mkdir("/proc/self/fd");
  FS.mount({
   mount: function() {
    var node = FS.createNode("/proc/self", "fd", 16384 | 511, 73);
    node.node_ops = {
     lookup: function(parent, name) {
      var fd = +name;
      var stream = FS.getStream(fd);
      if (!stream) throw new FS.ErrnoError(9);
      var ret = {
       parent: null,
       mount: {
        mountpoint: "fake"
       },
       node_ops: {
        readlink: function() {
         return stream.path;
        }
       }
      };
      ret.parent = ret;
      return ret;
     }
    };
    return node;
   }
  }, {}, "/proc/self/fd");
 },
 createStandardStreams: function() {
  if (Module["stdin"]) {
   FS.createDevice("/dev", "stdin", Module["stdin"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdin");
  }
  if (Module["stdout"]) {
   FS.createDevice("/dev", "stdout", null, Module["stdout"]);
  } else {
   FS.symlink("/dev/tty", "/dev/stdout");
  }
  if (Module["stderr"]) {
   FS.createDevice("/dev", "stderr", null, Module["stderr"]);
  } else {
   FS.symlink("/dev/tty1", "/dev/stderr");
  }
  var stdin = FS.open("/dev/stdin", "r");
  var stdout = FS.open("/dev/stdout", "w");
  var stderr = FS.open("/dev/stderr", "w");
  assert(stdin.fd === 0, "invalid handle for stdin (" + stdin.fd + ")");
  assert(stdout.fd === 1, "invalid handle for stdout (" + stdout.fd + ")");
  assert(stderr.fd === 2, "invalid handle for stderr (" + stderr.fd + ")");
 },
 ensureErrnoError: function() {
  if (FS.ErrnoError) return;
  FS.ErrnoError = function ErrnoError(errno, node) {
   this.node = node;
   this.setErrno = function(errno) {
    this.errno = errno;
    for (var key in ERRNO_CODES) {
     if (ERRNO_CODES[key] === errno) {
      this.code = key;
      break;
     }
    }
   };
   this.setErrno(errno);
   this.message = ERRNO_MESSAGES[errno];
   if (this.stack) {
    Object.defineProperty(this, "stack", {
     value: new Error().stack,
     writable: true
    });
    this.stack = demangleAll(this.stack);
   }
  };
  FS.ErrnoError.prototype = new Error();
  FS.ErrnoError.prototype.constructor = FS.ErrnoError;
  [ 2 ].forEach(function(code) {
   FS.genericErrors[code] = new FS.ErrnoError(code);
   FS.genericErrors[code].stack = "<generic error, no stack>";
  });
 },
 staticInit: function() {
  FS.ensureErrnoError();
  FS.nameTable = new Array(4096);
  FS.mount(MEMFS, {}, "/");
  FS.createDefaultDirectories();
  FS.createDefaultDevices();
  FS.createSpecialDirectories();
  FS.filesystems = {
   "MEMFS": MEMFS,
   "IDBFS": IDBFS,
   "NODEFS": NODEFS,
   "WORKERFS": WORKERFS
  };
 },
 init: function(input, output, error) {
  assert(!FS.init.initialized, "FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)");
  FS.init.initialized = true;
  FS.ensureErrnoError();
  Module["stdin"] = input || Module["stdin"];
  Module["stdout"] = output || Module["stdout"];
  Module["stderr"] = error || Module["stderr"];
  FS.createStandardStreams();
 },
 quit: function() {
  FS.init.initialized = false;
  var fflush = Module["_fflush"];
  if (fflush) fflush(0);
  for (var i = 0; i < FS.streams.length; i++) {
   var stream = FS.streams[i];
   if (!stream) {
    continue;
   }
   FS.close(stream);
  }
 },
 getMode: function(canRead, canWrite) {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
 },
 joinPath: function(parts, forceRelative) {
  var path = PATH.join.apply(null, parts);
  if (forceRelative && path[0] == "/") path = path.substr(1);
  return path;
 },
 absolutePath: function(relative, base) {
  return PATH_FS.resolve(base, relative);
 },
 standardizePath: function(path) {
  return PATH.normalize(path);
 },
 findObject: function(path, dontResolveLastLink) {
  var ret = FS.analyzePath(path, dontResolveLastLink);
  if (ret.exists) {
   return ret.object;
  } else {
   ___setErrNo(ret.error);
   return null;
  }
 },
 analyzePath: function(path, dontResolveLastLink) {
  try {
   var lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   path = lookup.path;
  } catch (e) {}
  var ret = {
   isRoot: false,
   exists: false,
   error: 0,
   name: null,
   path: null,
   object: null,
   parentExists: false,
   parentPath: null,
   parentObject: null
  };
  try {
   var lookup = FS.lookupPath(path, {
    parent: true
   });
   ret.parentExists = true;
   ret.parentPath = lookup.path;
   ret.parentObject = lookup.node;
   ret.name = PATH.basename(path);
   lookup = FS.lookupPath(path, {
    follow: !dontResolveLastLink
   });
   ret.exists = true;
   ret.path = lookup.path;
   ret.object = lookup.node;
   ret.name = lookup.node.name;
   ret.isRoot = lookup.path === "/";
  } catch (e) {
   ret.error = e.errno;
  }
  return ret;
 },
 createFolder: function(parent, name, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.mkdir(path, mode);
 },
 createPath: function(parent, path, canRead, canWrite) {
  parent = typeof parent === "string" ? parent : FS.getPath(parent);
  var parts = path.split("/").reverse();
  while (parts.length) {
   var part = parts.pop();
   if (!part) continue;
   var current = PATH.join2(parent, part);
   try {
    FS.mkdir(current);
   } catch (e) {}
   parent = current;
  }
  return current;
 },
 createFile: function(parent, name, properties, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(canRead, canWrite);
  return FS.create(path, mode);
 },
 createDataFile: function(parent, name, data, canRead, canWrite, canOwn) {
  var path = name ? PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name) : parent;
  var mode = FS.getMode(canRead, canWrite);
  var node = FS.create(path, mode);
  if (data) {
   if (typeof data === "string") {
    var arr = new Array(data.length);
    for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
    data = arr;
   }
   FS.chmod(node, mode | 146);
   var stream = FS.open(node, "w");
   FS.write(stream, data, 0, data.length, 0, canOwn);
   FS.close(stream);
   FS.chmod(node, mode);
  }
  return node;
 },
 createDevice: function(parent, name, input, output) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  var mode = FS.getMode(!!input, !!output);
  if (!FS.createDevice.major) FS.createDevice.major = 64;
  var dev = FS.makedev(FS.createDevice.major++, 0);
  FS.registerDevice(dev, {
   open: function(stream) {
    stream.seekable = false;
   },
   close: function(stream) {
    if (output && output.buffer && output.buffer.length) {
     output(10);
    }
   },
   read: function(stream, buffer, offset, length, pos) {
    var bytesRead = 0;
    for (var i = 0; i < length; i++) {
     var result;
     try {
      result = input();
     } catch (e) {
      throw new FS.ErrnoError(5);
     }
     if (result === undefined && bytesRead === 0) {
      throw new FS.ErrnoError(11);
     }
     if (result === null || result === undefined) break;
     bytesRead++;
     buffer[offset + i] = result;
    }
    if (bytesRead) {
     stream.node.timestamp = Date.now();
    }
    return bytesRead;
   },
   write: function(stream, buffer, offset, length, pos) {
    for (var i = 0; i < length; i++) {
     try {
      output(buffer[offset + i]);
     } catch (e) {
      throw new FS.ErrnoError(5);
     }
    }
    if (length) {
     stream.node.timestamp = Date.now();
    }
    return i;
   }
  });
  return FS.mkdev(path, mode, dev);
 },
 createLink: function(parent, name, target, canRead, canWrite) {
  var path = PATH.join2(typeof parent === "string" ? parent : FS.getPath(parent), name);
  return FS.symlink(target, path);
 },
 forceLoadFile: function(obj) {
  if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
  var success = true;
  if (typeof XMLHttpRequest !== "undefined") {
   throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
  } else if (read_) {
   try {
    obj.contents = intArrayFromString(read_(obj.url), true);
    obj.usedBytes = obj.contents.length;
   } catch (e) {
    success = false;
   }
  } else {
   throw new Error("Cannot load without read() or XMLHttpRequest.");
  }
  if (!success) ___setErrNo(5);
  return success;
 },
 createLazyFile: function(parent, name, url, canRead, canWrite) {
  function LazyUint8Array() {
   this.lengthKnown = false;
   this.chunks = [];
  }
  LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
   if (idx > this.length - 1 || idx < 0) {
    return undefined;
   }
   var chunkOffset = idx % this.chunkSize;
   var chunkNum = idx / this.chunkSize | 0;
   return this.getter(chunkNum)[chunkOffset];
  };
  LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
   this.getter = getter;
  };
  LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
   var xhr = new XMLHttpRequest();
   xhr.open("HEAD", url, false);
   xhr.send(null);
   if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
   var datalength = Number(xhr.getResponseHeader("Content-length"));
   var header;
   var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
   var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
   var chunkSize = 1024 * 1024;
   if (!hasByteServing) chunkSize = datalength;
   var doXHR = function(from, to) {
    if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
    if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
    if (typeof Uint8Array != "undefined") xhr.responseType = "arraybuffer";
    if (xhr.overrideMimeType) {
     xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }
    xhr.send(null);
    if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
    if (xhr.response !== undefined) {
     return new Uint8Array(xhr.response || []);
    } else {
     return intArrayFromString(xhr.responseText || "", true);
    }
   };
   var lazyArray = this;
   lazyArray.setDataGetter(function(chunkNum) {
    var start = chunkNum * chunkSize;
    var end = (chunkNum + 1) * chunkSize - 1;
    end = Math.min(end, datalength - 1);
    if (typeof lazyArray.chunks[chunkNum] === "undefined") {
     lazyArray.chunks[chunkNum] = doXHR(start, end);
    }
    if (typeof lazyArray.chunks[chunkNum] === "undefined") throw new Error("doXHR failed!");
    return lazyArray.chunks[chunkNum];
   });
   if (usesGzip || !datalength) {
    chunkSize = datalength = 1;
    datalength = this.getter(0).length;
    chunkSize = datalength;
    console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
   }
   this._length = datalength;
   this._chunkSize = chunkSize;
   this.lengthKnown = true;
  };
  if (typeof XMLHttpRequest !== "undefined") {
   if (!ENVIRONMENT_IS_WORKER) throw "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc";
   var lazyArray = new LazyUint8Array();
   Object.defineProperties(lazyArray, {
    length: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._length;
     }
    },
    chunkSize: {
     get: function() {
      if (!this.lengthKnown) {
       this.cacheLength();
      }
      return this._chunkSize;
     }
    }
   });
   var properties = {
    isDevice: false,
    contents: lazyArray
   };
  } else {
   var properties = {
    isDevice: false,
    url: url
   };
  }
  var node = FS.createFile(parent, name, properties, canRead, canWrite);
  if (properties.contents) {
   node.contents = properties.contents;
  } else if (properties.url) {
   node.contents = null;
   node.url = properties.url;
  }
  Object.defineProperties(node, {
   usedBytes: {
    get: function() {
     return this.contents.length;
    }
   }
  });
  var stream_ops = {};
  var keys = Object.keys(node.stream_ops);
  keys.forEach(function(key) {
   var fn = node.stream_ops[key];
   stream_ops[key] = function forceLoadLazyFile() {
    if (!FS.forceLoadFile(node)) {
     throw new FS.ErrnoError(5);
    }
    return fn.apply(null, arguments);
   };
  });
  stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
   if (!FS.forceLoadFile(node)) {
    throw new FS.ErrnoError(5);
   }
   var contents = stream.node.contents;
   if (position >= contents.length) return 0;
   var size = Math.min(contents.length - position, length);
   assert(size >= 0);
   if (contents.slice) {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents[position + i];
    }
   } else {
    for (var i = 0; i < size; i++) {
     buffer[offset + i] = contents.get(position + i);
    }
   }
   return size;
  };
  node.stream_ops = stream_ops;
  return node;
 },
 createPreloadedFile: function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
  Browser.init();
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency("cp " + fullname);
  function processData(byteArray) {
   function finish(byteArray) {
    if (preFinish) preFinish();
    if (!dontCreateFile) {
     FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
    if (onload) onload();
    removeRunDependency(dep);
   }
   var handled = false;
   Module["preloadPlugins"].forEach(function(plugin) {
    if (handled) return;
    if (plugin["canHandle"](fullname)) {
     plugin["handle"](byteArray, fullname, finish, function() {
      if (onerror) onerror();
      removeRunDependency(dep);
     });
     handled = true;
    }
   });
   if (!handled) finish(byteArray);
  }
  addRunDependency(dep);
  if (typeof url == "string") {
   Browser.asyncLoad(url, function(byteArray) {
    processData(byteArray);
   }, onerror);
  } else {
   processData(url);
  }
 },
 indexedDB: function() {
  return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
 },
 DB_NAME: function() {
  return "EM_FS_" + window.location.pathname;
 },
 DB_VERSION: 20,
 DB_STORE_NAME: "FILE_DATA",
 saveFilesToDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
   console.log("creating db");
   var db = openRequest.result;
   db.createObjectStore(FS.DB_STORE_NAME);
  };
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   var transaction = db.transaction([ FS.DB_STORE_NAME ], "readwrite");
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var putRequest = files.put(FS.analyzePath(path).object.contents, path);
    putRequest.onsuccess = function putRequest_onsuccess() {
     ok++;
     if (ok + fail == total) finish();
    };
    putRequest.onerror = function putRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 },
 loadFilesFromDB: function(paths, onload, onerror) {
  onload = onload || function() {};
  onerror = onerror || function() {};
  var indexedDB = FS.indexedDB();
  try {
   var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
  } catch (e) {
   return onerror(e);
  }
  openRequest.onupgradeneeded = onerror;
  openRequest.onsuccess = function openRequest_onsuccess() {
   var db = openRequest.result;
   try {
    var transaction = db.transaction([ FS.DB_STORE_NAME ], "readonly");
   } catch (e) {
    onerror(e);
    return;
   }
   var files = transaction.objectStore(FS.DB_STORE_NAME);
   var ok = 0, fail = 0, total = paths.length;
   function finish() {
    if (fail == 0) onload(); else onerror();
   }
   paths.forEach(function(path) {
    var getRequest = files.get(path);
    getRequest.onsuccess = function getRequest_onsuccess() {
     if (FS.analyzePath(path).exists) {
      FS.unlink(path);
     }
     FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
     ok++;
     if (ok + fail == total) finish();
    };
    getRequest.onerror = function getRequest_onerror() {
     fail++;
     if (ok + fail == total) finish();
    };
   });
   transaction.onerror = onerror;
  };
  openRequest.onerror = onerror;
 }
};

var SYSCALLS = {
 DEFAULT_POLLMASK: 5,
 mappings: {},
 umask: 511,
 calculateAt: function(dirfd, path) {
  if (path[0] !== "/") {
   var dir;
   if (dirfd === -100) {
    dir = FS.cwd();
   } else {
    var dirstream = FS.getStream(dirfd);
    if (!dirstream) throw new FS.ErrnoError(9);
    dir = dirstream.path;
   }
   path = PATH.join2(dir, path);
  }
  return path;
 },
 doStat: function(func, path, buf) {
  try {
   var stat = func(path);
  } catch (e) {
   if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
    return -20;
   }
   throw e;
  }
  GROWABLE_HEAP_STORE_I32(buf | 0, stat.dev);
  GROWABLE_HEAP_STORE_I32(buf + 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 8 | 0, stat.ino);
  GROWABLE_HEAP_STORE_I32(buf + 12 | 0, stat.mode);
  GROWABLE_HEAP_STORE_I32(buf + 16 | 0, stat.nlink);
  GROWABLE_HEAP_STORE_I32(buf + 20 | 0, stat.uid);
  GROWABLE_HEAP_STORE_I32(buf + 24 | 0, stat.gid);
  GROWABLE_HEAP_STORE_I32(buf + 28 | 0, stat.rdev);
  GROWABLE_HEAP_STORE_I32(buf + 32 | 0, 0);
  tempI64 = [ stat.size >>> 0, (tempDouble = stat.size, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(buf + 40 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(buf + 44 | 0, tempI64[1]);
  GROWABLE_HEAP_STORE_I32(buf + 48 | 0, 4096);
  GROWABLE_HEAP_STORE_I32(buf + 52 | 0, stat.blocks);
  GROWABLE_HEAP_STORE_I32(buf + 56 | 0, stat.atime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 60 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 64 | 0, stat.mtime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 68 | 0, 0);
  GROWABLE_HEAP_STORE_I32(buf + 72 | 0, stat.ctime.getTime() / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(buf + 76 | 0, 0);
  tempI64 = [ stat.ino >>> 0, (tempDouble = stat.ino, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
  GROWABLE_HEAP_STORE_I32(buf + 80 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(buf + 84 | 0, tempI64[1]);
  return 0;
 },
 doMsync: function(addr, stream, len, flags) {
  var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
  FS.msync(stream, buffer, 0, len, flags);
 },
 doMkdir: function(path, mode) {
  path = PATH.normalize(path);
  if (path[path.length - 1] === "/") path = path.substr(0, path.length - 1);
  FS.mkdir(path, mode, 0);
  return 0;
 },
 doMknod: function(path, mode, dev) {
  switch (mode & 61440) {
  case 32768:
  case 8192:
  case 24576:
  case 4096:
  case 49152:
   break;

  default:
   return -22;
  }
  FS.mknod(path, mode, dev);
  return 0;
 },
 doReadlink: function(path, buf, bufsize) {
  if (bufsize <= 0) return -22;
  var ret = FS.readlink(path);
  var len = Math.min(bufsize, lengthBytesUTF8(ret));
  var endChar = GROWABLE_HEAP_LOAD_I8(buf + len | 0);
  stringToUTF8(ret, buf, bufsize + 1);
  GROWABLE_HEAP_STORE_I8(buf + len | 0, endChar);
  return len;
 },
 doAccess: function(path, amode) {
  if (amode & ~7) {
   return -22;
  }
  var node;
  var lookup = FS.lookupPath(path, {
   follow: true
  });
  node = lookup.node;
  if (!node) {
   return -2;
  }
  var perms = "";
  if (amode & 4) perms += "r";
  if (amode & 2) perms += "w";
  if (amode & 1) perms += "x";
  if (perms && FS.nodePermissions(node, perms)) {
   return -13;
  }
  return 0;
 },
 doDup: function(path, flags, suggestFD) {
  var suggest = FS.getStream(suggestFD);
  if (suggest) FS.close(suggest);
  return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
 },
 doReadv: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = GROWABLE_HEAP_LOAD_I32(iov + i * 8 | 0);
   var len = GROWABLE_HEAP_LOAD_I32(iov + (i * 8 + 4) | 0);
   var curr = FS.read(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
   if (curr < len) break;
  }
  return ret;
 },
 doWritev: function(stream, iov, iovcnt, offset) {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
   var ptr = GROWABLE_HEAP_LOAD_I32(iov + i * 8 | 0);
   var len = GROWABLE_HEAP_LOAD_I32(iov + (i * 8 + 4) | 0);
   var curr = FS.write(stream, HEAP8, ptr, len, offset);
   if (curr < 0) return -1;
   ret += curr;
  }
  return ret;
 },
 varargs: 0,
 get: function(varargs) {
  SYSCALLS.varargs += 4;
  var ret = GROWABLE_HEAP_LOAD_I32(SYSCALLS.varargs - 4 | 0);
  return ret;
 },
 getStr: function() {
  var ret = UTF8ToString(SYSCALLS.get());
  return ret;
 },
 getStreamFromFD: function() {
  var stream = FS.getStream(SYSCALLS.get());
  if (!stream) throw new FS.ErrnoError(9);
  return stream;
 },
 get64: function() {
  var low = SYSCALLS.get(), high = SYSCALLS.get();
  if (low >= 0) assert(high === 0); else assert(high === -1);
  return low;
 },
 getZero: function() {
  assert(SYSCALLS.get() === 0);
 }
};

function ___syscall10(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(1, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr();
   FS.unlink(path);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall10 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall118(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(2, 1, which, varargs);
 SYSCALLS.varargs = varargs;
 try {
  var stream = SYSCALLS.getStreamFromFD();
  return Asyncify.handleSleep(function(wakeUp) {
   var mount = stream.node.mount;
   if (!mount.type.syncfs) {
    wakeUp(0);
    return;
   }
   mount.type.syncfs(mount, false, function(err) {
    if (err) {
     wakeUp(function() {
      return -5;
     });
     return;
    }
    wakeUp(0);
   });
  });
 } catch (e) {
  if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
  return -e.errno;
 }
}

function ___syscall12(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(3, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr();
   FS.chdir(path);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall12 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall122(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(4, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var buf = SYSCALLS.get();
   if (!buf) return -14;
   var layout = {
    "sysname": 0,
    "nodename": 65,
    "domainname": 325,
    "machine": 260,
    "version": 195,
    "release": 130,
    "__size__": 390
   };
   var copyString = function(element, value) {
    var offset = layout[element];
    writeAsciiToMemory(value, buf + offset);
   };
   copyString("sysname", "Emscripten");
   copyString("nodename", "emscripten");
   copyString("release", "1.0");
   copyString("version", "#1");
   copyString("machine", "x86-JS");
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall122 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall132(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(5, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var pid = SYSCALLS.get();
   if (pid && pid !== PROCINFO.pid) return -3;
   return PROCINFO.pgid;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall132 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall133(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(6, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD();
   FS.chdir(stream.path);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall133 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall14(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(7, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), mode = SYSCALLS.get(), dev = SYSCALLS.get();
   return SYSCALLS.doMknod(path, mode, dev);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall14 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall140(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(8, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
   var HIGH_OFFSET = 4294967296;
   var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
   var DOUBLE_LIMIT = 9007199254740992;
   if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
    return -75;
   }
   FS.llseek(stream, offset, whence);
   tempI64 = [ stream.position >>> 0, (tempDouble = stream.position, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
   GROWABLE_HEAP_STORE_I32(result | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(result + 4 | 0, tempI64[1]);
   if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall140 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall142(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(9, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var nfds = SYSCALLS.get(), readfds = SYSCALLS.get(), writefds = SYSCALLS.get(), exceptfds = SYSCALLS.get(), timeout = SYSCALLS.get();
   assert(nfds <= 64, "nfds must be less than or equal to 64");
   assert(!exceptfds, "exceptfds not supported");
   var total = 0;
   var srcReadLow = readfds ? GROWABLE_HEAP_LOAD_I32(readfds | 0) : 0, srcReadHigh = readfds ? GROWABLE_HEAP_LOAD_I32(readfds + 4 | 0) : 0;
   var srcWriteLow = writefds ? GROWABLE_HEAP_LOAD_I32(writefds | 0) : 0, srcWriteHigh = writefds ? GROWABLE_HEAP_LOAD_I32(writefds + 4 | 0) : 0;
   var srcExceptLow = exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds | 0) : 0, srcExceptHigh = exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds + 4 | 0) : 0;
   var dstReadLow = 0, dstReadHigh = 0;
   var dstWriteLow = 0, dstWriteHigh = 0;
   var dstExceptLow = 0, dstExceptHigh = 0;
   var allLow = (readfds ? GROWABLE_HEAP_LOAD_I32(readfds | 0) : 0) | (writefds ? GROWABLE_HEAP_LOAD_I32(writefds | 0) : 0) | (exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds | 0) : 0);
   var allHigh = (readfds ? GROWABLE_HEAP_LOAD_I32(readfds + 4 | 0) : 0) | (writefds ? GROWABLE_HEAP_LOAD_I32(writefds + 4 | 0) : 0) | (exceptfds ? GROWABLE_HEAP_LOAD_I32(exceptfds + 4 | 0) : 0);
   var check = function(fd, low, high, val) {
    return fd < 32 ? low & val : high & val;
   };
   for (var fd = 0; fd < nfds; fd++) {
    var mask = 1 << fd % 32;
    if (!check(fd, allLow, allHigh, mask)) {
     continue;
    }
    var stream = FS.getStream(fd);
    if (!stream) throw new FS.ErrnoError(9);
    var flags = SYSCALLS.DEFAULT_POLLMASK;
    if (stream.stream_ops.poll) {
     flags = stream.stream_ops.poll(stream);
    }
    if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
     fd < 32 ? dstReadLow = dstReadLow | mask : dstReadHigh = dstReadHigh | mask;
     total++;
    }
    if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
     fd < 32 ? dstWriteLow = dstWriteLow | mask : dstWriteHigh = dstWriteHigh | mask;
     total++;
    }
    if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
     fd < 32 ? dstExceptLow = dstExceptLow | mask : dstExceptHigh = dstExceptHigh | mask;
     total++;
    }
   }
   if (readfds) {
    GROWABLE_HEAP_STORE_I32(readfds | 0, dstReadLow);
    GROWABLE_HEAP_STORE_I32(readfds + 4 | 0, dstReadHigh);
   }
   if (writefds) {
    GROWABLE_HEAP_STORE_I32(writefds | 0, dstWriteLow);
    GROWABLE_HEAP_STORE_I32(writefds + 4 | 0, dstWriteHigh);
   }
   if (exceptfds) {
    GROWABLE_HEAP_STORE_I32(exceptfds | 0, dstExceptLow);
    GROWABLE_HEAP_STORE_I32(exceptfds + 4 | 0, dstExceptHigh);
   }
   return total;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall142 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall144(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(10, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var addr = SYSCALLS.get(), len = SYSCALLS.get(), flags = SYSCALLS.get();
   var info = SYSCALLS.mappings[addr];
   if (!info) return 0;
   SYSCALLS.doMsync(addr, FS.getStream(info.fd), len, info.flags);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall144 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall145(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(11, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
   return SYSCALLS.doReadv(stream, iov, iovcnt);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall145 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall146(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(12, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
   return SYSCALLS.doWritev(stream, iov, iovcnt);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall146 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall147(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(13, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var pid = SYSCALLS.get();
   if (pid && pid !== PROCINFO.pid) return -3;
   return PROCINFO.sid;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall147 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall148(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(14, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD();
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall148 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall15(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(15, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), mode = SYSCALLS.get();
   FS.chmod(path, mode);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall15 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall163(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(16, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return -12;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall163 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall180(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(17, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get(), zero = SYSCALLS.getZero(), offset = SYSCALLS.get64();
   return FS.read(stream, HEAP8, buf, count, offset);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall180 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall181(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(18, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get(), zero = SYSCALLS.getZero(), offset = SYSCALLS.get64();
   return FS.write(stream, HEAP8, buf, count, offset);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall181 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall183(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(19, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var buf = SYSCALLS.get(), size = SYSCALLS.get();
   if (size === 0) return -22;
   var cwd = FS.cwd();
   var cwdLengthInBytes = lengthBytesUTF8(cwd);
   if (size < cwdLengthInBytes + 1) return -34;
   stringToUTF8(cwd, buf, size);
   return buf;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall183 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall191(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(20, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var resource = SYSCALLS.get(), rlim = SYSCALLS.get();
   GROWABLE_HEAP_STORE_I32(rlim | 0, -1);
   GROWABLE_HEAP_STORE_I32(rlim + 4 | 0, -1);
   GROWABLE_HEAP_STORE_I32(rlim + 8 | 0, -1);
   GROWABLE_HEAP_STORE_I32(rlim + 12 | 0, -1);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall191 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _memset(ptr, value, num) {
 var originalAsyncifyState = Asyncify.state;
 try {
  ptr = ptr | 0;
  value = value | 0;
  num = num | 0;
  var end = 0, aligned_end = 0, block_aligned_end = 0, value4 = 0;
  end = ptr + num | 0;
  value = value & 255;
  if ((num | 0) >= 67) {
   while ((ptr & 3) != 0) {
    GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
    ptr = ptr + 1 | 0;
   }
   aligned_end = end & -4 | 0;
   value4 = value | value << 8 | value << 16 | value << 24;
   block_aligned_end = aligned_end - 64 | 0;
   while ((ptr | 0) <= (block_aligned_end | 0)) {
    GROWABLE_HEAP_STORE_I32(ptr | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 8 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 12 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 16 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 20 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 24 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 28 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 32 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 36 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 40 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 44 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 48 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 52 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 56 | 0, value4);
    GROWABLE_HEAP_STORE_I32(ptr + 60 | 0, value4);
    ptr = ptr + 64 | 0;
   }
   while ((ptr | 0) < (aligned_end | 0)) {
    GROWABLE_HEAP_STORE_I32(ptr | 0, value4);
    ptr = ptr + 4 | 0;
   }
  }
  while ((ptr | 0) < (end | 0)) {
   GROWABLE_HEAP_STORE_I8(ptr >> 0 | 0, value);
   ptr = ptr + 1 | 0;
  }
  return end - num | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import memset was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __emscripten_syscall_mmap2(addr, len, prot, flags, fd, off) {
 var originalAsyncifyState = Asyncify.state;
 try {
  off <<= 12;
  var ptr;
  var allocated = false;
  if ((flags & 16) !== 0 && addr % PAGE_SIZE !== 0) {
   return -22;
  }
  if ((flags & 32) !== 0) {
   ptr = _memalign(PAGE_SIZE, len);
   if (!ptr) return -12;
   _memset(ptr, 0, len);
   allocated = true;
  } else {
   var info = FS.getStream(fd);
   if (!info) return -9;
   var res = FS.mmap(info, HEAPU8, addr, len, off, prot, flags);
   ptr = res.ptr;
   allocated = res.allocated;
  }
  SYSCALLS.mappings[ptr] = {
   malloc: ptr,
   len: len,
   allocated: allocated,
   fd: fd,
   flags: flags
  };
  return ptr;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _emscripten_syscall_mmap2 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall192(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(21, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var addr = SYSCALLS.get(), len = SYSCALLS.get(), prot = SYSCALLS.get(), flags = SYSCALLS.get(), fd = SYSCALLS.get(), off = SYSCALLS.get();
   return __emscripten_syscall_mmap2(addr, len, prot, flags, fd, off);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall192 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall193(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(22, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), zero = SYSCALLS.getZero(), length = SYSCALLS.get64();
   FS.truncate(path, length);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall193 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall194(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(23, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var fd = SYSCALLS.get(), zero = SYSCALLS.getZero(), length = SYSCALLS.get64();
   FS.ftruncate(fd, length);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall194 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall195(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(24, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), buf = SYSCALLS.get();
   return SYSCALLS.doStat(FS.stat, path, buf);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall195 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall196(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(25, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), buf = SYSCALLS.get();
   return SYSCALLS.doStat(FS.lstat, path, buf);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall196 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall197(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(26, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get();
   return SYSCALLS.doStat(FS.stat, stream.path, buf);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall197 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall198(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(27, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get();
   FS.chown(path, owner, group);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall198 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall202(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(28, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall202 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall199(a0, a1) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return ___syscall202(a0, a1);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall199 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall20(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(29, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return PROCINFO.pid;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall20 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall200(a0, a1) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return ___syscall202(a0, a1);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall200 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall201(a0, a1) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return ___syscall202(a0, a1);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall201 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall205(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(30, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var size = SYSCALLS.get(), list = SYSCALLS.get();
   if (size < 1) return -22;
   GROWABLE_HEAP_STORE_I32(list | 0, 0);
   return 1;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall205 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall207(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(31, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var fd = SYSCALLS.get(), owner = SYSCALLS.get(), group = SYSCALLS.get();
   FS.fchown(fd, owner, group);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall207 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall211(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(32, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var ruid = SYSCALLS.get(), euid = SYSCALLS.get(), suid = SYSCALLS.get();
   GROWABLE_HEAP_STORE_I32(ruid | 0, 0);
   GROWABLE_HEAP_STORE_I32(euid | 0, 0);
   GROWABLE_HEAP_STORE_I32(suid | 0, 0);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall211 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall209(a0, a1) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return ___syscall211(a0, a1);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall209 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall212(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(33, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get();
   FS.chown(path, owner, group);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall212 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall220(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(34, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), dirp = SYSCALLS.get(), count = SYSCALLS.get();
   if (!stream.getdents) {
    stream.getdents = FS.readdir(stream.path);
   }
   var struct_size = 280;
   var pos = 0;
   var off = FS.llseek(stream, 0, 1);
   var idx = Math.floor(off / struct_size);
   while (idx < stream.getdents.length && pos + struct_size <= count) {
    var id;
    var type;
    var name = stream.getdents[idx];
    if (name[0] === ".") {
     id = 1;
     type = 4;
    } else {
     var child = FS.lookupNode(stream.node, name);
     id = child.id;
     type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
    }
    tempI64 = [ id >>> 0, (tempDouble = id, +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
    GROWABLE_HEAP_STORE_I32(dirp + pos | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(dirp + pos + 4 | 0, tempI64[1]);
    tempI64 = [ (idx + 1) * struct_size >>> 0, (tempDouble = (idx + 1) * struct_size, 
    +Math_abs(tempDouble) >= 1 ? tempDouble > 0 ? (Math_min(+Math_floor(tempDouble / 4294967296), 4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / 4294967296) >>> 0 : 0) ], 
    GROWABLE_HEAP_STORE_I32(dirp + pos + 8 | 0, tempI64[0]), GROWABLE_HEAP_STORE_I32(dirp + pos + 12 | 0, tempI64[1]);
    GROWABLE_HEAP_STORE_I16(dirp + pos + 16 | 0, 280);
    GROWABLE_HEAP_STORE_I8(dirp + pos + 18 >> 0 | 0, type);
    stringToUTF8(name, dirp + pos + 19, 256);
    pos += struct_size;
    idx += 1;
   }
   FS.llseek(stream, idx * struct_size, 0);
   return pos;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall220 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall221(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(35, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), cmd = SYSCALLS.get();
   switch (cmd) {
   case 0:
    {
     var arg = SYSCALLS.get();
     if (arg < 0) {
      return -22;
     }
     var newStream;
     newStream = FS.open(stream.path, stream.flags, 0, arg);
     return newStream.fd;
    }

   case 1:
   case 2:
    return 0;

   case 3:
    return stream.flags;

   case 4:
    {
     var arg = SYSCALLS.get();
     stream.flags |= arg;
     return 0;
    }

   case 12:
    {
     var arg = SYSCALLS.get();
     var offset = 0;
     GROWABLE_HEAP_STORE_I16(arg + offset | 0, 2);
     return 0;
    }

   case 13:
   case 14:
    return 0;

   case 16:
   case 8:
    return -22;

   case 9:
    ___setErrNo(22);
    return -1;

   default:
    {
     return -22;
    }
   }
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall221 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall268(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(36, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), size = SYSCALLS.get(), buf = SYSCALLS.get();
   assert(size === 64);
   GROWABLE_HEAP_STORE_I32(buf + 4 | 0, 4096);
   GROWABLE_HEAP_STORE_I32(buf + 40 | 0, 4096);
   GROWABLE_HEAP_STORE_I32(buf + 8 | 0, 1e6);
   GROWABLE_HEAP_STORE_I32(buf + 12 | 0, 5e5);
   GROWABLE_HEAP_STORE_I32(buf + 16 | 0, 5e5);
   GROWABLE_HEAP_STORE_I32(buf + 20 | 0, FS.nextInode);
   GROWABLE_HEAP_STORE_I32(buf + 24 | 0, 1e6);
   GROWABLE_HEAP_STORE_I32(buf + 28 | 0, 42);
   GROWABLE_HEAP_STORE_I32(buf + 44 | 0, 2);
   GROWABLE_HEAP_STORE_I32(buf + 36 | 0, 255);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall268 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall269(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(37, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), size = SYSCALLS.get(), buf = SYSCALLS.get();
   return ___syscall([ 268, 0, size, buf ], 0);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall269 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall272(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(38, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall272 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall29(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(39, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return -4;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall29 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall295(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(40, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), flags = SYSCALLS.get(), mode = SYSCALLS.get();
   path = SYSCALLS.calculateAt(dirfd, path);
   return FS.open(path, flags, mode).fd;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall295 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall296(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(41, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get();
   path = SYSCALLS.calculateAt(dirfd, path);
   return SYSCALLS.doMkdir(path, mode);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall296 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall297(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(42, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get(), dev = SYSCALLS.get();
   path = SYSCALLS.calculateAt(dirfd, path);
   return SYSCALLS.doMknod(path, mode, dev);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall297 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall298(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(43, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), owner = SYSCALLS.get(), group = SYSCALLS.get(), flags = SYSCALLS.get();
   assert(flags === 0);
   path = SYSCALLS.calculateAt(dirfd, path);
   FS.chown(path, owner, group);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall298 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall3(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(44, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get();
   return FS.read(stream, HEAP8, buf, count);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall3 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall300(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(45, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), buf = SYSCALLS.get(), flags = SYSCALLS.get();
   var nofollow = flags & 256;
   flags = flags & ~256;
   assert(!flags, flags);
   path = SYSCALLS.calculateAt(dirfd, path);
   return SYSCALLS.doStat(nofollow ? FS.lstat : FS.stat, path, buf);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall300 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall301(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(46, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), flags = SYSCALLS.get();
   path = SYSCALLS.calculateAt(dirfd, path);
   if (flags === 0) {
    FS.unlink(path);
   } else if (flags === 512) {
    FS.rmdir(path);
   } else {
    abort("Invalid flags passed to unlinkat");
   }
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall301 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall302(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(47, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var olddirfd = SYSCALLS.get(), oldpath = SYSCALLS.getStr(), newdirfd = SYSCALLS.get(), newpath = SYSCALLS.getStr();
   oldpath = SYSCALLS.calculateAt(olddirfd, oldpath);
   newpath = SYSCALLS.calculateAt(newdirfd, newpath);
   FS.rename(oldpath, newpath);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall302 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall303(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(48, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return -31;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall303 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall304(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(49, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var target = SYSCALLS.get(), newdirfd = SYSCALLS.get(), linkpath = SYSCALLS.get();
   linkpath = SYSCALLS.calculateAt(newdirfd, linkpath);
   FS.symlink(target, linkpath);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall304 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall305(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(50, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), buf = SYSCALLS.get(), bufsize = SYSCALLS.get();
   path = SYSCALLS.calculateAt(dirfd, path);
   return SYSCALLS.doReadlink(path, buf, bufsize);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall305 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall306(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(51, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), mode = SYSCALLS.get(), flags = SYSCALLS.get();
   assert(flags === 0);
   path = SYSCALLS.calculateAt(dirfd, path);
   FS.chmod(path, mode);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall306 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall320(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(52, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var dirfd = SYSCALLS.get(), path = SYSCALLS.getStr(), times = SYSCALLS.get(), flags = SYSCALLS.get();
   assert(flags === 0);
   path = SYSCALLS.calculateAt(dirfd, path);
   var seconds = GROWABLE_HEAP_LOAD_I32(times | 0);
   var nanoseconds = GROWABLE_HEAP_LOAD_I32(times + 4 | 0);
   var atime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
   times += 8;
   seconds = GROWABLE_HEAP_LOAD_I32(times | 0);
   nanoseconds = GROWABLE_HEAP_LOAD_I32(times + 4 | 0);
   var mtime = seconds * 1e3 + nanoseconds / (1e3 * 1e3);
   FS.utime(path, atime, mtime);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall320 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall324(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(53, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), mode = SYSCALLS.get(), offset = SYSCALLS.get64(), len = SYSCALLS.get64();
   assert(mode === 0);
   FS.allocate(stream, offset, len);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall324 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall33(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(54, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), amode = SYSCALLS.get();
   return SYSCALLS.doAccess(path, amode);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall33 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall330(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(55, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var old = SYSCALLS.getStreamFromFD(), suggestFD = SYSCALLS.get(), flags = SYSCALLS.get();
   assert(!flags);
   if (old.fd === suggestFD) return -22;
   return SYSCALLS.doDup(old.path, old.flags, suggestFD);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall330 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall331(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(56, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return -38;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall331 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall34(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(57, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var inc = SYSCALLS.get();
   return -1;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall34 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall340(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(58, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var pid = SYSCALLS.get(), resource = SYSCALLS.get(), new_limit = SYSCALLS.get(), old_limit = SYSCALLS.get();
   if (old_limit) {
    GROWABLE_HEAP_STORE_I32(old_limit | 0, -1);
    GROWABLE_HEAP_STORE_I32(old_limit + 4 | 0, -1);
    GROWABLE_HEAP_STORE_I32(old_limit + 8 | 0, -1);
    GROWABLE_HEAP_STORE_I32(old_limit + 12 | 0, -1);
   }
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall340 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall36(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(59, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall36 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall38(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(60, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var old_path = SYSCALLS.getStr(), new_path = SYSCALLS.getStr();
   FS.rename(old_path, new_path);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall38 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall39(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(61, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), mode = SYSCALLS.get();
   return SYSCALLS.doMkdir(path, mode);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall39 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall4(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(62, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), buf = SYSCALLS.get(), count = SYSCALLS.get();
   return FS.write(stream, HEAP8, buf, count);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall4 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall40(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(63, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr();
   FS.rmdir(path);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall40 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall41(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(64, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var old = SYSCALLS.getStreamFromFD();
   return FS.open(old.path, old.flags, 0).fd;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall41 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var PIPEFS = {
 BUCKET_BUFFER_SIZE: 8192,
 mount: function(mount) {
  return FS.createNode(null, "/", 16384 | 511, 0);
 },
 createPipe: function() {
  var pipe = {
   buckets: []
  };
  pipe.buckets.push({
   buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
   offset: 0,
   roffset: 0
  });
  var rName = PIPEFS.nextname();
  var wName = PIPEFS.nextname();
  var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
  var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
  rNode.pipe = pipe;
  wNode.pipe = pipe;
  var readableStream = FS.createStream({
   path: rName,
   node: rNode,
   flags: FS.modeStringToFlags("r"),
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  rNode.stream = readableStream;
  var writableStream = FS.createStream({
   path: wName,
   node: wNode,
   flags: FS.modeStringToFlags("w"),
   seekable: false,
   stream_ops: PIPEFS.stream_ops
  });
  wNode.stream = writableStream;
  return {
   readable_fd: readableStream.fd,
   writable_fd: writableStream.fd
  };
 },
 stream_ops: {
  poll: function(stream) {
   var pipe = stream.node.pipe;
   if ((stream.flags & 2097155) === 1) {
    return 256 | 4;
   } else {
    if (pipe.buckets.length > 0) {
     for (var i = 0; i < pipe.buckets.length; i++) {
      var bucket = pipe.buckets[i];
      if (bucket.offset - bucket.roffset > 0) {
       return 64 | 1;
      }
     }
    }
   }
   return 0;
  },
  ioctl: function(stream, request, varargs) {
   return ERRNO_CODES.EINVAL;
  },
  fsync: function(stream) {
   return ERRNO_CODES.EINVAL;
  },
  read: function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   var currentLength = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var bucket = pipe.buckets[i];
    currentLength += bucket.offset - bucket.roffset;
   }
   assert(buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   if (length <= 0) {
    return 0;
   }
   if (currentLength == 0) {
    throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
   }
   var toRead = Math.min(currentLength, length);
   var totalRead = toRead;
   var toRemove = 0;
   for (var i = 0; i < pipe.buckets.length; i++) {
    var currBucket = pipe.buckets[i];
    var bucketSize = currBucket.offset - currBucket.roffset;
    if (toRead <= bucketSize) {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     if (toRead < bucketSize) {
      tmpSlice = tmpSlice.subarray(0, toRead);
      currBucket.roffset += toRead;
     } else {
      toRemove++;
     }
     data.set(tmpSlice);
     break;
    } else {
     var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
     data.set(tmpSlice);
     data = data.subarray(tmpSlice.byteLength);
     toRead -= tmpSlice.byteLength;
     toRemove++;
    }
   }
   if (toRemove && toRemove == pipe.buckets.length) {
    toRemove--;
    pipe.buckets[toRemove].offset = 0;
    pipe.buckets[toRemove].roffset = 0;
   }
   pipe.buckets.splice(0, toRemove);
   return totalRead;
  },
  write: function(stream, buffer, offset, length, position) {
   var pipe = stream.node.pipe;
   assert(buffer instanceof ArrayBuffer || buffer instanceof SharedArrayBuffer || ArrayBuffer.isView(buffer));
   var data = buffer.subarray(offset, offset + length);
   var dataLen = data.byteLength;
   if (dataLen <= 0) {
    return 0;
   }
   var currBucket = null;
   if (pipe.buckets.length == 0) {
    currBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: 0,
     roffset: 0
    };
    pipe.buckets.push(currBucket);
   } else {
    currBucket = pipe.buckets[pipe.buckets.length - 1];
   }
   assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
   var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
   if (freeBytesInCurrBuffer >= dataLen) {
    currBucket.buffer.set(data, currBucket.offset);
    currBucket.offset += dataLen;
    return dataLen;
   } else if (freeBytesInCurrBuffer > 0) {
    currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
    currBucket.offset += freeBytesInCurrBuffer;
    data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
   }
   var numBuckets = data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE | 0;
   var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
   for (var i = 0; i < numBuckets; i++) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: PIPEFS.BUCKET_BUFFER_SIZE,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
    data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
   }
   if (remElements > 0) {
    var newBucket = {
     buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
     offset: data.byteLength,
     roffset: 0
    };
    pipe.buckets.push(newBucket);
    newBucket.buffer.set(data);
   }
   return dataLen;
  },
  close: function(stream) {
   var pipe = stream.node.pipe;
   pipe.buckets = null;
  }
 },
 nextname: function() {
  if (!PIPEFS.nextname.current) {
   PIPEFS.nextname.current = 0;
  }
  return "pipe[" + PIPEFS.nextname.current++ + "]";
 }
};

function ___syscall42(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(65, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var fdPtr = SYSCALLS.get();
   if (fdPtr == 0) {
    throw new FS.ErrnoError(14);
   }
   var res = PIPEFS.createPipe();
   GROWABLE_HEAP_STORE_I32(fdPtr | 0, res.readable_fd);
   GROWABLE_HEAP_STORE_I32(fdPtr + 4 | 0, res.writable_fd);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall42 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall5(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(66, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var pathname = SYSCALLS.getStr(), flags = SYSCALLS.get(), mode = SYSCALLS.get();
   var stream = FS.open(pathname, flags, mode);
   return stream.fd;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall5 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall54(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(67, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD(), op = SYSCALLS.get();
   switch (op) {
   case 21509:
   case 21505:
    {
     if (!stream.tty) return -25;
     return 0;
    }

   case 21510:
   case 21511:
   case 21512:
   case 21506:
   case 21507:
   case 21508:
    {
     if (!stream.tty) return -25;
     return 0;
    }

   case 21519:
    {
     if (!stream.tty) return -25;
     var argp = SYSCALLS.get();
     GROWABLE_HEAP_STORE_I32(argp | 0, 0);
     return 0;
    }

   case 21520:
    {
     if (!stream.tty) return -25;
     return -22;
    }

   case 21531:
    {
     var argp = SYSCALLS.get();
     return FS.ioctl(stream, op, argp);
    }

   case 21523:
    {
     if (!stream.tty) return -25;
     return 0;
    }

   case 21524:
    {
     if (!stream.tty) return -25;
     return 0;
    }

   default:
    abort("bad ioctl syscall " + op);
   }
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall54 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall57(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(68, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var pid = SYSCALLS.get(), pgid = SYSCALLS.get();
   if (pid && pid !== PROCINFO.pid) return -3;
   if (pgid && pgid !== PROCINFO.pgid) return -1;
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall57 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall6(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(69, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var stream = SYSCALLS.getStreamFromFD();
   FS.close(stream);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall6 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall60(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(70, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var mask = SYSCALLS.get();
   var old = SYSCALLS.umask;
   SYSCALLS.umask = mask;
   return old;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall60 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall63(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(71, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var old = SYSCALLS.getStreamFromFD(), suggestFD = SYSCALLS.get();
   if (old.fd === suggestFD) return suggestFD;
   return SYSCALLS.doDup(old.path, old.flags, suggestFD);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall63 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall64(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(72, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return PROCINFO.ppid;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall64 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall66(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(73, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall66 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall75(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(74, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall75 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall77(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(75, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var who = SYSCALLS.get(), usage = SYSCALLS.get();
   _memset(usage, 0, 136);
   GROWABLE_HEAP_STORE_I32(usage | 0, 1);
   GROWABLE_HEAP_STORE_I32(usage + 4 | 0, 2);
   GROWABLE_HEAP_STORE_I32(usage + 8 | 0, 3);
   GROWABLE_HEAP_STORE_I32(usage + 12 | 0, 4);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall77 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall83(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(76, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var target = SYSCALLS.getStr(), linkpath = SYSCALLS.getStr();
   FS.symlink(target, linkpath);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall83 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall85(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(77, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var path = SYSCALLS.getStr(), buf = SYSCALLS.get(), bufsize = SYSCALLS.get();
   return SYSCALLS.doReadlink(path, buf, bufsize);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall85 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall9(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(78, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var oldpath = SYSCALLS.get(), newpath = SYSCALLS.get();
   return -31;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall9 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __emscripten_syscall_munmap(addr, len) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (addr === -1 || len === 0) {
   return -22;
  }
  var info = SYSCALLS.mappings[addr];
  if (!info) return 0;
  if (len === info.len) {
   var stream = FS.getStream(info.fd);
   SYSCALLS.doMsync(addr, stream, len, info.flags);
   FS.munmap(stream);
   SYSCALLS.mappings[addr] = null;
   if (info.allocated) {
    _free(info.malloc);
   }
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _emscripten_syscall_munmap was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall91(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(79, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var addr = SYSCALLS.get(), len = SYSCALLS.get();
   return __emscripten_syscall_munmap(addr, len);
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall91 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall94(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(80, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   var fd = SYSCALLS.get(), mode = SYSCALLS.get();
   FS.fchmod(fd, mode);
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall94 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall96(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(81, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return 0;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall96 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___syscall97(which, varargs) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(82, 1, which, varargs);
 var originalAsyncifyState = Asyncify.state;
 try {
  SYSCALLS.varargs = varargs;
  try {
   return -1;
  } catch (e) {
   if (typeof FS === "undefined" || !(e instanceof FS.ErrnoError)) abort(e);
   return -e.errno;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __syscall97 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function ___unlock() {
 var originalAsyncifyState = Asyncify.state;
 try {} finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import __unlock was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _exit(status) {
 var originalAsyncifyState = Asyncify.state;
 try {
  exit(status);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import exit was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __exit(a0) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _exit(a0);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _exit was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _abort() {
 var originalAsyncifyState = Asyncify.state;
 try {
  Module["abort"]();
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import abort was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var __sigalrm_handler = 0;

function _alarm(seconds) {
 var originalAsyncifyState = Asyncify.state;
 try {
  setTimeout(function() {
   if (__sigalrm_handler) dynCall_vi(__sigalrm_handler, 0);
  }, seconds * 1e3);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import alarm was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _chroot(path) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(83, 1, path);
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(13);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import chroot was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _clock() {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (_clock.start === undefined) _clock.start = Date.now();
  return (Date.now() - _clock.start) * (1e6 / 1e3) | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import clock was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_get_now_res() {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (ENVIRONMENT_IS_NODE) {
   return 1;
  } else if (typeof dateNow !== "undefined") {
   return 1e3;
  } else if (typeof performance === "object" && performance && typeof performance["now"] === "function") {
   return 1e3;
  } else {
   return 1e3 * 1e3;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_get_now_res was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _clock_getres(clk_id, res) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var nsec;
  if (clk_id === 0) {
   nsec = 1e3 * 1e3;
  } else if (clk_id === 1 && _emscripten_get_now_is_monotonic()) {
   nsec = _emscripten_get_now_res();
  } else {
   ___setErrNo(22);
   return -1;
  }
  GROWABLE_HEAP_STORE_I32(res | 0, nsec / 1e9 | 0);
  GROWABLE_HEAP_STORE_I32(res + 4 | 0, nsec);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import clock_getres was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _clock_settime(clk_id, tp) {
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(clk_id === 0 ? 1 : 22);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import clock_settime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _confstr(name, buf, len) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(84, 1, name, buf, len);
 var originalAsyncifyState = Asyncify.state;
 try {
  var value;
  switch (name) {
  case 0:
   value = ENV["PATH"] || "/";
   break;

  case 1:
   value = "POSIX_V6_ILP32_OFF32\nPOSIX_V6_ILP32_OFFBIG";
   break;

  case 2:
   value = "glibc 2.14";
   break;

  case 3:
   value = "";
   break;

  case 1118:
  case 1122:
  case 1124:
  case 1125:
  case 1126:
  case 1128:
  case 1129:
  case 1130:
   value = "";
   break;

  case 1116:
  case 1117:
  case 1121:
   value = "-m32";
   break;

  case 1120:
   value = "-m32 -D_LARGEFILE_SOURCE -D_FILE_OFFSET_BITS=64";
   break;

  default:
   ___setErrNo(22);
   return 0;
  }
  if (len == 0 || buf == 0) {
   return value.length + 1;
  } else {
   var length = Math.min(len, value.length);
   for (var i = 0; i < length; i++) {
    GROWABLE_HEAP_STORE_I8(buf + i >> 0 | 0, value.charCodeAt(i));
   }
   if (len > length) GROWABLE_HEAP_STORE_I8(buf + i++ >> 0 | 0, 0);
   return i;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import confstr was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _dlopen() {
 var originalAsyncifyState = Asyncify.state;
 try {
  abort("To use dlopen, you need to use Emscripten's linking support, see https://github.com/emscripten-core/emscripten/wiki/Linking");
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import dlopen was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _dlerror() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _dlopen.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import dlerror was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _dlsym() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _dlopen.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import dlsym was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_conditional_set_current_thread_status(expectedStatus, newStatus) {
 var originalAsyncifyState = Asyncify.state;
 try {
  expectedStatus = expectedStatus | 0;
  newStatus = newStatus | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_conditional_set_current_thread_status was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_main_loop_timing(mode, value) {
 var originalAsyncifyState = Asyncify.state;
 try {
  Browser.mainLoop.timingMode = mode;
  Browser.mainLoop.timingValue = value;
  if (!Browser.mainLoop.func) {
   console.error("emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.");
   return 1;
  }
  if (mode == 0) {
   Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setTimeout() {
    var timeUntilNextTick = Math.max(0, Browser.mainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
    setTimeout(Browser.mainLoop.runner, timeUntilNextTick);
   };
   Browser.mainLoop.method = "timeout";
  } else if (mode == 1) {
   Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_rAF() {
    Browser.requestAnimationFrame(Browser.mainLoop.runner);
   };
   Browser.mainLoop.method = "rAF";
  } else if (mode == 2) {
   if (typeof setImmediate === "undefined") {
    var setImmediates = [];
    var emscriptenMainLoopMessageId = "setimmediate";
    var Browser_setImmediate_messageHandler = function(event) {
     if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
      event.stopPropagation();
      setImmediates.shift()();
     }
    };
    addEventListener("message", Browser_setImmediate_messageHandler, true);
    setImmediate = function Browser_emulated_setImmediate(func) {
     setImmediates.push(func);
     if (ENVIRONMENT_IS_WORKER) {
      if (Module["setImmediates"] === undefined) Module["setImmediates"] = [];
      Module["setImmediates"].push(func);
      postMessage({
       target: emscriptenMainLoopMessageId
      });
     } else postMessage(emscriptenMainLoopMessageId, "*");
    };
   }
   Browser.mainLoop.scheduler = function Browser_mainLoop_scheduler_setImmediate() {
    setImmediate(Browser.mainLoop.runner);
   };
   Browser.mainLoop.method = "immediate";
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_main_loop_timing was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_main_loop(func, fps, simulateInfiniteLoop, arg, noSetTiming) {
 var originalAsyncifyState = Asyncify.state;
 try {
  noExitRuntime = true;
  assert(!Browser.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.");
  Browser.mainLoop.func = func;
  Browser.mainLoop.arg = arg;
  var browserIterationFunc;
  if (typeof arg !== "undefined") {
   browserIterationFunc = function() {
    Module["dynCall_vi"](func, arg);
   };
  } else {
   browserIterationFunc = function() {
    Module["dynCall_v"](func);
   };
  }
  var thisMainLoopId = Browser.mainLoop.currentlyRunningMainloop;
  Browser.mainLoop.runner = function Browser_mainLoop_runner() {
   if (ABORT) return;
   if (Browser.mainLoop.queue.length > 0) {
    var start = Date.now();
    var blocker = Browser.mainLoop.queue.shift();
    blocker.func(blocker.arg);
    if (Browser.mainLoop.remainingBlockers) {
     var remaining = Browser.mainLoop.remainingBlockers;
     var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
     if (blocker.counted) {
      Browser.mainLoop.remainingBlockers = next;
     } else {
      next = next + .5;
      Browser.mainLoop.remainingBlockers = (8 * remaining + next) / 9;
     }
    }
    console.log('main loop blocker "' + blocker.name + '" took ' + (Date.now() - start) + " ms");
    Browser.mainLoop.updateStatus();
    if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
    setTimeout(Browser.mainLoop.runner, 0);
    return;
   }
   if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
   Browser.mainLoop.currentFrameNumber = Browser.mainLoop.currentFrameNumber + 1 | 0;
   if (Browser.mainLoop.timingMode == 1 && Browser.mainLoop.timingValue > 1 && Browser.mainLoop.currentFrameNumber % Browser.mainLoop.timingValue != 0) {
    Browser.mainLoop.scheduler();
    return;
   } else if (Browser.mainLoop.timingMode == 0) {
    Browser.mainLoop.tickStartTime = _emscripten_get_now();
   }
   if (Browser.mainLoop.method === "timeout" && Module.ctx) {
    err("Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!");
    Browser.mainLoop.method = "";
   }
   Browser.mainLoop.runIter(browserIterationFunc);
   checkStackCookie();
   if (thisMainLoopId < Browser.mainLoop.currentlyRunningMainloop) return;
   if (typeof SDL === "object" && SDL.audio && SDL.audio.queueNewAudioData) SDL.audio.queueNewAudioData();
   Browser.mainLoop.scheduler();
  };
  if (!noSetTiming) {
   if (fps && fps > 0) _emscripten_set_main_loop_timing(0, 1e3 / fps); else _emscripten_set_main_loop_timing(1, 1);
   Browser.mainLoop.scheduler();
  }
  if (simulateInfiniteLoop) {
   throw "SimulateInfiniteLoop";
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_main_loop was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var Browser = {
 mainLoop: {
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  pause: function() {
   Browser.mainLoop.scheduler = null;
   Browser.mainLoop.currentlyRunningMainloop++;
  },
  resume: function() {
   Browser.mainLoop.currentlyRunningMainloop++;
   var timingMode = Browser.mainLoop.timingMode;
   var timingValue = Browser.mainLoop.timingValue;
   var func = Browser.mainLoop.func;
   Browser.mainLoop.func = null;
   _emscripten_set_main_loop(func, 0, false, Browser.mainLoop.arg, true);
   _emscripten_set_main_loop_timing(timingMode, timingValue);
   Browser.mainLoop.scheduler();
  },
  updateStatus: function() {
   if (Module["setStatus"]) {
    var message = Module["statusMessage"] || "Please wait...";
    var remaining = Browser.mainLoop.remainingBlockers;
    var expected = Browser.mainLoop.expectedBlockers;
    if (remaining) {
     if (remaining < expected) {
      Module["setStatus"](message + " (" + (expected - remaining) + "/" + expected + ")");
     } else {
      Module["setStatus"](message);
     }
    } else {
     Module["setStatus"]("");
    }
   }
  },
  runIter: function(func) {
   if (ABORT) return;
   if (Module["preMainLoop"]) {
    var preRet = Module["preMainLoop"]();
    if (preRet === false) {
     return;
    }
   }
   try {
    func();
   } catch (e) {
    if (e instanceof ExitStatus) {
     return;
    } else {
     if (e && typeof e === "object" && e.stack) err("exception thrown: " + [ e, e.stack ]);
     throw e;
    }
   }
   if (Module["postMainLoop"]) Module["postMainLoop"]();
  }
 },
 isFullscreen: false,
 pointerLock: false,
 moduleContextCreatedCallbacks: [],
 workers: [],
 init: function() {
  if (!Module["preloadPlugins"]) Module["preloadPlugins"] = [];
  if (Browser.initted) return;
  Browser.initted = true;
  try {
   new Blob();
   Browser.hasBlobConstructor = true;
  } catch (e) {
   Browser.hasBlobConstructor = false;
   console.log("warning: no blob constructor, cannot create blobs with mimetypes");
  }
  Browser.BlobBuilder = typeof MozBlobBuilder != "undefined" ? MozBlobBuilder : typeof WebKitBlobBuilder != "undefined" ? WebKitBlobBuilder : !Browser.hasBlobConstructor ? console.log("warning: no BlobBuilder") : null;
  Browser.URLObject = typeof window != "undefined" ? window.URL ? window.URL : window.webkitURL : undefined;
  if (!Module.noImageDecoding && typeof Browser.URLObject === "undefined") {
   console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available.");
   Module.noImageDecoding = true;
  }
  var imagePlugin = {};
  imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
   return !Module.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(name);
  };
  imagePlugin["handle"] = function imagePlugin_handle(byteArray, name, onload, onerror) {
   var b = null;
   if (Browser.hasBlobConstructor) {
    try {
     b = new Blob([ byteArray ], {
      type: Browser.getMimetype(name)
     });
     if (b.size !== byteArray.length) {
      b = new Blob([ new Uint8Array(byteArray).buffer ], {
       type: Browser.getMimetype(name)
      });
     }
    } catch (e) {
     warnOnce("Blob constructor present but fails: " + e + "; falling back to blob builder");
    }
   }
   if (!b) {
    var bb = new Browser.BlobBuilder();
    bb.append(new Uint8Array(byteArray).buffer);
    b = bb.getBlob();
   }
   var url = Browser.URLObject.createObjectURL(b);
   assert(typeof url == "string", "createObjectURL must return a url as a string");
   var img = new Image();
   img.onload = function img_onload() {
    assert(img.complete, "Image " + name + " could not be decoded");
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    Module["preloadedImages"][name] = canvas;
    Browser.URLObject.revokeObjectURL(url);
    if (onload) onload(byteArray);
   };
   img.onerror = function img_onerror(event) {
    console.log("Image " + url + " could not be decoded");
    if (onerror) onerror();
   };
   img.src = url;
  };
  Module["preloadPlugins"].push(imagePlugin);
  var audioPlugin = {};
  audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
   return !Module.noAudioDecoding && name.substr(-4) in {
    ".ogg": 1,
    ".wav": 1,
    ".mp3": 1
   };
  };
  audioPlugin["handle"] = function audioPlugin_handle(byteArray, name, onload, onerror) {
   var done = false;
   function finish(audio) {
    if (done) return;
    done = true;
    Module["preloadedAudios"][name] = audio;
    if (onload) onload(byteArray);
   }
   function fail() {
    if (done) return;
    done = true;
    Module["preloadedAudios"][name] = new Audio();
    if (onerror) onerror();
   }
   if (Browser.hasBlobConstructor) {
    try {
     var b = new Blob([ byteArray ], {
      type: Browser.getMimetype(name)
     });
    } catch (e) {
     return fail();
    }
    var url = Browser.URLObject.createObjectURL(b);
    assert(typeof url == "string", "createObjectURL must return a url as a string");
    var audio = new Audio();
    audio.addEventListener("canplaythrough", function() {
     finish(audio);
    }, false);
    audio.onerror = function audio_onerror(event) {
     if (done) return;
     console.log("warning: browser could not fully decode audio " + name + ", trying slower base64 approach");
     function encode64(data) {
      var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var PAD = "=";
      var ret = "";
      var leftchar = 0;
      var leftbits = 0;
      for (var i = 0; i < data.length; i++) {
       leftchar = leftchar << 8 | data[i];
       leftbits += 8;
       while (leftbits >= 6) {
        var curr = leftchar >> leftbits - 6 & 63;
        leftbits -= 6;
        ret += BASE[curr];
       }
      }
      if (leftbits == 2) {
       ret += BASE[(leftchar & 3) << 4];
       ret += PAD + PAD;
      } else if (leftbits == 4) {
       ret += BASE[(leftchar & 15) << 2];
       ret += PAD;
      }
      return ret;
     }
     audio.src = "data:audio/x-" + name.substr(-3) + ";base64," + encode64(byteArray);
     finish(audio);
    };
    audio.src = url;
    Browser.safeSetTimeout(function() {
     finish(audio);
    }, 1e4);
   } else {
    return fail();
   }
  };
  Module["preloadPlugins"].push(audioPlugin);
  function pointerLockChange() {
   Browser.pointerLock = document["pointerLockElement"] === Module["canvas"] || document["mozPointerLockElement"] === Module["canvas"] || document["webkitPointerLockElement"] === Module["canvas"] || document["msPointerLockElement"] === Module["canvas"];
  }
  var canvas = Module["canvas"];
  if (canvas) {
   canvas.requestPointerLock = canvas["requestPointerLock"] || canvas["mozRequestPointerLock"] || canvas["webkitRequestPointerLock"] || canvas["msRequestPointerLock"] || function() {};
   canvas.exitPointerLock = document["exitPointerLock"] || document["mozExitPointerLock"] || document["webkitExitPointerLock"] || document["msExitPointerLock"] || function() {};
   canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
   document.addEventListener("pointerlockchange", pointerLockChange, false);
   document.addEventListener("mozpointerlockchange", pointerLockChange, false);
   document.addEventListener("webkitpointerlockchange", pointerLockChange, false);
   document.addEventListener("mspointerlockchange", pointerLockChange, false);
   if (Module["elementPointerLock"]) {
    canvas.addEventListener("click", function(ev) {
     if (!Browser.pointerLock && Module["canvas"].requestPointerLock) {
      Module["canvas"].requestPointerLock();
      ev.preventDefault();
     }
    }, false);
   }
  }
 },
 createContext: function(canvas, useWebGL, setInModule, webGLContextAttributes) {
  if (useWebGL && Module.ctx && canvas == Module.canvas) return Module.ctx;
  var ctx;
  var contextHandle;
  if (useWebGL) {
   var contextAttributes = {
    antialias: false,
    alpha: false,
    majorVersion: 1
   };
   if (webGLContextAttributes) {
    for (var attribute in webGLContextAttributes) {
     contextAttributes[attribute] = webGLContextAttributes[attribute];
    }
   }
   if (typeof GL !== "undefined") {
    contextHandle = GL.createContext(canvas, contextAttributes);
    if (contextHandle) {
     ctx = GL.getContext(contextHandle).GLctx;
    }
   }
  } else {
   ctx = canvas.getContext("2d");
  }
  if (!ctx) return null;
  if (setInModule) {
   if (!useWebGL) assert(typeof GLctx === "undefined", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it");
   Module.ctx = ctx;
   if (useWebGL) GL.makeContextCurrent(contextHandle);
   Module.useWebGL = useWebGL;
   Browser.moduleContextCreatedCallbacks.forEach(function(callback) {
    callback();
   });
   Browser.init();
  }
  return ctx;
 },
 destroyContext: function(canvas, useWebGL, setInModule) {},
 fullscreenHandlersInstalled: false,
 lockPointer: undefined,
 resizeCanvas: undefined,
 requestFullscreen: function(lockPointer, resizeCanvas, vrDevice) {
  Browser.lockPointer = lockPointer;
  Browser.resizeCanvas = resizeCanvas;
  Browser.vrDevice = vrDevice;
  if (typeof Browser.lockPointer === "undefined") Browser.lockPointer = true;
  if (typeof Browser.resizeCanvas === "undefined") Browser.resizeCanvas = false;
  if (typeof Browser.vrDevice === "undefined") Browser.vrDevice = null;
  var canvas = Module["canvas"];
  function fullscreenChange() {
   Browser.isFullscreen = false;
   var canvasContainer = canvas.parentNode;
   if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvasContainer) {
    canvas.exitFullscreen = Browser.exitFullscreen;
    if (Browser.lockPointer) canvas.requestPointerLock();
    Browser.isFullscreen = true;
    if (Browser.resizeCanvas) {
     Browser.setFullscreenCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   } else {
    canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
    canvasContainer.parentNode.removeChild(canvasContainer);
    if (Browser.resizeCanvas) {
     Browser.setWindowedCanvasSize();
    } else {
     Browser.updateCanvasDimensions(canvas);
    }
   }
   if (Module["onFullScreen"]) Module["onFullScreen"](Browser.isFullscreen);
   if (Module["onFullscreen"]) Module["onFullscreen"](Browser.isFullscreen);
  }
  if (!Browser.fullscreenHandlersInstalled) {
   Browser.fullscreenHandlersInstalled = true;
   document.addEventListener("fullscreenchange", fullscreenChange, false);
   document.addEventListener("mozfullscreenchange", fullscreenChange, false);
   document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
   document.addEventListener("MSFullscreenChange", fullscreenChange, false);
  }
  var canvasContainer = document.createElement("div");
  canvas.parentNode.insertBefore(canvasContainer, canvas);
  canvasContainer.appendChild(canvas);
  canvasContainer.requestFullscreen = canvasContainer["requestFullscreen"] || canvasContainer["mozRequestFullScreen"] || canvasContainer["msRequestFullscreen"] || (canvasContainer["webkitRequestFullscreen"] ? function() {
   canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  } : null) || (canvasContainer["webkitRequestFullScreen"] ? function() {
   canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
  } : null);
  if (vrDevice) {
   canvasContainer.requestFullscreen({
    vrDisplay: vrDevice
   });
  } else {
   canvasContainer.requestFullscreen();
  }
 },
 requestFullScreen: function(lockPointer, resizeCanvas, vrDevice) {
  err("Browser.requestFullScreen() is deprecated. Please call Browser.requestFullscreen instead.");
  Browser.requestFullScreen = function(lockPointer, resizeCanvas, vrDevice) {
   return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
  };
  return Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
 },
 exitFullscreen: function() {
  if (!Browser.isFullscreen) {
   return false;
  }
  var CFS = document["exitFullscreen"] || document["cancelFullScreen"] || document["mozCancelFullScreen"] || document["msExitFullscreen"] || document["webkitCancelFullScreen"] || function() {};
  CFS.apply(document, []);
  return true;
 },
 nextRAF: 0,
 fakeRequestAnimationFrame: function(func) {
  var now = Date.now();
  if (Browser.nextRAF === 0) {
   Browser.nextRAF = now + 1e3 / 60;
  } else {
   while (now + 2 >= Browser.nextRAF) {
    Browser.nextRAF += 1e3 / 60;
   }
  }
  var delay = Math.max(Browser.nextRAF - now, 0);
  setTimeout(func, delay);
 },
 requestAnimationFrame: function(func) {
  if (typeof requestAnimationFrame === "function") {
   requestAnimationFrame(func);
   return;
  }
  var RAF = Browser.fakeRequestAnimationFrame;
  RAF(func);
 },
 safeCallback: function(func) {
  return function() {
   if (!ABORT) return func.apply(null, arguments);
  };
 },
 allowAsyncCallbacks: true,
 queuedAsyncCallbacks: [],
 pauseAsyncCallbacks: function() {
  Browser.allowAsyncCallbacks = false;
 },
 resumeAsyncCallbacks: function() {
  Browser.allowAsyncCallbacks = true;
  if (Browser.queuedAsyncCallbacks.length > 0) {
   var callbacks = Browser.queuedAsyncCallbacks;
   Browser.queuedAsyncCallbacks = [];
   callbacks.forEach(function(func) {
    func();
   });
  }
 },
 safeRequestAnimationFrame: function(func) {
  return Browser.requestAnimationFrame(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  });
 },
 safeSetTimeout: function(func, timeout) {
  noExitRuntime = true;
  return setTimeout(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   } else {
    Browser.queuedAsyncCallbacks.push(func);
   }
  }, timeout);
 },
 safeSetInterval: function(func, timeout) {
  noExitRuntime = true;
  return setInterval(function() {
   if (ABORT) return;
   if (Browser.allowAsyncCallbacks) {
    func();
   }
  }, timeout);
 },
 getMimetype: function(name) {
  return {
   "jpg": "image/jpeg",
   "jpeg": "image/jpeg",
   "png": "image/png",
   "bmp": "image/bmp",
   "ogg": "audio/ogg",
   "wav": "audio/wav",
   "mp3": "audio/mpeg"
  }[name.substr(name.lastIndexOf(".") + 1)];
 },
 getUserMedia: function(func) {
  if (!window.getUserMedia) {
   window.getUserMedia = navigator["getUserMedia"] || navigator["mozGetUserMedia"];
  }
  window.getUserMedia(func);
 },
 getMovementX: function(event) {
  return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
 },
 getMovementY: function(event) {
  return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
 },
 getMouseWheelDelta: function(event) {
  var delta = 0;
  switch (event.type) {
  case "DOMMouseScroll":
   delta = event.detail / 3;
   break;

  case "mousewheel":
   delta = event.wheelDelta / 120;
   break;

  case "wheel":
   delta = event.deltaY;
   switch (event.deltaMode) {
   case 0:
    delta /= 100;
    break;

   case 1:
    delta /= 3;
    break;

   case 2:
    delta *= 80;
    break;

   default:
    throw "unrecognized mouse wheel delta mode: " + event.deltaMode;
   }
   break;

  default:
   throw "unrecognized mouse wheel event: " + event.type;
  }
  return delta;
 },
 mouseX: 0,
 mouseY: 0,
 mouseMovementX: 0,
 mouseMovementY: 0,
 touches: {},
 lastTouches: {},
 calculateMouseEvent: function(event) {
  if (Browser.pointerLock) {
   if (event.type != "mousemove" && "mozMovementX" in event) {
    Browser.mouseMovementX = Browser.mouseMovementY = 0;
   } else {
    Browser.mouseMovementX = Browser.getMovementX(event);
    Browser.mouseMovementY = Browser.getMovementY(event);
   }
   if (typeof SDL != "undefined") {
    Browser.mouseX = SDL.mouseX + Browser.mouseMovementX;
    Browser.mouseY = SDL.mouseY + Browser.mouseMovementY;
   } else {
    Browser.mouseX += Browser.mouseMovementX;
    Browser.mouseY += Browser.mouseMovementY;
   }
  } else {
   var rect = Module["canvas"].getBoundingClientRect();
   var cw = Module["canvas"].width;
   var ch = Module["canvas"].height;
   var scrollX = typeof window.scrollX !== "undefined" ? window.scrollX : window.pageXOffset;
   var scrollY = typeof window.scrollY !== "undefined" ? window.scrollY : window.pageYOffset;
   assert(typeof scrollX !== "undefined" && typeof scrollY !== "undefined", "Unable to retrieve scroll position, mouse positions likely broken.");
   if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
    var touch = event.touch;
    if (touch === undefined) {
     return;
    }
    var adjustedX = touch.pageX - (scrollX + rect.left);
    var adjustedY = touch.pageY - (scrollY + rect.top);
    adjustedX = adjustedX * (cw / rect.width);
    adjustedY = adjustedY * (ch / rect.height);
    var coords = {
     x: adjustedX,
     y: adjustedY
    };
    if (event.type === "touchstart") {
     Browser.lastTouches[touch.identifier] = coords;
     Browser.touches[touch.identifier] = coords;
    } else if (event.type === "touchend" || event.type === "touchmove") {
     var last = Browser.touches[touch.identifier];
     if (!last) last = coords;
     Browser.lastTouches[touch.identifier] = last;
     Browser.touches[touch.identifier] = coords;
    }
    return;
   }
   var x = event.pageX - (scrollX + rect.left);
   var y = event.pageY - (scrollY + rect.top);
   x = x * (cw / rect.width);
   y = y * (ch / rect.height);
   Browser.mouseMovementX = x - Browser.mouseX;
   Browser.mouseMovementY = y - Browser.mouseY;
   Browser.mouseX = x;
   Browser.mouseY = y;
  }
 },
 asyncLoad: function(url, onload, onerror, noRunDep) {
  var dep = !noRunDep ? getUniqueRunDependency("al " + url) : "";
  readAsync(url, function(arrayBuffer) {
   assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
   onload(new Uint8Array(arrayBuffer));
   if (dep) removeRunDependency(dep);
  }, function(event) {
   if (onerror) {
    onerror();
   } else {
    throw 'Loading data file "' + url + '" failed.';
   }
  });
  if (dep) addRunDependency(dep);
 },
 resizeListeners: [],
 updateResizeListeners: function() {
  var canvas = Module["canvas"];
  Browser.resizeListeners.forEach(function(listener) {
   listener(canvas.width, canvas.height);
  });
 },
 setCanvasSize: function(width, height, noUpdates) {
  var canvas = Module["canvas"];
  Browser.updateCanvasDimensions(canvas, width, height);
  if (!noUpdates) Browser.updateResizeListeners();
 },
 windowedWidth: 0,
 windowedHeight: 0,
 setFullscreenCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = GROWABLE_HEAP_LOAD_U32(SDL.screen | 0);
   flags = flags | 8388608;
   GROWABLE_HEAP_STORE_I32(SDL.screen | 0, flags);
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 setWindowedCanvasSize: function() {
  if (typeof SDL != "undefined") {
   var flags = GROWABLE_HEAP_LOAD_U32(SDL.screen | 0);
   flags = flags & ~8388608;
   GROWABLE_HEAP_STORE_I32(SDL.screen | 0, flags);
  }
  Browser.updateCanvasDimensions(Module["canvas"]);
  Browser.updateResizeListeners();
 },
 updateCanvasDimensions: function(canvas, wNative, hNative) {
  if (wNative && hNative) {
   canvas.widthNative = wNative;
   canvas.heightNative = hNative;
  } else {
   wNative = canvas.widthNative;
   hNative = canvas.heightNative;
  }
  var w = wNative;
  var h = hNative;
  if (Module["forcedAspectRatio"] && Module["forcedAspectRatio"] > 0) {
   if (w / h < Module["forcedAspectRatio"]) {
    w = Math.round(h * Module["forcedAspectRatio"]);
   } else {
    h = Math.round(w / Module["forcedAspectRatio"]);
   }
  }
  if ((document["fullscreenElement"] || document["mozFullScreenElement"] || document["msFullscreenElement"] || document["webkitFullscreenElement"] || document["webkitCurrentFullScreenElement"]) === canvas.parentNode && typeof screen != "undefined") {
   var factor = Math.min(screen.width / w, screen.height / h);
   w = Math.round(w * factor);
   h = Math.round(h * factor);
  }
  if (Browser.resizeCanvas) {
   if (canvas.width != w) canvas.width = w;
   if (canvas.height != h) canvas.height = h;
   if (typeof canvas.style != "undefined") {
    canvas.style.removeProperty("width");
    canvas.style.removeProperty("height");
   }
  } else {
   if (canvas.width != wNative) canvas.width = wNative;
   if (canvas.height != hNative) canvas.height = hNative;
   if (typeof canvas.style != "undefined") {
    if (w != wNative || h != hNative) {
     canvas.style.setProperty("width", w + "px", "important");
     canvas.style.setProperty("height", h + "px", "important");
    } else {
     canvas.style.removeProperty("width");
     canvas.style.removeProperty("height");
    }
   }
  }
 },
 wgetRequests: {},
 nextWgetRequestHandle: 0,
 getNextWgetRequestHandle: function() {
  var handle = Browser.nextWgetRequestHandle;
  Browser.nextWgetRequestHandle++;
  return handle;
 }
};

function _emscripten_exit_with_live_runtime() {
 var originalAsyncifyState = Asyncify.state;
 try {
  noExitRuntime = true;
  throw "SimulateInfiniteLoop";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_exit_with_live_runtime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_futex_wait(addr, val, timeout) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (addr <= 0 || addr > HEAP8.length || addr & 3 != 0) return -22;
  if (ENVIRONMENT_IS_WORKER) {
   var ret = Atomics.wait(HEAP32, addr >> 2, val, timeout);
   if (ret === "timed-out") return -110;
   if (ret === "not-equal") return -11;
   if (ret === "ok") return 0;
   throw "Atomics.wait returned an unexpected value " + ret;
  } else {
   var loadedVal = Atomics.load(HEAP32, addr >> 2);
   if (val != loadedVal) return -11;
   var tNow = performance.now();
   var tEnd = tNow + timeout;
   Atomics.store(HEAP32, __main_thread_futex_wait_address >> 2, addr);
   var ourWaitAddress = addr;
   while (addr == ourWaitAddress) {
    tNow = performance.now();
    if (tNow > tEnd) {
     return -110;
    }
    _emscripten_main_thread_process_queued_calls();
    addr = Atomics.load(HEAP32, __main_thread_futex_wait_address >> 2);
   }
   return 0;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_futex_wait was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_get_heap_size() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return HEAP8.length;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_get_heap_size was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_has_threading_support() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return typeof SharedArrayBuffer !== "undefined";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_has_threading_support was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_is_main_browser_thread() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return __pthread_is_main_browser_thread | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_is_main_browser_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_is_main_runtime_thread() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return __pthread_is_main_runtime_thread | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_is_main_runtime_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_memcpy_big(dest, src, num) {
 var originalAsyncifyState = Asyncify.state;
 try {
  HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_memcpy_big was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_proxy_to_main_thread_js(index, sync) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var numCallArgs = arguments.length - 2;
  if (numCallArgs > 20 - 1) throw "emscripten_proxy_to_main_thread_js: Too many arguments " + numCallArgs + " to proxied function idx=" + index + ", maximum supported is " + (20 - 1) + "!";
  var stack = stackSave();
  var args = stackAlloc(numCallArgs * 8);
  var b = args >> 3;
  for (var i = 0; i < numCallArgs; i++) {
   GROWABLE_HEAP_STORE_F64((b + i) * 8 | 0, arguments[2 + i]);
  }
  var ret = _emscripten_run_in_main_runtime_thread_js(index, numCallArgs, args, sync);
  stackRestore(stack);
  return ret;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_proxy_to_main_thread_js was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var _emscripten_receive_on_main_thread_js_callArgs = [];

function _emscripten_receive_on_main_thread_js(index, numCallArgs, args) {
 var originalAsyncifyState = Asyncify.state;
 try {
  _emscripten_receive_on_main_thread_js_callArgs.length = numCallArgs;
  var b = args >> 3;
  for (var i = 0; i < numCallArgs; i++) {
   _emscripten_receive_on_main_thread_js_callArgs[i] = GROWABLE_HEAP_LOAD_F64((b + i) * 8 | 0);
  }
  var func = index > 0 ? proxiedFunctionTable[index] : ASM_CONSTS[-index - 1];
  assert(func.length == numCallArgs);
  return func.apply(null, _emscripten_receive_on_main_thread_js_callArgs);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_receive_on_main_thread_js was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_run_script(ptr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  eval(UTF8ToString(ptr));
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_run_script was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_run_script_string(ptr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var s = eval(UTF8ToString(ptr));
  if (s == null) {
   return 0;
  }
  s += "";
  var me = _emscripten_run_script_string;
  var len = lengthBytesUTF8(s);
  if (!me.bufferSize || me.bufferSize < len + 1) {
   if (me.bufferSize) _free(me.buffer);
   me.bufferSize = len + 1;
   me.buffer = _malloc(me.bufferSize);
  }
  stringToUTF8(s, me.buffer, me.bufferSize);
  return me.buffer;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_run_script_string was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var JSEvents = {
 keyEvent: 0,
 mouseEvent: 0,
 wheelEvent: 0,
 uiEvent: 0,
 focusEvent: 0,
 deviceOrientationEvent: 0,
 deviceMotionEvent: 0,
 fullscreenChangeEvent: 0,
 pointerlockChangeEvent: 0,
 visibilityChangeEvent: 0,
 touchEvent: 0,
 previousFullscreenElement: null,
 previousScreenX: null,
 previousScreenY: null,
 removeEventListenersRegistered: false,
 removeAllEventListeners: function() {
  for (var i = JSEvents.eventHandlers.length - 1; i >= 0; --i) {
   JSEvents._removeHandler(i);
  }
  JSEvents.eventHandlers = [];
  JSEvents.deferredCalls = [];
 },
 registerRemoveEventListeners: function() {
  if (!JSEvents.removeEventListenersRegistered) {
   __ATEXIT__.push(JSEvents.removeAllEventListeners);
   JSEvents.removeEventListenersRegistered = true;
  }
 },
 deferredCalls: [],
 deferCall: function(targetFunction, precedence, argsList) {
  function arraysHaveEqualContent(arrA, arrB) {
   if (arrA.length != arrB.length) return false;
   for (var i in arrA) {
    if (arrA[i] != arrB[i]) return false;
   }
   return true;
  }
  for (var i in JSEvents.deferredCalls) {
   var call = JSEvents.deferredCalls[i];
   if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
    return;
   }
  }
  JSEvents.deferredCalls.push({
   targetFunction: targetFunction,
   precedence: precedence,
   argsList: argsList
  });
  JSEvents.deferredCalls.sort(function(x, y) {
   return x.precedence < y.precedence;
  });
 },
 removeDeferredCalls: function(targetFunction) {
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   if (JSEvents.deferredCalls[i].targetFunction == targetFunction) {
    JSEvents.deferredCalls.splice(i, 1);
    --i;
   }
  }
 },
 canPerformEventHandlerRequests: function() {
  return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
 },
 runDeferredCalls: function() {
  if (!JSEvents.canPerformEventHandlerRequests()) {
   return;
  }
  for (var i = 0; i < JSEvents.deferredCalls.length; ++i) {
   var call = JSEvents.deferredCalls[i];
   JSEvents.deferredCalls.splice(i, 1);
   --i;
   call.targetFunction.apply(this, call.argsList);
  }
 },
 inEventHandler: 0,
 currentEventHandler: null,
 eventHandlers: [],
 isInternetExplorer: function() {
  return navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0;
 },
 removeAllHandlersOnTarget: function(target, eventTypeString) {
  for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
   if (JSEvents.eventHandlers[i].target == target && (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
    JSEvents._removeHandler(i--);
   }
  }
 },
 _removeHandler: function(i) {
  var h = JSEvents.eventHandlers[i];
  h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
  JSEvents.eventHandlers.splice(i, 1);
 },
 registerOrRemoveHandler: function(eventHandler) {
  var jsEventHandler = function jsEventHandler(event) {
   ++JSEvents.inEventHandler;
   JSEvents.currentEventHandler = eventHandler;
   JSEvents.runDeferredCalls();
   eventHandler.handlerFunc(event);
   JSEvents.runDeferredCalls();
   --JSEvents.inEventHandler;
  };
  if (eventHandler.callbackfunc) {
   eventHandler.eventListenerFunc = jsEventHandler;
   eventHandler.target.addEventListener(eventHandler.eventTypeString, jsEventHandler, eventHandler.useCapture);
   JSEvents.eventHandlers.push(eventHandler);
   JSEvents.registerRemoveEventListeners();
  } else {
   for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
    if (JSEvents.eventHandlers[i].target == eventHandler.target && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
     JSEvents._removeHandler(i--);
    }
   }
  }
 },
 queueEventHandlerOnThread_iiii: function(targetThread, eventHandlerFunc, eventTypeId, eventData, userData) {
  var stackTop = stackSave();
  var varargs = stackAlloc(12);
  GROWABLE_HEAP_STORE_I32(varargs | 0, eventTypeId);
  GROWABLE_HEAP_STORE_I32(varargs + 4 | 0, eventData);
  GROWABLE_HEAP_STORE_I32(varargs + 8 | 0, userData);
  _emscripten_async_queue_on_thread_(targetThread, 637534208, eventHandlerFunc, eventData, varargs);
  stackRestore(stackTop);
 },
 getTargetThreadForEventCallback: function(targetThread) {
  switch (targetThread) {
  case 1:
   return 0;

  case 2:
   return PThread.currentProxiedOperationCallerThread;

  default:
   return targetThread;
  }
 },
 getBoundingClientRectOrZeros: function(target) {
  return target.getBoundingClientRect ? target.getBoundingClientRect() : {
   left: 0,
   top: 0
  };
 },
 pageScrollPos: function() {
  if (pageXOffset > 0 || pageYOffset > 0) {
   return [ pageXOffset, pageYOffset ];
  }
  if (typeof document.documentElement.scrollLeft !== "undefined" || typeof document.documentElement.scrollTop !== "undefined") {
   return [ document.documentElement.scrollLeft, document.documentElement.scrollTop ];
  }
  return [ document.body.scrollLeft | 0, document.body.scrollTop | 0 ];
 },
 getNodeNameForTarget: function(target) {
  if (!target) return "";
  if (target == window) return "#window";
  if (target == screen) return "#screen";
  return target && target.nodeName ? target.nodeName : "";
 },
 tick: function() {
  if (window["performance"] && window["performance"]["now"]) return window["performance"]["now"](); else return Date.now();
 },
 fullscreenEnabled: function() {
  return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
 }
};

function stringToNewUTF8(jsString) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var length = lengthBytesUTF8(jsString) + 1;
  var cString = _malloc(length);
  stringToUTF8(jsString, cString, length);
  return cString;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $stringToNewUTF8 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_offscreencanvas_size_on_target_thread_js(targetThread, targetCanvas, width, height) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var stackTop = stackSave();
  var varargs = stackAlloc(12);
  var targetCanvasPtr = 0;
  if (targetCanvas) {
   targetCanvasPtr = stringToNewUTF8(targetCanvas);
  }
  GROWABLE_HEAP_STORE_I32(varargs | 0, targetCanvasPtr);
  GROWABLE_HEAP_STORE_I32(varargs + 4 | 0, width);
  GROWABLE_HEAP_STORE_I32(varargs + 8 | 0, height);
  _emscripten_async_queue_on_thread_(targetThread, 657457152, 0, targetCanvasPtr, varargs);
  stackRestore(stackTop);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_offscreencanvas_size_on_target_thread_js was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_offscreencanvas_size_on_target_thread(targetThread, targetCanvas, width, height) {
 var originalAsyncifyState = Asyncify.state;
 try {
  targetCanvas = targetCanvas ? UTF8ToString(targetCanvas) : "";
  _emscripten_set_offscreencanvas_size_on_target_thread_js(targetThread, targetCanvas, width, height);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_offscreencanvas_size_on_target_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var __specialEventTargets = [ 0, typeof document !== "undefined" ? document : 0, typeof window !== "undefined" ? window : 0 ];

function __findEventTarget(target) {
 var originalAsyncifyState = Asyncify.state;
 try {
  warnOnce("Rules for selecting event targets in HTML5 API are changing: instead of using document.getElementById() that only can refer to elements by their DOM ID, new event target selection mechanism uses the more flexible function document.querySelector() that can look up element names, classes, and complex CSS selectors. Build with -s DISABLE_DEPRECATED_FIND_EVENT_TARGET_BEHAVIOR=1 to change to the new lookup rules. See https://github.com/emscripten-core/emscripten/pull/7977 for more details.");
  try {
   if (!target) return window;
   if (typeof target === "number") target = __specialEventTargets[target] || UTF8ToString(target);
   if (target === "#window") return window; else if (target === "#document") return document; else if (target === "#screen") return screen; else if (target === "#canvas") return Module["canvas"];
   return typeof target === "string" ? document.getElementById(target) : target;
  } catch (e) {
   return null;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _findEventTarget was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __findCanvasEventTarget(target) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (typeof target === "number") target = UTF8ToString(target);
  if (!target || target === "#canvas") {
   if (typeof GL !== "undefined" && GL.offscreenCanvases["canvas"]) return GL.offscreenCanvases["canvas"];
   return Module["canvas"];
  }
  if (typeof GL !== "undefined" && GL.offscreenCanvases[target]) return GL.offscreenCanvases[target];
  return __findEventTarget(target);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _findCanvasEventTarget was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_canvas_element_size_calling_thread(target, width, height) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var canvas = __findCanvasEventTarget(target);
  if (!canvas) return -4;
  if (canvas.canvasSharedPtr) {
   GROWABLE_HEAP_STORE_I32(canvas.canvasSharedPtr | 0, width);
   GROWABLE_HEAP_STORE_I32(canvas.canvasSharedPtr + 4 | 0, height);
  }
  if (canvas.offscreenCanvas || !canvas.controlTransferredOffscreen) {
   if (canvas.offscreenCanvas) canvas = canvas.offscreenCanvas;
   var autoResizeViewport = false;
   if (canvas.GLctxObject && canvas.GLctxObject.GLctx) {
    var prevViewport = canvas.GLctxObject.GLctx.getParameter(canvas.GLctxObject.GLctx.VIEWPORT);
    autoResizeViewport = prevViewport[0] === 0 && prevViewport[1] === 0 && prevViewport[2] === canvas.width && prevViewport[3] === canvas.height;
   }
   canvas.width = width;
   canvas.height = height;
   if (autoResizeViewport) {
    canvas.GLctxObject.GLctx.viewport(0, 0, width, height);
   }
  } else if (canvas.canvasSharedPtr) {
   var targetThread = GROWABLE_HEAP_LOAD_I32(canvas.canvasSharedPtr + 8 | 0);
   _emscripten_set_offscreencanvas_size_on_target_thread(targetThread, target, width, height);
   return 1;
  } else {
   return -4;
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_canvas_element_size_calling_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_canvas_element_size_main_thread(target, width, height) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(85, 1, target, width, height);
 var originalAsyncifyState = Asyncify.state;
 try {
  return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_canvas_element_size_main_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_canvas_element_size(target, width, height) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var canvas = __findCanvasEventTarget(target);
  if (canvas) {
   return _emscripten_set_canvas_element_size_calling_thread(target, width, height);
  } else {
   return _emscripten_set_canvas_element_size_main_thread(target, width, height);
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_canvas_element_size was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_current_thread_status(newStatus) {
 var originalAsyncifyState = Asyncify.state;
 try {
  newStatus = newStatus | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_current_thread_status was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_set_thread_name(threadId, name) {
 var originalAsyncifyState = Asyncify.state;
 try {
  threadId = threadId | 0;
  name = name | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_set_thread_name was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_sleep(ms) {
 Asyncify.handleSleep(function(wakeUp) {
  Browser.safeSetTimeout(wakeUp, ms);
 });
}

function _emscripten_syscall(which, varargs) {
 var originalAsyncifyState = Asyncify.state;
 try {
  switch (which) {
  case 10:
   return ___syscall10(which, varargs);

  case 118:
   return ___syscall118(which, varargs);

  case 12:
   return ___syscall12(which, varargs);

  case 122:
   return ___syscall122(which, varargs);

  case 132:
   return ___syscall132(which, varargs);

  case 133:
   return ___syscall133(which, varargs);

  case 14:
   return ___syscall14(which, varargs);

  case 140:
   return ___syscall140(which, varargs);

  case 142:
   return ___syscall142(which, varargs);

  case 144:
   return ___syscall144(which, varargs);

  case 145:
   return ___syscall145(which, varargs);

  case 146:
   return ___syscall146(which, varargs);

  case 147:
   return ___syscall147(which, varargs);

  case 148:
   return ___syscall148(which, varargs);

  case 15:
   return ___syscall15(which, varargs);

  case 163:
   return ___syscall163(which, varargs);

  case 180:
   return ___syscall180(which, varargs);

  case 181:
   return ___syscall181(which, varargs);

  case 183:
   return ___syscall183(which, varargs);

  case 191:
   return ___syscall191(which, varargs);

  case 192:
   return ___syscall192(which, varargs);

  case 193:
   return ___syscall193(which, varargs);

  case 194:
   return ___syscall194(which, varargs);

  case 195:
   return ___syscall195(which, varargs);

  case 196:
   return ___syscall196(which, varargs);

  case 197:
   return ___syscall197(which, varargs);

  case 198:
   return ___syscall198(which, varargs);

  case 199:
   return ___syscall199(which, varargs);

  case 20:
   return ___syscall20(which, varargs);

  case 200:
   return ___syscall200(which, varargs);

  case 201:
   return ___syscall201(which, varargs);

  case 202:
   return ___syscall202(which, varargs);

  case 205:
   return ___syscall205(which, varargs);

  case 207:
   return ___syscall207(which, varargs);

  case 209:
   return ___syscall209(which, varargs);

  case 211:
   return ___syscall211(which, varargs);

  case 212:
   return ___syscall212(which, varargs);

  case 220:
   return ___syscall220(which, varargs);

  case 221:
   return ___syscall221(which, varargs);

  case 268:
   return ___syscall268(which, varargs);

  case 269:
   return ___syscall269(which, varargs);

  case 272:
   return ___syscall272(which, varargs);

  case 29:
   return ___syscall29(which, varargs);

  case 295:
   return ___syscall295(which, varargs);

  case 296:
   return ___syscall296(which, varargs);

  case 297:
   return ___syscall297(which, varargs);

  case 298:
   return ___syscall298(which, varargs);

  case 3:
   return ___syscall3(which, varargs);

  case 300:
   return ___syscall300(which, varargs);

  case 301:
   return ___syscall301(which, varargs);

  case 302:
   return ___syscall302(which, varargs);

  case 303:
   return ___syscall303(which, varargs);

  case 304:
   return ___syscall304(which, varargs);

  case 305:
   return ___syscall305(which, varargs);

  case 306:
   return ___syscall306(which, varargs);

  case 320:
   return ___syscall320(which, varargs);

  case 324:
   return ___syscall324(which, varargs);

  case 33:
   return ___syscall33(which, varargs);

  case 330:
   return ___syscall330(which, varargs);

  case 331:
   return ___syscall331(which, varargs);

  case 34:
   return ___syscall34(which, varargs);

  case 340:
   return ___syscall340(which, varargs);

  case 36:
   return ___syscall36(which, varargs);

  case 38:
   return ___syscall38(which, varargs);

  case 39:
   return ___syscall39(which, varargs);

  case 4:
   return ___syscall4(which, varargs);

  case 40:
   return ___syscall40(which, varargs);

  case 41:
   return ___syscall41(which, varargs);

  case 42:
   return ___syscall42(which, varargs);

  case 5:
   return ___syscall5(which, varargs);

  case 54:
   return ___syscall54(which, varargs);

  case 57:
   return ___syscall57(which, varargs);

  case 6:
   return ___syscall6(which, varargs);

  case 60:
   return ___syscall60(which, varargs);

  case 63:
   return ___syscall63(which, varargs);

  case 64:
   return ___syscall64(which, varargs);

  case 66:
   return ___syscall66(which, varargs);

  case 75:
   return ___syscall75(which, varargs);

  case 77:
   return ___syscall77(which, varargs);

  case 83:
   return ___syscall83(which, varargs);

  case 85:
   return ___syscall85(which, varargs);

  case 9:
   return ___syscall9(which, varargs);

  case 91:
   return ___syscall91(which, varargs);

  case 94:
   return ___syscall94(which, varargs);

  case 96:
   return ___syscall96(which, varargs);

  case 97:
   return ___syscall97(which, varargs);

  default:
   throw "surprising proxied syscall: " + which;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_syscall was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var GL = {
 counter: 1,
 lastError: 0,
 buffers: [],
 mappedBuffers: {},
 programs: [],
 framebuffers: [],
 renderbuffers: [],
 textures: [],
 uniforms: [],
 shaders: [],
 vaos: [],
 contexts: {},
 currentContext: null,
 offscreenCanvases: {},
 timerQueriesEXT: [],
 programInfos: {},
 stringCache: {},
 unpackAlignment: 4,
 init: function() {
  GL.miniTempBuffer = new Float32Array(GL.MINI_TEMP_BUFFER_SIZE);
  for (var i = 0; i < GL.MINI_TEMP_BUFFER_SIZE; i++) {
   GL.miniTempBufferViews[i] = GL.miniTempBuffer.subarray(0, i + 1);
  }
 },
 recordError: function recordError(errorCode) {
  if (!GL.lastError) {
   GL.lastError = errorCode;
  }
 },
 getNewId: function(table) {
  var ret = GL.counter++;
  for (var i = table.length; i < ret; i++) {
   table[i] = null;
  }
  return ret;
 },
 MINI_TEMP_BUFFER_SIZE: 256,
 miniTempBuffer: null,
 miniTempBufferViews: [ 0 ],
 getSource: function(shader, count, string, length) {
  var source = "";
  for (var i = 0; i < count; ++i) {
   var len = length ? GROWABLE_HEAP_LOAD_I32(length + i * 4 | 0) : -1;
   source += UTF8ToString(GROWABLE_HEAP_LOAD_I32(string + i * 4 | 0), len < 0 ? undefined : len);
  }
  return source;
 },
 createContext: function(canvas, webGLContextAttributes) {
  var ctx = canvas.getContext("webgl", webGLContextAttributes) || canvas.getContext("experimental-webgl", webGLContextAttributes);
  return ctx ? GL.registerContext(ctx, webGLContextAttributes) : 0;
 },
 registerContext: function(ctx, webGLContextAttributes) {
  var handle = _malloc(8);
  GROWABLE_HEAP_STORE_I32(handle + 4 | 0, _pthread_self());
  var context = {
   handle: handle,
   attributes: webGLContextAttributes,
   version: webGLContextAttributes.majorVersion,
   GLctx: ctx
  };
  if (ctx.canvas) ctx.canvas.GLctxObject = context;
  GL.contexts[handle] = context;
  if (typeof webGLContextAttributes.enableExtensionsByDefault === "undefined" || webGLContextAttributes.enableExtensionsByDefault) {
   GL.initExtensions(context);
  }
  return handle;
 },
 makeContextCurrent: function(contextHandle) {
  GL.currentContext = GL.contexts[contextHandle];
  Module.ctx = GLctx = GL.currentContext && GL.currentContext.GLctx;
  return !(contextHandle && !GLctx);
 },
 getContext: function(contextHandle) {
  return GL.contexts[contextHandle];
 },
 deleteContext: function(contextHandle) {
  if (GL.currentContext === GL.contexts[contextHandle]) GL.currentContext = null;
  if (typeof JSEvents === "object") JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
  if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
  _free(GL.contexts[contextHandle]);
  GL.contexts[contextHandle] = null;
 },
 acquireInstancedArraysExtension: function(ctx) {
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  if (ext) {
   ctx["vertexAttribDivisor"] = function(index, divisor) {
    ext["vertexAttribDivisorANGLE"](index, divisor);
   };
   ctx["drawArraysInstanced"] = function(mode, first, count, primcount) {
    ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
   };
   ctx["drawElementsInstanced"] = function(mode, count, type, indices, primcount) {
    ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
   };
  }
 },
 acquireVertexArrayObjectExtension: function(ctx) {
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
   ctx["createVertexArray"] = function() {
    return ext["createVertexArrayOES"]();
   };
   ctx["deleteVertexArray"] = function(vao) {
    ext["deleteVertexArrayOES"](vao);
   };
   ctx["bindVertexArray"] = function(vao) {
    ext["bindVertexArrayOES"](vao);
   };
   ctx["isVertexArray"] = function(vao) {
    return ext["isVertexArrayOES"](vao);
   };
  }
 },
 acquireDrawBuffersExtension: function(ctx) {
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
   ctx["drawBuffers"] = function(n, bufs) {
    ext["drawBuffersWEBGL"](n, bufs);
   };
  }
 },
 initExtensions: function(context) {
  if (!context) context = GL.currentContext;
  if (context.initExtensionsDone) return;
  context.initExtensionsDone = true;
  var GLctx = context.GLctx;
  if (context.version < 2) {
   GL.acquireInstancedArraysExtension(GLctx);
   GL.acquireVertexArrayObjectExtension(GLctx);
   GL.acquireDrawBuffersExtension(GLctx);
  }
  GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
  var automaticallyEnabledExtensions = [ "OES_texture_float", "OES_texture_half_float", "OES_standard_derivatives", "OES_vertex_array_object", "WEBGL_compressed_texture_s3tc", "WEBGL_depth_texture", "OES_element_index_uint", "EXT_texture_filter_anisotropic", "EXT_frag_depth", "WEBGL_draw_buffers", "ANGLE_instanced_arrays", "OES_texture_float_linear", "OES_texture_half_float_linear", "EXT_blend_minmax", "EXT_shader_texture_lod", "WEBGL_compressed_texture_pvrtc", "EXT_color_buffer_half_float", "WEBGL_color_buffer_float", "EXT_sRGB", "WEBGL_compressed_texture_etc1", "EXT_disjoint_timer_query", "WEBGL_compressed_texture_etc", "WEBGL_compressed_texture_astc", "EXT_color_buffer_float", "WEBGL_compressed_texture_s3tc_srgb", "EXT_disjoint_timer_query_webgl2" ];
  var exts = GLctx.getSupportedExtensions() || [];
  exts.forEach(function(ext) {
   if (automaticallyEnabledExtensions.indexOf(ext) != -1) {
    GLctx.getExtension(ext);
   }
  });
 },
 populateUniformTable: function(program) {
  var p = GL.programs[program];
  var ptable = GL.programInfos[program] = {
   uniforms: {},
   maxUniformLength: 0,
   maxAttributeLength: -1,
   maxUniformBlockNameLength: -1
  };
  var utable = ptable.uniforms;
  var numUniforms = GLctx.getProgramParameter(p, 35718);
  for (var i = 0; i < numUniforms; ++i) {
   var u = GLctx.getActiveUniform(p, i);
   var name = u.name;
   ptable.maxUniformLength = Math.max(ptable.maxUniformLength, name.length + 1);
   if (name.slice(-1) == "]") {
    name = name.slice(0, name.lastIndexOf("["));
   }
   var loc = GLctx.getUniformLocation(p, name);
   if (loc) {
    var id = GL.getNewId(GL.uniforms);
    utable[name] = [ u.size, id ];
    GL.uniforms[id] = loc;
    for (var j = 1; j < u.size; ++j) {
     var n = name + "[" + j + "]";
     loc = GLctx.getUniformLocation(p, n);
     id = GL.getNewId(GL.uniforms);
     GL.uniforms[id] = loc;
    }
   }
  }
 }
};

var __emscripten_webgl_power_preferences = [ "default", "low-power", "high-performance" ];

function _emscripten_webgl_do_create_context(target, attributes) {
 var originalAsyncifyState = Asyncify.state;
 try {
  assert(attributes);
  var contextAttributes = {};
  var a = attributes >> 2;
  contextAttributes["alpha"] = !!GROWABLE_HEAP_LOAD_I32((a + (0 >> 2)) * 4 | 0);
  contextAttributes["depth"] = !!GROWABLE_HEAP_LOAD_I32((a + (4 >> 2)) * 4 | 0);
  contextAttributes["stencil"] = !!GROWABLE_HEAP_LOAD_I32((a + (8 >> 2)) * 4 | 0);
  contextAttributes["antialias"] = !!GROWABLE_HEAP_LOAD_I32((a + (12 >> 2)) * 4 | 0);
  contextAttributes["premultipliedAlpha"] = !!GROWABLE_HEAP_LOAD_I32((a + (16 >> 2)) * 4 | 0);
  contextAttributes["preserveDrawingBuffer"] = !!GROWABLE_HEAP_LOAD_I32((a + (20 >> 2)) * 4 | 0);
  var powerPreference = GROWABLE_HEAP_LOAD_I32((a + (24 >> 2)) * 4 | 0);
  contextAttributes["powerPreference"] = __emscripten_webgl_power_preferences[powerPreference];
  contextAttributes["failIfMajorPerformanceCaveat"] = !!GROWABLE_HEAP_LOAD_I32((a + (28 >> 2)) * 4 | 0);
  contextAttributes.majorVersion = GROWABLE_HEAP_LOAD_I32((a + (32 >> 2)) * 4 | 0);
  contextAttributes.minorVersion = GROWABLE_HEAP_LOAD_I32((a + (36 >> 2)) * 4 | 0);
  contextAttributes.enableExtensionsByDefault = GROWABLE_HEAP_LOAD_I32((a + (40 >> 2)) * 4 | 0);
  contextAttributes.explicitSwapControl = GROWABLE_HEAP_LOAD_I32((a + (44 >> 2)) * 4 | 0);
  contextAttributes.proxyContextToMainThread = GROWABLE_HEAP_LOAD_I32((a + (48 >> 2)) * 4 | 0);
  contextAttributes.renderViaOffscreenBackBuffer = GROWABLE_HEAP_LOAD_I32((a + (52 >> 2)) * 4 | 0);
  var canvas = __findCanvasEventTarget(target);
  if (!canvas) {
   return 0;
  }
  if (contextAttributes.explicitSwapControl) {
   return 0;
  }
  var contextHandle = GL.createContext(canvas, contextAttributes);
  return contextHandle;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_webgl_do_create_context was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_webgl_create_context(a0, a1) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _emscripten_webgl_do_create_context(a0, a1);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_webgl_create_context was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _endpwent() {
 var originalAsyncifyState = Asyncify.state;
 try {
  throw "endpwent: TODO";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import endpwent was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _execl() {
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(8);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import execl was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _execv() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _execl.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import execv was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _execve() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _execl.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import execve was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _fexecve() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _execl.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import fexecve was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _flock(fd, operation) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import flock was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _fork() {
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(11);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import fork was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _fpathconf(fildes, name) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(86, 1, fildes, name);
 var originalAsyncifyState = Asyncify.state;
 try {
  switch (name) {
  case 0:
   return 32e3;

  case 1:
  case 2:
  case 3:
   return 255;

  case 4:
  case 5:
  case 16:
  case 17:
  case 18:
   return 4096;

  case 6:
  case 7:
  case 20:
   return 1;

  case 8:
   return 0;

  case 9:
  case 10:
  case 11:
  case 12:
  case 14:
  case 15:
  case 19:
   return -1;

  case 13:
   return 64;
  }
  ___setErrNo(22);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import fpathconf was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _getenv(name) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(87, 1, name);
 var originalAsyncifyState = Asyncify.state;
 try {
  if (name === 0) return 0;
  name = UTF8ToString(name);
  if (!ENV.hasOwnProperty(name)) return 0;
  if (_getenv.ret) _free(_getenv.ret);
  _getenv.ret = allocateUTF8(ENV[name]);
  return _getenv.ret;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import getenv was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _getitimer() {
 var originalAsyncifyState = Asyncify.state;
 try {
  throw "getitimer() is not implemented yet";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import getitimer was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _getloadavg(loadavg, nelem) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var limit = Math.min(nelem, 3);
  var doubleSize = 8;
  for (var i = 0; i < limit; i++) {
   GROWABLE_HEAP_STORE_F64(loadavg + i * doubleSize | 0, .1);
  }
  return limit;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import getloadavg was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _getpwent() {
 var originalAsyncifyState = Asyncify.state;
 try {
  throw "getpwent: TODO";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import getpwent was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _getpwnam() {
 var originalAsyncifyState = Asyncify.state;
 try {
  throw "getpwnam: TODO";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import getpwnam was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _getpwuid(uid) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import getpwuid was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _gettimeofday(ptr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var now = Date.now();
  GROWABLE_HEAP_STORE_I32(ptr | 0, now / 1e3 | 0);
  GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, now % 1e3 * 1e3 | 0);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import gettimeofday was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var ___tm_current;

if (ENVIRONMENT_IS_PTHREAD) ___tm_current = PthreadWorkerInit.___tm_current; else PthreadWorkerInit.___tm_current = ___tm_current = 1718752;

var ___tm_timezone;

if (ENVIRONMENT_IS_PTHREAD) ___tm_timezone = PthreadWorkerInit.___tm_timezone; else PthreadWorkerInit.___tm_timezone = ___tm_timezone = (stringToUTF8("GMT", 1718800, 4), 
1718800);

function _gmtime_r(time, tmPtr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var date = new Date(GROWABLE_HEAP_LOAD_I32(time | 0) * 1e3);
  GROWABLE_HEAP_STORE_I32(tmPtr | 0, date.getUTCSeconds());
  GROWABLE_HEAP_STORE_I32(tmPtr + 4 | 0, date.getUTCMinutes());
  GROWABLE_HEAP_STORE_I32(tmPtr + 8 | 0, date.getUTCHours());
  GROWABLE_HEAP_STORE_I32(tmPtr + 12 | 0, date.getUTCDate());
  GROWABLE_HEAP_STORE_I32(tmPtr + 16 | 0, date.getUTCMonth());
  GROWABLE_HEAP_STORE_I32(tmPtr + 20 | 0, date.getUTCFullYear() - 1900);
  GROWABLE_HEAP_STORE_I32(tmPtr + 24 | 0, date.getUTCDay());
  GROWABLE_HEAP_STORE_I32(tmPtr + 36 | 0, 0);
  GROWABLE_HEAP_STORE_I32(tmPtr + 32 | 0, 0);
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  var yday = (date.getTime() - start) / (1e3 * 60 * 60 * 24) | 0;
  GROWABLE_HEAP_STORE_I32(tmPtr + 28 | 0, yday);
  GROWABLE_HEAP_STORE_I32(tmPtr + 40 | 0, ___tm_timezone);
  return tmPtr;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import gmtime_r was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _gmtime(time) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _gmtime_r(time, ___tm_current);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import gmtime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _kill(pid, sig) {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of kill()");
  ___setErrNo(ERRNO_CODES.EPERM);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import kill was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _killpg() {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of killpg()");
  ___setErrNo(ERRNO_CODES.EPERM);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import killpg was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _tzset() {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(88, 1);
 var originalAsyncifyState = Asyncify.state;
 try {
  if (_tzset.called) return;
  _tzset.called = true;
  GROWABLE_HEAP_STORE_I32(__get_timezone() | 0, new Date().getTimezoneOffset() * 60);
  var winter = new Date(2e3, 0, 1);
  var summer = new Date(2e3, 6, 1);
  GROWABLE_HEAP_STORE_I32(__get_daylight() | 0, Number(winter.getTimezoneOffset() != summer.getTimezoneOffset()));
  function extractZone(date) {
   var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
   return match ? match[1] : "GMT";
  }
  var winterName = extractZone(winter);
  var summerName = extractZone(summer);
  var winterNamePtr = allocate(intArrayFromString(winterName), "i8", ALLOC_NORMAL);
  var summerNamePtr = allocate(intArrayFromString(summerName), "i8", ALLOC_NORMAL);
  if (summer.getTimezoneOffset() < winter.getTimezoneOffset()) {
   GROWABLE_HEAP_STORE_I32(__get_tzname() | 0, winterNamePtr);
   GROWABLE_HEAP_STORE_I32(__get_tzname() + 4 | 0, summerNamePtr);
  } else {
   GROWABLE_HEAP_STORE_I32(__get_tzname() | 0, summerNamePtr);
   GROWABLE_HEAP_STORE_I32(__get_tzname() + 4 | 0, winterNamePtr);
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import tzset was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _localtime_r(time, tmPtr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  _tzset();
  var date = new Date(GROWABLE_HEAP_LOAD_I32(time | 0) * 1e3);
  GROWABLE_HEAP_STORE_I32(tmPtr | 0, date.getSeconds());
  GROWABLE_HEAP_STORE_I32(tmPtr + 4 | 0, date.getMinutes());
  GROWABLE_HEAP_STORE_I32(tmPtr + 8 | 0, date.getHours());
  GROWABLE_HEAP_STORE_I32(tmPtr + 12 | 0, date.getDate());
  GROWABLE_HEAP_STORE_I32(tmPtr + 16 | 0, date.getMonth());
  GROWABLE_HEAP_STORE_I32(tmPtr + 20 | 0, date.getFullYear() - 1900);
  GROWABLE_HEAP_STORE_I32(tmPtr + 24 | 0, date.getDay());
  var start = new Date(date.getFullYear(), 0, 1);
  var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
  GROWABLE_HEAP_STORE_I32(tmPtr + 28 | 0, yday);
  GROWABLE_HEAP_STORE_I32(tmPtr + 36 | 0, -(date.getTimezoneOffset() * 60));
  var summerOffset = new Date(2e3, 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
  GROWABLE_HEAP_STORE_I32(tmPtr + 32 | 0, dst);
  var zonePtr = GROWABLE_HEAP_LOAD_I32(__get_tzname() + (dst ? 4 : 0) | 0);
  GROWABLE_HEAP_STORE_I32(tmPtr + 40 | 0, zonePtr);
  return tmPtr;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import localtime_r was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _localtime(time) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _localtime_r(time, ___tm_current);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import localtime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _mktime(tmPtr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  _tzset();
  var date = new Date(GROWABLE_HEAP_LOAD_I32(tmPtr + 20 | 0) + 1900, GROWABLE_HEAP_LOAD_I32(tmPtr + 16 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr + 12 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr + 8 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr + 4 | 0), GROWABLE_HEAP_LOAD_I32(tmPtr | 0), 0);
  var dst = GROWABLE_HEAP_LOAD_I32(tmPtr + 32 | 0);
  var guessedOffset = date.getTimezoneOffset();
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(2e3, 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dstOffset = Math.min(winterOffset, summerOffset);
  if (dst < 0) {
   GROWABLE_HEAP_STORE_I32(tmPtr + 32 | 0, Number(summerOffset != winterOffset && dstOffset == guessedOffset));
  } else if (dst > 0 != (dstOffset == guessedOffset)) {
   var nonDstOffset = Math.max(winterOffset, summerOffset);
   var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
   date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
  }
  GROWABLE_HEAP_STORE_I32(tmPtr + 24 | 0, date.getDay());
  var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
  GROWABLE_HEAP_STORE_I32(tmPtr + 28 | 0, yday);
  return date.getTime() / 1e3 | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import mktime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pathconf() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _fpathconf.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pathconf was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_cleanup_pop(execute) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var routine = PThread.exitHandlers.pop();
  if (execute) routine();
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_cleanup_pop was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_cleanup_push(routine, arg) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (PThread.exitHandlers === null) {
   PThread.exitHandlers = [];
   if (!ENVIRONMENT_IS_PTHREAD) {
    __ATEXIT__.push(function() {
     PThread.runExitHandlers();
    });
   }
  }
  PThread.exitHandlers.push(function() {
   dynCall_vi(routine, arg);
  });
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_cleanup_push was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __spawn_thread(threadParams) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _spawn_thread() can only ever be called from main application thread!";
  var worker = PThread.getNewWorker();
  if (worker.pthread !== undefined) throw "Internal error!";
  if (!threadParams.pthread_ptr) throw "Internal error, no pthread ptr!";
  PThread.runningWorkers.push(worker);
  var tlsMemory = _malloc(128 * 4);
  for (var i = 0; i < 128; ++i) {
   GROWABLE_HEAP_STORE_I32(tlsMemory + i * 4 | 0, 0);
  }
  var stackHigh = threadParams.stackBase + threadParams.stackSize;
  var pthread = PThread.pthreads[threadParams.pthread_ptr] = {
   worker: worker,
   stackBase: threadParams.stackBase,
   stackSize: threadParams.stackSize,
   allocatedOwnStack: threadParams.allocatedOwnStack,
   thread: threadParams.pthread_ptr,
   threadInfoStruct: threadParams.pthread_ptr
  };
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 0 >> 2, 0);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 4 >> 2, 0);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 20 >> 2, 0);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 80 >> 2, threadParams.detached);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 116 >> 2, tlsMemory);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 60 >> 2, 0);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 52 >> 2, pthread.threadInfoStruct);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 56 >> 2, PROCINFO.pid);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 >> 2, threadParams.stackSize);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 96 >> 2, threadParams.stackSize);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 92 >> 2, stackHigh);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 8 >> 2, stackHigh);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 12 >> 2, threadParams.detached);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 20 >> 2, threadParams.schedPolicy);
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 120 + 24 >> 2, threadParams.schedPrio);
  var global_libc = _emscripten_get_global_libc();
  var global_locale = global_libc + 40;
  Atomics.store(HEAPU32, pthread.threadInfoStruct + 188 >> 2, global_locale);
  worker.pthread = pthread;
  var msg = {
   cmd: "run",
   start_routine: threadParams.startRoutine,
   arg: threadParams.arg,
   threadInfoStruct: threadParams.pthread_ptr,
   selfThreadId: threadParams.pthread_ptr,
   parentThreadId: threadParams.parent_pthread_ptr,
   stackBase: threadParams.stackBase,
   stackSize: threadParams.stackSize
  };
  worker.runPthread = function() {
   msg.time = performance.now();
   worker.postMessage(msg, threadParams.transferList);
  };
  if (worker.loaded) {
   worker.runPthread();
   delete worker.runPthread;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _spawn_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_getschedparam(thread, policy, schedparam) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (!policy && !schedparam) return ERRNO_CODES.EINVAL;
  if (!thread) {
   err("pthread_getschedparam called with a null thread pointer!");
   return ERRNO_CODES.ESRCH;
  }
  var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
  if (self !== thread) {
   err("pthread_getschedparam attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
   return ERRNO_CODES.ESRCH;
  }
  var schedPolicy = Atomics.load(HEAPU32, thread + 120 + 20 >> 2);
  var schedPrio = Atomics.load(HEAPU32, thread + 120 + 24 >> 2);
  if (policy) GROWABLE_HEAP_STORE_I32(policy | 0, schedPolicy);
  if (schedparam) GROWABLE_HEAP_STORE_I32(schedparam | 0, schedPrio);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_getschedparam was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_self() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return __pthread_ptr | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_self was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

Module["_pthread_self"] = _pthread_self;

function _pthread_create(pthread_ptr, attr, start_routine, arg) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (typeof SharedArrayBuffer === "undefined") {
   err("Current environment does not support SharedArrayBuffer, pthreads are not available!");
   return 11;
  }
  if (!pthread_ptr) {
   err("pthread_create called with a null thread pointer!");
   return 22;
  }
  var transferList = [];
  var error = 0;
  if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
   return _emscripten_sync_run_in_main_thread_4(687865856, pthread_ptr, attr, start_routine, arg);
  }
  if (error) return error;
  var stackSize = 0;
  var stackBase = 0;
  var detached = 0;
  var schedPolicy = 0;
  var schedPrio = 0;
  if (attr) {
   stackSize = GROWABLE_HEAP_LOAD_I32(attr | 0);
   stackSize += 81920;
   stackBase = GROWABLE_HEAP_LOAD_I32(attr + 8 | 0);
   detached = GROWABLE_HEAP_LOAD_I32(attr + 12 | 0) !== 0;
   var inheritSched = GROWABLE_HEAP_LOAD_I32(attr + 16 | 0) === 0;
   if (inheritSched) {
    var prevSchedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
    var prevSchedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
    var parentThreadPtr = PThread.currentProxiedOperationCallerThread ? PThread.currentProxiedOperationCallerThread : _pthread_self();
    _pthread_getschedparam(parentThreadPtr, attr + 20, attr + 24);
    schedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
    schedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
    GROWABLE_HEAP_STORE_I32(attr + 20 | 0, prevSchedPolicy);
    GROWABLE_HEAP_STORE_I32(attr + 24 | 0, prevSchedPrio);
   } else {
    schedPolicy = GROWABLE_HEAP_LOAD_I32(attr + 20 | 0);
    schedPrio = GROWABLE_HEAP_LOAD_I32(attr + 24 | 0);
   }
  } else {
   stackSize = 2097152;
  }
  var allocatedOwnStack = stackBase == 0;
  if (allocatedOwnStack) {
   stackBase = _memalign(16, stackSize);
  } else {
   stackBase -= stackSize;
   assert(stackBase > 0);
  }
  var threadInfoStruct = _malloc(244);
  for (var i = 0; i < 244 >> 2; ++i) GROWABLE_HEAP_STORE_I32(((threadInfoStruct >> 2) + i) * 4 | 0, 0);
  GROWABLE_HEAP_STORE_I32(pthread_ptr | 0, threadInfoStruct);
  GROWABLE_HEAP_STORE_I32(threadInfoStruct + 24 | 0, threadInfoStruct);
  var headPtr = threadInfoStruct + 168;
  GROWABLE_HEAP_STORE_I32(headPtr | 0, headPtr);
  var threadParams = {
   stackBase: stackBase,
   stackSize: stackSize,
   allocatedOwnStack: allocatedOwnStack,
   schedPolicy: schedPolicy,
   schedPrio: schedPrio,
   detached: detached,
   startRoutine: start_routine,
   pthread_ptr: threadInfoStruct,
   parent_pthread_ptr: _pthread_self(),
   arg: arg,
   transferList: transferList
  };
  if (ENVIRONMENT_IS_PTHREAD) {
   threadParams.cmd = "spawnThread";
   postMessage(threadParams, transferList);
  } else {
   __spawn_thread(threadParams);
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_create was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_detach(thread) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (!thread) {
   err("pthread_detach attempted on a null thread pointer!");
   return ERRNO_CODES.ESRCH;
  }
  var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
  if (self !== thread) {
   err("pthread_detach attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
   return ERRNO_CODES.ESRCH;
  }
  var threadStatus = Atomics.load(HEAPU32, thread + 0 >> 2);
  var wasDetached = Atomics.compareExchange(HEAPU32, thread + 80 >> 2, 0, 2);
  return wasDetached ? ERRNO_CODES.EINVAL : 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_detach was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_exit(status) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (!ENVIRONMENT_IS_PTHREAD) _exit(status); else PThread.threadExit(status);
  throw "pthread_exit";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_exit was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __cleanup_thread(pthread_ptr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _cleanup_thread() can only ever be called from main application thread!";
  if (!pthread_ptr) throw "Internal Error! Null pthread_ptr in _cleanup_thread!";
  GROWABLE_HEAP_STORE_I32(pthread_ptr + 24 | 0, 0);
  var pthread = PThread.pthreads[pthread_ptr];
  if (pthread) {
   var worker = pthread.worker;
   PThread.returnWorkerToPool(worker);
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _cleanup_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __pthread_testcancel_js() {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (!ENVIRONMENT_IS_PTHREAD) return;
  if (!threadInfoStruct) return;
  var cancelDisabled = Atomics.load(HEAPU32, threadInfoStruct + 72 >> 2);
  if (cancelDisabled) return;
  var canceled = Atomics.load(HEAPU32, threadInfoStruct + 0 >> 2);
  if (canceled == 2) throw "Canceled!";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _pthread_testcancel_js was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_join(thread, status) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (!thread) {
   err("pthread_join attempted on a null thread pointer!");
   return ERRNO_CODES.ESRCH;
  }
  if (ENVIRONMENT_IS_PTHREAD && selfThreadId == thread) {
   err("PThread " + thread + " is attempting to join to itself!");
   return ERRNO_CODES.EDEADLK;
  } else if (!ENVIRONMENT_IS_PTHREAD && PThread.mainThreadBlock == thread) {
   err("Main thread " + thread + " is attempting to join to itself!");
   return ERRNO_CODES.EDEADLK;
  }
  var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
  if (self !== thread) {
   err("pthread_join attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
   return ERRNO_CODES.ESRCH;
  }
  var detached = Atomics.load(HEAPU32, thread + 80 >> 2);
  if (detached) {
   err("Attempted to join thread " + thread + ", which was already detached!");
   return ERRNO_CODES.EINVAL;
  }
  for (;;) {
   var threadStatus = Atomics.load(HEAPU32, thread + 0 >> 2);
   if (threadStatus == 1) {
    var threadExitCode = Atomics.load(HEAPU32, thread + 4 >> 2);
    if (status) GROWABLE_HEAP_STORE_I32(status | 0, threadExitCode);
    Atomics.store(HEAPU32, thread + 80 >> 2, 1);
    if (!ENVIRONMENT_IS_PTHREAD) __cleanup_thread(thread); else postMessage({
     cmd: "cleanupThread",
     thread: thread
    });
    return 0;
   }
   __pthread_testcancel_js();
   if (!ENVIRONMENT_IS_PTHREAD) _emscripten_main_thread_process_queued_calls();
   _emscripten_futex_wait(thread + 0, threadStatus, ENVIRONMENT_IS_PTHREAD ? 100 : 1);
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_join was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __kill_thread(pthread_ptr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (ENVIRONMENT_IS_PTHREAD) throw "Internal Error! _kill_thread() can only ever be called from main application thread!";
  if (!pthread_ptr) throw "Internal Error! Null pthread_ptr in _kill_thread!";
  GROWABLE_HEAP_STORE_I32(pthread_ptr + 24 | 0, 0);
  var pthread = PThread.pthreads[pthread_ptr];
  pthread.worker.terminate();
  PThread.freeThreadData(pthread);
  PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(pthread.worker.pthread), 1);
  pthread.worker.pthread = undefined;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _kill_thread was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_kill(thread, signal) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (signal < 0 || signal >= 65) return ERRNO_CODES.EINVAL;
  if (thread === PThread.MAIN_THREAD_ID) {
   if (signal == 0) return 0;
   err("Main thread (id=" + thread + ") cannot be killed with pthread_kill!");
   return ERRNO_CODES.ESRCH;
  }
  if (!thread) {
   err("pthread_kill attempted on a null thread pointer!");
   return ERRNO_CODES.ESRCH;
  }
  var self = GROWABLE_HEAP_LOAD_I32(thread + 24 | 0);
  if (self !== thread) {
   err("pthread_kill attempted on thread " + thread + ", which does not point to a valid thread, or does not exist anymore!");
   return ERRNO_CODES.ESRCH;
  }
  if (signal != 0) {
   if (!ENVIRONMENT_IS_PTHREAD) __kill_thread(thread); else postMessage({
    cmd: "killThread",
    thread: thread
   });
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_kill was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _pthread_sigmask(how, set, oldset) {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("pthread_sigmask() is not supported: this is a no-op.");
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import pthread_sigmask was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _putenv(string) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(89, 1, string);
 var originalAsyncifyState = Asyncify.state;
 try {
  if (string === 0) {
   ___setErrNo(22);
   return -1;
  }
  string = UTF8ToString(string);
  var splitPoint = string.indexOf("=");
  if (string === "" || string.indexOf("=") === -1) {
   ___setErrNo(22);
   return -1;
  }
  var name = string.slice(0, splitPoint);
  var value = string.slice(splitPoint + 1);
  if (!(name in ENV) || ENV[name] !== value) {
   ENV[name] = value;
   ___buildEnvironment(__get_environ());
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import putenv was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _raise(sig) {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of raise()");
  ___setErrNo(ERRNO_CODES.ENOSYS);
  warnOnce("raise() returning an error as we do not support it");
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import raise was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _round(d) {
 var originalAsyncifyState = Asyncify.state;
 try {
  d = +d;
  return d >= +0 ? +Math_floor(d + +.5) : +Math_ceil(d - +.5);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import round was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function abortOnCannotGrowMemory(requestedSize) {
 var originalAsyncifyState = Asyncify.state;
 try {
  abort("Cannot enlarge memory arrays to size " + requestedSize + " bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value " + HEAP8.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $abortOnCannotGrowMemory was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function emscripten_realloc_buffer(size) {
 var originalAsyncifyState = Asyncify.state;
 try {
  try {
   wasmMemory.grow(size - buffer.byteLength + 65535 >> 16);
   updateGlobalBufferAndViews(wasmMemory.buffer);
   return 1;
  } catch (e) {
   console.error("emscripten_realloc_buffer: Attempted to grow heap from " + buffer.byteLength + " bytes to " + size + " bytes, but got error: " + e);
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $emscripten_realloc_buffer was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _emscripten_resize_heap(requestedSize) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var oldSize = _emscripten_get_heap_size();
  if (requestedSize <= oldSize) {
   return false;
  }
  var PAGE_MULTIPLE = 65536;
  var LIMIT = 2147483648 - PAGE_MULTIPLE;
  if (requestedSize > LIMIT) {
   err("Cannot enlarge memory, asked to go up to " + requestedSize + " bytes, but the limit is " + LIMIT + " bytes!");
   return false;
  }
  var MIN_TOTAL_MEMORY = 16777216;
  var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);
  while (newSize < requestedSize) {
   if (newSize <= 536870912) {
    newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
   } else {
    newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
   }
   if (newSize === oldSize) {
    warnOnce("Cannot ask for more memory since we reached the practical limit in browsers (which is just below 2GB), so the request would have failed. Requesting only " + HEAP8.length);
   }
  }
  newSize = Math.min(newSize, 2130706432);
  if (newSize == oldSize) {
   err("Failed to grow the heap from " + oldSize + ", as we reached the WASM_MEM_MAX limit (" + 2130706432 + ") set during compilation");
   return false;
  }
  var replacement = emscripten_realloc_buffer(newSize);
  if (!replacement) {
   err("Failed to grow the heap from " + oldSize + " bytes to " + newSize + " bytes, not enough memory!");
   return false;
  }
  return true;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import emscripten_resize_heap was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sbrk(increment) {
 var originalAsyncifyState = Asyncify.state;
 try {
  increment = increment | 0;
  var oldDynamicTop = 0;
  var oldDynamicTopOnChange = 0;
  var newDynamicTop = 0;
  var totalMemory = 0;
  totalMemory = _emscripten_get_heap_size() | 0;
  do {
   oldDynamicTop = Atomics_load(HEAP32, DYNAMICTOP_PTR >> 2) | 0;
   newDynamicTop = oldDynamicTop + increment | 0;
   if ((increment | 0) > 0 & (newDynamicTop | 0) < (oldDynamicTop | 0) | (newDynamicTop | 0) < 0) {
    abortOnCannotGrowMemory(newDynamicTop | 0) | 0;
    ___setErrNo(12);
    return -1;
   }
   if ((newDynamicTop | 0) > (totalMemory | 0)) {
    if (_emscripten_resize_heap(newDynamicTop | 0) | 0) {
     totalMemory = _emscripten_get_heap_size() | 0;
     continue;
    } else {
     if ((_emscripten_get_heap_size() | 0) > totalMemory) {
      totalMemory = _emscripten_get_heap_size() | 0;
      continue;
     }
     ___setErrNo(12);
     return -1;
    }
   }
   oldDynamicTopOnChange = Atomics_compareExchange(HEAP32, DYNAMICTOP_PTR >> 2, oldDynamicTop | 0, newDynamicTop | 0) | 0;
  } while ((oldDynamicTopOnChange | 0) != (oldDynamicTop | 0));
  return oldDynamicTop | 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sbrk was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sched_yield() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sched_yield was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _setTempRet0($i) {
 var originalAsyncifyState = Asyncify.state;
 try {
  setTempRet0($i | 0);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import setTempRet0 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _setenv(envname, envval, overwrite) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(90, 1, envname, envval, overwrite);
 var originalAsyncifyState = Asyncify.state;
 try {
  if (envname === 0) {
   ___setErrNo(22);
   return -1;
  }
  var name = UTF8ToString(envname);
  var val = UTF8ToString(envval);
  if (name === "" || name.indexOf("=") !== -1) {
   ___setErrNo(22);
   return -1;
  }
  if (ENV.hasOwnProperty(name) && !overwrite) return 0;
  ENV[name] = val;
  ___buildEnvironment(__get_environ());
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import setenv was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sysconf(name) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(91, 1, name);
 var originalAsyncifyState = Asyncify.state;
 try {
  switch (name) {
  case 30:
   return PAGE_SIZE;

  case 85:
   var maxHeapSize = 2 * 1024 * 1024 * 1024 - 65536;
   maxHeapSize = 2130706432;
   return maxHeapSize / PAGE_SIZE;

  case 132:
  case 133:
  case 12:
  case 137:
  case 138:
  case 15:
  case 235:
  case 16:
  case 17:
  case 18:
  case 19:
  case 20:
  case 149:
  case 13:
  case 10:
  case 236:
  case 153:
  case 9:
  case 21:
  case 22:
  case 159:
  case 154:
  case 14:
  case 77:
  case 78:
  case 139:
  case 80:
  case 81:
  case 82:
  case 68:
  case 67:
  case 164:
  case 11:
  case 29:
  case 47:
  case 48:
  case 95:
  case 52:
  case 51:
  case 46:
   return 200809;

  case 79:
   return 0;

  case 27:
  case 246:
  case 127:
  case 128:
  case 23:
  case 24:
  case 160:
  case 161:
  case 181:
  case 182:
  case 242:
  case 183:
  case 184:
  case 243:
  case 244:
  case 245:
  case 165:
  case 178:
  case 179:
  case 49:
  case 50:
  case 168:
  case 169:
  case 175:
  case 170:
  case 171:
  case 172:
  case 97:
  case 76:
  case 32:
  case 173:
  case 35:
   return -1;

  case 176:
  case 177:
  case 7:
  case 155:
  case 8:
  case 157:
  case 125:
  case 126:
  case 92:
  case 93:
  case 129:
  case 130:
  case 131:
  case 94:
  case 91:
   return 1;

  case 74:
  case 60:
  case 69:
  case 70:
  case 4:
   return 1024;

  case 31:
  case 42:
  case 72:
   return 32;

  case 87:
  case 26:
  case 33:
   return 2147483647;

  case 34:
  case 1:
   return 47839;

  case 38:
  case 36:
   return 99;

  case 43:
  case 37:
   return 2048;

  case 0:
   return 2097152;

  case 3:
   return 65536;

  case 28:
   return 32768;

  case 44:
   return 32767;

  case 75:
   return 16384;

  case 39:
   return 1e3;

  case 89:
   return 700;

  case 71:
   return 256;

  case 40:
   return 255;

  case 2:
   return 100;

  case 180:
   return 64;

  case 25:
   return 20;

  case 5:
   return 16;

  case 6:
   return 6;

  case 73:
   return 4;

  case 84:
   {
    if (typeof navigator === "object") return navigator["hardwareConcurrency"] || 1;
    return 1;
   }
  }
  ___setErrNo(22);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sysconf was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _setgroups(ngroups, gidset) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (ngroups < 1 || ngroups > _sysconf(3)) {
   ___setErrNo(22);
   return -1;
  } else {
   ___setErrNo(1);
   return -1;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import setgroups was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _setitimer() {
 var originalAsyncifyState = Asyncify.state;
 try {
  throw "setitimer() is not implemented yet";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import setitimer was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _setpwent() {
 var originalAsyncifyState = Asyncify.state;
 try {
  throw "setpwent: TODO";
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import setpwent was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sigaction(signum, act, oldact) {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of sigaction()");
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sigaction was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sigaddset(set, signum) {
 var originalAsyncifyState = Asyncify.state;
 try {
  GROWABLE_HEAP_STORE_I32(set | 0, GROWABLE_HEAP_LOAD_I32(set | 0) | 1 << signum - 1);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sigaddset was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sigemptyset(set) {
 var originalAsyncifyState = Asyncify.state;
 try {
  GROWABLE_HEAP_STORE_I32(set | 0, 0);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sigemptyset was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sigfillset(set) {
 var originalAsyncifyState = Asyncify.state;
 try {
  GROWABLE_HEAP_STORE_I32(set | 0, -1 >>> 0);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sigfillset was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _siginterrupt() {
 var originalAsyncifyState = Asyncify.state;
 try {
  err("Calling stub instead of siginterrupt()");
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import siginterrupt was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sigismember(set, signum) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return GROWABLE_HEAP_LOAD_I32(set | 0) & 1 << signum - 1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sigismember was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _sigpending(set) {
 var originalAsyncifyState = Asyncify.state;
 try {
  GROWABLE_HEAP_STORE_I32(set | 0, 0);
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import sigpending was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __isLeapYear(year) {
 var originalAsyncifyState = Asyncify.state;
 try {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _isLeapYear was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function __arraySum(array, index) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var sum = 0;
  for (var i = 0; i <= index; sum += array[i++]) ;
  return sum;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _arraySum was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var __MONTH_DAYS_LEAP = [ 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var __MONTH_DAYS_REGULAR = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function __addDays(date, days) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var newDate = new Date(date.getTime());
  while (days > 0) {
   var leap = __isLeapYear(newDate.getFullYear());
   var currentMonth = newDate.getMonth();
   var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
   if (days > daysInCurrentMonth - newDate.getDate()) {
    days -= daysInCurrentMonth - newDate.getDate() + 1;
    newDate.setDate(1);
    if (currentMonth < 11) {
     newDate.setMonth(currentMonth + 1);
    } else {
     newDate.setMonth(0);
     newDate.setFullYear(newDate.getFullYear() + 1);
    }
   } else {
    newDate.setDate(newDate.getDate() + days);
    return newDate;
   }
  }
  return newDate;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import _addDays was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _strftime(s, maxsize, format, tm) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var tm_zone = GROWABLE_HEAP_LOAD_I32(tm + 40 | 0);
  var date = {
   tm_sec: GROWABLE_HEAP_LOAD_I32(tm | 0),
   tm_min: GROWABLE_HEAP_LOAD_I32(tm + 4 | 0),
   tm_hour: GROWABLE_HEAP_LOAD_I32(tm + 8 | 0),
   tm_mday: GROWABLE_HEAP_LOAD_I32(tm + 12 | 0),
   tm_mon: GROWABLE_HEAP_LOAD_I32(tm + 16 | 0),
   tm_year: GROWABLE_HEAP_LOAD_I32(tm + 20 | 0),
   tm_wday: GROWABLE_HEAP_LOAD_I32(tm + 24 | 0),
   tm_yday: GROWABLE_HEAP_LOAD_I32(tm + 28 | 0),
   tm_isdst: GROWABLE_HEAP_LOAD_I32(tm + 32 | 0),
   tm_gmtoff: GROWABLE_HEAP_LOAD_I32(tm + 36 | 0),
   tm_zone: tm_zone ? UTF8ToString(tm_zone) : ""
  };
  var pattern = UTF8ToString(format);
  var EXPANSION_RULES_1 = {
   "%c": "%a %b %d %H:%M:%S %Y",
   "%D": "%m/%d/%y",
   "%F": "%Y-%m-%d",
   "%h": "%b",
   "%r": "%I:%M:%S %p",
   "%R": "%H:%M",
   "%T": "%H:%M:%S",
   "%x": "%m/%d/%y",
   "%X": "%H:%M:%S",
   "%Ec": "%c",
   "%EC": "%C",
   "%Ex": "%m/%d/%y",
   "%EX": "%H:%M:%S",
   "%Ey": "%y",
   "%EY": "%Y",
   "%Od": "%d",
   "%Oe": "%e",
   "%OH": "%H",
   "%OI": "%I",
   "%Om": "%m",
   "%OM": "%M",
   "%OS": "%S",
   "%Ou": "%u",
   "%OU": "%U",
   "%OV": "%V",
   "%Ow": "%w",
   "%OW": "%W",
   "%Oy": "%y"
  };
  for (var rule in EXPANSION_RULES_1) {
   pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_1[rule]);
  }
  var WEEKDAYS = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  var MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  function leadingSomething(value, digits, character) {
   var str = typeof value === "number" ? value.toString() : value || "";
   while (str.length < digits) {
    str = character[0] + str;
   }
   return str;
  }
  function leadingNulls(value, digits) {
   return leadingSomething(value, digits, "0");
  }
  function compareByDay(date1, date2) {
   function sgn(value) {
    return value < 0 ? -1 : value > 0 ? 1 : 0;
   }
   var compare;
   if ((compare = sgn(date1.getFullYear() - date2.getFullYear())) === 0) {
    if ((compare = sgn(date1.getMonth() - date2.getMonth())) === 0) {
     compare = sgn(date1.getDate() - date2.getDate());
    }
   }
   return compare;
  }
  function getFirstWeekStartDate(janFourth) {
   switch (janFourth.getDay()) {
   case 0:
    return new Date(janFourth.getFullYear() - 1, 11, 29);

   case 1:
    return janFourth;

   case 2:
    return new Date(janFourth.getFullYear(), 0, 3);

   case 3:
    return new Date(janFourth.getFullYear(), 0, 2);

   case 4:
    return new Date(janFourth.getFullYear(), 0, 1);

   case 5:
    return new Date(janFourth.getFullYear() - 1, 11, 31);

   case 6:
    return new Date(janFourth.getFullYear() - 1, 11, 30);
   }
  }
  function getWeekBasedYear(date) {
   var thisDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
   var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
   var janFourthNextYear = new Date(thisDate.getFullYear() + 1, 0, 4);
   var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
   var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
   if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
    if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
     return thisDate.getFullYear() + 1;
    } else {
     return thisDate.getFullYear();
    }
   } else {
    return thisDate.getFullYear() - 1;
   }
  }
  var EXPANSION_RULES_2 = {
   "%a": function(date) {
    return WEEKDAYS[date.tm_wday].substring(0, 3);
   },
   "%A": function(date) {
    return WEEKDAYS[date.tm_wday];
   },
   "%b": function(date) {
    return MONTHS[date.tm_mon].substring(0, 3);
   },
   "%B": function(date) {
    return MONTHS[date.tm_mon];
   },
   "%C": function(date) {
    var year = date.tm_year + 1900;
    return leadingNulls(year / 100 | 0, 2);
   },
   "%d": function(date) {
    return leadingNulls(date.tm_mday, 2);
   },
   "%e": function(date) {
    return leadingSomething(date.tm_mday, 2, " ");
   },
   "%g": function(date) {
    return getWeekBasedYear(date).toString().substring(2);
   },
   "%G": function(date) {
    return getWeekBasedYear(date);
   },
   "%H": function(date) {
    return leadingNulls(date.tm_hour, 2);
   },
   "%I": function(date) {
    var twelveHour = date.tm_hour;
    if (twelveHour == 0) twelveHour = 12; else if (twelveHour > 12) twelveHour -= 12;
    return leadingNulls(twelveHour, 2);
   },
   "%j": function(date) {
    return leadingNulls(date.tm_mday + __arraySum(__isLeapYear(date.tm_year + 1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon - 1), 3);
   },
   "%m": function(date) {
    return leadingNulls(date.tm_mon + 1, 2);
   },
   "%M": function(date) {
    return leadingNulls(date.tm_min, 2);
   },
   "%n": function() {
    return "\n";
   },
   "%p": function(date) {
    if (date.tm_hour >= 0 && date.tm_hour < 12) {
     return "AM";
    } else {
     return "PM";
    }
   },
   "%S": function(date) {
    return leadingNulls(date.tm_sec, 2);
   },
   "%t": function() {
    return "\t";
   },
   "%u": function(date) {
    return date.tm_wday || 7;
   },
   "%U": function(date) {
    var janFirst = new Date(date.tm_year + 1900, 0, 1);
    var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7 - janFirst.getDay());
    var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
    if (compareByDay(firstSunday, endDate) < 0) {
     var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
     var firstSundayUntilEndJanuary = 31 - firstSunday.getDate();
     var days = firstSundayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
     return leadingNulls(Math.ceil(days / 7), 2);
    }
    return compareByDay(firstSunday, janFirst) === 0 ? "01" : "00";
   },
   "%V": function(date) {
    var janFourthThisYear = new Date(date.tm_year + 1900, 0, 4);
    var janFourthNextYear = new Date(date.tm_year + 1901, 0, 4);
    var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
    var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
    var endDate = __addDays(new Date(date.tm_year + 1900, 0, 1), date.tm_yday);
    if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
     return "53";
    }
    if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
     return "01";
    }
    var daysDifference;
    if (firstWeekStartThisYear.getFullYear() < date.tm_year + 1900) {
     daysDifference = date.tm_yday + 32 - firstWeekStartThisYear.getDate();
    } else {
     daysDifference = date.tm_yday + 1 - firstWeekStartThisYear.getDate();
    }
    return leadingNulls(Math.ceil(daysDifference / 7), 2);
   },
   "%w": function(date) {
    return date.tm_wday;
   },
   "%W": function(date) {
    var janFirst = new Date(date.tm_year, 0, 1);
    var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7 - janFirst.getDay() + 1);
    var endDate = new Date(date.tm_year + 1900, date.tm_mon, date.tm_mday);
    if (compareByDay(firstMonday, endDate) < 0) {
     var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth() - 1) - 31;
     var firstMondayUntilEndJanuary = 31 - firstMonday.getDate();
     var days = firstMondayUntilEndJanuary + februaryFirstUntilEndMonth + endDate.getDate();
     return leadingNulls(Math.ceil(days / 7), 2);
    }
    return compareByDay(firstMonday, janFirst) === 0 ? "01" : "00";
   },
   "%y": function(date) {
    return (date.tm_year + 1900).toString().substring(2);
   },
   "%Y": function(date) {
    return date.tm_year + 1900;
   },
   "%z": function(date) {
    var off = date.tm_gmtoff;
    var ahead = off >= 0;
    off = Math.abs(off) / 60;
    off = off / 60 * 100 + off % 60;
    return (ahead ? "+" : "-") + String("0000" + off).slice(-4);
   },
   "%Z": function(date) {
    return date.tm_zone;
   },
   "%%": function() {
    return "%";
   }
  };
  for (var rule in EXPANSION_RULES_2) {
   if (pattern.indexOf(rule) >= 0) {
    pattern = pattern.replace(new RegExp(rule, "g"), EXPANSION_RULES_2[rule](date));
   }
  }
  var bytes = intArrayFromString(pattern, false);
  if (bytes.length > maxsize) {
   return 0;
  }
  writeArrayToMemory(bytes, s);
  return bytes.length - 1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import strftime was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _system(command) {
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(11);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import system was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _time(ptr) {
 var originalAsyncifyState = Asyncify.state;
 try {
  var ret = Date.now() / 1e3 | 0;
  if (ptr) {
   GROWABLE_HEAP_STORE_I32(ptr | 0, ret);
  }
  return ret;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import time was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _times(buffer) {
 var originalAsyncifyState = Asyncify.state;
 try {
  if (buffer !== 0) {
   _memset(buffer, 0, 16);
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import times was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _unsetenv(name) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(92, 1, name);
 var originalAsyncifyState = Asyncify.state;
 try {
  if (name === 0) {
   ___setErrNo(22);
   return -1;
  }
  name = UTF8ToString(name);
  if (name === "" || name.indexOf("=") !== -1) {
   ___setErrNo(22);
   return -1;
  }
  if (ENV.hasOwnProperty(name)) {
   delete ENV[name];
   ___buildEnvironment(__get_environ());
  }
  return 0;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import unsetenv was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _utimes(path, times) {
 if (ENVIRONMENT_IS_PTHREAD) return _emscripten_proxy_to_main_thread_js(93, 1, path, times);
 var originalAsyncifyState = Asyncify.state;
 try {
  var time;
  if (times) {
   var offset = 8 + 0;
   time = GROWABLE_HEAP_LOAD_I32(times + offset | 0) * 1e3;
   offset = 8 + 4;
   time += GROWABLE_HEAP_LOAD_I32(times + offset | 0) / 1e3;
  } else {
   time = Date.now();
  }
  path = UTF8ToString(path);
  try {
   FS.utime(path, time, time);
   return 0;
  } catch (e) {
   FS.handleFSError(e);
   return -1;
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import utimes was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _wait(stat_loc) {
 var originalAsyncifyState = Asyncify.state;
 try {
  ___setErrNo(10);
  return -1;
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import wait was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _wait3() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _wait.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import wait3 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _wait4() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _wait.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import wait4 was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _waitid() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _wait.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import waitid was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function _waitpid() {
 var originalAsyncifyState = Asyncify.state;
 try {
  return _wait.apply(null, arguments);
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import waitpid was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

function runAndAbortIfError(func) {
 var originalAsyncifyState = Asyncify.state;
 try {
  try {
   return func();
  } catch (e) {
   abort(e);
  }
 } finally {
  if (Asyncify.state !== originalAsyncifyState) throw "import $runAndAbortIfError was not in ASYNCIFY_IMPORTS, but changed the state";
 }
}

var Asyncify = {
 State: {
  Normal: 0,
  Unwinding: 1,
  Rewinding: 2
 },
 state: 0,
 StackSize: 4096,
 currData: null,
 dataInfo: {},
 handleSleepReturnValue: 0,
 exportCallStack: [],
 afterUnwind: null,
 asyncFinalizers: [],
 instrumentWasmExports: function(exports) {
  var ret = {};
  for (var x in exports) {
   (function(x) {
    var original = exports[x];
    if (typeof original === "function") {
     ret[x] = function() {
      Asyncify.exportCallStack.push(x);
      try {
       return original.apply(null, arguments);
      } finally {
       if (ABORT) return;
       var y = Asyncify.exportCallStack.pop(x);
       assert(y === x);
       if (Asyncify.currData && Asyncify.state === Asyncify.State.Unwinding && Asyncify.exportCallStack.length === 0) {
        Asyncify.state = Asyncify.State.Normal;
        runAndAbortIfError(Module["_asyncify_stop_unwind"]);
        if (Asyncify.afterUnwind) {
         Asyncify.afterUnwind();
         Asyncify.afterUnwind = null;
        }
       }
      }
     };
    } else {
     ret[x] = original;
    }
   })(x);
  }
  return ret;
 },
 allocateData: function() {
  var ptr = _malloc(Asyncify.StackSize + 8);
  GROWABLE_HEAP_STORE_I32(ptr | 0, ptr + 8);
  GROWABLE_HEAP_STORE_I32(ptr + 4 | 0, ptr + 8 + Asyncify.StackSize);
  var bottomOfCallStack = Asyncify.exportCallStack[0];
  Asyncify.dataInfo[ptr] = {
   bottomOfCallStack: bottomOfCallStack
  };
  return ptr;
 },
 freeData: function(ptr) {
  _free(ptr);
  Asyncify.dataInfo[ptr] = null;
 },
 handleSleep: function(startAsync) {
  if (ABORT) return;
  noExitRuntime = true;
  if (Asyncify.state === Asyncify.State.Normal) {
   var reachedCallback = false;
   var reachedAfterCallback = false;
   startAsync(function(handleSleepReturnValue) {
    assert(!handleSleepReturnValue || typeof handleSleepReturnValue === "number");
    if (ABORT) return;
    Asyncify.handleSleepReturnValue = handleSleepReturnValue || 0;
    reachedCallback = true;
    if (!reachedAfterCallback) {
     return;
    }
    Asyncify.state = Asyncify.State.Rewinding;
    runAndAbortIfError(function() {
     Module["_asyncify_start_rewind"](Asyncify.currData);
    });
    if (Browser.mainLoop.func) {
     Browser.mainLoop.resume();
    }
    var start = Asyncify.dataInfo[Asyncify.currData].bottomOfCallStack;
    var asyncWasmReturnValue = Module["asm"][start]();
    if (!Asyncify.currData) {
     var asyncFinalizers = Asyncify.asyncFinalizers;
     Asyncify.asyncFinalizers = [];
     asyncFinalizers.forEach(function(func) {
      func(asyncWasmReturnValue);
     });
    }
   });
   reachedAfterCallback = true;
   if (!reachedCallback) {
    Asyncify.state = Asyncify.State.Unwinding;
    Asyncify.currData = Asyncify.allocateData();
    runAndAbortIfError(function() {
     Module["_asyncify_start_unwind"](Asyncify.currData);
    });
    if (Browser.mainLoop.func) {
     Browser.mainLoop.pause();
    }
   }
  } else if (Asyncify.state === Asyncify.State.Rewinding) {
   Asyncify.state = Asyncify.State.Normal;
   runAndAbortIfError(Module["_asyncify_stop_rewind"]);
   Asyncify.freeData(Asyncify.currData);
   Asyncify.currData = null;
  } else {
   abort("invalid state: " + Asyncify.state);
  }
  return Asyncify.handleSleepReturnValue;
 }
};

if (!ENVIRONMENT_IS_PTHREAD) PThread.initMainThreadBlock();

if (ENVIRONMENT_IS_NODE) {
 _emscripten_get_now = function _emscripten_get_now_actual() {
  var t = process["hrtime"]();
  return t[0] * 1e3 + t[1] / 1e6;
 };
} else if (ENVIRONMENT_IS_PTHREAD) {
 _emscripten_get_now = function() {
  return performance["now"]() - __performance_now_clock_drift;
 };
} else if (typeof dateNow !== "undefined") {
 _emscripten_get_now = dateNow;
} else if (typeof performance === "object" && performance && typeof performance["now"] === "function") {
 _emscripten_get_now = function() {
  return performance["now"]();
 };
} else {
 _emscripten_get_now = Date.now;
}

FS.staticInit();

Module["FS_createFolder"] = FS.createFolder;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createLink"] = FS.createLink;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

if (ENVIRONMENT_HAS_NODE) {
 var fs = require("fs");
 var NODEJS_PATH = require("path");
 NODEFS.staticInit();
}

Module["requestFullScreen"] = function Module_requestFullScreen(lockPointer, resizeCanvas, vrDevice) {
 err("Module.requestFullScreen is deprecated. Please call Module.requestFullscreen instead.");
 Module["requestFullScreen"] = Module["requestFullscreen"];
 Browser.requestFullScreen(lockPointer, resizeCanvas, vrDevice);
};

Module["requestFullscreen"] = function Module_requestFullscreen(lockPointer, resizeCanvas, vrDevice) {
 Browser.requestFullscreen(lockPointer, resizeCanvas, vrDevice);
};

Module["requestAnimationFrame"] = function Module_requestAnimationFrame(func) {
 Browser.requestAnimationFrame(func);
};

Module["setCanvasSize"] = function Module_setCanvasSize(width, height, noUpdates) {
 Browser.setCanvasSize(width, height, noUpdates);
};

Module["pauseMainLoop"] = function Module_pauseMainLoop() {
 Browser.mainLoop.pause();
};

Module["resumeMainLoop"] = function Module_resumeMainLoop() {
 Browser.mainLoop.resume();
};

Module["getUserMedia"] = function Module_getUserMedia() {
 Browser.getUserMedia();
};

Module["createContext"] = function Module_createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
 return Browser.createContext(canvas, useWebGL, setInModule, webGLContextAttributes);
};

var GLctx;

GL.init();

var proxiedFunctionTable = [ null, ___syscall10, ___syscall118, ___syscall12, ___syscall122, ___syscall132, ___syscall133, ___syscall14, ___syscall140, ___syscall142, ___syscall144, ___syscall145, ___syscall146, ___syscall147, ___syscall148, ___syscall15, ___syscall163, ___syscall180, ___syscall181, ___syscall183, ___syscall191, ___syscall192, ___syscall193, ___syscall194, ___syscall195, ___syscall196, ___syscall197, ___syscall198, ___syscall202, ___syscall20, ___syscall205, ___syscall207, ___syscall211, ___syscall212, ___syscall220, ___syscall221, ___syscall268, ___syscall269, ___syscall272, ___syscall29, ___syscall295, ___syscall296, ___syscall297, ___syscall298, ___syscall3, ___syscall300, ___syscall301, ___syscall302, ___syscall303, ___syscall304, ___syscall305, ___syscall306, ___syscall320, ___syscall324, ___syscall33, ___syscall330, ___syscall331, ___syscall34, ___syscall340, ___syscall36, ___syscall38, ___syscall39, ___syscall4, ___syscall40, ___syscall41, ___syscall42, ___syscall5, ___syscall54, ___syscall57, ___syscall6, ___syscall60, ___syscall63, ___syscall64, ___syscall66, ___syscall75, ___syscall77, ___syscall83, ___syscall85, ___syscall9, ___syscall91, ___syscall94, ___syscall96, ___syscall97, _chroot, _confstr, _emscripten_set_canvas_element_size_main_thread, _fpathconf, _getenv, _tzset, _putenv, _setenv, _sysconf, _unsetenv, _utimes ];

function intArrayFromString(stringy, dontAddNull, length) {
 var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
 var u8array = new Array(len);
 var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
 if (dontAddNull) u8array.length = numBytesWritten;
 return u8array;
}

var asmGlobalArg = {};

var asmLibraryArg = {
 "m": ___assert_fail,
 "xc": ___buildEnvironment,
 "N": ___call_main,
 "wc": ___clock_gettime,
 "vc": ___libc_current_sigrtmax,
 "uc": ___libc_current_sigrtmin,
 "z": ___lock,
 "ia": ___map_file,
 "tc": ___syscall10,
 "sc": ___syscall118,
 "ha": ___syscall12,
 "rc": ___syscall122,
 "ga": ___syscall132,
 "qc": ___syscall133,
 "pc": ___syscall14,
 "fa": ___syscall140,
 "oc": ___syscall142,
 "nc": ___syscall144,
 "ea": ___syscall145,
 "M": ___syscall146,
 "mc": ___syscall147,
 "lc": ___syscall148,
 "da": ___syscall15,
 "kc": ___syscall163,
 "jc": ___syscall180,
 "ic": ___syscall181,
 "hc": ___syscall183,
 "gc": ___syscall191,
 "fc": ___syscall192,
 "ec": ___syscall193,
 "dc": ___syscall194,
 "ca": ___syscall195,
 "cc": ___syscall196,
 "bc": ___syscall197,
 "ac": ___syscall198,
 "$b": ___syscall199,
 "_b": ___syscall20,
 "Zb": ___syscall200,
 "Yb": ___syscall201,
 "Xb": ___syscall202,
 "Wb": ___syscall205,
 "Vb": ___syscall207,
 "Ub": ___syscall209,
 "Tb": ___syscall211,
 "ba": ___syscall212,
 "Sb": ___syscall220,
 "b": ___syscall221,
 "Rb": ___syscall268,
 "Qb": ___syscall269,
 "Pb": ___syscall272,
 "Ob": ___syscall29,
 "aa": ___syscall295,
 "Nb": ___syscall296,
 "Mb": ___syscall297,
 "Lb": ___syscall298,
 "Kb": ___syscall3,
 "L": ___syscall300,
 "Jb": ___syscall301,
 "Ib": ___syscall302,
 "Hb": ___syscall303,
 "Gb": ___syscall304,
 "Fb": ___syscall305,
 "$": ___syscall306,
 "Eb": ___syscall320,
 "Db": ___syscall324,
 "Cb": ___syscall33,
 "Bb": ___syscall330,
 "Ab": ___syscall331,
 "zb": ___syscall34,
 "_": ___syscall340,
 "yb": ___syscall36,
 "xb": ___syscall38,
 "wb": ___syscall39,
 "vb": ___syscall4,
 "ub": ___syscall40,
 "tb": ___syscall41,
 "sb": ___syscall42,
 "Z": ___syscall5,
 "F": ___syscall54,
 "rb": ___syscall57,
 "v": ___syscall6,
 "qb": ___syscall60,
 "Y": ___syscall63,
 "pb": ___syscall64,
 "ob": ___syscall66,
 "nb": ___syscall75,
 "mb": ___syscall77,
 "lb": ___syscall83,
 "kb": ___syscall85,
 "jb": ___syscall9,
 "ib": ___syscall91,
 "hb": ___syscall94,
 "gb": ___syscall96,
 "fb": ___syscall97,
 "l": ___unlock,
 "K": __exit,
 "J": _abort,
 "eb": _alarm,
 "db": _chroot,
 "y": _clock,
 "x": _clock_getres,
 "e": _clock_gettime,
 "cb": _clock_settime,
 "I": _confstr,
 "bb": _dlerror,
 "ab": _dlopen,
 "X": _dlsym,
 "s": _emscripten_asm_const_iii,
 "E": _emscripten_conditional_set_current_thread_status,
 "$a": _emscripten_exit_with_live_runtime,
 "r": _emscripten_futex_wait,
 "f": _emscripten_futex_wake,
 "o": _emscripten_get_now,
 "_a": _emscripten_has_threading_support,
 "u": _emscripten_is_main_browser_thread,
 "Za": _emscripten_is_main_runtime_thread,
 "Ya": _emscripten_memcpy_big,
 "Xa": _emscripten_receive_on_main_thread_js,
 "j": _emscripten_run_script,
 "Wa": _emscripten_run_script_string,
 "Va": _emscripten_set_canvas_element_size,
 "W": _emscripten_set_current_thread_status,
 "Ua": _emscripten_set_thread_name,
 "H": _emscripten_sleep,
 "Ta": _emscripten_syscall,
 "Sa": _emscripten_webgl_create_context,
 "Ra": _endpwent,
 "Qa": _execv,
 "Pa": _execve,
 "t": _exit,
 "Oa": _fexecve,
 "Na": _flock,
 "V": _fork,
 "U": _fpathconf,
 "d": _getenv,
 "Ma": _getitimer,
 "La": _getloadavg,
 "T": _getpwent,
 "Ka": _getpwnam,
 "Ja": _getpwuid,
 "D": _gettimeofday,
 "C": _gmtime,
 "Ia": initPthreadsJS,
 "Ha": _kill,
 "Ga": _killpg,
 "k": _localtime,
 "G": _mktime,
 "Fa": _pathconf,
 "Ea": _pthread_cleanup_pop,
 "Da": _pthread_cleanup_push,
 "B": _pthread_create,
 "Ca": _pthread_detach,
 "Ba": _pthread_exit,
 "Aa": _pthread_join,
 "za": _pthread_kill,
 "a": _pthread_self,
 "A": _pthread_sigmask,
 "ya": _putenv,
 "w": _raise,
 "h": _round,
 "q": _sbrk,
 "xa": _sched_yield,
 "S": _setTempRet0,
 "g": _setenv,
 "wa": _setgroups,
 "va": _setitimer,
 "ua": _setpwent,
 "c": _sigaction,
 "ta": _sigaddset,
 "i": _sigemptyset,
 "R": _sigfillset,
 "sa": _siginterrupt,
 "ra": _sigismember,
 "qa": _sigpending,
 "pa": _strftime,
 "p": _sysconf,
 "oa": _system,
 "n": _time,
 "Q": _times,
 "P": _unsetenv,
 "na": _utimes,
 "ma": _wait,
 "la": _wait3,
 "ka": _wait4,
 "ja": _waitid,
 "O": _waitpid
};

var asm = Module["asm"](asmGlobalArg, asmLibraryArg, buffer);

var real____wasm_call_ctors = asm["yc"];

asm["yc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____wasm_call_ctors.apply(null, arguments);
};

var real___coldbrew_post_func_ptr_call = asm["zc"];

asm["zc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___coldbrew_post_func_ptr_call.apply(null, arguments);
};

var real___coldbrew_pre_func_ptr_call = asm["Ac"];

asm["Ac"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___coldbrew_pre_func_ptr_call.apply(null, arguments);
};

var real___coldbrew_yield_to_javascript = asm["Bc"];

asm["Bc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___coldbrew_yield_to_javascript.apply(null, arguments);
};

var real__export__runFile = asm["Cc"];

asm["Cc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export__runFile.apply(null, arguments);
};

var real__export__runFileAsync = asm["Dc"];

asm["Dc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export__runFileAsync.apply(null, arguments);
};

var real__export_chdir = asm["Ec"];

asm["Ec"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_chdir.apply(null, arguments);
};

var real__export_getAsyncYieldRate = asm["Fc"];

asm["Fc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_getAsyncYieldRate.apply(null, arguments);
};

var real__export_reset = asm["Gc"];

asm["Gc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_reset.apply(null, arguments);
};

var real__export_run = asm["Hc"];

asm["Hc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_run.apply(null, arguments);
};

var real__export_runAsync = asm["Ic"];

asm["Ic"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_runAsync.apply(null, arguments);
};

var real__export_setAsyncYieldRate = asm["Jc"];

asm["Jc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_setAsyncYieldRate.apply(null, arguments);
};

var real__export_setenv = asm["Kc"];

asm["Kc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_setenv.apply(null, arguments);
};

var real__export_unsetenv = asm["Lc"];

asm["Lc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__export_unsetenv.apply(null, arguments);
};

var real__fflush = asm["Mc"];

asm["Mc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__fflush.apply(null, arguments);
};

var real__free = asm["Nc"];

asm["Nc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__free.apply(null, arguments);
};

var real__malloc = asm["Oc"];

asm["Oc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__malloc.apply(null, arguments);
};

var real____errno_location = asm["Pc"];

asm["Pc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____errno_location.apply(null, arguments);
};

var real__main = asm["Qc"];

asm["Qc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__main.apply(null, arguments);
};

var real__emscripten_get_global_libc = asm["Rc"];

asm["Rc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_get_global_libc.apply(null, arguments);
};

var real____emscripten_pthread_data_constructor = asm["Sc"];

asm["Sc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____emscripten_pthread_data_constructor.apply(null, arguments);
};

var real___get_tzname = asm["Tc"];

asm["Tc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_tzname.apply(null, arguments);
};

var real___get_daylight = asm["Uc"];

asm["Uc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_daylight.apply(null, arguments);
};

var real___get_timezone = asm["Vc"];

asm["Vc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_timezone.apply(null, arguments);
};

var real___get_environ = asm["Wc"];

asm["Wc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___get_environ.apply(null, arguments);
};

var real__memalign = asm["Xc"];

asm["Xc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__memalign.apply(null, arguments);
};

var real__emscripten_builtin_free = asm["Yc"];

asm["Yc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_builtin_free.apply(null, arguments);
};

var real__emscripten_builtin_memalign = asm["Zc"];

asm["Zc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_builtin_memalign.apply(null, arguments);
};

var real____pthread_tsd_run_dtors = asm["_c"];

asm["_c"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real____pthread_tsd_run_dtors.apply(null, arguments);
};

var real__emscripten_main_thread_process_queued_calls = asm["$c"];

asm["$c"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_main_thread_process_queued_calls.apply(null, arguments);
};

var real__emscripten_current_thread_process_queued_calls = asm["ad"];

asm["ad"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_current_thread_process_queued_calls.apply(null, arguments);
};

var real__usleep = asm["bd"];

asm["bd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__usleep.apply(null, arguments);
};

var real__emscripten_register_main_browser_thread_id = asm["cd"];

asm["cd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_register_main_browser_thread_id.apply(null, arguments);
};

var real__emscripten_main_browser_thread_id = asm["dd"];

asm["dd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_main_browser_thread_id.apply(null, arguments);
};

var real__emscripten_async_run_in_main_thread = asm["ed"];

asm["ed"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_async_run_in_main_thread.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread = asm["fd"];

asm["fd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_0 = asm["gd"];

asm["gd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_0.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_1 = asm["hd"];

asm["hd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_1.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_2 = asm["id"];

asm["id"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_2.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_xprintf_varargs = asm["jd"];

asm["jd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_xprintf_varargs.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_3 = asm["kd"];

asm["kd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_3.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_4 = asm["ld"];

asm["ld"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_4.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_5 = asm["md"];

asm["md"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_5.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_6 = asm["nd"];

asm["nd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_6.apply(null, arguments);
};

var real__emscripten_sync_run_in_main_thread_7 = asm["od"];

asm["od"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_sync_run_in_main_thread_7.apply(null, arguments);
};

var real__emscripten_run_in_main_runtime_thread_js = asm["pd"];

asm["pd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_run_in_main_runtime_thread_js.apply(null, arguments);
};

var real__emscripten_async_queue_on_thread_ = asm["qd"];

asm["qd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_async_queue_on_thread_.apply(null, arguments);
};

var real__proxy_main = asm["rd"];

asm["rd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__proxy_main.apply(null, arguments);
};

var real__emscripten_tls_init = asm["sd"];

asm["sd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__emscripten_tls_init.apply(null, arguments);
};

var real__setThrew = asm["td"];

asm["td"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__setThrew.apply(null, arguments);
};

var real_stackSave = asm["ud"];

asm["ud"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackSave.apply(null, arguments);
};

var real_stackAlloc = asm["vd"];

asm["vd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackAlloc.apply(null, arguments);
};

var real_stackRestore = asm["wd"];

asm["wd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_stackRestore.apply(null, arguments);
};

var real___growWasmMemory = asm["xd"];

asm["xd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real___growWasmMemory.apply(null, arguments);
};

var real_dynCall_vi = asm["yd"];

asm["yd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_vi.apply(null, arguments);
};

var real_dynCall_jiji = asm["zd"];

asm["zd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_jiji.apply(null, arguments);
};

var real_dynCall_iiii = asm["Ad"];

asm["Ad"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiii.apply(null, arguments);
};

var real_dynCall_ii = asm["Bd"];

asm["Bd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_ii.apply(null, arguments);
};

var real_dynCall_iidiiii = asm["Cd"];

asm["Cd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iidiiii.apply(null, arguments);
};

var real_dynCall_vii = asm["Dd"];

asm["Dd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_vii.apply(null, arguments);
};

var real_dynCall_iiiii = asm["Ed"];

asm["Ed"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiiii.apply(null, arguments);
};

var real_dynCall_iii = asm["Fd"];

asm["Fd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iii.apply(null, arguments);
};

var real_dynCall_iiiiii = asm["Gd"];

asm["Gd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiiiii.apply(null, arguments);
};

var real_dynCall_i = asm["Hd"];

asm["Hd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_i.apply(null, arguments);
};

var real_dynCall_v = asm["Id"];

asm["Id"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_v.apply(null, arguments);
};

var real_dynCall_ddd = asm["Jd"];

asm["Jd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_ddd.apply(null, arguments);
};

var real_dynCall_dd = asm["Kd"];

asm["Kd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_dd.apply(null, arguments);
};

var real_dynCall_viii = asm["Ld"];

asm["Ld"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_viii.apply(null, arguments);
};

var real_dynCall_viiii = asm["Md"];

asm["Md"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_viiii.apply(null, arguments);
};

var real_dynCall_iiiiiii = asm["Nd"];

asm["Nd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiiiiii.apply(null, arguments);
};

var real_dynCall_vijii = asm["Od"];

asm["Od"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_vijii.apply(null, arguments);
};

var real_dynCall_ij = asm["Pd"];

asm["Pd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_ij.apply(null, arguments);
};

var real_dynCall_iiiij = asm["Qd"];

asm["Qd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiiij.apply(null, arguments);
};

var real_dynCall_iiiiiiiiii = asm["Rd"];

asm["Rd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiiiiiiiii.apply(null, arguments);
};

var real_dynCall_iij = asm["Sd"];

asm["Sd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iij.apply(null, arguments);
};

var real_dynCall_iijii = asm["Td"];

asm["Td"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iijii.apply(null, arguments);
};

var real_dynCall_iiji = asm["Ud"];

asm["Ud"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiji.apply(null, arguments);
};

var real_dynCall_iiiiiij = asm["Vd"];

asm["Vd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_iiiiiij.apply(null, arguments);
};

var real_dynCall_viiiii = asm["Wd"];

asm["Wd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_viiiii.apply(null, arguments);
};

var real_dynCall_ji = asm["Xd"];

asm["Xd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real_dynCall_ji.apply(null, arguments);
};

var real__asyncify_start_unwind = asm["Yd"];

asm["Yd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__asyncify_start_unwind.apply(null, arguments);
};

var real__asyncify_stop_unwind = asm["Zd"];

asm["Zd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__asyncify_stop_unwind.apply(null, arguments);
};

var real__asyncify_start_rewind = asm["_d"];

asm["_d"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__asyncify_start_rewind.apply(null, arguments);
};

var real__asyncify_stop_rewind = asm["$d"];

asm["$d"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return real__asyncify_stop_rewind.apply(null, arguments);
};

Module["asm"] = asm;

var ___wasm_call_ctors = Module["___wasm_call_ctors"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["yc"].apply(null, arguments);
};

var __coldbrew_post_func_ptr_call = Module["__coldbrew_post_func_ptr_call"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["zc"].apply(null, arguments);
};

var __coldbrew_pre_func_ptr_call = Module["__coldbrew_pre_func_ptr_call"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ac"].apply(null, arguments);
};

var __coldbrew_yield_to_javascript = Module["__coldbrew_yield_to_javascript"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Bc"].apply(null, arguments);
};

var _export__runFile = Module["_export__runFile"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Cc"].apply(null, arguments);
};

var _export__runFileAsync = Module["_export__runFileAsync"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Dc"].apply(null, arguments);
};

var _export_chdir = Module["_export_chdir"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ec"].apply(null, arguments);
};

var _export_getAsyncYieldRate = Module["_export_getAsyncYieldRate"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Fc"].apply(null, arguments);
};

var _export_reset = Module["_export_reset"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Gc"].apply(null, arguments);
};

var _export_run = Module["_export_run"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Hc"].apply(null, arguments);
};

var _export_runAsync = Module["_export_runAsync"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ic"].apply(null, arguments);
};

var _export_setAsyncYieldRate = Module["_export_setAsyncYieldRate"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Jc"].apply(null, arguments);
};

var _export_setenv = Module["_export_setenv"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Kc"].apply(null, arguments);
};

var _export_unsetenv = Module["_export_unsetenv"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Lc"].apply(null, arguments);
};

var _fflush = Module["_fflush"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Mc"].apply(null, arguments);
};

var _free = Module["_free"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Nc"].apply(null, arguments);
};

var _malloc = Module["_malloc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Oc"].apply(null, arguments);
};

var ___errno_location = Module["___errno_location"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Pc"].apply(null, arguments);
};

var _main = Module["_main"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Qc"].apply(null, arguments);
};

var _emscripten_get_global_libc = Module["_emscripten_get_global_libc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Rc"].apply(null, arguments);
};

var ___emscripten_pthread_data_constructor = Module["___emscripten_pthread_data_constructor"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Sc"].apply(null, arguments);
};

var __get_tzname = Module["__get_tzname"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Tc"].apply(null, arguments);
};

var __get_daylight = Module["__get_daylight"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Uc"].apply(null, arguments);
};

var __get_timezone = Module["__get_timezone"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Vc"].apply(null, arguments);
};

var __get_environ = Module["__get_environ"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Wc"].apply(null, arguments);
};

var _memalign = Module["_memalign"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Xc"].apply(null, arguments);
};

var _emscripten_builtin_free = Module["_emscripten_builtin_free"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Yc"].apply(null, arguments);
};

var _emscripten_builtin_memalign = Module["_emscripten_builtin_memalign"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Zc"].apply(null, arguments);
};

var ___pthread_tsd_run_dtors = Module["___pthread_tsd_run_dtors"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["_c"].apply(null, arguments);
};

var _emscripten_main_thread_process_queued_calls = Module["_emscripten_main_thread_process_queued_calls"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["$c"].apply(null, arguments);
};

var _emscripten_current_thread_process_queued_calls = Module["_emscripten_current_thread_process_queued_calls"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ad"].apply(null, arguments);
};

var _usleep = Module["_usleep"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["bd"].apply(null, arguments);
};

var _emscripten_register_main_browser_thread_id = Module["_emscripten_register_main_browser_thread_id"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["cd"].apply(null, arguments);
};

var _emscripten_main_browser_thread_id = Module["_emscripten_main_browser_thread_id"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["dd"].apply(null, arguments);
};

var _emscripten_async_run_in_main_thread = Module["_emscripten_async_run_in_main_thread"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ed"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread = Module["_emscripten_sync_run_in_main_thread"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["fd"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_0 = Module["_emscripten_sync_run_in_main_thread_0"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["gd"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_1 = Module["_emscripten_sync_run_in_main_thread_1"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["hd"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_2 = Module["_emscripten_sync_run_in_main_thread_2"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["id"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_xprintf_varargs = Module["_emscripten_sync_run_in_main_thread_xprintf_varargs"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["jd"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_3 = Module["_emscripten_sync_run_in_main_thread_3"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["kd"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_4 = Module["_emscripten_sync_run_in_main_thread_4"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ld"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_5 = Module["_emscripten_sync_run_in_main_thread_5"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["md"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_6 = Module["_emscripten_sync_run_in_main_thread_6"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["nd"].apply(null, arguments);
};

var _emscripten_sync_run_in_main_thread_7 = Module["_emscripten_sync_run_in_main_thread_7"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["od"].apply(null, arguments);
};

var _emscripten_run_in_main_runtime_thread_js = Module["_emscripten_run_in_main_runtime_thread_js"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["pd"].apply(null, arguments);
};

var _emscripten_async_queue_on_thread_ = Module["_emscripten_async_queue_on_thread_"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["qd"].apply(null, arguments);
};

var _proxy_main = Module["_proxy_main"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["rd"].apply(null, arguments);
};

var _emscripten_tls_init = Module["_emscripten_tls_init"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["sd"].apply(null, arguments);
};

var _setThrew = Module["_setThrew"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["td"].apply(null, arguments);
};

var stackSave = Module["stackSave"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["ud"].apply(null, arguments);
};

var stackAlloc = Module["stackAlloc"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["vd"].apply(null, arguments);
};

var stackRestore = Module["stackRestore"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["wd"].apply(null, arguments);
};

var __growWasmMemory = Module["__growWasmMemory"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["xd"].apply(null, arguments);
};

var dynCall_vi = Module["dynCall_vi"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["yd"].apply(null, arguments);
};

var dynCall_jiji = Module["dynCall_jiji"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["zd"].apply(null, arguments);
};

var dynCall_iiii = Module["dynCall_iiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ad"].apply(null, arguments);
};

var dynCall_ii = Module["dynCall_ii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Bd"].apply(null, arguments);
};

var dynCall_iidiiii = Module["dynCall_iidiiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Cd"].apply(null, arguments);
};

var dynCall_vii = Module["dynCall_vii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Dd"].apply(null, arguments);
};

var dynCall_iiiii = Module["dynCall_iiiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ed"].apply(null, arguments);
};

var dynCall_iii = Module["dynCall_iii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Fd"].apply(null, arguments);
};

var dynCall_iiiiii = Module["dynCall_iiiiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Gd"].apply(null, arguments);
};

var dynCall_i = Module["dynCall_i"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Hd"].apply(null, arguments);
};

var dynCall_v = Module["dynCall_v"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Id"].apply(null, arguments);
};

var dynCall_ddd = Module["dynCall_ddd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Jd"].apply(null, arguments);
};

var dynCall_dd = Module["dynCall_dd"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Kd"].apply(null, arguments);
};

var dynCall_viii = Module["dynCall_viii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ld"].apply(null, arguments);
};

var dynCall_viiii = Module["dynCall_viiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Md"].apply(null, arguments);
};

var dynCall_iiiiiii = Module["dynCall_iiiiiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Nd"].apply(null, arguments);
};

var dynCall_vijii = Module["dynCall_vijii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Od"].apply(null, arguments);
};

var dynCall_ij = Module["dynCall_ij"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Pd"].apply(null, arguments);
};

var dynCall_iiiij = Module["dynCall_iiiij"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Qd"].apply(null, arguments);
};

var dynCall_iiiiiiiiii = Module["dynCall_iiiiiiiiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Rd"].apply(null, arguments);
};

var dynCall_iij = Module["dynCall_iij"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Sd"].apply(null, arguments);
};

var dynCall_iijii = Module["dynCall_iijii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Td"].apply(null, arguments);
};

var dynCall_iiji = Module["dynCall_iiji"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Ud"].apply(null, arguments);
};

var dynCall_iiiiiij = Module["dynCall_iiiiiij"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Vd"].apply(null, arguments);
};

var dynCall_viiiii = Module["dynCall_viiiii"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Wd"].apply(null, arguments);
};

var dynCall_ji = Module["dynCall_ji"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Xd"].apply(null, arguments);
};

var _asyncify_start_unwind = Module["_asyncify_start_unwind"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Yd"].apply(null, arguments);
};

var _asyncify_stop_unwind = Module["_asyncify_stop_unwind"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["Zd"].apply(null, arguments);
};

var _asyncify_start_rewind = Module["_asyncify_start_rewind"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["_d"].apply(null, arguments);
};

var _asyncify_stop_rewind = Module["_asyncify_stop_rewind"] = function() {
 assert(runtimeInitialized, "you need to wait for the runtime to be ready (e.g. wait for main() to be called)");
 assert(!runtimeExited, "the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
 return Module["asm"]["$d"].apply(null, arguments);
};

Module["asm"] = asm;

if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString")) Module["intArrayFromString"] = function() {
 abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = function() {
 abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["ccall"] = ccall;

Module["cwrap"] = cwrap;

if (!Object.getOwnPropertyDescriptor(Module, "setValue")) Module["setValue"] = function() {
 abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "getValue")) Module["getValue"] = function() {
 abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = function() {
 abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["getMemory"] = getMemory;

if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = function() {
 abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function() {
 abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function() {
 abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = function() {
 abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function() {
 abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = function() {
 abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function() {
 abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = function() {
 abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = function() {
 abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function() {
 abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = function() {
 abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = function() {
 abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function() {
 abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function() {
 abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() {
 abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function() {
 abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function() {
 abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function() {
 abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function() {
 abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function() {
 abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = function() {
 abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = function() {
 abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = function() {
 abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["addRunDependency"] = addRunDependency;

Module["removeRunDependency"] = removeRunDependency;

Module["ENV"] = ENV;

Module["FS"] = FS;

Module["FS_createFolder"] = FS.createFolder;

Module["FS_createPath"] = FS.createPath;

Module["FS_createDataFile"] = FS.createDataFile;

Module["FS_createPreloadedFile"] = FS.createPreloadedFile;

Module["FS_createLazyFile"] = FS.createLazyFile;

Module["FS_createLink"] = FS.createLink;

Module["FS_createDevice"] = FS.createDevice;

Module["FS_unlink"] = FS.unlink;

if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function() {
 abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "dynamicAlloc")) Module["dynamicAlloc"] = function() {
 abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary")) Module["loadDynamicLibrary"] = function() {
 abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule")) Module["loadWebAssemblyModule"] = function() {
 abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function() {
 abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function() {
 abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function() {
 abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function() {
 abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function() {
 abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function() {
 abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() {
 abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function() {
 abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = function() {
 abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() {
 abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function() {
 abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function() {
 abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function() {
 abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function() {
 abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["establishStackSpace"] = establishStackSpace;

if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function() {
 abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function() {
 abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function() {
 abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function() {
 abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["callMain"] = callMain;

if (!Object.getOwnPropertyDescriptor(Module, "Pointer_stringify")) Module["Pointer_stringify"] = function() {
 abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function() {
 abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["writeStackCookie"] = writeStackCookie;

Module["checkStackCookie"] = checkStackCookie;

if (!Object.getOwnPropertyDescriptor(Module, "abortStackOverflow")) Module["abortStackOverflow"] = function() {
 abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
};

Module["PThread"] = PThread;

Module["ExitStatus"] = ExitStatus;

Module["dynCall_ii"] = dynCall_ii;

if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", {
 get: function() {
  abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 }
});

if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", {
 get: function() {
  abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 }
});

if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC")) Object.defineProperty(Module, "ALLOC_DYNAMIC", {
 get: function() {
  abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 }
});

if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE")) Object.defineProperty(Module, "ALLOC_NONE", {
 get: function() {
  abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)");
 }
});

Module["calledRun"] = calledRun;

var calledRun;

Module["then"] = function(func) {
 if (calledRun) {
  func(Module);
 } else {
  var old = Module["onRuntimeInitialized"];
  Module["onRuntimeInitialized"] = function() {
   if (old) old();
   func(Module);
  };
 }
 return Module;
};

function ExitStatus(status) {
 this.name = "ExitStatus";
 this.message = "Program terminated with exit(" + status + ")";
 this.status = status;
}

var calledMain = false;

dependenciesFulfilled = function runCaller() {
 if (!calledRun) run();
 if (!calledRun) dependenciesFulfilled = runCaller;
};

function callMain(args) {
 assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
 assert(__ATPRERUN__.length == 0, "cannot call main when preRun functions remain to be called");
 args = args || [];
 var argc = args.length + 1;
 var argv = stackAlloc((argc + 1) * 4);
 GROWABLE_HEAP_STORE_I32(argv | 0, allocateUTF8OnStack(thisProgram));
 for (var i = 1; i < argc; i++) {
  GROWABLE_HEAP_STORE_I32(((argv >> 2) + i) * 4 | 0, allocateUTF8OnStack(args[i - 1]));
 }
 GROWABLE_HEAP_STORE_I32(((argv >> 2) + argc) * 4 | 0, 0);
 try {
  var ret = Module["_main"](argc, argv);
  if (!noExitRuntime) {
   exit(ret, true);
  }
 } catch (e) {
  if (e instanceof ExitStatus) {
   return;
  } else if (e == "SimulateInfiniteLoop") {
   noExitRuntime = true;
   return;
  } else {
   var toLog = e;
   if (e && typeof e === "object" && e.stack) {
    toLog = [ e, e.stack ];
   }
   err("exception thrown: " + toLog);
   quit_(1, e);
  }
 } finally {
  calledMain = true;
 }
}

function run(args) {
 args = args || arguments_;
 if (runDependencies > 0) {
  return;
 }
 writeStackCookie();
 preRun();
 if (runDependencies > 0) return;
 function doRun() {
  if (calledRun) return;
  calledRun = true;
  Module["calledRun"] = true;
  if (ABORT) return;
  initRuntime();
  preMain();
  if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
  if (shouldRunNow) callMain(args);
  postRun();
 }
 if (Module["setStatus"]) {
  Module["setStatus"]("Running...");
  setTimeout(function() {
   setTimeout(function() {
    Module["setStatus"]("");
   }, 1);
   doRun();
  }, 1);
 } else {
  doRun();
 }
 checkStackCookie();
}

Module["run"] = run;

function checkUnflushedContent() {
 var print = out;
 var printErr = err;
 var has = false;
 out = err = function(x) {
  has = true;
 };
 try {
  var flush = Module["_fflush"];
  if (flush) flush(0);
  [ "stdout", "stderr" ].forEach(function(name) {
   var info = FS.analyzePath("/dev/" + name);
   if (!info) return;
   var stream = info.object;
   var rdev = stream.rdev;
   var tty = TTY.ttys[rdev];
   if (tty && tty.output && tty.output.length) {
    has = true;
   }
  });
 } catch (e) {}
 out = print;
 err = printErr;
 if (has) {
  warnOnce("stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.");
 }
}

function exit(status, implicit) {
 checkUnflushedContent();
 if (implicit && noExitRuntime && status === 0) {
  return;
 }
 if (noExitRuntime) {
  if (!implicit) {
   err("exit(" + status + ") called, but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)");
  }
 } else {
  PThread.terminateAllThreads();
  ABORT = true;
  EXITSTATUS = status;
  exitRuntime();
  if (Module["onExit"]) Module["onExit"](status);
 }
 quit_(status, new ExitStatus(status));
}

var abortDecorators = [];

function abort(what) {
 if (Module["onAbort"]) {
  Module["onAbort"](what);
 }
 if (ENVIRONMENT_IS_PTHREAD) console.error("Pthread aborting at " + new Error().stack);
 what += "";
 out(what);
 err(what);
 ABORT = true;
 EXITSTATUS = 1;
 var extra = "";
 var output = "abort(" + what + ") at " + stackTrace() + extra;
 if (abortDecorators) {
  abortDecorators.forEach(function(decorator) {
   output = decorator(output, what);
  });
 }
 throw output;
}

Module["abort"] = abort;

if (Module["preInit"]) {
 if (typeof Module["preInit"] == "function") Module["preInit"] = [ Module["preInit"] ];
 while (Module["preInit"].length > 0) {
  Module["preInit"].pop()();
 }
}

var shouldRunNow = true;

if (Module["noInitialRun"]) shouldRunNow = false;

if (!ENVIRONMENT_IS_PTHREAD) noExitRuntime = true;

if (!ENVIRONMENT_IS_PTHREAD) run();


  return _Coldbrew_coldbrew_internal_
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
      module.exports = _Coldbrew_coldbrew_internal_;
    else if (typeof define === 'function' && define['amd'])
      define([], function() { return _Coldbrew_coldbrew_internal_; });
    else if (typeof exports === 'object')
      exports["_Coldbrew_coldbrew_internal_"] = _Coldbrew_coldbrew_internal_;
    

// This same script is run on the browser, in Node.js, and in workers. Because of that, there is
// some branching that controls code that specifically needs to run in each of those environments.

// Define only one other thing in the global scope. We need this to track
// shared mount point nodes.
if (typeof COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes === 'undefined') {
  COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes = {};
}

/**********************************************************/
/***************START MODULE DEFINITIONS*******************/
/**********************************************************/
// Since when 'window' is not available, some of the 
// third-party libraries export to module.exports, we have a list of 
// modules objects that get assigned to each third-party library
/**********************************************************/
if (IS_NODE_JS) {
  var module1 = {exports: {}}; // the current module (this file!)
  var module2 = {exports: {}}; // browserfs
  var module3 = {exports: {}}; // jszip
  var module4 = {exports: {}}; // fast-text-encoding
  var module5 = {exports: {}}; // comlink
}
/**********************************************************/
/****************END MODULE DEFINITIONS********************/
/**********************************************************/

/**********************************************************/
/***********START BEGINNING OF GLOBAL CLOSURE**************/
/**********************************************************/
// Creating a closure to wrap all code in this file within
// a closed scope.
/**********************************************************/
(function() {
/**********************************************************/
/************END BEGINNING OF GLOBAL CLOSURE***************/
/**********************************************************/


/**********************************************************/
/***********START DEFINE GETTER FOR COMLINK****************/
/**********************************************************/
// Defines a function that returns the Comlink instance,
// which is used for worker communication. It is
// particularly different than getting any other library
// since in Node.js, a monkey-patch needs to be performed
// using patchMessageChannel() to make a forked-process
// behave like a Worker with Worker APIs.
/**********************************************************/
function getComlink() {
  if (IS_NODE_JS) {
    require('node-comlink').patchMessageChannel();
    var Comlink = require('comlinkjs/umd/comlink.js');
    return Comlink;
  } else {
    var Comlink;
    if ((!COLDBREW_GLOBAL_SCOPE || typeof COLDBREW_GLOBAL_SCOPE.Comlink === 'undefined')) {
      Comlink = module5.exports;
    } else {
      Comlink = COLDBREW_GLOBAL_SCOPE.Comlink;
    }
    return Comlink;    
  }
}
/**********************************************************/
/***********END DEFINE GETTER FOR COMLINK******************/
/**********************************************************/

/**********************************************************/
/**************START DEFINE MISC CLASSES*******************/
/**********************************************************/
// Defines miscellaneous classes that the Coldbrew runtime
// uses. 
/**********************************************************/
class JavaScriptError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, JavaScriptError);
  }
}
class PythonError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, PythonError);
    this.errorData = Coldbrew.getExceptionInfo();
  }
}
class HTTPResponseError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, HTTPResponseError);
  }
}
class HTTPAbortError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, HTTPAbortError);
  }
}
class HTTPTimeoutError extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, HTTPTimeoutError);
  }
}
class PythonVariable {
  static isPythonVariable(obj) {
    if (obj instanceof Object) {
      if (obj._internal_coldbrew_native_js_worker_proxy === true) {
        // Since this is also a proxy variable it can easily get confused, immediately return false
        return false;
      }
      var vals = PythonVariable.internalKeyDefs
        .filter(function(internalKeyDef) { return !['toString', 'toJSON'].includes(internalKeyDef); })
        .map(function(internalKeyDef) { return obj[internalKeyDef] });
      var plainPythonVariable = vals.every(function(val) { return typeof val !== 'undefined' && typeof val.then === 'undefined'; });
      var potentialWorkerPythonVariable = typeof obj.__raw_promise__ !== 'undefined' && vals.every(function(val) { return (typeof val !== 'undefined' && typeof val.then !== 'undefined') || typeof val === 'string' || typeof val === 'function'; });
      if (plainPythonVariable) {
        return true;
      } else if (potentialWorkerPythonVariable) {
        return Promise.all(vals).then(function(vals) {
          return vals.every(function(val) { return typeof val !== 'undefined' && typeof val.then === 'undefined'; });
        });
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
}
PythonVariable.internalKeyDefs = ['__type__', '__uid__', '__inspect__', '__destroy__', '__destroyed__', 'toString', 'toJSON'];
PythonVariable.internalSecretKeyDefs = ['_internal_coldbrew_repr'];
class PythonDynamicallyEvaluatedValue {}
class _PythonKeywords {
  constructor(keywords, resolvePromises = false) {
    var newKeywords = {};
    Object.keys(keywords).forEach(function(key) {
      newKeywords[key] = serializeToPython(keywords[key], false, resolvePromises);
    });
    this.keywords = newKeywords;
  }
}
/**********************************************************/
/**************END DEFINE MISC CLASSES*********************/
/**********************************************************/

/**********************************************************/
/*****************START HELPER UTILITIES*******************/
/**********************************************************/
// Defines various helper utility functions.
/**********************************************************/
function parseUrl(string, prop) {
  return (new URL(string))[prop];
}
// Exporting parseUrl to the top scope, since we actually use it
// to load assets for the wasm like (.data, .embin, .wasm) files.
COLDBREW_TOP_SCOPE.parseUrl = parseUrl;

function randid() {
  return 'rxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Source: isPlainObject from lodash.isPlainObject
var isPlainObject = null;
(function() {
  var objectTag = '[object Object]';
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var funcProto = Function.prototype,
      objectProto = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  var objectToString = objectProto.toString;
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  isPlainObject = function(value) {
    if (!isObjectLike(value) ||
        objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (typeof Ctor == 'function' &&
      Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
  };
})();

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1]
}

function isConstructor(obj) {
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

function isSerializable(obj) {
  var isNestedSerializable;
  function isPlain(val) {
    return (typeof val === 'undefined' || val == null || typeof val === 'string' || typeof val === 'boolean' || typeof val === 'number' || Array.isArray(val) || isPlainObject(val));
  }
  if (!isPlain(obj)) {
    return false;
  }
  var properties = ((typeof obj ===  'object' && obj != null) || typeof obj ===  'function') ? Object.getOwnPropertyNames(obj) : [];
  for (var i=0; i<properties.length; i++) {
    var property = properties[i];
    if (!isPlain(obj[property])) {
      return false;
    }
    if (typeof obj[property] == "object") {
      isNestedSerializable = isSerializable(obj[property]);
      if (!isNestedSerializable) {
        return false;
      }
    }
  };
  return true;
}

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

function isPromise(val) {
  return !(val && val._internal_coldbrew_native_js_worker_proxy === true) && !!(val && typeof val.then === 'function');
}
/**********************************************************/
/******************END HELPER UTILITIES********************/
/**********************************************************/

/**********************************************************/
/*****************START HTTP SEND REQUEST******************/
/**********************************************************/
// A HTTP/HTTPS sendRequest function that helps send a
// HTTP/HTTPS request in both the browser through XHR
// or in Node.js through the `http` client library.
// This function is used to load some assets for the wasm
// like (.embin) or load .zip files. It is also what 
// ultimately shims Python's HTTP library.
/**********************************************************/
function sendRequest(method, url, body, headers, timeout, binary = false, level=0) {
  if (level > 25) {
    var e = new HTTPResponseError("The request has been redirected too many times.");
    e.errorData = {
      status: 0,
      statusText: "",
      responseText: "",
      responseType: "",
      responseURL: url,
      headers: "",
    }
    return Promise.reject(e);
  }
  return new Promise(function (resolve, reject) {
    if (typeof XMLHttpRequest !== 'undefined') {
      var request = new XMLHttpRequest();
      if (timeout !== null) {
        request.timeout = timeout * 1000;
      }
      if (binary) {
        request.responseType = "arraybuffer";
      }
      request.open(method, url, true);
      Object.keys(headers).forEach(function(header) {
        if (!["host", "connection", "user-agent", "accept-encoding", "content-length"].includes(header.toLowerCase())) {
          request.setRequestHeader(header, headers[header]);
        }
      });
      request.onreadystatechange = function () {
        var headers = this.getAllResponseHeaders();
        if (this.readyState === 4) {
          var responseContent  = !binary ? this.responseText : this.response;
          var responseLength = !binary ? responseContent.length : responseContent.byteLength;
          headers += 'content-length: '+responseLength.toString()+'\r\n';
          if (this.status >= 200 && this.status < 400) {
            resolve({
              status: this.status,
              statusText: this.statusText,
              responseText: responseContent,
              responseType: this.responseType,
              responseURL: this.responseURL,
              headers: headers,
            });
          } else {
            var e = new HTTPResponseError("The request has failed.");
            e.errorData = {
              status: this.status,
              statusText: this.statusText,
              responseText: responseContent,
              responseType: this.responseType,
              responseURL: this.responseURL,
              headers: headers,
            }
            reject(e);
          }
        }
      };
      request.ontimeout = function () {
        var e = new HTTPTimeoutError("The request has timed out.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      };
      request.onabort = function () {
        var e = new HTTPAbortError("The request has been aborted.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      };
      request.send(body);
    } else {
      var urllib = require('url');
      var parsedUrl = urllib.parse(url);
      var httplib = (parsedUrl.protocol === 'http:') ? require('http') : require('https');
      var requestOptions = {
        method: method,
        host: parsedUrl.host,
        port: parsedUrl.port,
        path: parsedUrl.path,
        headers: headers,
      };
      if (timeout !== null) {
        requestOptions.timeout = timeout;
      }
      var request = httplib.request(requestOptions, function (res) {
        if (binary) res.setEncoding('binary');
        var responseContent = binary ? [] : "";
        res.on("data", function (data) {
          if (binary) {
            responseContent.push(Buffer.from(data, 'binary'));
          } else {
            responseContent += data;
          }
        });
        res.on("end", function () {
          if (res.statusCode == 301 || res.statusCode == 302 || res.statusCode == 303 && typeof res.headers.location !== 'undefined') {
            Object.keys(headers).forEach(function(header) {
              if (header.toLowerCase() === 'host') {
                headers[header] = urllib.parse(res.headers.location).host;
              }
            });
            sendRequest('GET', res.headers.location, body, headers, timeout, binary, level+1).then(resolve).catch(reject);
            return;
          } else if (res.statusCode == 307 || res.statusCode == 308 && typeof res.headers.location !== 'undefined') {
            Object.keys(headers).forEach(function(header) {
              if (header.toLowerCase() === 'host') {
                headers[header] = urllib.parse(res.headers.location).host;
              }
            });
            sendRequest(method, res.headers.location, body, headers, timeout, binary, level+1).then(resolve).catch(reject);
            return;
          } else if (res.statusCode >= 200 && res.statusCode < 400) {
            resolve({
              status: res.statusCode,
              statusText: res.statusMessage,
              responseText: (binary) ? toArrayBuffer(Buffer.concat(responseContent)) : responseContent,
              responseType: (binary) ? "arraybuffer" : "",
              responseURL: typeof res.headers.location !== 'undefined' ? res.headers.location : url,
              headers: res.rawHeaders.map(h => h+'\r\n').join(''),
            });
          } else {
            var e = new HTTPResponseError("The request has failed.");
            e.errorData = {
              status: res.statusCode,
              statusText: res.statusMessage,
              responseText: (binary) ? toArrayBuffer(Buffer.concat(responseContent)) : responseContent,
              responseType: (binary) ? "arraybuffer" : "",
              responseURL: typeof res.headers.location !== 'undefined' ? res.headers.location : url,
              headers: res.rawHeaders.map(h => h+'\r\n').join(''),
            }
            reject(e);
          }
        });
      });
      request.on('error', function() {
        var e = new HTTPResponseError("The request has failed.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      });
      request.on('abort', function() {
        var e = new HTTPAbortError("The request has been aborted.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      });
      request.on('timeout', function(e) {
        var e = new HTTPTimeoutError("The request has timed out.");
        e.errorData = {
          status: 0,
          statusText: "",
          responseText: "",
          responseType: "",
          responseURL: url,
          headers: {},
        }
        reject(e);
      });
      if (body !== null) {
        request.write(body);
      }
      request.end();
    }
  });
}
/**********************************************************/
/******************END HTTP SEND REQUEST*******************/
/**********************************************************/

/**********************************************************/
/***********START DEFINE SINGLETON INTIALIZERS*************/
/**********************************************************/
// These singletons initialze the underlying Emscripten
// Module or configure the options for the virtual file
// system (which should both only be done once).
/**********************************************************/
/**********************************************************/
var _Coldbrew_coldbrew_internal_instance = (function() {
  var executed = false;
  var singleton = null;
  return function() {
    if (!executed) {
      executed = true;
      singleton = _Coldbrew_coldbrew_internal_();
    }
    return singleton;
  };
})();
var _Coldbrew_coldbrew_internal_fs_configure = (function() {
  var executed = false;
  var singleton = {};
  var configured = false;
  var queuedCbs = [];
  return function(sharedHome, sharedTmp, persistHome, persistTmp, browserFSOptions, cb) {
    cb = cb || function() {};
    queuedCbs.push(cb);
    if (!executed) {
      executed = true;
      singleton['/.slots'] = 0;
      if (sharedHome || persistHome) {
        singleton['/home'] = 0;
      }
      if (sharedTmp || persistTmp) {
        singleton['/tmp'] = 0;
      }
      if (sharedHome) {
        singleton['/home'] |= 1;
      }
      if (sharedTmp) {
        singleton['/tmp'] |=  1;
      }
      if (persistHome) {
        if (IS_NODE_JS) {
          throw new Error("You cannot persist the file system on Node.js, there is no browser storage available. Maybe try bundling files using a custom Coldbrew Python environment (see README on GitHub) instead?");
        }
        singleton['/home'] |=  2;
      }
      if (persistTmp) {
        if (IS_NODE_JS) {
          throw new Error("You cannot persist the file system on Node.js, there is no browser storage available. Maybe try bundling files using a custom Coldbrew Python environment (see README on GitHub) instead?");
        }
        singleton['/tmp'] |= 2;
      }
      if (false) {
        // Handle BrowserFS here        
        Object.keys(finalizedOptions).forEach(function(mountPoint) {
          singleton[mountPoint] = 0;
        });
        configured = true;
        while (queuedCbs.length > 0) {
          queuedCbs.pop()(null, singleton);
        }
      } else {
        configured = true;
        while (queuedCbs.length > 0) {
          queuedCbs.pop()(null, singleton);
        }
      }
    } else {
      if (configured) {
        cb(null, singleton);
        queuedCbs = [];
      }
    }
  };
})();
/**********************************************************/
/************END DEFINE SINGLETON INTIALIZERS**************/
/**********************************************************/

/**********************************************************/
/*********START DEFINE CREATE VARIABLE PROXY***************/
/**********************************************************/
// This function takes what might be returned by Python 
// and converts it into an ES6 proxy object that tries to
// mirror that Python variables and make it look like a 
// native JavaScript variable. If the argument is not a 
// reference to a native Python variable, it is simply
// returned.
/**********************************************************/
function createVariableProxy(obj) {
  if (obj && obj._internal_coldbrew_python_object) {
    if (!/^[A-Za-z0-9_]+$/.test(obj.type)) {
      throw new Error("Cannot proxy a Python variable with a type with special characters in type name: "+ obj.type);
    }
    if (!/^[A-Za-z0-9_]+$/.test(obj.name)) {
      throw new Error("Cannot proxy a Python variable with a name with special characters in type name: "+obj.name);
    }
    var getVariable = Coldbrew.getVariable;
    var run = Coldbrew.run;
    if (obj.is_async) {
      getVariable = Coldbrew.getVariableAsync;
      run = Coldbrew.runAsync;
    }
    var transformProp = function(prop, reverse=null) {
      if (!(reverse instanceof Array) && Coldbrew._finalizedOptions.transformVariableCasing) {
        if (/^[A-Za-z0-9]+(_[A-Za-z0-9]*)*$/.test(prop)) {
          return prop.replace(/([-_][a-z0-9])/ig, function ($1) {
            return $1.toUpperCase()
              .replace('-', '')
              .replace('_', '');
          });
        } else {
          return prop;
        }
      } else if (Coldbrew._finalizedOptions.transformVariableCasing) {
        var transformedKeys = reverse.map(transformProp);
        var indexOfTransformedProp = transformedKeys.indexOf(prop);
        if (indexOfTransformedProp >= 0) {
          return reverse[indexOfTransformedProp];
        } else {
          return prop;
        }
      } else {
        return prop;
      }
    };
    function getTProp(prop) {
      var keys = Coldbrew.getVariable("('"+obj.uid+"' in Coldbrew._vars and dir(Coldbrew._vars['"+obj.uid+"'])) or []");
      if (typeof keys.then !== 'undefined') {
        return keys.then(function(keys) {
          return transformProp(prop, keys);
        });
      } else {
        return transformProp(prop, keys);
      }
    }
    var $handler = {
        construct: function(target, args) {
          return (getVariable("Coldbrew._call_func(Coldbrew._vars['"+obj.uid+"'],"+args.map(arg => serializeToPython(arg)).join(',')+")"));
        },
        apply: function(target, thisArg, argumentsList) {
          return (getVariable("Coldbrew._call_func(Coldbrew._vars['"+obj.uid+"'].im_func,"+serializeToPython(thisArg)+","+argumentsList.map(arg => serializeToPython(arg)).join(',')+") if hasattr(Coldbrew._vars['"+obj.uid+"'], 'im_func') else Coldbrew._call_func(Coldbrew._vars['"+obj.uid+"'],"+argumentsList.map(arg => serializeToPython(arg)).join(',')+")"));
        },
        get: function(target, prop) {
          if (prop === '_internal_coldbrew_repr') {
            return obj;
          } else if (typeof prop === 'string' && prop.startsWith('_internal_coldbrew')) {
            return undefined;
          } else if (prop === Symbol.iterator) {
            var hasIter = Coldbrew.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], '__iter__')");
            if (!isPromise(hasIter)) {
              return (function*() {
                if (hasIter) {
                  var pyiter = Coldbrew.getVariable("iter(Coldbrew._vars['"+obj.uid+"'])");
                  var sentinel = Coldbrew.getVariable("Coldbrew._StopIteration()");
                  while (true) {
                    var nextValue = Coldbrew.runFunction('next', pyiter, sentinel);
                    var done = (typeof nextValue.__type__ !== 'undefined') ? nextValue.__type__ == '_StopIteration' : false;
                    if (done) {
                      pyiter.__destroy__();
                      sentinel.__destroy__();
                      break;
                    }
                    yield nextValue;
                  }
                }
              });
            } else {
              return (async function*() {
                if (await hasIter) {
                  var pyiter = getVariable("iter(Coldbrew._vars['"+obj.uid+"'])");
                  var sentinel = getVariable("Coldbrew._StopIteration()");
                  while (true) {
                    var nextValue = await Coldbrew.runFunction('next', pyiter, sentinel);
                    var done = (typeof nextValue.__type__ !== 'undefined') ? nextValue.__type__ == '_StopIteration' : false;
                    if (done) {
                      await pyiter.__destroy__();
                      await sentinel.__destroy__();
                      break;
                    }
                    yield (nextValue);
                  }
                }
              });
            }          
          } else if (typeof prop === 'symbol') {
            // These are a JavaScript special property that the engine expects to not be defined sometimes, ignore them.
            return undefined;
          } else if (prop === '__proto__') {
            // This is a JavaScript special property that the engine expects to be defined;
            return Reflect.get(target, prop);
          } else if (prop === 'then') {
            // This is a JavaScript special property that the engine expects to not be defined if not a Promise.
            return undefined;
          } else if (prop === 'toJSON') {
            // This is a JavaScript special property that the engine expects to be defined for custom JSON serialization.
            var tprop = getTProp(prop);
            function toJSON(tprop) {
              return getVariable("(getattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")() if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew.json.dumps(str(Coldbrew._vars['"+obj.uid+"'])))");
            }
            return function() {
              if (!isPromise(tprop)) {
                return toJSON(tprop);
              } else {
                return (tprop.then(function(tprop) {
                  return toJSON(tprop);
                }));
              }
            };
          } else if (prop === 'toString') {
            // This is a JavaScript special property that the engine expects to be defined for custom string serialization.
            var tprop = getTProp(prop);
            function toString(tprop) {
              return getVariable("(getattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")() if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else str(Coldbrew._vars['"+obj.uid+"']))");
            }
            return function() {
              if (!isPromise(tprop)) {
                return toString(tprop);
              } else {
                return (tprop.then(function(tprop) {
                  return toString(tprop);
                }));
              }
            };
          } else if (prop === '__inspect__') {
            var res = Coldbrew.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
            function inspect(res) {
              res = res.map(transformProp); 
              return Coldbrew.PythonVariable.internalKeyDefs.concat(res); 
            }
            return function() { 
              if (!isPromise(res)) {
                return inspect(res);
              } else {
                return res.then(function(res) {
                  return inspect(res);
                });
              }
            };
          } else if (prop === '__destroy__') {
            return (function() {
              return Coldbrew.run("Coldbrew._delete_uid('"+obj.uid+"')");
            });
          } else if (prop === '__destroyed__') {
              return Coldbrew.getVariable("'"+obj.uid+"' not in Coldbrew._vars");
          } else if (prop === '__type__') {
            return obj.type;
          } else if (prop === '__uid__') {
            return obj.uid;
          } else {
            var tprop = getTProp(prop);
            function get(tprop) {
              var hasAttrOrItem = Coldbrew.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or ((hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and type(Coldbrew._vars['"+obj.uid+"']) != type and Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"'])");
              function _get(hasAttrOrItem) {
                if (hasAttrOrItem) {
                  return Coldbrew.getVariable("getattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew._vars['"+obj.uid+"'][Coldbrew._unserialize_from_js("+serializeToPython(prop)+")]");
                } else {
                  return undefined;
                }
              }
              if (!isPromise(hasAttrOrItem)) {
                return _get(hasAttrOrItem);
              } else {
                return hasAttrOrItem.then(function(hasAttrOrItem) {
                  return _get(hasAttrOrItem);
                });
              }
            }
            if (!isPromise(tprop)) {
              return get(tprop);
            } else {
              return (tprop.then(function(tprop) {
                return get(tprop);
              }));
            }
          }
        },
        set: function(target, prop, value) {
          if (prop === '__proto__') {
            Reflect.set(target, prop, value);
            return value;
          }
          var tprop = getTProp(prop);
          function set(tprop) {
            Coldbrew.run("(setattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+", Coldbrew._unserialize_from_js("+serializeToPython(value)+")) if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") else Coldbrew._vars['"+obj.uid+"'].__setitem__(Coldbrew._unserialize_from_js("+serializeToPython(prop)+"), Coldbrew._unserialize_from_js("+serializeToPython(value)+")))");
          }
          if (!isPromise(tprop)) {
            set(tprop);
          } else {
            return tprop.then(function(tprop) {
              set(tprop);
            });
          }
          return value;
        },
        ownKeys: function(target) {
          var reflectRes = Reflect.ownKeys(target);
          var res = Coldbrew.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
          if (!isPromise(res)) {
            res = res.map(transformProp);
            if (reflectRes.length > 0) {
              return reflectRes.concat(res);
            } else {
              return res;
            }
          } else {
            return reflectRes;
          }
        },
        has: function(target, prop) {
          var tprop = getTProp(prop);
          if (!isPromise(tprop)) {
            return Coldbrew.getVariable("(hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"']) if (hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and type(Coldbrew._vars['"+obj.uid+"']) != type else hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")");
          } else {
            throw new Error("Cannot run 'has' operation (or `in` operator) on PythonVariable when using worker mode.");
          }
        },
        deleteProperty: function(target, prop) {
          var tprop = getTProp(prop);
          function deleteProperty(tprop) {
            var hasAttrOrItem = Coldbrew.getVariable("hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+") or ((hasattr(Coldbrew._vars['"+obj.uid+"'], '__contains__')) and type(Coldbrew._vars['"+obj.uid+"']) != type and Coldbrew._unserialize_from_js("+serializeToPython(prop)+") in Coldbrew._vars['"+obj.uid+"'])");
            function _deleteProperty(hasAttrOrItem) {
              if (hasAttrOrItem) {
                Coldbrew.run("if hasattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+"):\n\tdelattr(Coldbrew._vars['"+obj.uid+"'], "+JSON.stringify(tprop)+")\nelse:\n\tColdbrew._vars['"+obj.uid+"'].__delitem__(Coldbrew._unserialize_from_js("+serializeToPython(prop)+"))");
              }
            }
            if (!isPromise(hasAttrOrItem)) {
              return _deleteProperty(hasAttrOrItem);
            } else {
              return hasAttrOrItem.then(function(hasAttrOrItem) {
                return _deleteProperty(hasAttrOrItem);
              });
            }
          }
          if (!isPromise(tprop)) {
            deleteProperty(tprop);
          } else {
            return tprop.then(function(tprop) {
              deleteProperty(tprop);
            });
          }
          return true;
        },
    };
    if (obj.constructable) {
      delete $handler.apply;
    } else if (obj.callable) {
      delete $handler.constructable;
    } else {
      delete $handler.constructable;
      delete $handler.apply;
    }
    var varObj = null;
    if (obj.constructable || obj.callable) {
      try {
        eval(`class ${obj.type} extends Coldbrew.PythonVariable {} varObj = ${obj.type};`);
      } catch (e) {
        eval(`class py_${obj.type} extends Coldbrew.PythonVariable {} varObj = py_${obj.type};`);
      }
    } else {
      varObj = new Coldbrew.PythonVariable();
    }
    var $keyDefs = Coldbrew.getVariable("dir(Coldbrew._vars['"+obj.uid+"'])");
    
    // This function adds introspection/debugging information that
    // displays when using the browser's console or the Node.js REPL
    // to interactively view the proxy variable.
    function attachDebuggingInformation(varObj, $handler, $keyDefs) {
      $keyDefs = $keyDefs.map(transformProp).concat(Coldbrew.PythonVariable.internalKeyDefs);
      var keyDefPrototype = {};
      if ((!obj.constructable && !obj.callable) || IS_NODE_JS) {
        varObj['__type__'] = $handler.get({}, '__type__');
        keyDefPrototype['__type__'] = $handler.get({}, '__type__');
        $keyDefs.forEach(function(keyDef) {
          if (Coldbrew.PythonVariable.internalKeyDefs.includes(keyDef)) {
            varObj[keyDef] = $handler.get({}, keyDef);
            keyDefPrototype[keyDef] = $handler.get({}, keyDef);
          } else {
            varObj[keyDef] = new PythonDynamicallyEvaluatedValue();
            keyDefPrototype[keyDef] = new PythonDynamicallyEvaluatedValue();
          }
        });
        Object.setPrototypeOf(varObj, keyDefPrototype);
        var proxy = new Proxy(varObj, $handler);
        return proxy;
      } else if (obj.constructable || obj.callable) {
        var $proxy = new Proxy(varObj, $handler);
        var $newProxy = null;
        // Adds introspection/debugging information
        if (obj.constructable) {
          eval(`class ${obj.name} { constructor(...args) { return new $proxy(...args); } } $newProxy = ${obj.name};`);
        } else if (obj.callable) {
          eval(`function ${obj.name}(...args) { return $proxy(...args); } $newProxy = ${obj.name};`);
        }
        $newProxy.__proto__ = {}; // not using Object.setPrototypeOf($newProxy, proxy); as it quashes debugging information in the console
        $keyDefs.concat(Coldbrew.PythonVariable.internalSecretKeyDefs).forEach(function(keyDef) {
          Object.defineProperty($newProxy.__proto__, keyDef, {
            configurable: false,
            enumerable: true,
            get: $handler.get.bind($handler, {}, keyDef),
            set: $handler.set.bind($handler, {}, keyDef),
          });
        });
        return $newProxy;
      }
    }

    if (typeof $keyDefs.then !== 'undefined') {
      return $keyDefs.then(function($keyDefs) {
        return attachDebuggingInformation(varObj, $handler, $keyDefs);
      });
    } else {
      return attachDebuggingInformation(varObj, $handler, $keyDefs);
    }
  } else {
    return obj;
  }
};
/**********************************************************/
/*********END DEFINE CREATE VARIABLE PROXY***************/
/**********************************************************/

/**********************************************************/
/*********START DEFINE COMMUNICATION HELPERS***************/
/**********************************************************/
// Various functions that help communicate between the 
// languages (JavaScript and Python) or between the main
// thread and a worker thread by serializing and
// unserializing data.
/**********************************************************/
function primitize(obj, _export = false, resolvePromises = false) {
  var isPythonVariable = Coldbrew.PythonVariable.isPythonVariable(obj);
  if (isPythonVariable === true) {
    return obj._internal_coldbrew_repr;
  } else if (isPythonVariable !== false) {
    return isPythonVariable.then(function(isPythonVariable) {
      if (isPythonVariable) {
        return obj._internal_coldbrew_repr;
      } else {
        return primitize(obj, _export, resolvePromises);
      }
    });
  } else if (obj && obj._internal_coldbrew_keywords_promise === true) {
    return obj.then(function(obj) {
      return primitize(obj, _export, resolvePromises);
    });
  } else if (obj instanceof _PythonKeywords) {
    return {
      '_internal_coldbrew_keywords': true,
      'keywords': obj.keywords,
    };
  } else if (isPromise(obj) && resolvePromises === true) {
    return obj.then(function(obj) {
      return primitize(obj, false, true);
    });
  } else if (!isSerializable(obj)) {
    if (_export) {
      var uid = randid();
      Coldbrew._vars[uid] = obj;
      return {
          '_internal_coldbrew_javascript_object': true,
          'uid': uid,
          'constructable': (typeof obj._internal_coldbrew_constructable == 'boolean') ? obj._internal_coldbrew_constructable : (obj instanceof Function && isConstructor(obj)),
          'callable': (typeof obj._internal_coldbrew_callable == 'boolean') ? obj._internal_coldbrew_callable : (obj instanceof Function && !isConstructor(obj)),
          'type': obj._internal_coldbrew_type || ((typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj)),
          'name': obj._internal_coldbrew_name || ((typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed')),
      };
    } else {
      var uid = randid();
      if (Coldbrew._finalizedOptions.worker && !IS_WORKER_SCRIPT) {
        Coldbrew._get_vars[uid] = obj;
        Coldbrew.worker.postMessage({
          '_internal_coldbrew_message': true, 
          '_get_var': uid,
          'constructable': obj instanceof Function && isConstructor(obj),
          'callable': obj instanceof Function && !isConstructor(obj),
          'type': (typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj),
          'name': (typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed'),
        });
      } else {
        Coldbrew._get_vars[uid] = obj;
      }
      return {
        '_internal_coldbrew_get_var': true,
        'uid': uid,
      };  
    }
  } else {
    return obj;
  }
}

function serializeToPython(obj, _export = false, resolvePromises = false) {
  obj = primitize(obj, _export, resolvePromises);
  if (typeof obj === 'undefined') {
    obj = null;
  } else if (isPromise(obj)) {
    obj = primitize(obj.then(function(obj) {
      return serializeToPython(obj, _export, resolvePromises);
    }), _export, resolvePromises);
  }
  if (obj && obj._internal_coldbrew_python_object) {
    return 'Coldbrew.json.loads('+JSON.stringify(JSON.stringify({
      '_internal_coldbrew_var': true,
      'uid': obj.uid,
    }))+')';
  }
  return 'Coldbrew.json.loads('+JSON.stringify(JSON.stringify(obj))+')';
}

function unserializeFromPython(arg) {
  arg = createVariableProxy(arg);
  if (arg && arg._internal_coldbrew_get_var === true) {
    var pyarg = Coldbrew.getVariable('Coldbrew._get_vars["'+arg['uid']+'"]'); // Grab the Python native variable argument
    Coldbrew.run('del Coldbrew._get_vars["'+arg['uid']+'"]'); // Clean up the temporary reference
    return pyarg;
  } else if (arg && arg._internal_coldbrew_get_js_var === true) {
    return Coldbrew._get_vars[arg['uid']];
  } else if (arg && arg._internal_coldbrew_var === true) {
    return Coldbrew._vars[arg.uid];
  } else {
    return arg;
  }
}

function serializeToJS(obj) {
  if (isSerializable(obj) || typeof obj === 'symbol') {
    return obj;
  } else {
    return primitize(obj, false, true);
  }
}

function unserializeFromJS(arg) {
  if (arg && arg._internal_coldbrew_get_var && Coldbrew._finalizedOptions.worker && IS_WORKER_SCRIPT) {
    return Coldbrew._get_vars[arg.uid];
  } else {
    return unserializeFromPython(arg);
  }
}
/**********************************************************/
/**********END DEFINE COMMUNICATION HELPERS****************/
/**********************************************************/


/**********************************************************/
/************START DEFINE CHAINABLE PROMISE****************/
/**********************************************************/
// This function takes a Promise and returns a 
// "ChainablePromise." When using workers, you might have
// to do something like this normally since every operation
// has to be asynchronous due to the communciation with the 
// worker over postMessage():
// getVariable('os')
//  .then(os => os.getcwd)
//  .then(getcwd => getcwd())
//  .then(res => console.log(res))
//
// When that same original promise is wrapped 
// (and we do this automatically) as a ChainablePromise you 
// can still do what you did above OR you can more 
// succinctly do:
// getVariable('os').getcwd().then(res => console.log(res))
//
// This makes a big difference when you go many levels deep.
/**********************************************************/
function makePromiseChainable(p) {
  var varObj = null;
  eval(`class ChainablePromise {} varObj = ChainablePromise;`);
  varObj.__real_type__ = 'Chainable Promise Value';
  varObj.__raw_promise__ = p;
  Object.getOwnPropertyNames(Object.getPrototypeOf(p)).forEach(function(key) {
    varObj[key] = function(){};
  });

  // This attaches introspection/debugging information that
  // displays when using the browser's console or the Node.js REPL
  // after the promise resolves.
  p.then(async function(val) {
    if (await PythonVariable.isPythonVariable(val)) {
      varObj['__type__'] = await val.__type__;
      var keyDefs = (await val.__inspect__()).filter(function(keyDef) {
        return !PythonVariable.internalKeyDefs.includes(keyDef);
      });
      keyDefs.concat(PythonVariable.internalKeyDefs.filter(function(internalKeyDef) {
        return internalKeyDef !== '__type__';
      })).forEach(async function(keyDef) {
        if (Coldbrew.PythonVariable.internalKeyDefs.includes(keyDef)) {
          varObj[keyDef] = await val[keyDef];
        } else {
          varObj[keyDef] = new PythonDynamicallyEvaluatedValue();
        }
      });
    }
  });

  return new Proxy(varObj, {
    construct: function(target, args) {
      return makePromiseChainable(p.then(async function(val) {
        var serializedArgs = await Promise.all(args.map(function(arg) {
          return serializeToJS(arg);
        }));
        return new val(...serializedArgs);
      }));
    },
    apply: function(target, thisArg, argumentsList) {
      return makePromiseChainable(p.then(async function(val) {
        var serializedArgs = await Promise.all(argumentsList.map(function(arg) {
          return serializeToJS(arg);
        }));
        return val(...serializedArgs);
      }));
    },
    get: function(target, prop) {
      if (prop == Symbol.toPrimitive || prop === 'valueOf' || prop === 'toString') {
        return undefined;
      }
      if (Object.getOwnPropertyNames(Object.getPrototypeOf(p)).includes(prop) && prop != 'toString') {
        return Reflect.get(p, prop).bind(p);
      }
      if (prop == '__raw_promise__') {
        return p;
      }
      if (prop === Symbol.asyncIterator) {
        return async function*() {
          var iter = (await p.then(function(val) {
            return val[Symbol.iterator];
          }))();
          var readNext = await iter.next();
          while (!readNext.done) {
            yield readNext.value;
            readNext = await iter.next();
          }
        };
      }
      return makePromiseChainable(p.then(async function(val) {
        return val[await serializeToJS(prop)];
      }));
    },
    set: function(target, prop, value) {
      p.then(async function(val) {
        val[await serializeToJS(prop)] = await serializeToJS(value);
      });
      return value;
    },
    ownKeys: function(target) {
      return Reflect.ownKeys(target);
    },
    has: function(target, prop) {
      return Reflect.has(target, prop);
    },
    deleteProperty: function(target, prop) {
      p.then(async function(val) {
        delete val[await serializeToJS(prop)];
      });
      return true;
    }
  });
};
/**********************************************************/
/*************END DEFINE CHAINABLE PROMISE*****************/
/**********************************************************/

/**********************************************************/
/***********START DEFINE MAIN COLDBREW API*****************/
/**********************************************************/
// A couple of notable things:
// 1. The _load() function adds a bunch of
//    properties / methods to the Coldbrew
//    when called.
// 2. When worker mode is enabled, the true Coldbrew
//    is initialized in the worker thread. A proxy to it
//    is given to the main thread by the Comlink library,
//    and a reference to it is stored in _workerProxy.
//    Only a couple of methods on Coldbrew in the main
//    thread actually run in the main thread and aren't
//    just proxies to the worker thread.
// 3. The message handling (from the worker thread to 
//    the main thread) is handled in this section. The
//    handler can be found in load(). The worker sends
//    messages to the main thread requesting information
//    about variables in the main thread scope.
/**********************************************************/
Coldbrew.PythonError = PythonError;
Coldbrew.PythonVariable = PythonVariable;
Coldbrew.PythonKeywords = function(keywords) { 
  var pykw = new _PythonKeywords(keywords, Coldbrew._finalizedOptions.worker && !IS_WORKER_SCRIPT);
  var async = Object.keys(pykw.keywords).some(function(key) {
    return isPromise(pykw.keywords[key]);
  });
  if (async) {
    var entries = Object.entries(pykw.keywords);
    var values = entries.map(function(entry) { return entry[1]; });
    var keywordsPromise =  Promise.all(values).then(function(values) {
      var newKeywords = {};
      entries.forEach(function(entry, i) {
        newKeywords[entry[0]] = values[i];
      });
      pykw.keywords = newKeywords;
      return pykw;
    });
    keywordsPromise._internal_coldbrew_keywords_promise = true;
    return keywordsPromise;
  } else {
    return pykw;
  }
};
Coldbrew.pyversion =  "3.5.2";
Coldbrew.version =  "0.0.68";
Coldbrew._slots = {}; // Stores references to JavaScript variables, while Python has proxy objects that shim them.
Coldbrew._vars = {}; // Stores proxy JavaScript objects that shim Python variables.
Coldbrew._get_vars = {}; // Stores references to main thread JavaScript variables, while the worker thread has proxy objects that shim them.
Coldbrew._isPromise = isPromise;
Coldbrew._convertError = function (e) {
  return {
    '_internal_coldbrew_error': true,
    'type': e.constructor.name,
    'name': e.name,
    'message': e.message,
    'stack': e.stack,
    'data': (typeof e.errorData !== 'undefined') ? e.errorData : null,
  };
};
Coldbrew._try = function(func) {
  try {
    return func();
  } catch (e) {
    return Coldbrew._convertError(e);
  }
};
Coldbrew._callFunc = function(constructable, func, ...args) {
  if (constructable) {
    return new func(...args.map(unserializeFromPython));
  } else {
    return func(...args.map(unserializeFromPython));
  }
};
Coldbrew._serializeToPython = serializeToPython;
Coldbrew._unserializeFromPython = unserializeFromPython;
Coldbrew._parseUrl = parseUrl;
Coldbrew.loaded = false;
Coldbrew.exited = false;
Coldbrew.forwardOut = true;
Coldbrew.forwardErr = true;
Coldbrew._queuedOnReady = [];
Coldbrew.standardInBuffer = 'This is the first line of standard input.\nTo override this, either set `Coldbrew.standardInBuffer` to the full standard input OR set `Coldbrew.onStandardInRead(int size)` to respond interactively to standard input reads OR set `Coldbrew.onStandardInReadAsync(int size)` to respond interactively and asynchronously (by returning a Promise).';
Coldbrew._standardInTell = 0;
Coldbrew._resumeWarn = function(warn=true) { if (warn) { return Coldbrew.run('Coldbrew._warn("The Coldbrew Python interpreter is not currently sleeping. Resuming has no effect.")'); } else return 0; };
Coldbrew.resume = function(...args) { return Coldbrew._resumeWarn(...args); };
Coldbrew._mountFS = function(Module) {};
Coldbrew.preInit = function(Module) {};
Coldbrew.preRun = function(Module) {};
Coldbrew.onStandardOut = function(text) { console.log(text); };
Coldbrew.onStandardErr = function(text) { console.warn(text); };
Coldbrew.onStandardInRead = function(size) { 
  var read = Coldbrew.standardInBuffer.substring(Coldbrew._standardInTell, Coldbrew._standardInTell+size);
  Coldbrew._standardInTell += size;
  return read;
};
Coldbrew.onStandardInReadAsync = function(size) { 
  return Promise.resolve(Coldbrew.onStandardInRead(size));
};
Coldbrew._onRuntimeInitialized = function(Module) {
  Module.callMain();
  Coldbrew._ORIGINAL_ENV_ = Object.assign({}, Module.ENV);
  var oldLoaded = Coldbrew.loaded;
  Coldbrew.loaded = true;
  if (!oldLoaded) {
    Coldbrew._queuedOnReady.forEach(function(onReady) {
      onReady(null, Coldbrew);
    });
    Coldbrew._queuedOnReady = [];
  }
};
Coldbrew._fsReady = function(cb) {
  // If the user already called configure FS, these "false, false, {}" parameters
  // will get ignored, if the user hasn't, "false, false, {}" will be used, but will
  // have no effect.
  _Coldbrew_coldbrew_internal_fs_configure(false, false, false, false, {}, function(err, mountPoints) {
    Coldbrew._mountFS = function(Module) {
      var prefix = '.filesystem';
      Module.FS.createFolder(Module.FS.root, prefix, true, true);
      Object.keys(mountPoints).forEach(function(mountPoint) {
        var fsNamespace = 'coldbrew_fs_';
        var isShared = mountPoints[mountPoint] & 1;
        var isPersist = mountPoints[mountPoint] & 2;
        var filesystem = Module.FS.filesystems.MEMFS;
        if (!isShared) {
          fsNamespace += 'Coldbrew_';
        }
        if (isPersist) {
          filesystem = Module.FS.filesystems.IDBFS;
        }
        try {
          Module.FS.rmdir(mountPoint+'/web_user');
        } catch (e) {};
        try {
          Module.FS.rmdir(mountPoint);
        } catch (e) {};
        Module.FS.createFolder(Module.FS.root, '/'+prefix+'/'+fsNamespace+mountPoint.trim().substring(1), true, true);
        var old = filesystem.mount;
        if (mountPoints[mountPoint]) {
          if (!COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes) {
            COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes = {};
          }
          if (isShared) {
            filesystem.mount = function(...args) { 
              var mountPoint = args[0].mountpoint;
              COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes[mountPoint] = COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes[mountPoint] || old(...args);
              return COLDBREW_GLOBAL_SCOPE._coldbrewMountPointNodes[mountPoint]; 
            };
          }
          Module.FS.mount(filesystem, {}, '/'+prefix+'/'+fsNamespace+mountPoint.trim().substring(1));
        } else if (false) {
          // Handle BrowserFS here
        }
        Module.FS.symlink('/'+prefix+'/'+fsNamespace+mountPoint.trim().substring(1), mountPoint);
      });
    }
    cb(err, mountPoints);
  });
};
Coldbrew.configureFS = function(options = {}, cb) {
  var defaultOptions = {
    sharedHome: false,
    sharedTmp: false,
    persistHome: false,
    persistTmp: false,
    browserFSOptions: {},
  };
  var finalizedOptions = Object.assign({}, defaultOptions, options);
  _Coldbrew_coldbrew_internal_fs_configure(
    finalizedOptions.sharedHome,
    finalizedOptions.sharedTmp,
    finalizedOptions.persistHome,
    finalizedOptions.persistTmp,
    finalizedOptions.browserFSOptions,
    cb
  );
};
function finalizeMainOptions(options) {
  var defaultOptions = {
    fsOptions: {},
    hideWarnings: false,
    monitorFileUsage: false,
    asyncYieldRate: null,
    worker: false,
    transformVariableCasing: true,
  };
  if (true) {
    defaultOptions.threadWorkers = 1;
    if (options.threadWorkers <= 0) {
      throw new Error("The 'threadWorkers' option must be greater than 0.");
    }
  } else if (options.threadWorkers) {
    throw new Error("You are trying to load with the 'threadWorkers' option when threading is disabled. Please enable threading in the settings file.");
  }
  return Object.assign(options, Object.assign({}, defaultOptions, options));
}
Coldbrew._load = function(arg1, arg2) {
  if (typeof window !== 'undefined' && window.location.protocol === 'file:') {
    throw new Error("You are trying to run this HTML file under a `file://` URL. This is not supported. You must run this file under a HTTP server under a `http://` or `https://` protocol. On most computers, you can do this by opening terminal, navigating to where this HTML file is, and running either `python -m SimpleHTTPServer` for Python 2 or `python3 -m http.server` for Python 3. Then, you can navigate to `http://localhost:8000` in a web browser to see this file. Alternatively, if you have downloaded the Coldbrew source code, you can just run `./serve.sh` from the project root and navigate to `http://localhost:8000` in a web browser to see this file after building.");
  } 
  var onReadyFunc = null;
  var options = {};
  if (!arg2 && typeof arg1 == 'function') {
    onReadyFunc = arg1;
  } else if (!arg2 && typeof arg1 == 'object') {
    options = arg1;
  } else {
    options = arg1;
    onReadyFunc = arg2;
  }
  var finalizedOptions = finalizeMainOptions(options);
  Coldbrew._finalizedOptions = finalizedOptions;
  if (finalizedOptions.fsOptions) {
    Coldbrew.configureFS(finalizedOptions.fsOptions);
  }
  Coldbrew._fsReady(function(err, mountPoints) {
    if (IS_WORKER_SCRIPT) {
      Coldbrew._getMainVariableResponsePromises = {}
      Coldbrew._getMainVariable = function(varName) {
        var uid = randid();
        postMessage({'_internal_coldbrew_message': true, '_get_main_var': varName, 'uid': uid});
        return new Promise(function(resolve, reject) {
          Coldbrew._getMainVariableResponsePromises[uid] = resolve;
        });
      };
    }
    Coldbrew._usedFiles = new Set();
    Coldbrew._textDecoder = (typeof TextDecoder !== 'undefined') ? new TextDecoder("utf-8") : new module4.exports.TextDecoder("utf-8");
    Coldbrew.mountPoints = mountPoints;
    COLDBREW_TOP_SCOPE.PTHREAD_POOL_SIZE = finalizedOptions.threadWorkers;
    Coldbrew.Module = _Coldbrew_coldbrew_internal_instance();
    Coldbrew.getAsyncYieldRate = Coldbrew.Module.cwrap('export_getAsyncYieldRate', 'number', []);
    Coldbrew._setAsyncYieldRate = Coldbrew.Module.cwrap('export_setAsyncYieldRate', null, ['number']);
    Coldbrew.setAsyncYieldRate = function(rate) {
      if (Coldbrew._finalizedOptions.worker) {
        Coldbrew.run('Coldbrew._warn("Ignoring manually setting the async yield rate. When workers mode is enabled, we automatically set the yield rate to a very high number for you to improve performance. =)")');
        return null;
      }
      return Coldbrew._setAsyncYieldRate(rate);
    };
    Coldbrew._run = Coldbrew.Module.cwrap('export_run', 'number', ['string']);
    Coldbrew.run = function(script) {
      var ret = Coldbrew._run(script);
      if (ret != 0) {
        throw new Coldbrew.PythonError(Coldbrew.getExceptionInfo().value);
      }
      return ret;
    };
    if (!false) {
      Coldbrew._runAsync = Coldbrew.Module.cwrap('export_runAsync', 'number', ['string'], {
        async: true,
      });
      Coldbrew.runAsync = function(script) {
        var retp = Coldbrew._runAsync(script);
        return retp.then(function(ret) {
          if (ret != 0) {
            return Promise.reject(new Coldbrew.PythonError(Coldbrew.getExceptionInfo().value));
          } else {
            return Promise.resolve(ret);
          }
        }); 
      };
    }
    Coldbrew._runFile = Coldbrew.Module.cwrap('export__runFile', 'number', ['string']);
    if (!false) {
      Coldbrew._runFileAsync = Coldbrew.Module.cwrap('export__runFileAsync', 'number', ['string'], {
        async: true,
      });
    }
    Coldbrew.getVariable = function(expression, allowProxy = !finalizedOptions.worker) {
      var uid = randid();
      Coldbrew.run('Coldbrew._run(Coldbrew.module_name_var+"._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew._serialize_to_js('+expression+', True)))');
      var ret = (typeof Coldbrew._slots[uid] !== 'undefined') ? JSON.parse(Coldbrew._slots[uid]) : null;
      delete Coldbrew._slots[uid];
      if (allowProxy) {
        return unserializeFromPython(ret);
      } else {
        return ret;
      }
    };
    if (!false) {
      Coldbrew.getVariableAsync = function(expression, allowProxy = !finalizedOptions.worker) {
        var uid = randid();
        return makePromiseChainable(Coldbrew.runAsync('Coldbrew._run(Coldbrew.module_name_var+"._slots.'+uid+' = "+Coldbrew.json.dumps(Coldbrew._serialize_to_js('+expression+')))').then(function() {
          var ret = (typeof Coldbrew._slots[uid] !== 'undefined') ? JSON.parse(Coldbrew._slots[uid]) : null;
          delete Coldbrew._slots[uid];
          if (allowProxy) {
            return unserializeFromPython(ret);
          } else {
            return ret;
          }
        }));
      };
    }
    Coldbrew.destroyAllVariables = function() {
      Coldbrew.run("for uid in list(Coldbrew._vars):\n\tColdbrew._delete_uid(uid)");
    };
    Coldbrew.getExceptionInfo = function() {
      return Coldbrew.getVariable('Coldbrew._exception');
    };
    Coldbrew.runFunction = function(functionExpression, ...args) {
      return Coldbrew.getVariable('Coldbrew._call_func('+functionExpression+','+args.map(arg => serializeToPython(arg)).join(',')+')');
    };
    if (!false) {
      Coldbrew.runFunctionAsync = function(functionExpression, ...args) {
        return Coldbrew.getVariableAsync('Coldbrew._call_func('+functionExpression+','+args.map(arg => serializeToPython(arg)).join(',')+')');
      };
    }
    Coldbrew.getenv = function() { return Coldbrew.Module.ENV };
    Coldbrew.setenv = Coldbrew.Module.cwrap('export_setenv', 'number', ['string', 'string']);
    Coldbrew.unsetenv = Coldbrew.Module.cwrap('export_unsetenv', 'number', ['string']);
    Coldbrew.getcwd = Coldbrew.runFunction.bind(Coldbrew, 'Coldbrew._getcwd');
    Coldbrew.chdir = Coldbrew.Module.cwrap('export_chdir', 'number', ['string']);
    Coldbrew.listFiles = function(path='/') {
      return Coldbrew.Module.FS.readdir(path)
        .filter(function(file) {
          return file !== '.' && file !== '..';
        })
        .map(function (file) {
          var analyzed = Coldbrew.Module.FS.analyzePath(path+'/'+file);
          return {
            name: file,
            isFolder: analyzed.object.isFolder,
            isFile: !analyzed.object.isFolder,
            mode: analyzed.object.mode,
            timestamp: analyzed.object.timestamp,
          }
        });
    };
    Coldbrew.createFolder = function(path) {
      return Coldbrew.Module.FS.mkdirTree(path);
    };
    Coldbrew.addFile = function(path, data) {
      if (path.indexOf('/') >= 0) {
        Coldbrew.Module.FS.mkdirTree(path.split('/').slice(0,-1).join("/"));
      }
      Coldbrew.Module.FS.writeFile(path, data);
    };
    if (true) {
      var JSZip;
      if ((!COLDBREW_GLOBAL_SCOPE || typeof COLDBREW_GLOBAL_SCOPE.JSZip === 'undefined')) {
        JSZip = module3.exports;
      } else {
        JSZip = COLDBREW_GLOBAL_SCOPE.JSZip;
      }
      Coldbrew.addFilesFromZip = function(path, urlToZip) {
        return new Promise(function (resolve, reject) {
          Coldbrew._sendRequest('GET', urlToZip, null, {}, null, true)
          .then(function(data) {
            resolve(data.responseText);
          })
          .catch(function(e) {
            reject(e);
          });
        })
        .then(JSZip.loadAsync)
        .then(function(zip) {
          return Promise.all(Object.keys(zip.files).map(function(file) {
            if (!zip.files[file].dir) {
              return zip.files[file].async("string").then(function(textData) {
                Coldbrew.addFile(path+'/'+file, textData);
              });
            } else {
              return Promise.resolve(undefined);
            }
          }));
        });
      };
    }
    Coldbrew.readFile = function(path) {
      return Coldbrew._textDecoder.decode(Coldbrew.Module.FS.readFile(path));
    };
    Coldbrew.readBinaryFile = function(path) {
      return Coldbrew.Module.FS.readFile(path);
    };
    Coldbrew.pathExists = function(path) {
      var analyzed = Coldbrew.Module.FS.analyzePath(path);
      var exists = analyzed.exists;
      if (!exists) {
        return null;
      } else {
        return {
            isFolder: analyzed.object.isFolder,
            isFile: !analyzed.object.isFolder,
            mode: analyzed.object.mode,
            timestamp: analyzed.object.timestamp,
        };
      }
    };
    Coldbrew.deletePath = function(path) {
      var deleteHelper = function(path) {
        if (Coldbrew.Module.FS.analyzePath(path).object 
          && Coldbrew.Module.FS.analyzePath(path).object.isFolder) {
          var fileList = Coldbrew.listFiles(path);
          if (fileList.length > 0) {
            fileList.forEach(function (file) {
              deleteHelper(path+'/'+file.name);
            });
          }
          Coldbrew.Module.FS.rmdir(path);
        } else {
          Coldbrew.Module.FS.unlink(path);
        }
      };
      if (path.length > 0 && path.slice(-1) === '/') {
        path = path.slice(0, -1);
      }
      deleteHelper(path);
      return true;
    };
    Coldbrew.saveFiles = function() {
      var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
        var isPersist = mountPoints[mountPoint] & 2;
        return !!isPersist;
      }).includes(true);
      return new Promise(function (resolve, reject) {
        if (isPersistable) {
          return Coldbrew.Module.FS.syncfs(0, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
          });
        } else {
          reject(new Error("The file system was not configured to persist any paths."));
        }
      });
    };
    Coldbrew.loadFiles = function() {
      var isPersistable = Object.keys(mountPoints).map(function(mountPoint) {
        var isPersist = mountPoints[mountPoint] & 2;
        return !!isPersist;
      }).includes(true);
      return new Promise(function (resolve, reject) {
        if (isPersistable) {
          return Coldbrew.Module.FS.syncfs(1, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
          });
        } else {
          reject(new Error("The file system was not configured to persist any paths."));
        }
      });
    };
    Coldbrew.runFile = function(path, options={}) {
      var oldcwd = Coldbrew.getcwd();
      var defaultOptions = {
        cwd: null,
        args: [],
        env: {},
      };
      var finalizedOptions = Object.assign({}, defaultOptions, options);
      if (finalizedOptions.cwd) {
        Coldbrew.chdir(finalizedOptions.cwd);
      }
      Coldbrew.run('Coldbrew._clear_argv()');
      Coldbrew.runFunction('Coldbrew._append_argv', path);
      finalizedOptions.args.forEach(function(arg) {
        Coldbrew.runFunction('Coldbrew._append_argv', arg);
      });
      Object.keys(finalizedOptions.env).forEach(function(key) {
        Coldbrew.setenv(key, finalizedOptions.env[key]);
      });
      var ret = Coldbrew._runFile(path);
      Coldbrew.chdir(oldcwd);
      return ret;
    };
    if (!false) {
      Coldbrew.runFileAsync = function(path, options={}) {
        var oldcwd = Coldbrew.getcwd();
        var defaultOptions = {
          cwd: null,
          args: [],
          env: {},
        };
        var finalizedOptions = Object.assign({}, defaultOptions, options);
        if (finalizedOptions.cwd) {
          Coldbrew.chdir(finalizedOptions.cwd);
        }
        Coldbrew.run('Coldbrew._clear_argv()');
        Coldbrew.runFunction('Coldbrew._append_argv', path);
        finalizedOptions.args.forEach(function(arg) {
          Coldbrew.runFunction('Coldbrew._append_argv', arg);
        });
        Object.keys(finalizedOptions.env).forEach(function(key) {
          Coldbrew.setenv(key, finalizedOptions.env[key]);
        });
        var retp = Coldbrew._runFileAsync(path);
        return retp.then(function(ret) {
          Coldbrew.chdir(oldcwd);
          return ret;
        });
      };
    }
    Coldbrew.resetenv = function() {
      Object.keys(Coldbrew.getenv()).forEach(function(key) {
        if (typeof Coldbrew._ORIGINAL_ENV_[key] !== 'undefined') {
          Coldbrew.setenv(key, Coldbrew._ORIGINAL_ENV_[key]);
        } else {
          Coldbrew.unsetenv(key);
        }
      });
    };
    Coldbrew._initializer = function() {
      Coldbrew.run('Coldbrew._finalized_options = '+serializeToPython(finalizedOptions));
      if (finalizedOptions.worker) {
        Coldbrew._setAsyncYieldRate(2147483647);
      }
      if (finalizedOptions.asyncYieldRate !== null && typeof finalizedOptions.asyncYieldRate !== 'undefined') {
        Coldbrew.setAsyncYieldRate(finalizedOptions.asyncYieldRate);
      }
      Coldbrew.run('Coldbrew._clear_argv()');
      Coldbrew.runFunction('Coldbrew._append_argv', 'coldbrew.py');
      if (!finalizedOptions.hideWarnings) {
        console.warn('Initialized Coldbrew Python Environment.');
      }
    };
    Coldbrew._reset = Coldbrew.Module.cwrap('export_reset', null, []);
    Coldbrew.reset = function() {
      Coldbrew._standardInTell = 0;
      var ret = Coldbrew._reset();
      Coldbrew._initializer();
      return ret;
    };
    if (finalizedOptions.monitorFileUsage) {
      console.warn('Coldbrew is monitoring file usage...use `Coldbrew.getUsedFiles()` after running through all relevant code paths in your Python program.');
      var _oldOpen = Coldbrew.Module.FS.open.bind(Coldbrew.Module.FS);
      Coldbrew.Module.FS.open = function(...args) {
        if (args[0].startsWith && args[0].startsWith('/usr/local/lib/python')) {
          Coldbrew._usedFiles.add(args[0]);
        }
        return _oldOpen(...args)
      };
    }
    Coldbrew.getUsedFiles = function() {
      return Array.from(Coldbrew._usedFiles).join('\n');
    };
    Coldbrew.getUnusedModules = function() {
      // Python doesn't boot without required modules
      var requiredModules = ["gc", "imp", "faulthandler", "_tracemalloc",  "_signal"];
      var usedModules = Coldbrew.runFunction('Coldbrew._get_imported_modules').concat(requiredModules);
      var allModules = "_struct _locale faulthandler _sha256 imp fcntl _ast array zipimport _operator _codecs errno time _sqlite3 itertools atexit _random _sha1 _md5 _sha512 pwd _json _datetime _sre cmath _weakref _bisect _symtable _functools math _signal _stat _tracemalloc gc _io unicodedata binascii xxsubtype _thread posix mmap _collections _string zlib".split(" ");
      return JSON.stringify(allModules.filter(function(module) {
        return !usedModules.includes(module);
      }));
    };
    if (!Coldbrew.loaded) {
      Coldbrew.onReady(function() {
        Coldbrew._initializer();
      });
    }
    Coldbrew.onReady(onReadyFunc);
  });
};
Coldbrew.unload = function(arg1, arg2) {
  if (Coldbrew.loaded) {
    Coldbrew.run('pass');
    COLDBREW_TOP_SCOPE.Worker.terminateAllWorkers();
    Object.getOwnPropertyNames(Coldbrew).forEach(function (prop) {
      delete Coldbrew[prop];
    });
    COLDBREW_TOP_SCOPE_FUNC(false, Coldbrew);
  }
};
Coldbrew.load = function(options = {}) {
  var finalizedOptions = finalizeMainOptions(options);
  if (options.worker && !IS_WORKER_SCRIPT && !Coldbrew.loaded) {
    Coldbrew._finalizedOptions = finalizedOptions;
    var worker = new COLDBREW_TOP_SCOPE.Worker(SCRIPT_SOURCE);
    var Coldbrew_proxy = getComlink().proxy(worker);
    Coldbrew.worker = worker;
    Coldbrew._workerProxy = Coldbrew_proxy;
    return new Promise(function (resolve, reject) {
      worker.addEventListener("message", function workerReadyHandler(event) {
        if (event.data._internal_coldbrew_message && event.data.ready) {
          // Worker is ready, load Coldbrew in the worker
          Coldbrew._workerProxy.load(options);
        } else if (event.data._internal_coldbrew_message && event.data.props) {
          // Assign the proxied properties of the worker module to the main module
          Object.keys(event.data.props).forEach(function (prop) {
            if (!['unload', '_parseUrl', 'createNewInstance', 'PythonVariable', 'PythonKeywords', '_getMainVariable', '_callFunc', '_try', '_convertError'].includes(prop) && event.data.props[prop] === 'function') {
              Coldbrew[prop] = function(...args) {
                var serializedArgs = args.map(function(arg) {
                  return serializeToJS(arg);
                });
                return makePromiseChainable(Promise.all(serializedArgs).then(function(serializedArgs) {
                  var retp = Coldbrew_proxy[prop](...serializedArgs);
                  return retp.then(function(ret) {
                    return unserializeFromPython(ret);
                  });
                }));
              };
            }
            if (['standardInBuffer', '_standardInTell', 'forwardOut', 'forwardErr'].includes(prop) && 
                  (
                    event.data.props[prop] === 'number' ||
                    event.data.props[prop] === 'string' ||
                    event.data.props[prop] === 'boolean'
                  )
            ) {
              Object.defineProperty(Coldbrew, prop, {
                get: Coldbrew_proxy[prop],
                set: function(val) {
                  return Coldbrew_proxy[prop](prop, val);
                }
              });
            }
          });
          Coldbrew.Module = null;
          Coldbrew.loaded = true;
          // Done loading Coldbrew with worker option
          resolve();
        } else if (event.data._internal_coldbrew_message && event.data._get_var_action) {
          (async function() {
            var value = null;
            var getvar = Coldbrew._get_vars[event.data.uid];
            if (event.data._get_var_action === 'construct') {
              value = new getvar(...(await Promise.all(event.data.args.map(unserializeFromJS)))); 
            } else if (event.data._get_var_action === 'apply') {
              value = getvar(...(await Promise.all(event.data.argumentsList.map(unserializeFromJS)))); 
            } else if (event.data._get_var_action === 'has') {
              value = Reflect.has(getvar, await unserializeFromJS(event.data.prop)); 
            } else if (event.data._get_var_action === 'ownKeys') {
              value = Object.getOwnPropertyNames(getvar).concat(Object.getOwnPropertyNames(Object.getPrototypeOf(getvar))); 
            } else if (event.data._get_var_action === 'isPromise') {
              value = isPromise(getvar); 
            } else if (event.data._get_var_action === 'destroy') {
              delete Coldbrew._get_vars[event.data.uid];
              value = true; 
            } else if (event.data._get_var_action === 'typeofProp') {
              value = typeof (await Reflect.get(getvar, await unserializeFromJS(event.data.prop)));
            } else if (event.data._get_var_action === 'iterator') {
              value = await Reflect.get(getvar, await unserializeFromJS(Symbol.iterator));
              if (typeof value === "function") {
                value = value.bind(getvar);
              }
            } else if (event.data._get_var_action === 'get') {
              value = await Reflect.get(getvar, await unserializeFromJS(event.data.prop));
              if (typeof value === "function") {
                value = value.bind(getvar);
              }
            } else if (event.data._get_var_action === 'set') {
              var unserializedValue = await unserializeFromJS(event.data.value);
              Reflect.set(getvar, await unserializeFromJS(event.data.prop), unserializedValue);
              value = unserializedValue; 
            } else if (event.data._get_var_action === 'deleteProperty') {
              var unserializedValue = await unserializeFromJS(event.data.value);
              Reflect.deleteProperty(getvar, await unserializeFromJS(event.data.prop));
              value = true; 
            }
            Coldbrew.worker.postMessage({
              '_internal_coldbrew_message': true,
              '_get_var_action_response': true,
              'actionId': event.data.actionId,
              'value': await serializeToJS(value)
            });
          })();
        } else if (event.data._internal_coldbrew_message && event.data._get_main_var) {
          (async function () {
            var obj = await eval(event.data._get_main_var);
            var isPythonVariable = false;
            var serializable = isSerializable(obj);
            if (obj && await obj._internal_coldbrew_repr) {
              // Checking for the '_internal_coldbrew_repr' hackily
              // tells us if it is a PythonVariable. We should 
              // theoretically be using 
              // Coldbrew.PythonVariable.isPythonVariable(),
              // but since that method calls back into Python we
              // cannot use it here.
              isPythonVariable = true;
              obj = {
                '_internal_coldbrew_var': true,
                'uid': await obj.__uid__,
              };
            }
            Coldbrew._get_vars[event.data.uid] = obj;
            Coldbrew.worker.postMessage({
              '_internal_coldbrew_message': true, 
              '_get_var': event.data.uid,
              'constructable': obj instanceof Function && isConstructor(obj),
              'callable': obj instanceof Function && !isConstructor(obj),
              'type': (obj && typeof obj.constructor !== 'undefined') ? toType(obj) : (typeof obj),
              'name': (obj && typeof obj.name !== 'undefined' ? obj.name : 'JavaScriptUnnamed'),
              '_internal_coldbrew_var': (isPythonVariable) ? obj : undefined,
              'serializable': serializable,
              'serializable_obj': (serializable) ? obj : undefined,
            });
          })();
        }
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      Coldbrew._load(options, function() {
        // Notify parent of what properties were loaded in, so they can be proxied
        if (IS_WORKER_SCRIPT) {
          postMessage({
            '_internal_coldbrew_message': true, 
            'props': Object.getOwnPropertyNames(Coldbrew).reduce(function(props, prop) {
              props[prop] = typeof Coldbrew[prop];
              return props;
            }, {})
          });
        }
        resolve();
      });
    });
  }
};
Coldbrew.createNewInstance = function() {
  return COLDBREW_TOP_SCOPE_FUNC(false);
};
Coldbrew.onReady = function(onReadyFunc) {
  if (onReadyFunc) {
    if (Coldbrew.loaded) {
      onReadyFunc(null, Coldbrew);
    } else {
      Coldbrew._queuedOnReady.push(onReadyFunc);
    }
  }
};
Coldbrew._sendRequest = sendRequest;
/**********************************************************/
/************END DEFINE MAIN COLDBREW API******************/
/**********************************************************/

/**********************************************************/
/************START WORKER SPECIFIC ROUTINE*****************/
/**********************************************************/
// Does 3 things:
// 1. Informs the main thread when it is ready.
// 2. Exposes the Coldbrew variable using Comlink.
// 3. Creates a ES6 Proxy Variable in the worker thread that 
//    behaves like native JavaScript variable that models
//    native JavaScript variables on the main thread that
//    might need to be passed to Python.
/**********************************************************/
if (IS_WORKER_SCRIPT) {
  // Deferring to the next tick here since Comlink is defined later
  setTimeout(function() {
    if (IS_NODE_JS) {
      require('node-comlink').patchMessageChannel();
      const NodeMessageAdapter = require('node-comlink').NodeMessageAdapter;
      const messageAdapter = new NodeMessageAdapter();
      COLDBREW_GLOBAL_SCOPE.postMessage = messageAdapter.postMessage.bind(messageAdapter);
      COLDBREW_GLOBAL_SCOPE.addEventListener = messageAdapter.addEventListener.bind(messageAdapter);
      getComlink().expose(Coldbrew, messageAdapter);
    } else {
      getComlink().expose(Coldbrew, self);
    }
    var responsePromises = {};
    addEventListener("message", function GetVarHandler(event) {
      if (event.data._internal_coldbrew_message && event.data._get_var_action_response) {
        var resolve = responsePromises[event.data.actionId];
        delete responsePromises[event.data.actionId];
        resolve(unserializeFromJS(event.data.value));
      } else if (event.data._internal_coldbrew_message && event.data._get_var) {
        Coldbrew._get_vars[event.data._get_var] = new Proxy(function() {}, {
          construct: function(...args) {
            return (async function(target, args) {
              var actionId = randid();
              postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'construct', 'uid': event.data._get_var, 'actionId': actionId, 'args': await Promise.all(args.map(serializeToJS))});
              return new Promise(function (resolve, reject) {
                responsePromises[actionId] = resolve;
              });              
            })(...args);
          },
          apply: function(...args) {
            return (async function(target, thisArg, argumentsList) {
              if (typeof argumentsList === 'undefined') {
                argumentsList = [];
              }
              var actionId = randid();
              postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'apply', 'uid': event.data._get_var, 'actionId': actionId, 'argumentsList': await Promise.all(argumentsList.map(serializeToJS))});
              return new Promise(function (resolve, reject) {
                responsePromises[actionId] = resolve;
              });
            })(...args);
          },
          get: function(target, prop) {
            if (prop == Symbol.toPrimitive || prop === 'valueOf' || prop === 'then') {
              return undefined;
            }
            if (prop === '_internal_coldbrew_native_js_worker_proxy') {
              return true;
            } else if (prop === '_internal_coldbrew_get_var_id') {
              return event.data._get_var;
            } else if (prop === '_internal_coldbrew_constructable') {
              return event.data.constructable;
            } else if (prop === '_internal_coldbrew_callable') {
              return event.data.callable;
            } else if (prop === '_internal_coldbrew_name') {
              return event.data.name;
            } else if (prop === '_internal_coldbrew_type') {
              return event.data.type;
            } else if (prop === '_internal_coldbrew_has') {
              return async function(prop) {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'has', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_own_keys') {
              return function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'ownKeys', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_is_promise') {
              return function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'isPromise', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_destroy') {
              return function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'destroy', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === '_internal_coldbrew_typeof_prop') {
              return async function(prop) {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'typeofProp', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              };
            } else if (prop === Symbol.iterator) {
              return (async function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'iterator', 'uid': event.data._get_var, 'actionId': actionId});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              })();
            } else {
              return (async function() {
                var actionId = randid();
                postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'get', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
                return new Promise(function (resolve, reject) {
                  responsePromises[actionId] = resolve;
                });
              })();
            }
          },
          set: async function(target, prop, value) {
            var actionId = randid();
            postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'set', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop), 'value': await serializeToJS(value)});
            new Promise(function (resolve, reject) {
              responsePromises[actionId] = resolve;
            });
            return value;
          },
          ownKeys: function(target) {
            return Reflect.ownKeys(target);
          },
          has: function(target, prop) {
            return Reflect.has(target, prop);
          },
          deleteProperty: async function(target, prop) {
            var actionId = randid();
            postMessage({'_internal_coldbrew_message': true, '_get_var_action': 'deleteProperty', 'uid': event.data._get_var, 'actionId': actionId, 'prop': await serializeToJS(prop)});
            new Promise(function (resolve, reject) {
              responsePromises[actionId] = resolve;
            });
            return true;
          }
        });
        if (typeof Coldbrew._getMainVariableResponsePromises[event.data._get_var] !== 'undefined') {
          if (event.data.serializable) {
            delete Coldbrew._get_vars[event.data._get_var];
            Coldbrew._getMainVariableResponsePromises[event.data._get_var](event.data.serializable_obj);
          } else if (event.data._internal_coldbrew_var) {
            delete Coldbrew._get_vars[event.data._get_var];
            Coldbrew._getMainVariableResponsePromises[event.data._get_var](event.data._internal_coldbrew_var);
          } else {
            Coldbrew._getMainVariableResponsePromises[event.data._get_var]({
              '_internal_coldbrew_get_var': true,
              'uid': event.data._get_var,
            });
          }
          delete Coldbrew._getMainVariableResponsePromises[event.data._get_var];
        }
      }
    });
    postMessage({'_internal_coldbrew_message': true, 'ready': true});
  }, 1);
}
/**********************************************************/
/*************END WORKER SPECIFIC ROUTINE******************/
/**********************************************************/


/**********************************************************/
/*****************START EXPORT OF COLDBREW*****************/
/**********************************************************/
// Export the Coldbrew module defined in this file.
// Only exports if `shouldExportColdbrew` is true.
// `shouldExportColdbrew` is only false when unload() is 
// called and the named closure COLDBREW_TOP_SCOPE_FUNC
// is re-called. In that case, Coldbrew has already been
// exported and the already exported object is modified, 
// instead of replaced (cause you can't replace an export
// after it has been exported in environments like Node.js).
/**********************************************************/
if (shouldExportColdbrew) {
  var EXPORT = (function(Coldbrew) {
    var EXPORT = null;

    // DO NOT TOUCH THE LINE BELOW - IT IS AUTO REPLACED

// Use this file to customize what the library exports

// Whatever you set the EXPORT variable to, is what the global variable named "<Coldbrew>" 
// (the same Coldbrew from coldbrew_settings.py) will be set to in browsers or what 
// will be exported in Node.js when require()-ing this library.

// The entire Coldbrew Python environment is be exported by default.

EXPORT = Coldbrew;
    // DO NOT TOUCH THE LINE ABOVE - IT IS AUTO REPLACED

    if (EXPORT === null || typeof EXPORT === 'undefined') {
      EXPORT = Coldbrew;
    }
    return EXPORT;
  })(Coldbrew);


  if (typeof module !== 'undefined') module.exports = EXPORT;
  if (typeof window !== 'undefined') window.Coldbrew = EXPORT;
  if (typeof self !== 'undefined') self.Coldbrew = EXPORT;

  // Inside a pthread, provide _Coldbrew_coldbrew_internal_
  if (true && IS_THREAD_SCRIPT) {
    COLDBREW_GLOBAL_SCOPE._Coldbrew_coldbrew_internal_ = _Coldbrew_coldbrew_internal_; 
  }
}
/**********************************************************/
/******************END EXPORT OF COLDBREW******************/
/**********************************************************/

/**********************************************************/
/************START ENDING OF GLOBAL CLOSURE***************/
/**********************************************************/
// Closes the closure that wraps all code in this file
// within a closed scope.
/**********************************************************/
})();
/**********************************************************/
/************END ENDING OF GLOBAL CLOSURE******************/
/**********************************************************/
if (IS_NODE_JS) { module1 = module };

if (IS_NODE_JS) { module = module3 };

/*!

JSZip v3.1.5 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";var d=a("./utils"),e=a("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a){for(var b,c,e,g,h,i,j,k=[],l=0,m=a.length,n=m,o="string"!==d.getTypeOf(a);l<a.length;)n=m-l,o?(b=a[l++],c=l<m?a[l++]:0,e=l<m?a[l++]:0):(b=a.charCodeAt(l++),c=l<m?a.charCodeAt(l++):0,e=l<m?a.charCodeAt(l++):0),g=b>>2,h=(3&b)<<4|c>>4,i=n>1?(15&c)<<2|e>>6:64,j=n>2?63&e:64,k.push(f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j));return k.join("")},c.decode=function(a){var b,c,d,g,h,i,j,k=0,l=0,m="data:";if(a.substr(0,m.length)===m)throw new Error("Invalid base64 input, it looks like a data url.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");var n=3*a.length/4;if(a.charAt(a.length-1)===f.charAt(64)&&n--,a.charAt(a.length-2)===f.charAt(64)&&n--,n%1!==0)throw new Error("Invalid base64 input, bad content length.");var o;for(o=e.uint8array?new Uint8Array(0|n):new Array(0|n);k<a.length;)g=f.indexOf(a.charAt(k++)),h=f.indexOf(a.charAt(k++)),i=f.indexOf(a.charAt(k++)),j=f.indexOf(a.charAt(k++)),b=g<<2|h>>4,c=(15&h)<<4|i>>2,d=(3&i)<<6|j,o[l++]=b,64!==i&&(o[l++]=c),64!==j&&(o[l++]=d);return o}},{"./support":30,"./utils":32}],2:[function(a,b,c){"use strict";function d(a,b,c,d,e){this.compressedSize=a,this.uncompressedSize=b,this.crc32=c,this.compression=d,this.compressedContent=e}var e=a("./external"),f=a("./stream/DataWorker"),g=a("./stream/DataLengthProbe"),h=a("./stream/Crc32Probe"),g=a("./stream/DataLengthProbe");d.prototype={getContentWorker:function(){var a=new f(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new g("data_length")),b=this;return a.on("end",function(){if(this.streamInfo.data_length!==b.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),a},getCompressedWorker:function(){return new f(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(a,b,c){return a.pipe(new h).pipe(new g("uncompressedSize")).pipe(b.compressWorker(c)).pipe(new g("compressedSize")).withStreamInfo("compression",b)},b.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,b,c){"use strict";var d=a("./stream/GenericWorker");c.STORE={magic:"\0\0",compressWorker:function(a){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},c.DEFLATE=a("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b[g])];return a^-1}function f(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b.charCodeAt(g))];return a^-1}var g=a("./utils"),h=d();b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==g.getTypeOf(a);return c?e(0|b,a,a.length,0):f(0|b,a,a.length,0)}},{"./utils":32}],5:[function(a,b,c){"use strict";c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!0,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null},{}],6:[function(a,b,c){"use strict";var d=null;d="undefined"!=typeof Promise?Promise:a("lie"),b.exports={Promise:d}},{lie:58}],7:[function(a,b,c){"use strict";function d(a,b){h.call(this,"FlateWorker/"+a),this._pako=null,this._pakoAction=a,this._pakoOptions=b,this.meta={}}var e="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,f=a("pako"),g=a("./utils"),h=a("./stream/GenericWorker"),i=e?"uint8array":"array";c.magic="\b\0",g.inherits(d,h),d.prototype.processChunk=function(a){this.meta=a.meta,null===this._pako&&this._createPako(),this._pako.push(g.transformTo(i,a.data),!1)},d.prototype.flush=function(){h.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},d.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},d.prototype._createPako=function(){this._pako=new f[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var a=this;this._pako.onData=function(b){a.push({data:b,meta:a.meta})}},c.compressWorker=function(a){return new d("Deflate",a)},c.uncompressWorker=function(){return new d("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:59}],8:[function(a,b,c){"use strict";function d(a,b,c,d){f.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=c,this.encodeFileName=d,this.streamFiles=a,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}var e=a("../utils"),f=a("../stream/GenericWorker"),g=a("../utf8"),h=a("../crc32"),i=a("../signature"),j=function(a,b){var c,d="";for(c=0;c<b;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},k=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},l=function(a,b){return 63&(a||0)},m=function(a,b,c,d,f,m){var n,o,p=a.file,q=a.compression,r=m!==g.utf8encode,s=e.transformTo("string",m(p.name)),t=e.transformTo("string",g.utf8encode(p.name)),u=p.comment,v=e.transformTo("string",m(u)),w=e.transformTo("string",g.utf8encode(u)),x=t.length!==p.name.length,y=w.length!==u.length,z="",A="",B="",C=p.dir,D=p.date,E={crc32:0,compressedSize:0,uncompressedSize:0};b&&!c||(E.crc32=a.crc32,E.compressedSize=a.compressedSize,E.uncompressedSize=a.uncompressedSize);var F=0;b&&(F|=8),r||!x&&!y||(F|=2048);var G=0,H=0;C&&(G|=16),"UNIX"===f?(H=798,G|=k(p.unixPermissions,C)):(H=20,G|=l(p.dosPermissions,C)),n=D.getUTCHours(),n<<=6,n|=D.getUTCMinutes(),n<<=5,n|=D.getUTCSeconds()/2,o=D.getUTCFullYear()-1980,o<<=4,o|=D.getUTCMonth()+1,o<<=5,o|=D.getUTCDate(),x&&(A=j(1,1)+j(h(s),4)+t,z+="up"+j(A.length,2)+A),y&&(B=j(1,1)+j(h(v),4)+w,z+="uc"+j(B.length,2)+B);var I="";I+="\n\0",I+=j(F,2),I+=q.magic,I+=j(n,2),I+=j(o,2),I+=j(E.crc32,4),I+=j(E.compressedSize,4),I+=j(E.uncompressedSize,4),I+=j(s.length,2),I+=j(z.length,2);var J=i.LOCAL_FILE_HEADER+I+s+z,K=i.CENTRAL_FILE_HEADER+j(H,2)+I+j(v.length,2)+"\0\0\0\0"+j(G,4)+j(d,4)+s+z+v;return{fileRecord:J,dirRecord:K}},n=function(a,b,c,d,f){var g="",h=e.transformTo("string",f(d));return g=i.CENTRAL_DIRECTORY_END+"\0\0\0\0"+j(a,2)+j(a,2)+j(b,4)+j(c,4)+j(h.length,2)+h},o=function(a){var b="";return b=i.DATA_DESCRIPTOR+j(a.crc32,4)+j(a.compressedSize,4)+j(a.uncompressedSize,4)};e.inherits(d,f),d.prototype.push=function(a){var b=a.meta.percent||0,c=this.entriesCount,d=this._sources.length;this.accumulate?this.contentBuffer.push(a):(this.bytesWritten+=a.data.length,f.prototype.push.call(this,{data:a.data,meta:{currentFile:this.currentFile,percent:c?(b+100*(c-d-1))/c:100}}))},d.prototype.openedSource=function(a){this.currentSourceOffset=this.bytesWritten,this.currentFile=a.file.name;var b=this.streamFiles&&!a.file.dir;if(b){var c=m(a,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:c.fileRecord,meta:{percent:0}})}else this.accumulate=!0},d.prototype.closedSource=function(a){this.accumulate=!1;var b=this.streamFiles&&!a.file.dir,c=m(a,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(c.dirRecord),b)this.push({data:o(a),meta:{percent:100}});else for(this.push({data:c.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},d.prototype.flush=function(){for(var a=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var c=this.bytesWritten-a,d=n(this.dirRecords.length,c,a,this.zipComment,this.encodeFileName);this.push({data:d,meta:{percent:100}})},d.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},d.prototype.registerPrevious=function(a){this._sources.push(a);var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end()}),a.on("error",function(a){b.error(a)}),this},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},d.prototype.error=function(a){var b=this._sources;if(!f.prototype.error.call(this,a))return!1;for(var c=0;c<b.length;c++)try{b[c].error(a)}catch(a){}return!0},d.prototype.lock=function(){f.prototype.lock.call(this);for(var a=this._sources,b=0;b<a.length;b++)a[b].lock()},b.exports=d},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,b,c){"use strict";var d=a("../compressions"),e=a("./ZipFileWorker"),f=function(a,b){var c=a||b,e=d[c];if(!e)throw new Error(c+" is not a valid compression method !");return e};c.generateWorker=function(a,b,c){var d=new e(b.streamFiles,c,b.platform,b.encodeFileName),g=0;try{a.forEach(function(a,c){g++;var e=f(c.options.compression,b.compression),h=c.options.compressionOptions||b.compressionOptions||{},i=c.dir,j=c.date;c._compressWorker(e,h).withStreamInfo("file",{name:a,dir:i,date:j,comment:c.comment||"",unixPermissions:c.unixPermissions,dosPermissions:c.dosPermissions}).pipe(d)}),d.entriesCount=g}catch(h){d.error(h)}return d}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,b,c){"use strict";function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a}}d.prototype=a("./object"),d.prototype.loadAsync=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.version="3.1.5",d.loadAsync=function(a,b){return(new d).loadAsync(a,b)},d.external=a("./external"),b.exports=d},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,b,c){"use strict";function d(a){return new f.Promise(function(b,c){var d=a.decompressed.getContentWorker().pipe(new i);d.on("error",function(a){c(a)}).on("end",function(){d.streamInfo.crc32!==a.decompressed.crc32?c(new Error("Corrupted zip : CRC32 mismatch")):b()}).resume()})}var e=a("./utils"),f=a("./external"),g=a("./utf8"),e=a("./utils"),h=a("./zipEntries"),i=a("./stream/Crc32Probe"),j=a("./nodejsUtils");b.exports=function(a,b){var c=this;return b=e.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:g.utf8decode}),j.isNode&&j.isStream(a)?f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):e.prepareContent("the loaded zip file",a,!0,b.optimizedBinaryString,b.base64).then(function(a){var c=new h(b);return c.load(a),c}).then(function(a){var c=[f.Promise.resolve(a)],e=a.files;if(b.checkCRC32)for(var g=0;g<e.length;g++)c.push(d(e[g]));return f.Promise.all(c)}).then(function(a){for(var d=a.shift(),e=d.files,f=0;f<e.length;f++){var g=e[f];c.file(g.fileNameStr,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:b.createFolders})}return d.zipComment.length&&(c.comment=d.zipComment),c})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,b,c){"use strict";function d(a,b){f.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(b)}var e=a("../utils"),f=a("../stream/GenericWorker");e.inherits(d,f),d.prototype._bindStream=function(a){var b=this;this._stream=a,a.pause(),a.on("data",function(a){b.push({data:a,meta:{percent:0}})}).on("error",function(a){b.isPaused?this.generatedError=a:b.error(a)}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end()})},d.prototype.pause=function(){return!!f.prototype.pause.call(this)&&(this._stream.pause(),!0)},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},b.exports=d},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,b,c){"use strict";function d(a,b,c){e.call(this,b),this._helper=a;var d=this;a.on("data",function(a,b){d.push(a)||d._helper.pause(),c&&c(b)}).on("error",function(a){d.emit("error",a)}).on("end",function(){d.push(null)})}var e=a("readable-stream").Readable,f=a("../utils");f.inherits(d,e),d.prototype._read=function(){this._helper.resume()},b.exports=d},{"../utils":32,"readable-stream":16}],14:[function(a,b,c){"use strict";b.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(a,b){return new Buffer(a,b)},allocBuffer:function(a){return Buffer.alloc?Buffer.alloc(a):new Buffer(a)},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&"function"==typeof a.on&&"function"==typeof a.pause&&"function"==typeof a.resume}}},{}],15:[function(a,b,c){"use strict";function d(a){return"[object RegExp]"===Object.prototype.toString.call(a)}var e=a("./utf8"),f=a("./utils"),g=a("./stream/GenericWorker"),h=a("./stream/StreamHelper"),i=a("./defaults"),j=a("./compressedObject"),k=a("./zipObject"),l=a("./generate"),m=a("./nodejsUtils"),n=a("./nodejs/NodejsStreamInputAdapter"),o=function(a,b,c){var d,e=f.getTypeOf(b),h=f.extend(c||{},i);h.date=h.date||new Date,null!==h.compression&&(h.compression=h.compression.toUpperCase()),"string"==typeof h.unixPermissions&&(h.unixPermissions=parseInt(h.unixPermissions,8)),h.unixPermissions&&16384&h.unixPermissions&&(h.dir=!0),h.dosPermissions&&16&h.dosPermissions&&(h.dir=!0),h.dir&&(a=q(a)),h.createFolders&&(d=p(a))&&r.call(this,d,!0);var l="string"===e&&h.binary===!1&&h.base64===!1;c&&"undefined"!=typeof c.binary||(h.binary=!l);var o=b instanceof j&&0===b.uncompressedSize;(o||h.dir||!b||0===b.length)&&(h.base64=!1,h.binary=!0,b="",h.compression="STORE",e="string");var s=null;s=b instanceof j||b instanceof g?b:m.isNode&&m.isStream(b)?new n(a,b):f.prepareContent(a,b,h.binary,h.optimizedBinaryString,h.base64);var t=new k(a,s,h);this.files[a]=t},p=function(a){"/"===a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},q=function(a){return"/"!==a.slice(-1)&&(a+="/"),a},r=function(a,b){return b="undefined"!=typeof b?b:i.createFolders,a=q(a),this.files[a]||o.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},s={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(a){var b,c,d;for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],c=b.slice(this.root.length,b.length),c&&b.slice(0,this.root.length)===this.root&&a(c,d))},filter:function(a){var b=[];return this.forEach(function(c,d){a(c,d)&&b.push(d)}),b},file:function(a,b,c){if(1===arguments.length){if(d(a)){var e=a;return this.filter(function(a,b){return!b.dir&&e.test(a)})}var f=this.files[this.root+a];return f&&!f.dir?f:null}return a=this.root+a,o.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(d(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=r.call(this,b),e=this.clone();return e.root=c.name,e},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!==a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(a){var b,c={};try{if(c=f.extend(a||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:e.utf8encode}),c.type=c.type.toLowerCase(),c.compression=c.compression.toUpperCase(),"binarystring"===c.type&&(c.type="string"),!c.type)throw new Error("No output type specified.");f.checkSupport(c.type),"darwin"!==c.platform&&"freebsd"!==c.platform&&"linux"!==c.platform&&"sunos"!==c.platform||(c.platform="UNIX"),"win32"===c.platform&&(c.platform="DOS");var d=c.comment||this.comment||"";b=l.generateWorker(this,c,d)}catch(i){b=new g("error"),b.error(i)}return new h(b,c.type||"string",c.mimeType)},generateAsync:function(a,b){return this.generateInternalStream(a).accumulate(b)},generateNodeStream:function(a,b){return a=a||{},a.type||(a.type="nodebuffer"),this.generateInternalStream(a).toNodejsStream(b)}};b.exports=s},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,b,c){b.exports=a("stream")},{stream:void 0}],17:[function(a,b,c){"use strict";function d(a){e.call(this,a);for(var b=0;b<this.data.length;b++)a[b]=255&a[b]}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return-1},d.prototype.readAndCheckSignature=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.readData(4);return b===f[0]&&c===f[1]&&d===f[2]&&e===f[3]},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return[];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],18:[function(a,b,c){"use strict";function d(a){this.data=a,this.length=a.length,this.index=0,this.zero=0}var e=a("../utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a)},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a},skip:function(a){this.setIndex(this.index+a)},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readAndCheckSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},b.exports=d},{"../utils":32}],19:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./Uint8ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readAndCheckSignature=function(a){var b=this.readData(4);return a===b},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./DataReader":18}],21:[function(a,b,c){"use strict";function d(a){e.call(this,a)}var e=a("./ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d},{"../utils":32,"./ArrayReader":17}],22:[function(a,b,c){"use strict";var d=a("../utils"),e=a("../support"),f=a("./ArrayReader"),g=a("./StringReader"),h=a("./NodeBufferReader"),i=a("./Uint8ArrayReader");b.exports=function(a){var b=d.getTypeOf(a);return d.checkSupport(b),"string"!==b||e.uint8array?"nodebuffer"===b?new h(a):e.uint8array?new i(d.transformTo("uint8array",a)):new f(d.transformTo("array",a)):new g(a)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,b,c){"use strict";c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b"},{}],24:[function(a,b,c){"use strict";function d(a){e.call(this,"ConvertWorker to "+a),this.destType=a}var e=a("./GenericWorker"),f=a("../utils");f.inherits(d,e),d.prototype.processChunk=function(a){this.push({data:f.transformTo(this.destType,a.data),meta:a.meta})},b.exports=d},{"../utils":32,"./GenericWorker":28}],25:[function(a,b,c){"use strict";function d(){e.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}var e=a("./GenericWorker"),f=a("../crc32"),g=a("../utils");g.inherits(d,e),d.prototype.processChunk=function(a){this.streamInfo.crc32=f(a.data,this.streamInfo.crc32||0),this.push(a)},b.exports=d},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,b,c){"use strict";function d(a){f.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0)}var e=a("../utils"),f=a("./GenericWorker");e.inherits(d,f),d.prototype.processChunk=function(a){if(a){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+a.data.length}f.prototype.processChunk.call(this,a)},b.exports=d},{"../utils":32,"./GenericWorker":28}],27:[function(a,b,c){"use strict";function d(a){f.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(a){b.dataIsReady=!0,b.data=a,b.max=a&&a.length||0,b.type=e.getTypeOf(a),b.isPaused||b._tickAndRepeat()},function(a){b.error(a)})}var e=a("../utils"),f=a("./GenericWorker"),g=16384;e.inherits(d,f),d.prototype.cleanUp=function(){f.prototype.cleanUp.call(this),this.data=null},d.prototype.resume=function(){return!!f.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,e.delay(this._tickAndRepeat,[],this)),!0)},d.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(e.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},d.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var a=g,b=null,c=Math.min(this.max,this.index+a);if(this.index>=this.max)return this.end();switch(this.type){case"string":b=this.data.substring(this.index,c);break;case"uint8array":b=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":b=this.data.slice(this.index,c)}return this.index=c,this.push({data:b,meta:{percent:this.max?this.index/this.max*100:0}})},b.exports=d},{"../utils":32,"./GenericWorker":28}],28:[function(a,b,c){"use strict";function d(a){this.name=a||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}d.prototype={push:function(a){this.emit("data",a)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(a){this.emit("error",a)}return!0},error:function(a){return!this.isFinished&&(this.isPaused?this.generatedError=a:(this.isFinished=!0,this.emit("error",a),this.previous&&this.previous.error(a),this.cleanUp()),!0)},on:function(a,b){return this._listeners[a].push(b),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(a,b){if(this._listeners[a])for(var c=0;c<this._listeners[a].length;c++)this._listeners[a][c].call(this,b)},pipe:function(a){return a.registerPrevious(this)},registerPrevious:function(a){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=a.streamInfo,this.mergeStreamInfo(),this.previous=a;var b=this;return a.on("data",function(a){b.processChunk(a)}),a.on("end",function(){b.end()}),a.on("error",function(a){b.error(a)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;this.isPaused=!1;var a=!1;return this.generatedError&&(this.error(this.generatedError),a=!0),this.previous&&this.previous.resume(),!a},flush:function(){},processChunk:function(a){this.push(a)},withStreamInfo:function(a,b){return this.extraStreamInfo[a]=b,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var a in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(a)&&(this.streamInfo[a]=this.extraStreamInfo[a])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var a="Worker "+this.name;return this.previous?this.previous+" -> "+a:a}},b.exports=d},{}],29:[function(a,b,c){"use strict";function d(a,b,c){switch(a){case"blob":return h.newBlob(h.transformTo("arraybuffer",b),c);case"base64":return k.encode(b);default:return h.transformTo(a,b)}}function e(a,b){var c,d=0,e=null,f=0;for(c=0;c<b.length;c++)f+=b[c].length;switch(a){case"string":return b.join("");case"array":return Array.prototype.concat.apply([],b);case"uint8array":for(e=new Uint8Array(f),c=0;c<b.length;c++)e.set(b[c],d),d+=b[c].length;return e;case"nodebuffer":return Buffer.concat(b);default:throw new Error("concat : unsupported type '"+a+"'")}}function f(a,b){return new m.Promise(function(c,f){var g=[],h=a._internalType,i=a._outputType,j=a._mimeType;a.on("data",function(a,c){g.push(a),b&&b(c)}).on("error",function(a){g=[],f(a)}).on("end",function(){try{var a=d(i,e(h,g),j);c(a)}catch(b){f(b)}g=[]}).resume()})}function g(a,b,c){var d=b;switch(b){case"blob":case"arraybuffer":d="uint8array";break;case"base64":d="string"}try{this._internalType=d,this._outputType=b,this._mimeType=c,h.checkSupport(d),this._worker=a.pipe(new i(d)),a.lock()}catch(e){this._worker=new j("error"),this._worker.error(e)}}var h=a("../utils"),i=a("./ConvertWorker"),j=a("./GenericWorker"),k=a("../base64"),l=a("../support"),m=a("../external"),n=null;if(l.nodestream)try{n=a("../nodejs/NodejsStreamOutputAdapter")}catch(o){}g.prototype={accumulate:function(a){return f(this,a)},on:function(a,b){var c=this;return"data"===a?this._worker.on(a,function(a){b.call(c,a.data,a.meta)}):this._worker.on(a,function(){h.delay(b,arguments,c)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(a){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new n(this,{objectMode:"nodebuffer"!==this._outputType},a)}},b.exports=g},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,b,c){"use strict";if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof Buffer,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var d=new ArrayBuffer(0);try{c.blob=0===new Blob([d],{type:"application/zip"}).size}catch(e){try{var f=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder,g=new f;g.append(d),c.blob=0===g.getBlob("application/zip").size}catch(e){c.blob=!1}}}try{c.nodestream=!!a("readable-stream").Readable}catch(e){c.nodestream=!1}},{"readable-stream":16}],31:[function(a,b,c){"use strict";function d(){i.call(this,"utf-8 decode"),this.leftOver=null}function e(){i.call(this,"utf-8 encode")}for(var f=a("./utils"),g=a("./support"),h=a("./nodejsUtils"),i=a("./stream/GenericWorker"),j=new Array(256),k=0;k<256;k++)j[k]=k>=252?6:k>=248?5:k>=240?4:k>=224?3:k>=192?2:1;j[254]=j[254]=1;var l=function(a){var b,c,d,e,f,h=a.length,i=0;for(e=0;e<h;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=g.uint8array?new Uint8Array(i):new Array(i),f=0,e=0;f<i;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),c<128?b[f++]=c:c<2048?(b[f++]=192|c>>>6,b[f++]=128|63&c):c<65536?(b[f++]=224|c>>>12,b[f++]=128|c>>>6&63,b[f++]=128|63&c):(b[f++]=240|c>>>18,b[f++]=128|c>>>12&63,b[f++]=128|c>>>6&63,b[f++]=128|63&c);return b},m=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+j[a[c]]>b?c:b},n=function(a){var b,c,d,e,g=a.length,h=new Array(2*g);for(c=0,b=0;b<g;)if(d=a[b++],d<128)h[c++]=d;else if(e=j[d],e>4)h[c++]=65533,b+=e-1;else{for(d&=2===e?31:3===e?15:7;e>1&&b<g;)d=d<<6|63&a[b++],e--;e>1?h[c++]=65533:d<65536?h[c++]=d:(d-=65536,h[c++]=55296|d>>10&1023,h[c++]=56320|1023&d)}return h.length!==c&&(h.subarray?h=h.subarray(0,c):h.length=c),f.applyFromCharCode(h)};c.utf8encode=function(a){return g.nodebuffer?h.newBufferFrom(a,"utf-8"):l(a)},c.utf8decode=function(a){return g.nodebuffer?f.transformTo("nodebuffer",a).toString("utf-8"):(a=f.transformTo(g.uint8array?"uint8array":"array",a),n(a))},f.inherits(d,i),d.prototype.processChunk=function(a){var b=f.transformTo(g.uint8array?"uint8array":"array",a.data);if(this.leftOver&&this.leftOver.length){if(g.uint8array){var d=b;b=new Uint8Array(d.length+this.leftOver.length),b.set(this.leftOver,0),b.set(d,this.leftOver.length)}else b=this.leftOver.concat(b);this.leftOver=null}var e=m(b),h=b;e!==b.length&&(g.uint8array?(h=b.subarray(0,e),this.leftOver=b.subarray(e,b.length)):(h=b.slice(0,e),this.leftOver=b.slice(e,b.length))),this.push({data:c.utf8decode(h),meta:a.meta})},d.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:c.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},c.Utf8DecodeWorker=d,f.inherits(e,i),e.prototype.processChunk=function(a){this.push({data:c.utf8encode(a.data),meta:a.meta})},c.Utf8EncodeWorker=e},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,b,c){"use strict";function d(a){var b=null;return b=i.uint8array?new Uint8Array(a.length):new Array(a.length),f(a,b)}function e(a){return a}function f(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function g(a){var b=65536,d=c.getTypeOf(a),e=!0;if("uint8array"===d?e=n.applyCanBeUsed.uint8array:"nodebuffer"===d&&(e=n.applyCanBeUsed.nodebuffer),e)for(;b>1;)try{return n.stringifyByChunk(a,d,b)}catch(f){b=Math.floor(b/2)}return n.stringifyByChar(a)}function h(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];
return b}var i=a("./support"),j=a("./base64"),k=a("./nodejsUtils"),l=a("core-js/library/fn/set-immediate"),m=a("./external");c.newBlob=function(a,b){c.checkSupport("blob");try{return new Blob([a],{type:b})}catch(d){try{var e=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder,f=new e;return f.append(a),f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}};var n={stringifyByChunk:function(a,b,c){var d=[],e=0,f=a.length;if(f<=c)return String.fromCharCode.apply(null,a);for(;e<f;)"array"===b||"nodebuffer"===b?d.push(String.fromCharCode.apply(null,a.slice(e,Math.min(e+c,f)))):d.push(String.fromCharCode.apply(null,a.subarray(e,Math.min(e+c,f)))),e+=c;return d.join("")},stringifyByChar:function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(a){return!1}}(),nodebuffer:function(){try{return i.nodebuffer&&1===String.fromCharCode.apply(null,k.allocBuffer(1)).length}catch(a){return!1}}()}};c.applyFromCharCode=g;var o={};o.string={string:e,array:function(a){return f(a,new Array(a.length))},arraybuffer:function(a){return o.string.uint8array(a).buffer},uint8array:function(a){return f(a,new Uint8Array(a.length))},nodebuffer:function(a){return f(a,k.allocBuffer(a.length))}},o.array={string:g,array:e,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBufferFrom(a)}},o.arraybuffer={string:function(a){return g(new Uint8Array(a))},array:function(a){return h(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:e,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBufferFrom(new Uint8Array(a))}},o.uint8array={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return a.buffer},uint8array:e,nodebuffer:function(a){return k.newBufferFrom(a)}},o.nodebuffer={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return o.nodebuffer.uint8array(a).buffer},uint8array:function(a){return h(a,new Uint8Array(a.length))},nodebuffer:e},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=o[d][a](b);return e},c.getTypeOf=function(a){return"string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":i.nodebuffer&&k.isBuffer(a)?"nodebuffer":i.uint8array&&a instanceof Uint8Array?"uint8array":i.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=i[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this platform")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(b<16?"0":"")+b.toString(16).toUpperCase();return d},c.delay=function(a,b,c){l(function(){a.apply(c||null,b||[])})},c.inherits=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c},c.prepareContent=function(a,b,e,f,g){var h=m.Promise.resolve(b).then(function(a){var b=i.blob&&(a instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(a))!==-1);return b&&"undefined"!=typeof FileReader?new m.Promise(function(b,c){var d=new FileReader;d.onload=function(a){b(a.target.result)},d.onerror=function(a){c(a.target.error)},d.readAsArrayBuffer(a)}):a});return h.then(function(b){var h=c.getTypeOf(b);return h?("arraybuffer"===h?b=c.transformTo("uint8array",b):"string"===h&&(g?b=j.decode(b):e&&f!==!0&&(b=d(b))),b):m.Promise.reject(new Error("Can't read the data of '"+a+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"core-js/library/fn/set-immediate":36}],33:[function(a,b,c){"use strict";function d(a){this.files=[],this.loadOptions=a}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./signature"),h=a("./zipEntry"),i=(a("./utf8"),a("./support"));d.prototype={checkSignature:function(a){if(!this.reader.readAndCheckSignature(a)){this.reader.index-=4;var b=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+f.pretty(b)+", expected "+f.pretty(a)+")")}},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=i.uint8array?"uint8array":"array",c=f.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;e<d;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readData(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(g.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes()},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(g.CENTRAL_FILE_HEADER);)a=new h({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(g.CENTRAL_DIRECTORY_END);if(a<0){var b=!this.isSignature(0,g.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(g.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===f.MAX_VALUE_16BITS||this.diskWithCentralDirStart===f.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===f.MAX_VALUE_16BITS||this.centralDirRecords===f.MAX_VALUE_16BITS||this.centralDirSize===f.MAX_VALUE_32BITS||this.centralDirOffset===f.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),a<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,g.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,g.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(e<0)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){this.reader=e(a)},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},b.exports=d},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(a,b,c){"use strict";function d(a,b){this.options=a,this.loadOptions=b}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./compressedObject"),h=a("./crc32"),i=a("./utf8"),j=a("./compressions"),k=a("./support"),l=0,m=3,n=function(a){for(var b in j)if(j.hasOwnProperty(b)&&j[b].magic===a)return j[b];return null};d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(b=n(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");this.decompressed=new g(this.compressedSize,this.uncompressedSize,this.crc32,b,a.readData(this.compressedSize))},readCentralPart:function(a){this.versionMadeBy=a.readInt(2),a.skip(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4);var b=a.readInt(2);if(this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");a.skip(b),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===l&&(this.dosPermissions=63&this.externalFileAttributes),a===m&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4))}},readExtraFields:function(a){var b,c,d,e=a.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});a.index<e;)b=a.readInt(2),c=a.readInt(2),d=a.readData(c),this.extraFields[b]={id:b,length:c,value:d}},handleUTF8:function(){var a=k.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=i.utf8decode(this.fileName),this.fileCommentStr=i.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c)}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e)}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileName)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileComment)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null}},b.exports=d},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,b,c){"use strict";var d=a("./stream/StreamHelper"),e=a("./stream/DataWorker"),f=a("./utf8"),g=a("./compressedObject"),h=a("./stream/GenericWorker"),i=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions}};i.prototype={internalStream:function(a){var b=null,c="string";try{if(!a)throw new Error("No output type specified.");c=a.toLowerCase();var e="string"===c||"text"===c;"binarystring"!==c&&"text"!==c||(c="string"),b=this._decompressWorker();var g=!this._dataBinary;g&&!e&&(b=b.pipe(new f.Utf8EncodeWorker)),!g&&e&&(b=b.pipe(new f.Utf8DecodeWorker))}catch(i){b=new h("error"),b.error(i)}return new d(b,c,"")},async:function(a,b){return this.internalStream(a).accumulate(b)},nodeStream:function(a,b){return this.internalStream(a||"nodebuffer").toNodejsStream(b)},_compressWorker:function(a,b){if(this._data instanceof g&&this._data.compression.magic===a.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new f.Utf8EncodeWorker)),g.createWorkerFrom(c,a,b)},_decompressWorker:function(){return this._data instanceof g?this._data.getContentWorker():this._data instanceof h?this._data:new e(this._data)}};for(var j=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],k=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<j.length;l++)i.prototype[j[l]]=k;b.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,b,c){a("../modules/web.immediate"),b.exports=a("../modules/_core").setImmediate},{"../modules/_core":40,"../modules/web.immediate":56}],37:[function(a,b,c){b.exports=function(a){if("function"!=typeof a)throw TypeError(a+" is not a function!");return a}},{}],38:[function(a,b,c){var d=a("./_is-object");b.exports=function(a){if(!d(a))throw TypeError(a+" is not an object!");return a}},{"./_is-object":51}],39:[function(a,b,c){var d={}.toString;b.exports=function(a){return d.call(a).slice(8,-1)}},{}],40:[function(a,b,c){var d=b.exports={version:"2.3.0"};"number"==typeof __e&&(__e=d)},{}],41:[function(a,b,c){var d=a("./_a-function");b.exports=function(a,b,c){if(d(a),void 0===b)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,e){return a.call(b,c,d,e)}}return function(){return a.apply(b,arguments)}}},{"./_a-function":37}],42:[function(a,b,c){b.exports=!a("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":45}],43:[function(a,b,c){var d=a("./_is-object"),e=a("./_global").document,f=d(e)&&d(e.createElement);b.exports=function(a){return f?e.createElement(a):{}}},{"./_global":46,"./_is-object":51}],44:[function(a,b,c){var d=a("./_global"),e=a("./_core"),f=a("./_ctx"),g=a("./_hide"),h="prototype",i=function(a,b,c){var j,k,l,m=a&i.F,n=a&i.G,o=a&i.S,p=a&i.P,q=a&i.B,r=a&i.W,s=n?e:e[b]||(e[b]={}),t=s[h],u=n?d:o?d[b]:(d[b]||{})[h];n&&(c=b);for(j in c)k=!m&&u&&void 0!==u[j],k&&j in s||(l=k?u[j]:c[j],s[j]=n&&"function"!=typeof u[j]?c[j]:q&&k?f(l,d):r&&u[j]==l?function(a){var b=function(b,c,d){if(this instanceof a){switch(arguments.length){case 0:return new a;case 1:return new a(b);case 2:return new a(b,c)}return new a(b,c,d)}return a.apply(this,arguments)};return b[h]=a[h],b}(l):p&&"function"==typeof l?f(Function.call,l):l,p&&((s.virtual||(s.virtual={}))[j]=l,a&i.R&&t&&!t[j]&&g(t,j,l)))};i.F=1,i.G=2,i.S=4,i.P=8,i.B=16,i.W=32,i.U=64,i.R=128,b.exports=i},{"./_core":40,"./_ctx":41,"./_global":46,"./_hide":47}],45:[function(a,b,c){b.exports=function(a){try{return!!a()}catch(b){return!0}}},{}],46:[function(a,b,c){var d=b.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=d)},{}],47:[function(a,b,c){var d=a("./_object-dp"),e=a("./_property-desc");b.exports=a("./_descriptors")?function(a,b,c){return d.f(a,b,e(1,c))}:function(a,b,c){return a[b]=c,a}},{"./_descriptors":42,"./_object-dp":52,"./_property-desc":53}],48:[function(a,b,c){b.exports=a("./_global").document&&document.documentElement},{"./_global":46}],49:[function(a,b,c){b.exports=!a("./_descriptors")&&!a("./_fails")(function(){return 7!=Object.defineProperty(a("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":42,"./_dom-create":43,"./_fails":45}],50:[function(a,b,c){b.exports=function(a,b,c){var d=void 0===c;switch(b.length){case 0:return d?a():a.call(c);case 1:return d?a(b[0]):a.call(c,b[0]);case 2:return d?a(b[0],b[1]):a.call(c,b[0],b[1]);case 3:return d?a(b[0],b[1],b[2]):a.call(c,b[0],b[1],b[2]);case 4:return d?a(b[0],b[1],b[2],b[3]):a.call(c,b[0],b[1],b[2],b[3])}return a.apply(c,b)}},{}],51:[function(a,b,c){b.exports=function(a){return"object"==typeof a?null!==a:"function"==typeof a}},{}],52:[function(a,b,c){var d=a("./_an-object"),e=a("./_ie8-dom-define"),f=a("./_to-primitive"),g=Object.defineProperty;c.f=a("./_descriptors")?Object.defineProperty:function(a,b,c){if(d(a),b=f(b,!0),d(c),e)try{return g(a,b,c)}catch(h){}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(a[b]=c.value),a}},{"./_an-object":38,"./_descriptors":42,"./_ie8-dom-define":49,"./_to-primitive":55}],53:[function(a,b,c){b.exports=function(a,b){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:b}}},{}],54:[function(a,b,c){var d,e,f,g=a("./_ctx"),h=a("./_invoke"),i=a("./_html"),j=a("./_dom-create"),k=a("./_global"),l=k.process,m=k.setImmediate,n=k.clearImmediate,o=k.MessageChannel,p=0,q={},r="onreadystatechange",s=function(){var a=+this;if(q.hasOwnProperty(a)){var b=q[a];delete q[a],b()}},t=function(a){s.call(a.data)};m&&n||(m=function(a){for(var b=[],c=1;arguments.length>c;)b.push(arguments[c++]);return q[++p]=function(){h("function"==typeof a?a:Function(a),b)},d(p),p},n=function(a){delete q[a]},"process"==a("./_cof")(l)?d=function(a){l.nextTick(g(s,a,1))}:o?(e=new o,f=e.port2,e.port1.onmessage=t,d=g(f.postMessage,f,1)):k.addEventListener&&"function"==typeof postMessage&&!k.importScripts?(d=function(a){k.postMessage(a+"","*")},k.addEventListener("message",t,!1)):d=r in j("script")?function(a){i.appendChild(j("script"))[r]=function(){i.removeChild(this),s.call(a)}}:function(a){setTimeout(g(s,a,1),0)}),b.exports={set:m,clear:n}},{"./_cof":39,"./_ctx":41,"./_dom-create":43,"./_global":46,"./_html":48,"./_invoke":50}],55:[function(a,b,c){var d=a("./_is-object");b.exports=function(a,b){if(!d(a))return a;var c,e;if(b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;if("function"==typeof(c=a.valueOf)&&!d(e=c.call(a)))return e;if(!b&&"function"==typeof(c=a.toString)&&!d(e=c.call(a)))return e;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":51}],56:[function(a,b,c){var d=a("./_export"),e=a("./_task");d(d.G+d.B,{setImmediate:e.set,clearImmediate:e.clear})},{"./_export":44,"./_task":54}],57:[function(a,b,c){(function(a){"use strict";function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length}k=!1}function d(a){1!==l.push(a)||k||e()}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2}}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null},a.document.documentElement.appendChild(b)}:function(){setTimeout(c,0)};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0)}}var k,l=[];b.exports=d}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],58:[function(a,b,c){"use strict";function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a)}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected)}function g(a,b,c){o(function(){var d;try{d=b(c)}catch(e){return p.reject(a,e)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d)})}function h(a){var b=a&&a.then;if(a&&("object"==typeof a||"function"==typeof a)&&"function"==typeof b)return function(){b.apply(a,arguments)}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b))}function d(b){f||(f=!0,p.resolve(a,b))}function e(){b(d,c)}var f=!1,g=j(e);"error"===g.status&&c(g.value)}function j(a,b){var c={};try{c.value=a(b),c.status="success"}catch(d){c.status="error",c.value=d}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g))}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a))},function(a){f||(f=!0,p.reject(h,a))})}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a("immediate"),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype["catch"]=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome)}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a)},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a)},f.prototype.callRejected=function(a){p.reject(this.promise,a)},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a)},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b)}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n},{immediate:57}],59:[function(a,b,c){"use strict";var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h},{"./lib/deflate":60,"./lib/inflate":61,"./lib/utils/common":62,"./lib/zlib/constants":65}],60:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return!1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)))}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g},{"./utils/common":62,"./utils/strings":63,"./zlib/deflate":67,"./zlib/messages":72,"./zlib/zstream":74}],61:[function(a,b,c){"use strict";function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header)}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return!1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0)}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a)},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e},{"./utils/common":62,"./utils/strings":63,"./zlib/constants":65,"./zlib/gzheader":68,"./zlib/inflate":70,"./zlib/messages":72,"./zlib/zstream":74}],62:[function(a,b,c){"use strict";var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f]},flattenChunks:function(a){return[].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f))},c.setTyped(d)},{}],63:[function(a,b,c){"use strict";function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0])}catch(h){f=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(h){g=!1}for(var i=new e.Buf8(256),j=0;j<256;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;c<h;)if(f=a[c++],f<128)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<h;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f)}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+i[a[c]]>b?c:b}},{"./common":62}],64:[function(a,b,c){"use strict";function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521}return e|f<<16|0;
}b.exports=d},{}],65:[function(a,b,c){"use strict";b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],66:[function(a,b,c){"use strict";function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e},{}],67:[function(a,b,c){"use strict";function d(a,b){return a.msg=I[b],b}function e(a){return(a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0))}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm)}function i(a,b){a.pending_buf[a.pending++]=b}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g]}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead)}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa)}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa)}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l)}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra)}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c)}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./messages":72,"./trees":73}],68:[function(a,b,c){"use strict";function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}b.exports=d},{}],69:[function(a,b,c){"use strict";var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]))}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]))}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q}},{}],70:[function(a,b,c){"use strict";function d(a){return(a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}m>>>=ta,n-=ta,c.back+=ta}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":62,"./adler32":64,"./crc32":66,"./inffast":69,"./inftrees":71}],71:[function(a,b,c){"use strict";var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return-1;if(K>0&&(a===h||1!==G))return-1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(;;){z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]]}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0}},{"../utils/common":62}],72:[function(a,b,c){"use strict";b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],73:[function(a,b,c){"use strict";function d(a){for(var b=a.length;--b>=0;)a[b]=0}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c)}function j(a,b,c){i(a,c[2*b],c[2*b+1])}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8)}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,
c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--)}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h))}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y)}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b)}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count)}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4))}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4)}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1)}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a)}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0)}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a)}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a)}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D},{"../utils/common":62}],74:[function(a,b,c){"use strict";function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}b.exports=d},{}]},{},[10])(10)});

if (IS_NODE_JS) { module = module4 };

(function(l){function m(b){b=void 0===b?"utf-8":b;if("utf-8"!==b)throw new RangeError("Failed to construct 'TextEncoder': The encoding label provided ('"+b+"') is invalid.");}function k(b,a){b='utf-8';b=void 0===b?"utf-8":b;a=void 0===a?{fatal:!1}:a;if("utf-8"!==b)throw new RangeError("Failed to construct 'TextDecoder': The encoding label provided ('"+b+"') is invalid.");if(a.fatal)throw Error("Failed to construct 'TextDecoder': the 'fatal' option is unsupported.");}if(l.TextEncoder&&l.TextDecoder)return!1;
Object.defineProperty(m.prototype,"encoding",{value:"utf-8"});m.prototype.encode=function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to encode: the 'stream' option is unsupported.");a=0;for(var h=b.length,f=0,c=Math.max(32,h+(h>>1)+7),e=new Uint8Array(c>>3<<3);a<h;){var d=b.charCodeAt(a++);if(55296<=d&&56319>=d){if(a<h){var g=b.charCodeAt(a);56320===(g&64512)&&(++a,d=((d&1023)<<10)+(g&1023)+65536)}if(55296<=d&&56319>=d)continue}f+4>e.length&&(c+=8,c*=1+a/b.length*2,c=c>>3<<3,
g=new Uint8Array(c),g.set(e),e=g);if(0===(d&4294967168))e[f++]=d;else{if(0===(d&4294965248))e[f++]=d>>6&31|192;else if(0===(d&4294901760))e[f++]=d>>12&15|224,e[f++]=d>>6&63|128;else if(0===(d&4292870144))e[f++]=d>>18&7|240,e[f++]=d>>12&63|128,e[f++]=d>>6&63|128;else continue;e[f++]=d&63|128}}return e.slice(0,f)};Object.defineProperty(k.prototype,"encoding",{value:"utf-8"});Object.defineProperty(k.prototype,"fatal",{value:!1});Object.defineProperty(k.prototype,"ignoreBOM",{value:!1});k.prototype.decode=
function(b,a){a=void 0===a?{stream:!1}:a;if(a.stream)throw Error("Failed to decode: the 'stream' option is unsupported.");b=new Uint8Array(b);a=0;for(var h=b.length,f=[];a<h;){var c=b[a++];if(0===c)break;if(0===(c&128))f.push(c);else if(192===(c&224)){var e=b[a++]&63;f.push((c&31)<<6|e)}else if(224===(c&240)){e=b[a++]&63;var d=b[a++]&63;f.push((c&31)<<12|e<<6|d)}else if(240===(c&248)){e=b[a++]&63;d=b[a++]&63;var g=b[a++]&63;c=(c&7)<<18|e<<12|d<<6|g;65535<c&&(c-=65536,f.push(c>>>10&1023|55296),c=56320|
c&1023);f.push(c)}}return String.fromCharCode.apply(null,f)};l.TextEncoder=m;l.TextDecoder=k})("undefined"!==typeof window?window:"undefined"!==typeof module?module.exports:self);

if (IS_NODE_JS) { module = module5 };

const exportObj = "undefined"!==typeof window?(window.Comlink={}):"undefined"!==typeof module?module.exports:(self.Comlink={});
const windowy = ("undefined"!==typeof self) ? self : global;

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Symbol that gets added to objects by `Comlink.proxy()`.
 */
const proxyValueSymbol = Symbol("comlinkProxyValue");
/**
 * Returns true if the given value has the proxy value symbol added to it.
 */
const isProxyValue = (value) => !!value && value[proxyValueSymbol] === true;
const TRANSFERABLE_TYPES = ["ArrayBuffer", "MessagePort", "OffscreenCanvas"]
    .filter(f => f in windowy)
    .map(f => windowy[f]);
const uid = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
const throwSymbol = Symbol("throw");
const proxyTransferHandler = {
    canHandle: isProxyValue,
    serialize: (obj) => {
        const { port1, port2 } = new MessageChannel();
        expose(obj, port1);
        return port2;
    },
    deserialize: (obj) => {
        return proxy(obj);
    }
};
const throwTransferHandler = {
    canHandle: (obj) => obj && obj[throwSymbol],
    serialize: (obj) => {
        const message = obj && obj.message;
        const stack = obj && obj.stack;
        return Object.assign({}, obj, { message, stack });
    },
    deserialize: (obj) => {
        throw Object.assign(Error(), obj);
    }
};
const transferHandlers = new Map([
    ["PROXY", proxyTransferHandler],
    ["THROW", throwTransferHandler]
]);
let pingPongMessageCounter = 0;
function proxy(endpoint, target) {
    if (isWindow(endpoint))
        endpoint = windowEndpoint(endpoint);
    if (!isEndpoint(endpoint))
        throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
    activateEndpoint(endpoint);
    return cbProxy(async (irequest) => {
        let args = [];
        if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT")
            args = irequest.argumentsList.map(wrapValue);
        const response = await pingPongMessage(endpoint, Object.assign({}, irequest, { argumentsList: args }), transferableProperties(args));
        const result = response.data;
        return unwrapValue(result.value);
    }, [], target);
}
function proxyValue(obj) {
    const proxyVal = obj;
    proxyVal[proxyValueSymbol] = true;
    return proxyVal;
}
function expose(rootObj, endpoint) {
    if (isWindow(endpoint))
        endpoint = windowEndpoint(endpoint);
    if (!isEndpoint(endpoint))
        throw Error("endpoint does not have all of addEventListener, removeEventListener and postMessage defined");
    activateEndpoint(endpoint);
    attachMessageHandler(endpoint, async function (event) {
        if (!event.data.id || !event.data.callPath)
            return;
        const irequest = event.data;
        let that = await irequest.callPath
            .slice(0, -1)
            .reduce((obj, propName) => obj[propName], rootObj);
        let obj = await irequest.callPath.reduce((obj, propName) => obj[propName], rootObj);
        let iresult = obj;
        let args = [];
        if (irequest.type === "APPLY" || irequest.type === "CONSTRUCT")
            args = irequest.argumentsList.map(unwrapValue);
        if (irequest.type === "APPLY") {
            if (typeof obj === 'function') {
                try {
                    iresult = await obj.apply(that, args);
                }
                catch (e) {
                    iresult = e;
                    iresult[throwSymbol] = true;
                }
            } else {
                if (args.length > 0) {
                    rootObj[args[0]] = args[1];
                    iresult = args[1];
                } else {
                    iresult = obj;
                }
            }
        }
        if (irequest.type === "CONSTRUCT") {
            try {
                iresult = new obj(...args); // eslint-disable-line new-cap
                iresult = proxyValue(iresult);
            }
            catch (e) {
                iresult = e;
                iresult[throwSymbol] = true;
            }
        }
        if (irequest.type === "SET") {
            obj[irequest.property] = irequest.value;
            // FIXME: ES6 Proxy Handler `set` methods are supposed to return a
            // boolean. To show good will, we return true asynchronously ¯\_(ツ)_/¯
            iresult = true;
        }
        iresult = makeInvocationResult(iresult);
        iresult.id = irequest.id;
        return endpoint.postMessage(iresult, transferableProperties([iresult]));
    });
}
function wrapValue(arg) {
    // Is arg itself handled by a TransferHandler?
    for (const [key, transferHandler] of transferHandlers) {
        if (transferHandler.canHandle(arg)) {
            return {
                type: key,
                value: transferHandler.serialize(arg)
            };
        }
    }
    // If not, traverse the entire object and find handled values.
    let wrappedChildren = [];
    for (const item of iterateAllProperties(arg)) {
        for (const [key, transferHandler] of transferHandlers) {
            if (transferHandler.canHandle(item.value)) {
                wrappedChildren.push({
                    path: item.path,
                    wrappedValue: {
                        type: key,
                        value: transferHandler.serialize(item.value)
                    }
                });
            }
        }
    }
    for (const wrappedChild of wrappedChildren) {
        const container = wrappedChild.path
            .slice(0, -1)
            .reduce((obj, key) => obj[key], arg);
        container[wrappedChild.path[wrappedChild.path.length - 1]] = null;
    }
    return {
        type: "RAW",
        value: arg,
        wrappedChildren
    };
}
function unwrapValue(arg) {
    if (transferHandlers.has(arg.type)) {
        const transferHandler = transferHandlers.get(arg.type);
        return transferHandler.deserialize(arg.value);
    }
    else if (isRawWrappedValue(arg)) {
        for (const wrappedChildValue of arg.wrappedChildren || []) {
            if (!transferHandlers.has(wrappedChildValue.wrappedValue.type))
                throw Error(`Unknown value type "${arg.type}" at ${wrappedChildValue.path.join(".")}`);
            const transferHandler = transferHandlers.get(wrappedChildValue.wrappedValue.type);
            const newValue = transferHandler.deserialize(wrappedChildValue.wrappedValue.value);
            replaceValueInObjectAtPath(arg.value, wrappedChildValue.path, newValue);
        }
        return arg.value;
    }
    else {
        throw Error(`Unknown value type "${arg.type}"`);
    }
}
function replaceValueInObjectAtPath(obj, path, newVal) {
    const lastKey = path.slice(-1)[0];
    const lastObj = path
        .slice(0, -1)
        .reduce((obj, key) => obj[key], obj);
    lastObj[lastKey] = newVal;
}
function isRawWrappedValue(arg) {
    return arg.type === "RAW";
}
function windowEndpoint(w) {
    if (self.constructor.name !== "Window")
        throw Error("self is not a window");
    return {
        addEventListener: self.addEventListener.bind(self),
        removeEventListener: self.removeEventListener.bind(self),
        postMessage: (msg, transfer) => w.postMessage(msg, "*", transfer)
    };
}
function isEndpoint(endpoint) {
    return ("addEventListener" in endpoint &&
        "removeEventListener" in endpoint &&
        "postMessage" in endpoint);
}
function activateEndpoint(endpoint) {
    if (isMessagePort(endpoint))
        endpoint.start();
}
function attachMessageHandler(endpoint, f) {
    // Checking all possible types of `endpoint` manually satisfies TypeScript’s
    // type checker. Not sure why the inference is failing here. Since it’s
    // unnecessary code I’m going to resort to `any` for now.
    // if(isWorker(endpoint))
    //   endpoint.addEventListener('message', f);
    // if(isMessagePort(endpoint))
    //   endpoint.addEventListener('message', f);
    // if(isOtherWindow(endpoint))
    //   endpoint.addEventListener('message', f);
    endpoint.addEventListener("message", f);
}
function detachMessageHandler(endpoint, f) {
    // Same as above.
    endpoint.removeEventListener("message", f);
}
function isMessagePort(endpoint) {
    return endpoint.constructor.name === "MessagePort";
}
function isWindow(endpoint) {
    // TODO: This doesn’t work on cross-origin iframes.
    // return endpoint.constructor.name === 'Window';
    return ["window", "length", "location", "parent", "opener"].every(prop => prop in endpoint);
}
/**
 * `pingPongMessage` sends a `postMessage` and waits for a reply. Replies are
 * identified by a unique id that is attached to the payload.
 */
function pingPongMessage(endpoint, msg, transferables) {
    const id = `${uid}-${pingPongMessageCounter++}`;
    return new Promise(resolve => {
        attachMessageHandler(endpoint, function handler(event) {
            if (event.data.id !== id)
                return;
            detachMessageHandler(endpoint, handler);
            resolve(event);
        });
        // Copy msg and add `id` property
        msg = Object.assign({}, msg, { id });
        endpoint.postMessage(msg, transferables);
    });
}
function cbProxy(cb, callPath = [], target = function () { }) {
    return new Proxy(target, {
        construct(_target, argumentsList, proxy) {
            return cb({
                type: "CONSTRUCT",
                callPath,
                argumentsList
            });
        },
        apply(_target, _thisArg, argumentsList) {
            // We use `bind` as an indicator to have a remote function bound locally.
            // The actual target for `bind()` is currently ignored.
            if (callPath[callPath.length - 1] === "bind")
                return cbProxy(cb, callPath.slice(0, -1));
            return cb({
                type: "APPLY",
                callPath,
                argumentsList
            });
        },
        get(_target, property, proxy) {
            if (property === "then" && callPath.length === 0) {
                return { then: () => proxy };
            }
            else if (property === "then") {
                const r = cb({
                    type: "GET",
                    callPath
                });
                return Promise.resolve(r).then.bind(r);
            }
            else {
                return cbProxy(cb, callPath.concat(property), _target[property]);
            }
        },
        set(_target, property, value, _proxy) {
            return cb({
                type: "SET",
                callPath,
                property,
                value
            });
        }
    });
}
function isTransferable(thing) {
    return TRANSFERABLE_TYPES.some(type => thing instanceof type);
}
function* iterateAllProperties(value, path = [], visited = null) {
    if (!value)
        return;
    if (!visited)
        visited = new WeakSet();
    if (visited.has(value))
        return;
    if (typeof value === "string")
        return;
    if (typeof value === "object")
        visited.add(value);
    if (ArrayBuffer.isView(value))
        return;
    yield { value, path };
    const keys = Object.keys(value);
    for (const key of keys)
        yield* iterateAllProperties(value[key], [...path, key], visited);
}
function transferableProperties(obj) {
    const r = [];
    for (const prop of iterateAllProperties(obj)) {
        if (isTransferable(prop.value))
            r.push(prop.value);
    }
    return r;
}
function makeInvocationResult(obj) {
    for (const [type, transferHandler] of transferHandlers) {
        if (transferHandler.canHandle(obj)) {
            const value = transferHandler.serialize(obj);
            return {
                value: { type, value }
            };
        }
    }
    return {
        value: {
            type: "RAW",
            value: obj
        }
    };
}

exportObj.proxyValueSymbol = proxyValueSymbol;
exportObj.transferHandlers = transferHandlers;
exportObj.proxy = proxy;
exportObj.proxyValue = proxyValue;
exportObj.expose = expose;
if (IS_NODE_JS) { module = module1 };

return Coldbrew;
})();
})();
