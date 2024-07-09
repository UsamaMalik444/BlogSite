import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  Client = new Client();
  Account;

  constructor() {
    this.Client.setEndpoint(config.appwriteUrl).setProject(config.projectId);
    this.Account = new Account(this.Client);
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.Account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.Login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async Login({ email, password }) {
    try {
      return await this.Account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return this.Account.get();
    } catch (error) {
      console.log("Appwrite get user error : " + error);
    }
    return null;
  }

  async Logout() {
    try {
      return this.Account.deleteSessions();
    } catch (error) {
      console.log("Appwrite Logout Error " + error);
    }
  }
}

export const authService = new AuthService();

export default authService;
