import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import { getConversationsUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import Profile from "./Profile";
import { useState } from "react";
import ConversationsSkeleton from "@components/skeletons/ConversationsSkeleton";

const Sidebar = ({ avatar, name, isLoading }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: userData,
    isError,
    isLoading: userIsLoading,
  } = useQuery(["users", searchKeyword], () =>
    getConversationsUser(userInfo.token, searchKeyword)
  );
  const searchKeywordHandler = (e) => {
    const { value } = e.target;
    setSearchKeyword(value);
  };

  return (
    <div className=" flex flex-col mx-auto w-full overflow-hidden  ">
      <Profile avatar={avatar} name={name} isLoading={isLoading} />
      <SearchInput
        searchKeywordHandler={searchKeywordHandler}
        searchKeyword={searchKeyword}
      />
      <div
        className={`flex flex-col gap-y-2 mx-5 rounded-lg overflow-y-auto py-5 h-[455px] px-5 bg-slate-400 shadow-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 `}
      >
        {userData ? (
          userData.map((user) => (
            <Conversations
              key={user._id}
              user={user}
              searchKeyword={searchKeyword}
              isError={isError}
              isLoading={userIsLoading}
            />
          ))
        ) : (
          <ConversationsSkeleton />
        )}
      </div>
      <Logout />
    </div>
  );
};

export default Sidebar;
