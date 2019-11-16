import { Injectable } from '@angular/core'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'

interface user {
  username: string,
  uid: string
}

@Injectable()
export class UserService {
  private user: user

  constructor(private afAuth: AngularFireAuth) {

  }

  setUser(user: user) {
    this.user = user
  }

  async getUsername() {
    const user = await this.afAuth.authState.pipe(first()).toPromise()
    return user.email
  }

  reAuth(username: string, password: string) {
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username, password))
  }

  updatePassword(newpassword: string) {
    return this.afAuth.auth.currentUser.updatePassword(newpassword)
  }

  updateEmail(newemail: string) {
    return this.afAuth.auth.currentUser.updateEmail(newemail)
  }
  

  async isAuthenticated() {
    if (this.user) return true

    const user = await this.afAuth.authState.pipe(first()).toPromise()

    if (user) {
      this.setUser({
        username: user.email,
        uid: user.uid
      })

      return true
    }
    return false
  }

  getUID(): string {
    return this.user.uid
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}