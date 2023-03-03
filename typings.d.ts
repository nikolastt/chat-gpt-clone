interface Message {
  text: {
    message: {
      role: string;
      content: string;
    };
  };
  createdAt: admin.firestore.Timestamp;
  user: {
    _id: string;
    name: string;
    avatar: string;
    role: "assistant" | "user";
  };
}
