import "../styles/home.component.css"
import {useState} from "react";
import Header from "./Header.component.jsx";
import PostList from "../PostList.jsx";

export default function HomeComponent() {
  const [orderBy, setOrderBy] = useState("newest");

  const onOrderChangedListener = (order) => {
    setOrderBy(order)
  }

  return (
    <section>
      <Header sorting={orderBy} onOrderChangedListener={onOrderChangedListener} />
      <PostList sortURL={"https://apt-api.blbt.app/v1/apartment?page=0&size=10&order=" + orderBy} />
    </section>
  )
}