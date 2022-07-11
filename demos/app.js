const app = Vue.createApp({
    data() {
        return {
            name: '',
            email: '',
            country: '',
            city: '',
            job: '',
            contacts: []
        }
    },
    methods: {
        getContacts() {
            axios.get('api/contacts.php')
            .then(function (response) {
                console.log(response.data);
                app.contacts = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        createContact() {
            console.log("Create contact!")

            let formData = new FormData();
            console.log("name:", this.name)
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('city', this.city)
            formData.append('country', this.country)
            formData.append('job', this.job)

            var contact = {};
            formData.forEach(function(value, key){
                contact[key] = value;
            });

            axios({
                method: 'post',
                url: 'api/contacts.php',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data'} }
            })
            .then(function (response) {
                //handle success
                console.log(response)
                app.contacts.push(contact)
                app.resetForm();
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });
        },

        resetForm() {
            this.name = '';
            this.email = '';
            this.country = '';
            this.city = '';
            this.job = '';
        }
    },
    mounted() {
        console.log('Hello from Vue!')
        this.getContacts()
    }
})

app.mount('#app')