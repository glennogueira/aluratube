import React from 'react'
import { StyledRegisterVideo } from './styles'
import { createClient } from '@supabase/supabase-js'

// Custom Hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues)
  return {
    values,
    handleChange: evento => {
      const value = evento.target.value
      const name = evento.target.name
      setValues({
        ...values,
        [name]: value
      })
    },
    clearForm() {
      setValues({})
    }
  }
}

const PROJECT_URL = 'https://fjytvublrsjhoxwifmyy.supabase.co'
const PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqeXR2dWJscnNqaG94d2lmbXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjY0NjYsImV4cCI6MTk4Mzc0MjQ2Nn0.8qhUePBBRG07NRL-lj04u-79EcJhmgGAgmboH09F50U'
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
  const formCadastro = useForm({ initialValues: { titulo: '', url: '' } })
  const [formVisivel, setFormVisivel] = React.useState(false)

  console.log()

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {formVisivel ? (
        <form
          onSubmit={evento => {
            evento.preventDefault()
            console.log(formCadastro.values)

            // Contrato entre o Front e o BackEnd
            supabase
              .from('video')
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: 'jogos'
              })
              .then(oqueveio => {
                console.log(oqueveio)
              })
              .catch(err => {
                console.log(err)
              })

            setFormVisivel(false)
            formCadastro.clearForm()
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <input
              placeholder="Título do vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              placeholder="URL"
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <button type="submit">Cadastrar </button>
          </div>
        </form>
      ) : (
        false
      )}
    </StyledRegisterVideo>
  )
}
