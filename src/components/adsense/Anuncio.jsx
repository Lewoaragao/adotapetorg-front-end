/**
 * Anúncios do adsense
 * @since 23/09/2023 09:09:52
 */
export function AnuncioDisplayQuadrado() {
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4429653220259188"
        crossorigin="anonymous"
      ></script>
      {/* Anúncio quadrado */}
      <ins
        // eslint-disable-next-line
        class="adsbygoogle"
        // eslint-disable-next-line
        style={{ display: "block" }}
        data-ad-client="ca-pub-4429653220259188"
        data-ad-slot="2595851164"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push();</script>
    </>
  );
}

export function AnuncioInArticle() {
  return (
    <>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4429653220259188"
        crossorigin="anonymous"
      ></script>
      <ins
        // eslint-disable-next-line
        class="adsbygoogle"
        // eslint-disable-next-line
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-4429653220259188"
        data-ad-slot="6122913073"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </>
  );
}
