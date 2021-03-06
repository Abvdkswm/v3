"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._request = void 0;
var fs_1 = require("fs");
var https_1 = require("https");
var userAgent_1 = require("./userAgent");
var _requestOptions = function (api_key, apiUrl, path, method, payload, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
override_options) {
    var additionalHeaders = {};
    if (payload && !(payload instanceof fs_1.ReadStream)) {
        additionalHeaders["Content-Length"] = Buffer.byteLength(payload);
    }
    var options = {
        host: apiUrl,
        path: path,
        method: method,
        headers: __assign({ "User-Agent": (0, userAgent_1.userAgent)(), "Content-Type": "application/json", Authorization: "token ".concat(api_key) }, additionalHeaders),
    };
    var headers = options.headers;
    if (override_options && override_options.headers) {
        headers = __assign(__assign({}, headers), override_options.headers);
    }
    return __assign(__assign(__assign({}, options), override_options), { headers: headers });
};
function _request(method, api_key, apiUrl, path, payload, 
// eslint-disable-next-line @typescript-eslint/ban-types
options) {
    var requestOptions = _requestOptions(api_key, apiUrl, path, method, payload, options);
    return new Promise(function (resolve, reject) {
        try {
            var httpRequest_1 = (0, https_1.request)(requestOptions, function (dgRes) {
                var dgResContent = "";
                dgRes.on("data", function (chunk) {
                    dgResContent += chunk;
                });
                dgRes.on("end", function () {
                    var dgResponse;
                    try {
                        dgResponse = JSON.parse(dgResContent);
                    }
                    catch (err) {
                        dgResponse = { error: dgResContent };
                    }
                    if (dgResponse.error) {
                        reject("DG: ".concat(dgResContent));
                    }
                    resolve(dgResponse);
                });
                dgRes.on("error", function (err) {
                    reject("DG: ".concat(err));
                });
            });
            httpRequest_1.on("error", function (err) {
                reject("DG: ".concat(err));
            });
            if (payload) {
                if (payload instanceof fs_1.ReadStream) {
                    payload.pipe(httpRequest_1);
                    payload.on("finish", function () {
                        httpRequest_1.end();
                    });
                }
                else {
                    // It's a buffer
                    httpRequest_1.write(payload);
                    httpRequest_1.end();
                }
            }
            else {
                httpRequest_1.end();
            }
        }
        catch (err) {
            reject("DG: ".concat(err));
        }
    });
}
exports._request = _request;
//# sourceMappingURL=httpRequest.js.map