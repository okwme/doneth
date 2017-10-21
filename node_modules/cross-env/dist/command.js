'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _isWindows = require('is-windows');

var _isWindows2 = _interopRequireDefault(_isWindows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = commandConvert;

/**
 * Converts an environment variable usage to be appropriate for the current OS
 * @param {String} command Command to convert
 * @param {boolean} normalize If the command should be normalized using `path`
 * after converting
 * @returns {String} Converted command
 */

function commandConvert(command) {
  var normalize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!(0, _isWindows2.default)()) {
    return command;
  }
  var envUnixRegex = /\$(\w+)|\${(\w+)}/g; // $my_var or ${my_var}
  var convertedCmd = command.replace(envUnixRegex, '%$1$2%');
  // Normalization is required for commands with relative paths
  // For example, `./cmd.bat`. See kentcdodds/cross-env#127
  // However, it should not be done for command arguments.
  // See https://github.com/kentcdodds/cross-env/pull/130#issuecomment-319887970
  return normalize === true ? _path2.default.normalize(convertedCmd) : convertedCmd;
}