export default {
    data() {
        return {
            dependencies: []
        };
    },

    methods: {
        async initialize() {
            // NOTE: Users of this mixin should override this method.
        }
    },

    async created() {
        const values = await Promise.all(this.dependencies.map((dependency) => (
            new Promise((resolve, reject) => {
                const unwatch = this.$watch(dependency, (value) => {
                    if (value !== undefined && value !== null) {
                        unwatch();
                        resolve(value);
                    }
                });
            })
        )));
        await this.initialize(...values);
    }
};
