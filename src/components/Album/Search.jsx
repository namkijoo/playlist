import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { useState } from "react";
import YouTube from "react-youtube";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchMusic = () => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: searchTerm,
          type: "video",
          maxResults: 10,
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      })
      .then((response) => {
        setSearchResults(response.data.items);
        console.log(response.data.items);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  };

  const onChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const addToYouTubePlaylist = (videoId) => {
    console.log(videoId);
    alert(videoId);
    const requestBody = {
      snippet: {
        playlistId: "PLgfxU3idNsAsIiEfqmcXLhis1vHGu5bTB",
        resourceId: {
          kind: "youtube#video",
          videoId: videoId,
        },
      },
    };

    axios
      .post(
        "https://www.googleapis.com/youtube/v3/playlistItems",
        requestBody,
        {
          params: {
            part: "snippet",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        alert("추가에 성공했습니다");
        console.log("Video added to playlist:", response.data);
      })
      .catch((error) => {
        console.error("Error adding video to playlist:", error);
      });
  };
  return (
    <Container>
      <SearchWrapper>
        <Box1
          placeholder="search"
          value={searchTerm}
          onChange={onChangeSearch}
        />
        <Box2 onClick={searchMusic}>
          <IoSearchSharp />
        </Box2>
      </SearchWrapper>
      <YoutubeWrapper>
        {searchResults &&
          searchResults.map((item, key) => (
            <YoutubePlayer key={key}>
              <YouTube
                videoId={item.id.videoId}
                opts={{
                  width: "100%",
                  height: "200px",
                  playerVars: { autoplay: 0 },
                }}
              />
              <PlusBtn>
                <div>{item.snippet.title}</div>
                <CiCirclePlus
                  onClick={() => addToYouTubePlaylist(item.id.videoId)}
                />
              </PlusBtn>
            </YoutubePlayer>
          ))}
      </YoutubeWrapper>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SearchWrapper = styled.div`
  width: 300px;
  display: flex;
  margin-bottom: 20px;
`;

const Box1 = styled.input`
  width: 250px;
  height: 40px;
  border: 1px solid whitesmoke;
  border-left: 5px solid lightskyblue;
`;

const Box2 = styled.div`
  width: 50px;
  height: 40px;
  background-color: lightskyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: white;
  cursor: pointer;
`;

const YoutubeWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const YoutubePlayer = styled.div`
  width: 300px;
`;

const PlusBtn = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 300px;
  font-size: 30px;
  color: #838181;
  > div {
    max-width: 260px;
    font-size: 10px;
    margin-right: 10px;
  }
`;
export default Search;
