<script setup>
import NavBar from '../components/NavBar.vue';
import QuestionCard from '../components/QuestionCard.vue';
</script>

<script>
export default {
    name: 'ProfilePage',
    data() {
        return {
            isVisitor: Boolean
        }
    },
    mounted() {
        this.isVisitor = false
    }
}
</script>

<template>
    <div class="">
        <NavBar :user-logged-in="true" />
        <div class="background-img">
            <img src="https://img.freepik.com/free-photo/flat-lay-black-background-with-laptop-coffee-cup-calculator-top-view_169016-36166.jpg?w=1800&t=st=1688220986~exp=1688221586~hmac=501494180e2a9d0ee0781613fb1ccf1fe0e0286b7223bee126c8711fb384206d"
                alt="">
        </div>
        <div class="container mt-5">
            <div class="row">
                <div class="col-md-5">
                    <div class="d-flex flex-column profile-side align-items-center sticky-top">
                        <div class="user-img rounded-circle shadow-sm">
                            <img src="https://i.pinimg.com/originals/b5/6d/9e/b56d9ed31076329211d42bd8ff340914.jpg" alt="">
                        </div>
                        <h4 class="mt-2 m-0">Johan Giovanni</h4>
                        <p class="text-secondary m-0">tergantengdidunia@gmail.com</p>
                        <span class="form-text"><i class="bi bi-calendar-date"></i> 12 June 2023</span>
                        <div class="d-flex flex-column mt-3" v-if="!isVisitor">
                            <button class="btn btn-secondary rounded-pill px-4">
                                Edit Profile
                            </button>
                            <button class="btn btn-outline-danger rounded-pill px-4 mt-2">Change Password</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-5">
                    <div class="d-flex">
                        <h5>My Questions</h5>
                        <div class="ms-2">
                            <span class="badge rounded-pill text-bg-dark fw-light">50</span>
                        </div>
                    </div>
                    <div class="mt-3">
                        <div class="d-flex flex-column">
                           <QuestionCard />
                           <QuestionCard />
                           <QuestionCard />
                           <QuestionCard />
                           <QuestionCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
div.background-img {
    margin-top: 85px;
    width: 100vw;
    height: 150px;
    overflow: hidden;
}

div.background-img>img {
    width: 100vw;
    filter: grayscale(100%);
}

div.user-img {
    width: 150px;
    height: 150px;
    overflow: hidden;
}

div.user-img>img {
    width: 100%;
}

div.profile-side.sticky-top {
    top: 120px;
}
</style>