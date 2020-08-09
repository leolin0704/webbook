import LRU from "lru-cache";

const options = {
    maxAge: 1000 * 60 * 5, 
}

const cache = new LRU(options);

export default cache;