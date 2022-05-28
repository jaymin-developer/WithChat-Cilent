import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import * as S from "./chattingRoom.Styles";
import axios from "axios";

export default function ChattingRoomList() {
  const [currentTab, setCurrentTab] = useState(0);
  const [chattingList, setChattingList] = useState<any>([]);

  useEffect(() => {
    const fetchMyChattingRooms = () => {
      axios
        .get("https://backend.withchat.site/chatting-room", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setChattingList(res.data.result);
          if (res.status === 201) console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchMyChattingRooms();
  }, []);

  const onClickSelectTab = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <>
      <S.ChattingRoomWrapper>
        <S.ChattingRoomDmList src="/LOGO_WC.png" alt="DM 리스트" title="DM" />
        <S.ChattingRoomLine />
        <S.FindChattingRoom
          menuIndex={-1}
          currentTab={chattingList.length}
          title="채팅방 추가"
          onClick={() => onClickSelectTab(chattingList.length)}
        >
          <AddIcon fontSize="large" />
        </S.FindChattingRoom>

        <S.AddChattingRoom
          menuIndex={-1}
          currentTab={chattingList.length + 1}
          title="채팅방 찾기"
          onClick={() => onClickSelectTab(chattingList.length + 1)}
        >
          <SearchIcon fontSize="large" />
        </S.AddChattingRoom>
        <S.ChattingRoomLine />
        <S.ChattingRoomBox>
          {chattingList.map((el: any, index: number) => (
            <S.CurrentChattingRoom
              className="transitionTap"
              menuIndex={index}
              key={el.id}
              title={el.name}
              currentTab={currentTab}
              onClick={() => onClickSelectTab(index)}
            >
              <div>{el.name}</div>
            </S.CurrentChattingRoom>
          ))}
        </S.ChattingRoomBox>
      </S.ChattingRoomWrapper>
    </>
  );
}
