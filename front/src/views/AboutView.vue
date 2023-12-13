<script>
export default {
  name: 'AboutView',
  beforeRouteEnter(to, from, next) {
    // Set the title dynamically based on route information
    document.title = `Stock Hub - About`;
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // Set the title dynamically when the route is updated
    document.title = `Stock Hub - About`;
    next();
  },
}
</script>

<template>
  <div class="container">
    <h1>Welcome to StockHub</h1>
    <p class="lead">
      Explore the world of financial markets with StockHub, your go-to platform for real-time stock data. Whether you're an investor or just curious, our user-friendly interface provides valuable insights into various companies' stock prices.
    </p>
    <h2 class="mt-4">Key Features</h2>
    <ul>
      <li>Stay updated with real-time stock prices.</li>
      <li>Discover detailed information about companies, including stock quotes and websites.</li>
      <li>Create a personalized account for a customized experience.</li>
      <li>Log in securely to unlock enhanced features.</li>
      <li>Manage your favorite companies effortlessly.</li>
    </ul>

    <h3>Explore More</h3>
    <li>Visit our GitHub repository:</li>
    <a href="https://github.com/Zlahrouni/full-stack-stock-market.git" target="_blank"><pre><code>https://github.com/Zlahrouni/full-stack-stock-market</code></pre></a>
    <li>Visit my website:</li>
    <a href="https://ziadlahrouni.com/" target="_blank"><pre><code>https://ziadlahrouni.com/</code></pre></a>
  </div>
</template>


<style scoped>

</style>