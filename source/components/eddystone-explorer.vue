<template>
    <div class="eddystone-explorer">
        <div class="wrapper">
            <header>
                <h2>Explore and configure your beacons that support Eddystone, an open beacon format from Google.</h2>
            </header>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Hello World'
            }
        }
    };
</script>

<style scoped>
    .eddystone-explorer {
        display: block;
    }

    .wrapper {
        width: 95vw;
        max-width: 532px;
        margin: 0 auto;
    }

    header {
        padding: 2.4rem 1.6rem;
    }

    h2 {
        margin: 0;
        margin-bottom: 2.4rem;
        font-size: 1.8rem;
        font-weight: 400;
    }

    main {
        padding-bottom: 2.4rem;
    }

    main > *:not(:first-child) {
        margin-top: 2.4rem;
    }

    main > *:not(:last-child) {
        margin-bottom: 2.4rem;
    }
</style>
