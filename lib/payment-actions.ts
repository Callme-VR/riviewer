// Payment-related actions that were previously in auth-client
export const checkout = async () => {
  try {
    const response = await fetch('/api/checkout/pro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data.url) {
      throw new Error('No checkout URL returned from server');
    }
    
    // Redirect to checkout
    window.location.href = data.url;
    return { url: data.url, error: null };
  } catch (error) {
    console.error('Checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { url: null, error: errorMessage };
  }
};

export const customer = {
  portal: async () => {
    try {
      const response = await fetch('/api/customer/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.url) {
        throw new Error('No portal URL returned from server');
      }
      
      // Redirect to customer portal
      window.location.href = data.url;
      return { url: data.url, error: null };
    } catch (error) {
      console.error('Portal error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { url: null, error: errorMessage };
    }
  }
};
