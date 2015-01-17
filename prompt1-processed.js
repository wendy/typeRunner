<span class="word">var</span> <span class="word">each</span> <span class="word">=</span> <span class="word">function(collection,</span> <span class="word">iterator)</span> <span class="word new-line">{</span>
  <span class="word">if</span> <span class="word">(Array.isArray(collection))</span> <span class="word new-line">{</span>
    <span class="word">for</span> <span class="word">(var</span> <span class="word">i</span> <span class="word">=</span> <span class="word">0;</span> <span class="word">i</span> <span class="word"><</span> <span class="word">collection.length;</span> <span class="word">i++)</span> <span class="word new-line">{</span>
      <span class="word">iterator(collection[i],</span> <span class="word">i,</span> <span class="word new-line">collection);</span>
    <span class="word new-line">}</span>
  <span class="word">}</span> <span class="word">else</span> <span class="word">if</span> <span class="word">(typeof</span> <span class="word">collection</span> <span class="word">===</span> <span class="word">'object')</span> <span class="word new-line">{</span>
    <span class="word">for</span> <span class="word">(var</span> <span class="word">key</span> <span class="word">in</span> <span class="word">collection)</span> <span class="word new-line">{</span>
      <span class="word">iterator(collection[key],</span> <span class="word">key,</span> <span class="word new-line">collection);</span>
    <span class="word new-line">}</span>
  <span class="word new-line">}</span>
<span class="word new-line">};</span>
