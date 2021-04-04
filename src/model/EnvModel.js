export class EnvModel {

    constructor() {
        this.isLoggedIn = false;
        this.userDetail = {
            userName: "User Name",
            email: "user@email.com",
            userId: "ia321987913sda1234"
        }
    }

    loginUser() {
        this.isLoggedIn = true;
    }

    logoutUser() {
        this.isLoggedIn = false;
    }

    getUserDetail() {
        return (
            this.isLoggedIn ? this.userDetail : null
        )
    }

    updateUserDetail(inp_userName, inp_email, inp_userId) {
        this.userDetail = {
            userName: inp_userName,
            email: inp_email,
            userId: inp_userId
        }
    }

}