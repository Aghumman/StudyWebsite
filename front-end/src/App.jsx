import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  CardDetailPage,
  DecksPage,
  RegisterPage,
  PublicDecksPage,
} from "./pages";
import { MainLayout } from "./layouts";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />}></Route>
        <Route path="public" element={<PublicDecksPage />}></Route>
        <Route path="decks">
          <Route index element={<DecksPage />} />
          <Route path=":deckId" element={<CardDetailPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
