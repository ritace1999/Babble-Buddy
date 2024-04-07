import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import { getConversationsUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import Profile from "./Profile";
import { useState } from "react";

const Sidebar = ({ avatar, name, isLoading }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const { userInfo } = useSelector((state) => state.user);
  const {
    data: userData,
    isError,
    refetch,
    isLoading: userIsLoading,
  } = useQuery({
    queryFn: () => getConversationsUser(userInfo.token, searchKeyword),
    queryKey: ["users", searchKeyword],
  });
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
      <Conversations
        userData={userData}
        searchKeyword={searchKeyword}
        isError={isError}
        isLoading={userIsLoading}
        refetch={refetch}
      />
      <Logout />
    </div>
  );
};

export default Sidebar;
