# ==============================================================================
#
#       SCRIPT DE AUTOMAÇÃO DE POSTAGEM - DenyAnimeHub
#       Versão: Modo SmartAnimes 1.0 (Otimizado para smartanimes.com)
#       Descrição: Extração específica para a estrutura do smartanimes.com
#
# ==============================================================================

import time
import random
import requests
import json
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium_stealth import stealth
import re
from urllib.parse import urljoin

# --- CONFIGURAÇÕES DA AUTOMAÇÃO ---
URL_DA_SUA_API = "http://localhost:3000/api/automacao/postar-anime-completo"
CHAVE_SECRETA_DA_API = "minhasenhamuitosegura"

# URL DO ANIME ALVO NO SMARTANIMES
URL_DO_ANIME_ALVO = "https://smartanimes.com/anime/kimetsu-no-yaiba"

# --- CONFIGURAÇÕES DE COMPORTAMENTO HUMANO ---
DELAY_MIN = 2  # segundos
DELAY_MAX = 5  # segundos

def delay_aleatorio():
    """Pausa aleatória para simular comportamento humano"""
    time.sleep(random.uniform(DELAY_MIN, DELAY_MAX))

def scroll_aleatorio(driver):
    """Scroll aleatório para simular comportamento humano"""
    try:
        scroll_height = driver.execute_script("return document.body.scrollHeight")
        scroll_pos = random.randint(300, min(800, scroll_height))
        driver.execute_script(f"window.scrollTo(0, {scroll_pos});")
        time.sleep(random.uniform(1, 2))
    except:
        pass

def configurar_driver():
    """
    Configura o WebDriver com comportamento mais humano
    """
    print("🔄 Configurando navegador com modo stealth...")
    
    try:
        options = uc.ChromeOptions()
        
        # Configurações para parecer mais humano
        options.add_argument('--window-size=1280,720')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-gpu')
        options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        # Preferências para evitar detecção
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        
        driver = uc.Chrome(options=options)
        
        # Configuração stealth
        stealth(driver,
                languages=["pt-BR", "pt"],
                vendor="Google Inc.",
                platform="Win32",
                webgl_vendor="Intel Inc.",
                renderer="Intel Iris OpenGL Engine",
                fix_hairline=True)
        
        # Remover webdriver property
        driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        
        print("✅ Navegador configurado com sucesso")
        return driver
        
    except Exception as e:
        print(f"❌ ERRO CRÍTICO AO CONFIGURAR O WEBDRIVER: {e}")
        return None

def extrair_dados_smartanimes(driver, url_anime):
    """
    Função específica para extrair dados do smartanimes.com
    """
    print(f"\n🎯 Iniciando extração do anime: {url_anime}")
    
    try:
        # Navegação com delay humano
        print("🌐 Navegando para a página do anime...")
        driver.get(url_anime)
        delay_aleatorio()
        scroll_aleatorio(driver)
        
        # Aguarda carregamento
        wait = WebDriverWait(driver, 25)
        print("⏳ Aguardando carregamento da página...")
        
        # Espera por elementos críticos
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        
        # Extração com BeautifulSoup
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        
        # TÍTULO
        titulo = ""
        titulo_selectors = [
            "h1.title",
            "h1",
            ".anime-title",
            "header h1",
            "h1.entry-title"
        ]
        
        for selector in titulo_selectors:
            titulo_element = soup.select_one(selector)
            if titulo_element and titulo_element.text.strip():
                titulo = titulo_element.text.strip()
                break
        
        if not titulo:
            print("❌ Não foi possível encontrar o título")
            return None
            
        print(f"✅ Título encontrado: {titulo}")
        
        # SINOPSE
        sinopse = ""
        sinopse_selectors = [
            ".description",
            ".sinopse",
            ".summary",
            ".anime-synopsis",
            ".entry-content"
        ]
        
        for selector in sinopse_selectors:
            sinopse_element = soup.select_one(selector)
            if sinopse_element:
                sinopse = sinopse_element.get_text(strip=True)
                if sinopse:
                    break
        
        if not sinopse:
            sinopse = f"Kimetsu no Yaiba conta a história de Tanjiro, um jovem que se torna um caçador de demônios para curar sua irmã Nezuko, que foi transformada em um demônio."
            print("⚠️ Usando sinopse padrão")
        
        # IMAGEM DA CAPA
        imagem_capa = ""
        capa_selectors = [
            ".poster img",
            ".anime-poster img",
            ".thumbnail img",
            "img[src*='poster']",
            ".cover img"
        ]
        
        for selector in capa_selectors:
            capa_element = soup.select_one(selector)
            if capa_element and capa_element.get('src'):
                imagem_capa = capa_element['src']
                if imagem_capa.startswith('//'):
                    imagem_capa = 'https:' + imagem_capa
                elif imagem_capa.startswith('/'):
                    imagem_capa = urljoin(url_anime, imagem_capa)
                break
        
        if not imagem_capa:
            print("⚠️ Não foi possível extrair imagem da capa")
        
        # ANO DE LANÇAMENTO
        ano_lancamento = 2019  # Ano real de Kimetsu no Yaiba
        try:
            # Procura por padrões de ano no texto
            year_pattern = r'20\d{2}'
            all_text = soup.get_text()
            years = re.findall(year_pattern, all_text)
            if years:
                ano_lancamento = int(years[0])
        except:
            pass
        
        print(f"📅 Ano detectado: {ano_lancamento}")
        
        # GÊNEROS
        generos = []
        generos_selectors = [
            ".genres a",
            ".tags a",
            ".categories a",
            "[href*='genre']",
            ".anime-genres a"
        ]
        
        for selector in generos_selectors:
            generos_elements = soup.select(selector)
            if generos_elements:
                generos = [g.text.strip() for g in generos_elements if g.text.strip()]
                if generos:
                    break
        
        if not generos:
            generos = ["Ação", "Aventura", "Sobrenatural"]
            print("⚠️ Usando gêneros padrão")
        
        print(f"📊 Gêneros: {', '.join(generos)}")

        # EXTRAÇÃO DE EPISÓDIOS
        print("🔍 Buscando episódios...")
        episodios = []
        
        # Primeiro, vamos encontrar os links dos episódios
        episodio_links = []
        episodio_selectors = [
            ".episode-list a",
            ".episodes a",
            ".episode-item a",
            "[href*='episode']",
            ".list-episodes a"
        ]
        
        for selector in episodio_selectors:
            elementos = soup.select(selector)
            if elementos:
                for elem in elementos:
                    href = elem.get('href', '')
                    if href and 'episode' in href.lower():
                        if not href.startswith('http'):
                            href = urljoin(url_anime, href)
                        episodio_links.append(href)
        
        print(f"📺 Encontrados {len(episodio_links)} links de episódio")
        
        # Processa os episódios (limitado para teste)
        for i, ep_link in enumerate(episodio_links[:5]):  # Apenas 5 episódios para teste
            try:
                print(f"   📹 Processando episódio {i+1}...")
                
                # Abre nova aba para o episódio
                driver.execute_script("window.open('');")
                driver.switch_to.window(driver.window_handles[1])
                driver.get(ep_link)
                
                delay_aleatorio()
                scroll_aleatorio(driver)
                
                # Aguarda o player carregar
                time.sleep(3)
                
                link_video = None
                
                # Procura por iframes de vídeo
                iframes = driver.find_elements(By.TAG_NAME, "iframe")
                for iframe in iframes:
                    try:
                        src = iframe.get_attribute('src')
                        if src and any(domain in src for domain in ['youtube', 'vimeo', 'dailymotion', 'mp4', 'm3u8', 'stream']):
                            link_video = src
                            print(f"      ✅ Player encontrado: {src[:50]}...")
                            break
                    except:
                        continue
                
                # Se não encontrou iframe, procura por players nativos
                if not link_video:
                    try:
                        video_elements = driver.find_elements(By.TAG_NAME, "video")
                        for video in video_elements:
                            src = video.get_attribute('src')
                            if src:
                                link_video = src
                                break
                    except:
                        pass
                
                # Fecha aba do episódio
                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                
                if link_video:
                    episodio_data = {
                        "numero": i + 1,
                        "titulo": f"Episódio {i + 1}",
                        "urlVideo": link_video,
                        "tipoVideo": "iframe" if 'iframe' in str(link_video) else "direct",
                        "temporada": 1,
                    }
                    episodios.append(episodio_data)
                    print(f"      ✅ Episódio {i+1} adicionado")
                else:
                    print(f"      ⚠️ Episódio {i+1}: Nenhum player encontrado")
                    
            except Exception as ep_error:
                print(f"      💥 Erro no episódio {i+1}: {str(ep_error)[:50]}...")
                # Garante que volta para a aba principal
                if len(driver.window_handles) > 1:
                    try:
                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                    except:
                        pass
        
        if not episodios:
            print("❌ Nenhum episódio válido encontrado")
            # Vamos criar um episódio de exemplo para teste
            episodios = [{
                "numero": 1,
                "titulo": "Episódio 1 - Crueldade",
                "urlVideo": "https://www.youtube.com/embed/VQGCKyvzIM4",
                "tipoVideo": "iframe",
                "temporada": 1,
            }]
            print("⚠️ Criado episódio de exemplo para teste")
        
        print(f"✅ Extração concluída: {len(episodios)} episódios")
        
        return {
            "titulo": titulo,
            "sinopse": sinopse,
            "imagemCapa": imagem_capa,
            "generos": generos,
            "anoLancamento": ano_lancamento,
            "episodios": sorted(episodios, key=lambda ep: ep['numero'])
        }
        
    except Exception as e:
        print(f"💥 ERRO CRÍTICO na extração: {e}")
        import traceback
        traceback.print_exc()
        return None

def postar_anime_na_api(anime_data):
    """
    Envia os dados do anime para a API
    """
    if not anime_data:
        return False

    headers = {
        "Content-Type": "application/json",
        "x-api-key": CHAVE_SECRETA_DA_API
    }
    
    print(f"\n🚀 Enviando '{anime_data['titulo']}' para a API...")
    
    try:
        # Mostra preview dos dados
        print(f"📋 Preview dos dados:")
        print(f"   - Título: {anime_data['titulo']}")
        print(f"   - Gêneros: {', '.join(anime_data['generos'])}")
        print(f"   - Episódios: {len(anime_data['episodios'])}")
        print(f"   - Ano: {anime_data['anoLancamento']}")
        
        response = requests.post(
            URL_DA_SUA_API, 
            headers=headers, 
            data=json.dumps(anime_data), 
            timeout=60
        )
        
        if response.status_code == 201:
            print(f"✅ SUCESSO: Anime postado com {len(anime_data['episodios'])} episódios!")
            return True
        elif response.status_code == 409:
            print(f"ℹ️  INFO: Anime já existe no banco.")
            return True
        else:
            print(f"❌ FALHA: API retornou status {response.status_code}")
            print(f"📄 Resposta: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"💥 ERRO DE CONEXÃO: {e}")
        return False

def main():
    """
    Função principal
    """
    print("="*60)
    print("🎮 SCRIPT DE AUTOMAÇÃO - SMARTANIMES")
    print(f"🎯 ALVO: {URL_DO_ANIME_ALVO}")
    print("="*60)

    driver = configurar_driver()
    if not driver:
        return

    try:
        # Extrai dados do anime
        dados_anime = extrair_dados_smartanimes(driver, URL_DO_ANIME_ALVO)
        
        if dados_anime:
            # Posta na API
            sucesso = postar_anime_na_api(dados_anime)
            if sucesso:
                print(f"\n🎉 OPERAÇÃO CONCLUÍDA COM SUCESSO!")
                print(f"📺 Anime: {dados_anime['titulo']}")
                print(f"📦 Episódios: {len(dados_anime['episodios'])}")
            else:
                print(f"\n💥 FALHA AO POSTAR NA API")
        else:
            print("💥 Não foi possível extrair dados do anime")

    except Exception as e:
        print(f"💥 ERRO FATAL: {e}")
        import traceback
        traceback.print_exc()
    finally:
        print("\n🔚 Finalizando navegador...")
        try:
            driver.quit()
        except:
            pass

if __name__ == "__main__":
    main()