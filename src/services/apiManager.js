import blogApi from './blogAPI';

// generate javascript singleton
const apiManager = (() => {
    let instance;

    function createInstance() {
        return blogApi;
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
}
)();

export default apiManager;