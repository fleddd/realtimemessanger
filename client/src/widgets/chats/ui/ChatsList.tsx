import { useChatsContext } from "@/entities/message/model";
import { useUserStore } from "@/entities/user/model";
import { ComponentWithFade } from "@/shared/ui/wrappers/";
import { Empty } from "antd";
import { useNavigate } from "react-router";
import { useChatsStore } from "../lib/useChatsStore";
import Chat from "./Chat";

const ChatsList = () => {
  const navigate = useNavigate();
  const { search, setSearch, setPage } = useUserStore();
  const chats = useChatsContext();
  const { isSelectingMode } = useChatsStore();

  const onChatClick = (id: string) => {
    navigate("/home/" + id);
    setSearch("");
    setPage(1);
  };

  if (chats?.users?.length == 0) {
    return (
      <ComponentWithFade className="w-full grow flex flex-col items-center justify-center sm:text-2xl text-center">
        <Empty description={"Start Conversation By Searching People"} />
      </ComponentWithFade>
    );
  }
  const isSearched = search.length > 0;

  return (
    <ComponentWithFade className="w-full ">
      <div
        className={`${
          isSelectingMode ? "h-[calc(100dvh-140px)]" : "h-[calc(100dvh-100px)]"
        } overflow-auto flex flex-col gap-2 sm:p-3`}
      >
        {chats?.users?.map((item) => {
          return (
            <Chat
              key={item.createdAt}
              chat={item}
              isSearched={isSearched}
              onClick={() => onChatClick(item._id)}
            />
          );
        })}
      </div>
    </ComponentWithFade>
  );
};

export default ChatsList;
