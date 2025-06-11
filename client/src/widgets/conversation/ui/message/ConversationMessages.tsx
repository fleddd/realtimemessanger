import {
  useConversationStore,
  useCurrentChatMessagesContext,
} from "@/entities/message/model";
import { useUserStore } from "@/entities/user/model";
import { formatDateForConversation } from "@/shared/lib/date";
import { ComponentWithFade } from "@/shared/ui/wrappers";
import { Empty } from "antd";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { isThisMessageFirst } from "../../lib";
import SentMessage from "./SentMessage";

const ConversationMessages = () => {
  const { mySocket } = useUserStore();
  const { newSeenMessagesId } = useConversationStore();
  const data = useCurrentChatMessagesContext();
  const messages = data!.messages;

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = scrollRef.current!;
    if (messages.length >= 0)
      container?.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);

  if (messages.length <= 0)
    return (
      <ComponentWithFade className="grow w-full flex flex-col justify-center items-center">
        <Empty description={"No messages here..."} className="" />
      </ComponentWithFade>
    );

  useEffect(() => {
    console.log(newSeenMessagesId);

    mySocket?.emit("seenMessage", newSeenMessagesId);
  }, [newSeenMessagesId]);

  return (
    <motion.div
      ref={scrollRef}
      className="grow flex flex-col-reverse gap-5 h-[calc(100dvh-190px)] overflow-y-scroll overflow-x-hidden"
    >
      {messages?.map((message, index, arr) => {
        const isFirst = isThisMessageFirst(message.createdAt, index, arr);
        const conversationDate = formatDateForConversation(message.createdAt);
        return (
          <div
            key={message.createdAt + message.text}
            className="w-full flex flex-col items-center"
          >
            {isFirst && (
              <div className="w-max px-2 py-1 rounded-xl bg-gray-50 self-center">
                {conversationDate}
              </div>
            )}
            <SentMessage {...message} />
          </div>
        );
      })}
    </motion.div>
  );
};
export default ConversationMessages;
