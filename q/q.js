/* jQuery smaller version */
function q(selector) {
    let el;
    let res$;
    
    if (selector instanceof Element) {
        el = selector;
    } else {
        
        res$ = document.querySelector(selector);
        if (res$ !== null) {
            el = res$;
        } else {
            res$ = document.querySelectorAll(selector);
            if (res$ !== []) {
                el = [];
                res$.forEach(node => el.push(node));
            } else {
                return null;
            }
        }

    }

    let $$ = {
        el,
        on: (event, ...handlers) => {
            if (handlers.length === 1) {
                $$.el.addEventListener(event, handlers[0]);
                return;
            }
            handlers.forEach(handler => {
                $$.el.addEventListener(event, handler);
            });
        },
        off: (event, ...handlers) => {
            if (handlers.length === 1) {
                $$.el.removeEventListener(event, handlers[0]);
                return;
            }
            handlers.forEach(handler => {
                $$.el.removeEventListener(event, handler);
            });
        },
        hide: () => {
            $$.el.style.display = 'none';
        },
        show: () => {
            $$.el.style.display = '';
        },
        fadeIn: ms => {
            let elem = $$.el;
            elem.style.opacity = 0;

            if (ms) {
                const opacity = 0;
                const timer = setInterval(() => {
                    opacity += 50 / ms;
                    if (opacity >= 1) {
                        clearInterval(timer);
                        opacity = 1;
                    }
                    elem.style.opacity = opacity;
                }, 50);
            } else {
                elem.style.opacity = 1;
            }
        },
        fadeOut: ms => {
            let el = $$.el;
            if (ms) {
                el.style.transition = `opacity ${ms} ms`;
                el.addEventListener(
                    'transitionend', 
                    event => el.style.display = 'none',
                    false
                );
            }
            el.style.opacity = '0';
        },
        fadeToggle: () => {
            let el = $$.el;
            el.style.transition = 'opacity 3s';
            const { opacity } = el.ownerDocument.defaultView.getComputedStyle(el, null);
            if (opacity === '1') {
                el.style.opacity = '0';
            } else {
                el.style.opacity = '1';
            }
        },
        slideUp: () => {
            let el = $$.el;
            const originHeight = '100px';
            el.style.transition = 'height 3s';
            // slideUp
            el.style.height = '0px';
        },
        slideDown: () => {
            let el = $$.el;
            const originHeight = '100px';
            el.style.transition = 'height 3s';
            // slideDown
            el.style.height = originHeight;
        },
        slideToggle: () => {
            let el = $$.el;
            const originHeight = '100px';
            el.style.transition = 'height 3s';
            const { height } = el.ownerDocument.defaultView.getComputedStyle(el, null);
            if (parseInt(height, 10) === 0) {
                el.style.height = originHeight;
            }
            else {
                el.style.height = '0px';
            }
        },
        animate: (params, speed) => {
            let el = $$.el;
            el.style.transition = 'all ' + speed;
            Object.keys(params).forEach(key => el.style[key] = params[key]);
        },
        addClass: className => {
            $$.el.classList.add(className);
        },
        after: htmlString => {
            $$.el.insertAdjacentHTML('afterend', htmlString);
        },
        append(...children) {
            children.forEach(child => {
                $$.el.appendChild(child);
            });
        },
        before: htmlString => {
            $$.el.insertAdjacentHTML('beforebegin', htmlString);
        },
        children: () => {
            return $$.el.children;
        },
        clone: () => {
            $$.el.cloneNode(true);
        },
        find: selector => {
            let _el = $$.el.querySelector(selector);
            if (_el !== null) {
                return _el;
            } else {
                _el = $$.el.querySelectorAll(selector);
                if (_el !== []) {
                    let _res_ = [];
                    _el.forEach(node => _res_.push(node));
                    return _res_;
                } else {
                    return null;
                }
            }
        },
        findAll: selector => {
            return $$.el.querySelectorAll(selector);
        },
        empty: () => {
            $$.el.innerHTML = '';
        },
        attr: (name, val = null) => {
            if (val === null || val === undefined) return $$.el.getAttribute(name);
            $$.el.setAttribute(name, val);
        },
        html: (text = null) => {
            if (text === null || text === undefined) return $$.el.innerHTML;
            $$.el.innerHTML = text;
        },
        val: () => {
            return $$.el.value;
        },
        index: ($target) => { // $target === e.currentTarget
            let nodes = [];
            $$.el.forEach(node => nodes.push(node));
            return nodes.indexOf($target);
        },
        data: (name, val = null) => {
            if (val === null || val === undefined) return $$.el.getAttribute(`data-${name}`);
            $$.el.setAttribute(`data-${name}`, val);
        },
        outer: () => {
            return $$.el.outerHTML;
        },
        css: (ruleName, val = null) => {
            if (val === null || val === undefined) return getComputedStyle($$.el)[ruleName];
            $$.el.style[ruleName] = val;
        },
        text: (txt = null) => {
            if (txt === null || txt === undefined) return $$.el.textContent;
            $$.el.textContent = txt;
        },
        hasClass: className => {
            $$.el.classList.contains(className);
        },
        is: otherEl => {
            return $$.el === otherEl;
        },
        offset: () => {
            let rect = $$.el.getBoundingClientRect();
            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };
        },
        offsetParent: () => {
            return $$.el.offsetParent || el;
        },
        outerHeight: (margin = false) => {
            if (!margin) return $$.el.offsetHeight;
            let height = $$.el.offsetHeight;
            let style = getComputedStyle($$.el);

            height += parseInt(style.marginTop) + parseInt(style.marginBottom);
            return height;
        },
        outerWidth: (margin = false) => {
            if (!margin) return $$.el.offsetWidth;
            let width = $$.el.offsetWidth;
            let style = getComputedStyle($$.el);

            width += parseInt(style.marginLeft) + parseInt(style.marginRight);
            return width;
        },
        position: () => {
            return { left: $$.el.offsetLeft, top: $$.el.offsetTop };
        },
        relPosition: () => {
            return $$.el.getBoundingClientRect();
        },
        next: () => {
            return $$.el.nextElementSibling;
        },
        nextAll: filter => {
            let sibs = [];
            let elem = $$.el;
            elem = elem.parentNode.firstChild;
            do {
                if (elem.nodeType === 3) continue; // ignore text nodes
                if (!filter || filter(elem)) sibs.push(elem);
            } while (elem = elem.nextSibling)
            return sibs;
        }, 
        parent: () => {
            return $$.el.parent;
        },
        parentsUntil: (selector, filter) => {
            const result = [];
            const matchesSelector = $$.el.matches || $$.el.webkitMatchesSelector || $$.el.mozMatchesSelector || $$.el.msMatchesSelector;
            let el = $$.el.parentElement;
            while (el && !matchesSelector.call(el, selector)) {
                if (!filter) {
                    result.push(el);
                } else {
                    if (matchesSelector.call(el, filter)) {
                        result.push(el);
                    }
                }
                el = el.parentElement;
            }
            return result;
        },
        closest: selector => {
            const matchesSelector = $$.el.matches || $$.el.webkitMatchesSelector || $$.el.mozMatchesSelector || $$.el.msMatchesSelector;
            let el = $$.el;
            while (el) {
                if (matchesSelector.call(el, selector)) {
                    return el;
                } else {
                    el = el.parentElement;
                }
            }
            return null;
        },
        prepend: newEl => {
            $$.el.insertBefore(newEl, $$.el.firstChild);
        },
        wrap: _selector => {
            let wrapper = document.querySelector(_selector);
            if ($$.el instanceof Array) {
                $$.el.forEach(elem => {
                    elem.parentNode.insertBefore(wrapper, elem);
                    wrapper.appendChild(elem);
                });
            } else {
                $$.el.parentNode.insertBefore(wrapper, $$.el);
                wrapper.appendChild($$.el);
            }
        },
        unwrap: () => {
            let elems = $$.el;
            elems.forEach(elem => {
                let parent = elem.parentNode;
                if (parent !== document.body) {
                    parent.parentNode.insertBefore(elem, parent);
                    parent.parentNode.removeChild(parent);
                }
            });
        },
        prev: () => {
            return $$.el.previousElementSibling;
        },
        prevAll: filter => {
            let sibs = [];
            let elem = $$.el;
            while (elem = elem.previousSibling) {
                if (elem.nodeType === 3) continue; // ignore text nodes
                if (!filter || filter(elem)) sibs.push(elem);
            }
            return sibs;
        },
        remove: () => {
            $$.el.parentNode.removeChild($$.el);
        },
        removeClass: className => {
            $$.el.classList.remove(className);
        },
        replaceWith: text => {
            $$.el.outerHTML = text;
        },
        siblings: () => {
            let children = $$.el.parentNode.children;
            let _siblings = children.filter(elem => elem !== $$.el);
            return _siblings;
        },
        toggle: () => {
            if ($$.el.ownerDocument.defaultView.getComputedStyle(el, null).display === 'none') {
                $$.el.style.display = '' | 'inline' | 'inline-block' | 'inline-table' | 'block';
            } else {
                $$.el.style.display = 'none';  
            }
        },
        toggleClass: className => {
            $$.el.classList.toggle(className);
        },
        ready: func => {
            if ($$.el.readyState !== 'loading') {
                func();
            } else {
                $$.el.addEventListener('DOMContentLoaded', func);
            }
        },
        trigger: (eventName, data = null) => {
            if (data === null || data === undefined) {
                let event = document.createEvent('HTMLEvents');
                event.initEvent(eventName, true, false);
                $$.el.dispatch(event);
            } else {
                if (window.customEvents) {
                    let event = new CustomEvent(eventName, { detail: data });
                    $$.el.dispatch(event);
                } else {
                    let event = document.createEvent('CustomEvent');
                    event.initCustomEvent(eventName, true, true, data);
                    $$.el.dispatch(event);
                }
            }
        },
        each: func => {
            $$.el.forEach(func);
            return;
        },
        filter: func => {
            let res = $$.el.filter(func);
            return res;
        },
        map: func => {
            return $$.el.map(func);
        }
    };

    return $$;
}
q.all = selector => {
    let elements = [];
    let nodes = document.querySelectorAll(selector);

    if (nodes !== []) {
        nodes.forEach(node => elements.push(node));
    } else {
        return null;
    }

    const $$ = {
        elements,
        filter: func => {
            let res = $$.elements.filter(func);
            return res;
        },
        each: func => {
            $$.elements.forEach(func);
            return;
        },
        map: func => {
            return $$.elements.map(func);
        }
    };

    return $$;
};
q.ajax = (config, func) => {
    let request = new XMLHttpRequest();
    let data = config.data ? config.data : '' ;
    request.open(config.type, config.url + data, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            let resp = this.response;
            func(resp);
        } else {
            func(new Error('We reached our target server, but it returned an error'));
        }
    };

    request.onerror = function () {
        func(new Error('There was a connection error of some sort'));
    };

    request.send();
}
q.getJSON = (url, func) => {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            // Success!
            let data = JSON.parse(this.response);
            func(data);
        } else {
            func(new Error('We reached our target server, but it returned an error'));
        }
    };

    request.onerror = function () {
        func(new Error('There was a connection error of some sort'));
    };

    request.send();
}
q.contains = (el, child) => {
    return el !== child && el.contains(child);
}
q.parseHTML = htmlString => {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = htmlString;
    return tmp.body.children;
}

export { q };

/*
 TODO: add method chaining:
 ex: q('#root').on(...).off(...).addClass(...).removeClass(...).css(...).attr(...)...;
*/


// example of usage:
// import { q } from "./q.js";
// if you want jquery symbol:
// import {q as $} from "./q.js"; 
// or: const $ = q;

// ex-1:
// q('#root').on('click', e => console.log(`i'm clicked!`));
// q.all('div').each((el, i) => console.log(el));
// let $el = q.all('div').filter((el, i) => q('#root').el === el)[0]; // $el --> 1st element of the array
// console.log($el);
// q($el).on('mouseover', e => console.log(`mouseover !`));

// ex-2:
// let html = q.parseHTML(`<button class="btn btn-danger">Delete</button>`);
// q('.container').html(html);

// ex-3:
// let ps = q.all('p');
// ps.each((p, i) => {
//     console.log(p, `i:${i}`);
// });