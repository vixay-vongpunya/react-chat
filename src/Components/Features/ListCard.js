import { useRef, useEffect, useState } from "react";
import { VscKebabVertical } from "react-icons/vsc";
import { styled } from "styled-components";
import CustomDropdown from "../Custom/CustomDropdown";
import ChatImage from "../Common/ChatImage";
import FormatDate from "../../Utils/FormatDate";
import DownloadFile from "../../Utils/DownloadFile";
import SlicedFilename from "./../../Utils/SlicedFilename";

const Container = styled.div`
  padding: 0px 5px;
  p {
    margin: 0px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  height: 20%;
  cursor: pointer;
  padding: 5px 10px;
  margin-bottom: 2px;
  align-items: center;
  gap: 8px;
  .date {
    font-size: var(--tiny-font);
  }
  .profile-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

function ListCard({ options, handleOption, data }) {
  const date = FormatDate(data.created_at);
  return (
    <Container>
      <Wrapper key={data.id}>
        <ChatImage src="" size="--small-image" />
        <div className="profile-box">
          <p>{SlicedFilename(data.content)}</p>
          <p className="date">{date}</p>
        </div>
        <div className="flex-1 flex justify-end items-center">
          <CustomDropdown
            item={data}
            options={options}
            handleOption={() => DownloadFile(data)}
            title={<VscKebabVertical />}
          />
        </div>
      </Wrapper>
    </Container>
  );
}
export default ListCard;
