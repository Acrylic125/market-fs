// This file acts as a global namespace for the environment.

import { dirname, sep } from 'path';

function getRoot() {
    var rootPath = dirname(__filename).split(sep);
    rootPath.pop();
    return rootPath.join(sep);
}

export const root = getRoot();

export function prependPathWithRoot(path: string) {
    return root + sep + path;
}
