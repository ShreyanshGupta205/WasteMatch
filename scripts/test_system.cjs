const http = require('http');

async function checkUrl(url, headers = {}) {
  return new Promise((resolve) => {
    const parsed = new URL(url);
    const req = http.request(
      {
        host: parsed.hostname,
        port: parsed.port,
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers: headers,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          resolve({ status: res.statusCode, body });
        });
      }
    );
    req.on('error', (err) => {
      resolve({ status: 500, error: err.message });
    });
    req.end();
  });
}

async function run() {
  console.log('=====================================================');
  console.log(' 1. TESTING FRONTEND ROUTES (http://localhost:5180)');
  console.log('=====================================================');
  const frontendRoutes = [
    '/',
    '/landing',
    '/seller',
    '/seller/kyc',
    '/seller/streams',
    '/seller/labs',
    '/seller/marketplace',
    '/seller/shipments',
    '/seller/settlement',
    '/buyer',
    '/buyer/kyc',
    '/buyer/profile',
    '/buyer/matches',
    '/buyer/deliveries',
    '/buyer/payments',
    '/admin',
    '/admin/users',
    '/admin/transactions',
    '/admin/labs',
    '/admin/transporters',
    '/admin/compliance',
    '/login',
  ];

  let fePass = 0;
  let feFail = 0;

  for (const r of frontendRoutes) {
    const res = await checkUrl(`http://localhost:5180${r}`);
    if (res.status === 200) {
      console.log(`[PASS] 200 OK  : ${r}`);
      fePass++;
    } else {
      console.error(`[FAIL] ${res.status}   : ${r} - ${res.error || ''}`);
      feFail++;
    }
  }

  console.log('\n=====================================================');
  console.log(' 2. TESTING BACKEND API ENDPOINTS (http://localhost:4000)');
  console.log('=====================================================');
  const apiTests = [
    { url: 'http://localhost:4000/health', headers: {} },
    { url: 'http://localhost:4000/api/seller/streams', headers: { 'x-demo-role': 'seller' } },
    { url: 'http://localhost:4000/api/seller/nearby-labs?pincode=201010', headers: { 'x-demo-role': 'seller' } },
    { url: 'http://localhost:4000/api/seller/offers', headers: { 'x-demo-role': 'seller' } },
    { url: 'http://localhost:4000/api/seller/shipments', headers: { 'x-demo-role': 'seller' } },
    { url: 'http://localhost:4000/api/buyer/profile', headers: { 'x-demo-role': 'buyer' } },
    { url: 'http://localhost:4000/api/buyer/matches', headers: { 'x-demo-role': 'buyer' } },
    { url: 'http://localhost:4000/api/buyer/deliveries', headers: { 'x-demo-role': 'buyer' } },
    { url: 'http://localhost:4000/api/admin/users', headers: { 'x-demo-role': 'admin' } },
    { url: 'http://localhost:4000/api/admin/transactions', headers: { 'x-demo-role': 'admin' } },
    { url: 'http://localhost:4000/api/admin/labs', headers: { 'x-demo-role': 'admin' } },
    { url: 'http://localhost:4000/api/admin/transporters', headers: { 'x-demo-role': 'admin' } },
    { url: 'http://localhost:4000/api/admin/compliance/alerts', headers: { 'x-demo-role': 'admin' } },
  ];

  let apiPass = 0;
  let apiFail = 0;

  for (const t of apiTests) {
    const res = await checkUrl(t.url, t.headers);
    if (res.status === 200) {
      console.log(`[PASS] 200 OK  : ${t.url}`);
      apiPass++;
    } else {
      console.error(`[FAIL] ${res.status}   : ${t.url} - ${res.error || ''}`);
      apiFail++;
    }
  }

  console.log('\n=====================================================');
  console.log(' 3. TESTING ROLE-BASED ACCESS CONTROL (RBAC ISOLATION)');
  console.log('=====================================================');
  // Seller should NOT access /api/buyer/profile
  const rbacTest1 = await checkUrl('http://localhost:4000/api/buyer/profile', { 'x-demo-role': 'seller' });
  if (rbacTest1.status === 403) {
    console.log(`[PASS] RBAC Blocked: Seller accessing Buyer API returned 403 Forbidden.`);
  } else {
    console.error(`[FAIL] RBAC Failure: Expected 403, got ${rbacTest1.status}`);
  }

  // Buyer should NOT access /api/admin/users
  const rbacTest2 = await checkUrl('http://localhost:4000/api/admin/users', { 'x-demo-role': 'buyer' });
  if (rbacTest2.status === 403) {
    console.log(`[PASS] RBAC Blocked: Buyer accessing Admin API returned 403 Forbidden.`);
  } else {
    console.error(`[FAIL] RBAC Failure: Expected 403, got ${rbacTest2.status}`);
  }

  console.log('\n=====================================================');
  console.log(' DIAGNOSTIC AUDIT SUMMARY');
  console.log('=====================================================');
  console.log(`Frontend Routes Tested: ${frontendRoutes.length} | Passed: ${fePass} | Failed: ${feFail}`);
  console.log(`Backend API Endpoints:  ${apiTests.length} | Passed: ${apiPass} | Failed: ${apiFail}`);
  console.log(`RBAC Isolation Checks:  2 | Passed: ${rbacTest1.status === 403 && rbacTest2.status === 403 ? 2 : 0}`);

  if (feFail === 0 && apiFail === 0 && rbacTest1.status === 403 && rbacTest2.status === 403) {
    console.log('\n>>> SYSTEM STATUS: ALL CHECKS PASSED PERFECTLY (100% HEALTHY) <<<\n');
  } else {
    process.exit(1);
  }
}

run();
