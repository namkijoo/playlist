import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import useApiRequest from "../../api/useApiRequest";
import Playlists from "./Playlists";

function Playlist() {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [player, setPlayer] = useState(null);
  const { apiRequest } = useApiRequest();

  const playNextAudio = () => {
    setCurrentAudioIndex((prevIndex) =>
      prevIndex < playlistItems.length - 1 ? prevIndex + 1 : 0
    );
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    // Optional: Play video if user has already interacted with the page
    if (player) {
      event.target.playVideo();
    }
  };

  const onPlayerEnd = () => {
    playNextAudio();
    if (player) {
      setTimeout(() => {
        player.playVideo();
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchPlaylistItems = async () => {
      try {
        const data = await apiRequest({
          method: "GET",
          url: "https://www.googleapis.com/youtube/v3/playlistItems",
          params: {
            part: "snippet",
            playlistId: "PLgfxU3idNsAsIiEfqmcXLhis1vHGu5bTB",
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
          },
        });
        setPlaylistItems(data.items);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchPlaylistItems();
  }, [apiRequest]);

  useEffect(() => {
    if (player) {
      player.addEventListener("onStateChange", (event) => {
        if (event.data === 0) {
          playNextAudio();
          setTimeout(() => {
            player.playVideo();
          }, 3000);
        }
      });
    }
  }, [player, playlistItems]);

  return (
    <Container>
      {playlistItems.length > 0 && (
        <>
          <YouTubeWrapper>
            <YouTube
              videoId={
                playlistItems[currentAudioIndex].snippet.resourceId.videoId
              }
              opts={{
                width: "100%",
                height: "200px",
                playerVars: { autoplay: 1 },
              }}
              onReady={onPlayerReady}
              onEnd={onPlayerEnd}
            />
          </YouTubeWrapper>
          <p>{playlistItems[currentAudioIndex]?.snippet.title}</p>
          {playlistItems.map((item, index) => (
            <Playlists
              onClick={() => setCurrentAudioIndex(index)}
              imgSrc={item.snippet.thumbnails.default.url}
              key={index}
              title={item.snippet.title}
            />
          ))}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  > p {
    color: aliceblue;
    font-weight: bold;
    font-size: 15px;
    padding: 10px;
  }
`;

const YouTubeWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 20px;
`;

export default Playlist;
