<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Point</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in findTopList()" :key="index" >
                    <td>{{ index + 1 }}</td>
                    <td>{{ user.Username }}</td>
                    <td>{{ user.AllPoint }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        data: Array
    },
    methods: {
        findTopList() {
            var sortable = [];
            for(var i in this.data)
                sortable.push(this.data[i])
            sortable.sort((a, b) => b.AllPoint - a.AllPoint);
            return sortable;
        }
    }
}
</script>

<style lang="scss" scoped>
    table {
        margin: 1em auto;
    }
    th {
        width: 150px;
        height: 40px;
        font-size: 1.5em;
        
    }
</style>>

