<template>
    <div>
        <h3 class="py-3 px-5 bg-primary text-light font-weight-bold rounded border-white">Task Managment > {{ isEditing?'Edit':'Home' }}</h3>
        <b-overlay :show="loading">
            <b-card no-body bg-variant="white" border-variant="white">
                <b-card-body class="px-5 py-2">
                    <b-card-title>
                        <h4 v-if="!isEditing">Add new task</h4>
                        <h4 v-else>Edit task</h4>
                    </b-card-title>
                    <b-card-text>
                        <form @submit.prevent="saveData">
                            <div class="row">
                                <b-form-group label="Title:" label-for="title" class="mb-3 col-12">
                                    <b-form-input id="title" v-model="formData.title" type="text" placeholder="Enter task`s title" required></b-form-input>
                                </b-form-group>
                                <b-form-group label="Description:" label-for="description" class="mb-3 col-12">
                                    <b-form-textarea id="description" v-model="formData.description" rows=6 placeholder="Enter task`s description" required></b-form-textarea>
                                </b-form-group>
                                <b-form-group label="State:" label-for="state" class="mb-3 col-12" v-if="isEditing">
                                    <b-form-select class="form-control" v-model="formData.status" :options="statsAvailable"></b-form-select>
                                </b-form-group>
                                <b-col class="col-12">
                                    <b-button variant="primary" type="submit" class="px-4 mb-5">
                                        <b-icon :icon="isEditing?'pencil-square':'plus'" v-if="!saving"></b-icon>
                                        <b-spinner small v-else></b-spinner>
                                        <span v-text="isEditing?'Edit':'Add'"></span>
                                    </b-button>
                                    <b-button variant="outline-warning" type="button" class="px-4 mb-5" v-if="isEditing" @click="newTodo">
                                        <span>Cancel</span>
                                    </b-button>
                                </b-col>
                            </div>
                        </form>
                    </b-card-text>
                </b-card-body>
            </b-card>
            <b-card bg-variant="primary" border-variant="white" no-body style="border-radius: 2rem 2rem 0 0" v-if="!isEditing">
                <b-card-body class="p-0">
                    <b-card-title>
                        <h3 class="font-weight-bold my-4 px-5 text-light">Tasks</h3>
                    </b-card-title>
                    <b-card-text class="px-5 bg-info d-flex flex-column" style="min-height: 200px; border-radius: 2rem 2rem 0 0">
                        <h4 class="py-4 mb-0 text-center" v-if="!todos || !todos.length || todos.length<1" style="margin-top: 60px">
                            You have nothing to do.<br>
                            Go get some sleep.
                        </h4>
                        <b-card-group deck v-else class="py-5">
                            <b-row>
                                <b-col class="col-6 col-md-4 col-lg-3" v-for="(t, idx) in todos" :key="'todo-'+idx+''+t.id">
                                    <b-card>
                                        <b-card-title>{{ t.title }}</b-card-title>
                                        <b-card-text>
                                            <p class="text-justify">{{ t.description }}</p>
                                            <b-row>
                                                <b-col class="col-12 d-flex align-items-center">
                                                    <span class="btn btn-info cursor-normal">{{ t.status_text.title }}</span>
                                                    <b-button variant="outline" class="ml-auto p-0" @click="editTodo(t)">
                                                        <b-icon icon="pencil-square"></b-icon>
                                                    </b-button>
                                                </b-col>
                                            </b-row>
                                        </b-card-text>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-card-group>
                    </b-card-text>
                </b-card-body>
            </b-card>
        </b-overlay>
    </div>
</template>

<script>
export default {
    name: "TodoIndex",
    props: [],
    data() {
        return {
            listRoute: LaravelRoute('todos.list'),
            saveRoute: LaravelRoute('todos.save'),
            loading: false,
            saving: false,
            formData: {
                title: '',
                description: '',
                status: 1,
            },
            editingTodo: null,
            todos: [],
            states: [],
            isEditing: false,
        }
    },
    created() {
        this.getTodos()
    },
    computed: {
        statsAvailable() {
            let states = []
            if (this.editingTodo != null) {
                for (let i = 0; i < this.editingTodo.status_text.nextCanBe.length; i++) {
                    states.push({
                        value: this.editingTodo.status_text.nextCanBe[i],
                        text: this.states[this.editingTodo.status_text.nextCanBe[i]-1].title
                    })
                }
            }
            return states
        }
    },
    methods: {
        getTodos() {
            if (!this.loading) {
                this.loading = true
                axios.post(this.listRoute, {}).then(res => {
                    if (res && res.data) {
                        let temp = res.data.states
                        this.todos = res.data.result
                        this.states = Object.values(temp)
                    } else {
                        this.$helpers.notify('Unknown error while fetching!', {type: 'error'})
                    }
                }).catch(err => {
                    console.log('Error in catch')
                    console.error(err)
                }).then(res => {
                    this.loading = false
                })
            }
        },

        saveData() {
            if (!this.loading && !this.saving) {
                this.saving = true
                axios.post(this.saveRoute, this.formData).then(res => {
                    if (res && res.data) {
                        if (res.data.status) {
                            if (!this.isEditing) {
                                this.todos.unshift(res.data.result)
                            } else {
                                for (let i = 0; i < this.todos.length; i++) {
                                    if (this.todos[i].id == res.data.result.id) {
                                        this.todos[i] = res.data.result
                                        break
                                    }
                                }
                            }
                        } else {
                            this.$helpers.notify(res.data.message || 'Error while saving data!', {type: 'error'})
                        }
                    } else {
                        this.$helpers.notify('Unknown error while saving data!', {type: 'error'})
                    }
                }).catch(err => {
                    console.log('Error in catch')
                    console.error(err)
                }).then(res => {
                    this.newTodo()
                    this.saving = false
                })
            }
        },

        newTodo() {
            this.isEditing = false
            this.formData = {
                title: '',
                description: '',
                status: 1,
            }
            this.editingTodo= null
        },

        editTodo(t) {
            this.isEditing = true
            this.formData = t
            this.editingTodo = t
        },
    },
}
</script>

<style scoped>

</style>
