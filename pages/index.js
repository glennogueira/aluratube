import React from 'react'
import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import { videoService } from '../src/services/videoService'

function HomePage() {
  const service = videoService()
  const [valorDoFiltro, setValorDoFiltro] = React.useState('')
  const [playlists, setPlaylists] = React.useState({})

  React.useEffect(() => {
    console.log('useEffect')
    service.getAllVideos().then(dados => {
      console.log(dados.data)
      const novasPlaylists = { ...playlists }
      dados.data.forEach(video => {
        if (!novasPlaylists[video.playlist]) {
          novasPlaylists[video.playlist] = []
        }
        novasPlaylists[video.playlist].push(video)
      })
      setPlaylists(novasPlaylists)
    })
  }, [])

  console.log('Playlists Pronto', playlists)

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1
          // backgroundColor: "red",
        }}
      >
        {/* Prop Drilling */}
        <Menu
          valorDoFiltro={valorDoFiltro}
          setValorDoFiltro={setValorDoFiltro}
        />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
        Conteúdo
      </div>
    </>
  )
}

export default HomePage

// function Menu() {
//   return <div>Menu</div>
// }

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    /* margin-top: 50px; */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
const StyledBanner = styled.div`
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
  background-size: cover;
  background-position: 0% 34%;
  height: 230px;
`
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      {/* <img src="banner" /> */}
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...propriedades }) {
  const playlistNames = Object.keys(propriedades.playlists)

  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = propriedades.playlists[playlistName]
        // console.log(playlistName)
        // console.log(videos)
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter(video => {
                  const titleNormalized = video.title.toLowerCase()
                  const searchValueNormalized = searchValue.toLowerCase()
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map(video => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}
