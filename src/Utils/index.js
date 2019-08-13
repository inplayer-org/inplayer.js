export const checkStatus = response => {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
};

export const errorResponse = (statusCode = 400, body = {}) => {
    if (statusCode < 400) {
        statusCode = 400;
    }

    const response = new Response(JSON.stringify(body), {
        status: statusCode,
        ok: false,
    });

    let err = new Error(statusCode);

    err.response = response;

    throw err;
};

const buildParams = (prefix, obj, add) => {
    var name, i, l, rbracket;

    rbracket = /\[\]$/;
    if (obj instanceof Array) {
        for (i = 0, l = obj.length; i < l; i++) {
            if (rbracket.test(prefix)) {
                add(prefix, obj[i]);
            } else {
                buildParams(
                    prefix + '[' + (typeof obj[i] === 'object' ? i : '') + ']',
                    obj[i],
                    add
                );
            }
        }
    } else if (typeof obj === 'object') {
        // Serialize object item.
        for (name in obj) {
            buildParams(prefix + '[' + name + ']', obj[name], add);
        }
    } else {
        // Serialize scalar item.
        add(prefix, obj);
    }
};

export const parseJSON = response => {
    return response.json();
};

export const params = a => {
    var prefix, s, add, name, r20, output;

    s = [];
    r20 = /%20/g;
    add = (key, value) => {
        // If value is a function, invoke it and return its value
        value =
            typeof value === 'function' ? value() : value === null ? '' : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
    };
    if (a instanceof Array) {
        for (name in a) {
            add(name, a[name]);
        }
    } else {
        for (prefix in a) {
            buildParams(prefix, a[prefix], add);
        }
    }
    output = s.join('&').replace(r20, '+');
    return output;
};
