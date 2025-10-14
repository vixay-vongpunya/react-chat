import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { BsCalendarWeek } from "react-icons/bs";
import { createGlobalStyle } from "styled-components";
import { server } from "./../../../../Actions/Index";
import moment from "moment";
import styled from "styled-components";
import { useState, useRef } from "react";
import SummarizedModal from "../../../Custom/SummarizedModal";
import CustomDropdown from "../../../Custom/CustomDropdown";
import { VscKebabVertical } from "react-icons/vsc";
import { Dropdown, DropdownButton } from "react-bootstrap";
import useOutsideClick from "../../../../Hooks/useOutsideClick";

const languages = [
  { text: "English", value: "English" },
  { text: "Japanese", value: "Japanese" },
  { text: "Spanish", value: "Spanish" },
  { text: "Lao", value: "Lao" },
];

const GlobalStyle = createGlobalStyle`
  .daterangepicker{
    right:1rem !important;
  }
  .daterangepicker:before,
  .daterangepicker:after {
    display: none !important;
  }
`;

const CDropdownButton = styled(DropdownButton)`
  .btn-link {
    color: black;
    text-decoration: none;
  }
  .btn:focus {
    color: black;
  }
  .dropdown-toggle::after {
    display: none;
  }
  .dropdown-toggle {
    padding: 0px;
  }

  .dropdown-item:active,
  .dropdown-item:focus {
    color: black;
    background-color: transparent;
  }
`;

function ChatHeaderRight({ roomId, roomType }) {
  const [summarizedContent, setSummarizedContent] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const outsideClickRef = useRef(null);

  const handleSummarization = async (event, picker) => {
    let startDate = moment(picker.startDate).format("MM/DD/YYYY");
    let endDate = moment(picker.endDate).format("MM/DD/YYYY");
    try {
      setLoading(true);
      setShow(true);
      const response = await server.get(
        `./room/${roomType}/${roomId}/messages/summarize?lang=${selectedLang.value}&startDate=${startDate}&endDate=${endDate}`
      );
      setSummarizedContent(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleSelectedLanguage = (value) => {
    setSelectedLang(languages.find((lang) => lang.value === value));
    setDropdownOpen(true);
  };
  useOutsideClick(outsideClickRef, () => setDropdownOpen(false));

  return (
    <>
      <CDropdownButton
        variant="link"
        title={<VscKebabVertical />}
        show={dropdownOpen}
        onClick={() => setDropdownOpen(true)}
        ref={outsideClickRef}
      >
        <Dropdown.Item as="div">
          <div className="flex gap-10">
            <CustomDropdown
              options={languages}
              handleOption={handleSelectedLanguage}
              title={selectedLang.text}
            />
            <DateRangePicker
              initialSettings={{
                startDate: "10/10/2025",
                endDate: "10/15/2025",
                locale: {
                  applyLabel: "Summarize",
                },
              }}
              onApply={handleSummarization}
              onClick={() => setDropdownOpen(false)}
            >
              <button>
                <BsCalendarWeek size={32} />
              </button>
            </DateRangePicker>
          </div>
        </Dropdown.Item>
      </CDropdownButton>

      <GlobalStyle />

      <SummarizedModal
        body={summarizedContent}
        show={show}
        setShow={setShow}
        loading={loading}
      />
    </>
  );
}

export default ChatHeaderRight;
