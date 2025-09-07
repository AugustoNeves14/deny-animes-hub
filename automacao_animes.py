# ==============================================================================
#
#       SCRIPT DE AUTOMAÇÃO DE POSTAGEM - DenyAnimeHub
#       Versão: Modo Sábio dos Seis Caminhos 2.0 (Alvo: AnimesOnline.cc)
#       Descrição: Focado em extrair dados de forma robusta do 'animesonline.cc',
#                  um alvo mais receptivo. Usa 'undetected-chromedriver' e
#                  'selenium-stealth' para máxima evasão.
#
# ==============================================================================

import time
import requests
import json
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium_stealth import stealth

# --- CONFIGURAÇÕES DA AUTOMAÇÃO ---
# [!!! EDITE ESTA SEÇÃO COM OS SEUS DADOS !!!]
URL_DA_SUA_API = "http://localhost:3000/api/automacao/postar-anime-completo"
CHAVE_SECRETA_DA_API = "minhasenhamuitosegura"

# [!!! NOVO ALVO DEFINITIVO !!!]
# COLE AQUI O LINK EXATO DA PÁGINA DO ANIME DO 'animesonline.cc'
# Exemplo: "https://animesonline.cc/anime/naruto-shippuden-legendado/"
URL_DO_ANIME_ALVO = "https://smartanimes.com/anime/jujutsu-kaisen"
# --- FIM DAS CONFIGURAÇÕES ---


def configurar_driver():
    """
    Função completa que configura o WebDriver com camuflagem Stealth.
    Nenhuma linha omitida.
    """
    print("Configurando o WebDriver do Chrome (modo Stealth ativado)...")
    try:
        options = uc.ChromeOptions()
        options.add_argument('--window-size=1280,720')
        options.add_argument("--disable-blink-features=AutomationControlled")
        driver = uc.Chrome(options=options, use_subprocess=True)
        stealth(driver, languages=["pt-BR", "pt"], vendor="Google Inc.", platform="Win32",
                webgl_vendor="Intel Inc.", renderer="Intel Iris OpenGL Engine", fix_hairline=True)
        print("WebDriver configurado com sucesso em modo Stealth.")
        return driver
    except Exception as e:
        print(f"\nERRO CRÍTICO AO CONFIGURAR O WEBDRIVER: {e}\n")
        return None

def extrair_dados_do_anime(driver, url_anime):
    """
    Função completa para extrair os dados de um anime específico do animesonline.cc.
    Nenhuma linha omitida.
    """
    print(f"\nIniciando extração do alvo: {url_anime}")
    driver.get(url_anime)
    wait = WebDriverWait(driver, 20)
    
    try:
        print("Aguardando carregamento da página do anime...")
        wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "div.conteudo h1")))
        print("[SUCESSO] Página do anime carregada.")
        
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        titulo = soup.select_one("div.conteudo h1").text.strip()
        sinopse = soup.select_one("div.sinopse").text.strip()
        imagem_capa = soup.select_one(".capa_anime img")['src']
        
        ano_lancamento_element = soup.find("strong", string="Ano:")
        ano_lancamento = int(ano_lancamento_element.next_sibling.strip()) if ano_lancamento_element else 2024
        
        generos_elements = soup.select("div.info a[rel='tag']")
        generos = [g.text.strip() for g in generos_elements]

        print(f"    - Título encontrado: {titulo}")
        print(f"    - Gêneros: {', '.join(generos)}")

        print(f"    Buscando episódios...")
        episodios = []
        elementos_episodio = soup.select("#seasons .se-c .episodiotitem a")

        # Abre cada página de episódio para encontrar o link do vídeo
        for elem in elementos_episodio:
            numero_ep_texto = elem.select_one(".numerando").text.strip().replace("-", "").strip()
            if numero_ep_texto.isdigit():
                numero_ep = int(numero_ep_texto)
                link_pagina_ep = elem['href']
                
                # Abre a página do episódio em uma nova aba
                driver.execute_script("window.open(arguments[0], '_blank');", link_pagina_ep)
                driver.switch_to.window(driver.window_handles[1])
                
                link_video_encontrado = None
                try:
                    # Espera a lista de players carregar
                    wait_ep = WebDriverWait(driver, 10)
                    wait_ep.until(EC.presence_of_element_located((By.CSS_SELECTOR, "#playeroptions ul li")))
                    
                    # Clica em cada aba de player e tenta extrair o iframe
                    abas_player = driver.find_elements(By.CSS_SELECTOR, "#playeroptions ul li")
                    for i in range(len(abas_player)):
                        try:
                            # Re-seleciona o botão a cada iteração para evitar StaleElementReferenceException
                            driver.find_elements(By.CSS_SELECTOR, "#playeroptions ul li")[i].click()
                            time.sleep(1) # Espera o iframe carregar
                            
                            iframe = driver.find_element(By.CSS_SELECTOR, "#player_conteudo iframe")
                            link_video = iframe.get_attribute('src')
                            
                            if link_video and "http" in link_video:
                                link_video_encontrado = link_video
                                print(f"      - Episódio {numero_ep}: Player encontrado.")
                                break # Sai do loop de players se encontrou um link válido
                        except:
                            continue # Tenta o próximo player
                            
                    if link_video_encontrado:
                        episodio_data = {
                            "numero": numero_ep, "titulo": f"Episódio {numero_ep}",
                            "urlVideo": link_video_encontrado, "tipoVideo": "iframe", "temporada": 1,
                        }
                        episodios.append(episodio_data)
                    else:
                        print(f"      - AVISO: Nenhum player funcional encontrado para o episódio {numero_ep}.")

                except TimeoutException:
                    print(f"      - AVISO: Abas de player não encontradas para o episódio {numero_ep}.")
                finally:
                    # Fecha a aba do episódio e volta para a principal
                    driver.close()
                    driver.switch_to.window(driver.window_handles[0])
        
        if not episodios:
            print(f"    AVISO: Nenhum episódio com player válido foi encontrado para '{titulo}'.")
            return None
        
        print(f"    - Extração concluída. Encontrados {len(episodios)} episódios funcionais.")

        return {
            "titulo": titulo, "sinopse": sinopse, "imagemCapa": imagem_capa,
            "generos": generos, "anoLancamento": ano_lancamento,
            "episodios": sorted(episodios, key=lambda ep: ep['numero'])
        }

    except Exception as e:
        print(f"  ERRO CRÍTICO ao extrair dados de {url_anime}. Verifique o link ou a estrutura do site. Erro: {e}")
        return None

def postar_anime_na_api(anime_data):
    """
    Função completa para enviar os dados do anime para a API do seu site.
    Nenhuma linha omitida.
    """
    if not anime_data: return

    headers = {"Content-Type": "application/json", "x-api-key": CHAVE_SECRETA_DA_API}
    print(f"\n>>> Enviando '{anime_data['titulo']}' para a sua API...")
    
    try:
        response = requests.post(URL_DA_SUA_API, headers=headers, data=json.dumps(anime_data), timeout=45)
        if response.status_code == 201:
            print(f"  [SUCESSO] Anime '{anime_data['titulo']}' e seus {len(anime_data['episodios'])} episódios foram postados!")
        elif response.status_code == 409:
            print(f"  [INFO] Anime '{anime_data['titulo']}' já existe no banco de dados. Nenhuma ação foi tomada.")
        else:
            print(f"  [FALHA] A API retornou um erro. Status: {response.status_code}\n  [RESPOSTA]: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"  [ERRO DE CONEXÃO] Falha ao conectar à sua API: {e}")

def main():
    """
    Função principal que orquestra a operação de alvo único.
    Nenhuma linha omitida.
    """
    print("="*50)
    print("INICIANDO SCRIPT DE AUTOMAÇÃO DENYANIMEHUB")
    print("MODO DE OPERAÇÃO: ALVO ÚNICO (animesonline.cc)")
    print("="*50)

    if "COLE O LINK DO ANIME AQUI" in URL_DO_ANIME_ALVO:
        print("ERRO DE CONFIGURAÇÃO: Por favor, edite a variável 'URL_DO_ANIME_ALVO' no script com o link do anime que deseja postar.")
        return
    
    driver = configurar_driver()
    if not driver: return

    try:
        dados_completos_anime = extrair_dados_do_anime(driver, URL_DO_ANIME_ALVO)
        if dados_completos_anime:
            postar_anime_na_api(dados_completos_anime)
        else:
            print("Não foi possível extrair os dados do anime alvo. A operação foi cancelada.")

    except Exception as e:
        print(f"\nOcorreu um erro fatal e inesperado durante a execução: {e}")
    finally:
        print("\nOperação de alvo único concluída. Fechando o navegador.")
        driver.quit()

if __name__ == "__main__":
    main()