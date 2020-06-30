import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/global'
import theme from '../themes/default'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}