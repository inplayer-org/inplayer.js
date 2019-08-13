export async function checkStatus(response: any) {
    if (!response.ok) {
        let error: any = new Error(response.statusText);

        error.response = await response.json();
        throw error;
    }

    return response;
};

export const errorResponse = (statusCode = 400, body = {}) => {
    if (statusCode < 400) {
        statusCode = 400;
    }

    // const response = new Response(JSON.stringify(body), {
    //     status: statusCode,
    //     // @ts-ignore
    //     ok: false,
    // });

    let err = new Error(String(statusCode));

    // err.response = response;

    throw err;
};

const buildParams = (prefix: any, obj: any, add: any) => {
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

export const parseJSON = (response: any) => {
    return response.json();
};

export const params = (a: any) => {
    var prefix, s: any[], add, name, r20, output;

    s = [];
    r20 = /%20/g;
    add = (key: any, value: any) => {
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
