import multiguard from "vue-router-multiguard";
import store from "./../store";
import moment from "moment";
import { Notify } from "quasar";

// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
    let isLoggedIn = store().getters["Auth/isLoggedIn"];
    if (isLoggedIn) {
        next();
    } else {
        next("/login");
    }
};
// cek apakah user sudah bayar apa belum
const actived = function(to, from, next) {
    const monthDifference = moment(new Date()).diff(
        new Date(store().getters["Auth/auth"].user_activated_at),
        "months",
        true
    );
    if (
        store().getters["Auth/auth"] &&
        store().getters["Auth/auth"].user_activated_at != null
    ) {
        next();
    } else {
        next("/payment");
    }
};

const routes = [{
        path: '/',
        beforeEnter: multiguard([auth]),
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/Home.vue')
        }, {
            path: '/account',
            component: () =>
                import ('pages/Account.vue')
        }, {
            path: '/user/:userId/book',
            name: 'userbook',
            component: () =>
                import ('pages/user/BookPage.vue'),
            props: true
        },
        {
            path: '/user/searchBest/:category',
            name: 'usersearchbest',
            component: () =>
                import ('pages/user/SearchPageBestUser.vue'),
            props: true
        }, 
        {
            path: "/user/photolist/:userId/:postId",
            name: "userphotolist",
            component: () =>
                import ("pages/user/PhotoListPage.vue"),
            props: true
        },
        {
            path: "/post/comment/like/:commentId",
            name: "postcommentlike",
            component: () =>
                import ("pages/post/comment/LikePage.vue"),
            props: true
        },
        {
            path: "/post/like/:postId",
            name: "postlike",
            component: () =>
                import ("pages/post/LikePage.vue"),
            props: true
        }
    
    ],
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('pages/Login')
    },
    {
        path: "/account/edit",
        beforeEnter: multiguard([auth, actived]),
        name: "accountedit",
        component: () =>
            import ("pages/account/EditPage.vue")
    },
    {
        path: "/city/:name/:id",
        beforeEnter: multiguard([auth, actived]),
        name: "city",
        component: () =>
            import ("pages/CityPage.vue"),
        props: true
    },
    {
        path: "/user/profile/:userId",
        name: "userprofile",
        component: () =>
            import ("pages/user/ProfilePage.vue"),
        props: true
    },
    {
        path: "/user/search",
        beforeEnter: multiguard([auth, actived]),
        name: "usersearch",
        component: () =>
            import ("pages/user/SearchPage.vue")
    },
    {
        path: "/post/comment/:postId",
        beforeEnter: multiguard([auth, actived]),
        name: "postcomment",
        component: () =>
            import ("pages/post/CommentPage.vue"),
        props: true
    },
    {
        path: "/district/:name/:id",
        beforeEnter: multiguard([auth, actived]),
        name: "district",
        component: () =>
            import ("pages/DistrictPage.vue"),
        props: true
    },
    {
        path: "/districtuserlist/:districtId",
        name: "districtuserlist",
        beforeEnter: multiguard([auth, actived]),
        component: () =>
            import ("pages/user/DistrictUserListPage.vue"),
        props: true
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes