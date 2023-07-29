import { getAuth } from "firebase/auth";
import { FirebaseConfig } from "../configs/FirebaseConfig";
import { initializeApp } from "firebase/app";

/**
 * Autenticação com o Google
 * @since 27/07/2023 13:29:28
 * @author Leonardo Aragão
 */

// Inicializando Firebase
const app = initializeApp(FirebaseConfig);
export const AuthGoogle = getAuth(app);
