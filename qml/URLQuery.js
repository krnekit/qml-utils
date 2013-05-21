/*
 * Copyright (C) 2013 Nikita Krupenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
 * NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

.pragma library

function serializeParams(object, prefix) {
    if (typeof object !== 'object') {
        return ''
    }

    if (!prefix) {
        prefix = ''
    }

    var output = []
    var keysArray = (Array.isArray(object) ? object : Object.keys(object))
    for (var i = 0; i < keysArray.length; i++) {
        var key = (Array.isArray(object) ? i : keysArray[i])
        if (typeof object[key] === 'object') {
            output.push(serializeParams(object[key], (!prefix ? key : '%1[%2]'.arg(prefix).arg(key))))
        } else {
            output.push('%1=%2'.arg(encodeURIComponent(!prefix ? key : '%1[%2]'.arg(prefix).arg(Array.isArray(object) ? '' : key)))
                        .arg(encodeURIComponent(object[key])))
        }
    }

    return output.join('&').replace('%20', '+')
}

function parseParams(url) {
    if (typeof url !== 'string') {
        return null
    }

    var result = {}
    var queries = url.replace(/[?#]/g, '&').replace(/^[^&]*?&/, '').replace(/[+]/g, '%20').split(/[&;]/)
    for (var i = 0; i < queries.length; i++) {
        var params = queries[i].split('=')
        result[decodeURIComponent(params[0])] = decodeURIComponent(params[1])
    }

    return result
}
