# User Stories:
1. User should be able to log in or register.
2. Create a new flashcard deck with a title. 
3. Add, edit, and delete cards to the deck.
4. Practice the terms in Study mode and mark each card as either known or unknown. 
5. Practice only with the known cards or the unknown cards
6. View other people’s public decks and practice with them, but cannot edit them.


Set up backend:
cd back-end
npm install
Create a .env file in backend folder and have:
  DATABASE_URL:"postgresql://yourUsername:yourPassword@localhost:5432/studyWebsite"
  JWT_SECRET: run the following command-> 
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
npx prisma migrate dev
npx prisma generate
npm run dev
  
Set up front-end:
cd front-end
npm install
npm run dev

