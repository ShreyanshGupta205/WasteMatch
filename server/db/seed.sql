-- WasteMatch MVP Seed Data
-- 2 Verified Sellers, 2 Verified Buyers, 3 Waste Streams, 2 Labs, 2 Transporters, 1 Admin User

-- 1. USERS
INSERT INTO users (id, email, password_hash, role, full_name, phone) VALUES
('usr-admin-01', 'admin@wastematch.com', '$2a$10$wK1bJ9..mockhash..admin', 'admin', 'Admin', '+91 99999 00001'),
('usr-seller-01', 'seller@shreeganesh.com', '$2a$10$wK1bJ9..mockhash..seller1', 'seller', 'Rajesh Kumar', '+91 98110 44210'),
('usr-seller-02', 'seller@bharatpaper.com', '$2a$10$wK1bJ9..mockhash..seller2', 'seller', 'Harish Chandra', '+91 98220 55320'),
('usr-buyer-01', 'buyer@aravalicement.com', '$2a$10$wK1bJ9..mockhash..buyer1', 'buyer', 'Vikramaditya Rathore', '+91 98330 66430'),
('usr-buyer-02', 'buyer@greenbrick.com', '$2a$10$wK1bJ9..mockhash..buyer2', 'buyer', 'Sanjay Goel', '+91 98440 77540');

-- 2. BUSINESS PROFILES (VERIFIED)
INSERT INTO business_profiles (
    id, user_id, business_name, gstin, pan, factory_address, city, state, pincode,
    authorized_signatory_name, signatory_email, signatory_phone, industry_type,
    spcb_consent_no, spcb_hw_auth_no, spcb_auth_valid_till, spcb_authorized_categories,
    cpcb_recycler_reg_no, verification_status
) VALUES
(
    'bp-seller-01', 'usr-seller-01', 'Shree Ganesh Galvanizers Plant #2',
    '09AAACS1234F1Z5', 'AAACS1234F', 'Site-4 Industrial Area, Sahibabad', 'Ghaziabad', 'Uttar Pradesh', '201010',
    'Rajesh Kumar', 'rajesh.kumar@shreeganesh.com', '+91 98110 44210', 'Steel Hot-Dip Galvanizing & Wire Drawing',
    'UPPCB/CTO/2024/0981', 'UPPCB/HW/GZB/2024/7741', '2027-12-31', 'Schedule I #26.1 (Spent Acid Liquor), Schedule I #26.3 (Zinc Dross)',
    NULL, 'Verified'
),
(
    'bp-seller-02', 'usr-seller-02', 'Bharat Paper & Board Mills',
    '09BBBCB5678G2Z6', 'BBBCB5678G', 'Bhopa Road Industrial Corridor', 'Muzaffarnagar', 'Uttar Pradesh', '251001',
    'Harish Chandra', 'harish@bharatpaper.com', '+91 98220 55320', 'Kraft Paper & Recycled Pulp Manufacturing',
    'UPPCB/CTO/2023/1129', 'UPPCB/HW/MZF/2023/3412', '2026-11-30', 'Schedule I #33.2 (Alkaline Lime/Caustic Sludge)',
    NULL, 'Verified'
),
(
    'bp-buyer-01', 'usr-buyer-01', 'Aravali Cement Works (AFR Co-Processing Kiln)',
    '08AAACA9876H1Z1', 'AAACA9876H', 'Nimbahera Cement Zone', 'Nimbahera', 'Rajasthan', '312601',
    'Vikramaditya Rathore', 'afr-intake@aravalicement.com', '+91 98330 66430', 'Cement Clinker & Alternate Fuel and Raw Material (AFR)',
    'RSPCB/CTO/2023/8802', 'RSPCB/HW/AFR/2023/11', '2028-06-30', 'Acidic Spent Liquor, Alkaline Sludges, Paint Sludge, RDF',
    'CPCB/RECYCLER/AFR/RAJ/2022/09', 'Verified'
),
(
    'bp-buyer-02', 'usr-buyer-02', 'GreenBrick Eco-Industries',
    '09DDDCG4321K3Z9', 'DDDCG4321K', 'Partapur Industrial Estate', 'Meerut', 'Uttar Pradesh', '250001',
    'Sanjay Goel', 'operations@greenbrick.com', '+91 98440 77540', 'Geopolymer Bricks & Pre-cast Construction Products',
    'UPPCB/CTO/2022/4410', 'UPPCB/HW/MRT/2022/9901', '2027-04-15', 'Spent Foundry Sand, Fly Ash, Inorganic Neutralized Sludge',
    'CPCB/RECYCLER/CONST/UP/2021/41', 'Verified'
);

-- 3. RECEIVER PROFILES (ACCEPTANCE LIMITS)
INSERT INTO receiver_profiles (
    id, buyer_id, monthly_quota_tonnes, min_ph, max_ph, max_chloride_ppm, max_metals_ppm,
    max_moisture_pct, prohibited_contaminants, accepted_waste_categories, service_radius_km,
    indicative_buying_price_min, indicative_buying_price_max
) VALUES
(
    'rp-01', 'usr-buyer-01', 450.0, 0.5, 12.5, 200000.0, 100.0,
    75.0, 'Radioactive isotopes, PCB/POPs > 0.5 ppb, Dioxins',
    'Spent Acidic Liquor (HCl), Alkaline Sludge, Paint Sludge, Solid Recovered Fuel', 1000,
    1000.0, 1500.0
),
(
    'rp-02', 'usr-buyer-02', 150.0, 5.5, 9.5, 500.0, 50.0,
    20.0, 'Strong Acids (unbuffered), Cyanide, Heavy Volatiles',
    'Spent Foundry Sand, Fly Ash, Inert Inorganic Sludge', 200,
    300.0, 800.0
);

-- 4. REFERENCE DATA: NABL LABS DIRECTORY (2 LABS)
INSERT INTO labs_directory (
    id, name, address, city, state, pincode, contact_phone, contact_email,
    nabl_reg_no, test_types, indicative_pricing, turnaround_days, rating, is_active
) VALUES
(
    'lab-01', 'Shriram Institute for Industrial Research', '19, University Road, Timarpur', 'Delhi', 'Delhi NCR', '110007',
    '+91 11 2766 7267', 'hazmat-testing@shriraminstitute.org', 'NABL TC-5012',
    'Targeted ICP-OES Heavy Metals (Pb, Hg, Cd, As), TCLP Leaching, Bomb Calorimetry, Flash Point', '₹3,800 - ₹4,200',
    2, 4.9, TRUE
),
(
    'lab-02', 'SGS India Pvt. Ltd. (Environmental Testing Hub)', 'Plot 250, Udyog Vihar Phase IV', 'Gurugram', 'Haryana', '122016',
    '+91 124 677 6300', 'env.gurgaon@sgs.com', 'NABL TC-5482',
    'Full CPCB Co-Processing Panel, Cold-Vapor AAS for Mercury, Total Chlorides, Fluorides', '₹4,200 - ₹4,800',
    2, 4.8, TRUE
);

-- 5. REFERENCE DATA: TRANSPORTERS DIRECTORY (2 TRANSPORTERS)
INSERT INTO transporters_directory (
    id, name, base_city, coverage_states, vehicle_types, capacity_tonnes,
    authorized_hazardous, spcb_transport_permit_no, permit_valid_till,
    contact_phone, contact_email, price_per_km, driver_hazchem_certified, gps_lora_seal_fitted
) VALUES
(
    'trans-01', 'SafeChem Dedicated Liquid Logistics', 'Ghaziabad',
    'Uttar Pradesh, Delhi NCR, Haryana, Rajasthan',
    'Acid-Resistant Rubber-Lined (Ebonite) ISO Tank Container (Class 8 Approved)', 24.0,
    TRUE, 'UPPCB/HAZ/TR/2023/1108', '2028-03-15',
    '+91 98110 44219', 'dispatch@safechemlogistics.demo', 85.0, TRUE, TRUE
),
(
    'trans-02', 'North-West HazChem Heavy Tankers', 'Ghaziabad',
    'Delhi NCR, Uttar Pradesh, Rajasthan, Madhya Pradesh',
    'Dual-Compartment Vinyl-Ester FRP Acid Road Tanker (Class 8 & 9 Approved)', 26.0,
    TRUE, 'CPCB/TRANS/HAZ/2024/9021', '2027-11-28',
    '+91 97170 33812', 'operations@northwesthazchem.demo', 88.0, TRUE, TRUE
);

-- 6. WASTE STREAMS (3 REALISTIC INDUSTRIAL STREAMS)
INSERT INTO waste_streams (
    id, seller_id, name, source_process, physical_form, estimated_monthly_quantity_tonnes,
    location_address, pincode, hazard_class, un_number, has_lab_report, lab_report_url,
    fingerprint_json, confidence_scores_json, status
) VALUES
(
    'ws-01', 'usr-seller-01', 'Spent Hydrochloric Acid (Pickle Liquor)',
    'Mild Steel Wire & Structural Descaling Vat 2', 'liquid', 12.0,
    'Site-4 Industrial Area, Sahibabad, Ghaziabad', '201010', 'Class 8 Corrosive', 'UN 1789',
    TRUE, '/docs/sample_sgs_assay_sg08.pdf',
    '{"pH": 0.85, "chloride_ppm": 182000, "iron_ppm": 118500, "free_hcl_pct": 4.8, "density_g_cm3": 1.284, "calorific_value_mj_kg": 0.4, "moisture_pct": 68.4, "hazard_class": "Class 8 Corrosive"}',
    '{"pH": "High", "chloride": "High", "metals": "High", "calorific_value": "High", "moisture": "High", "hazard_class": "High"}',
    'Listed'
),
(
    'ws-02', 'usr-seller-02', 'Alkaline Lime/Caustic Sludge',
    'Recycled Kraft Paper Chemical Pulping Clarifier', 'sludge', 9.0,
    'Bhopa Road Industrial Corridor, Muzaffarnagar', '251001', 'Class 9 Miscellaneous Environmental', 'UN 3077',
    FALSE, NULL, -- NO LAB REPORT -> TRIGGERS "Find Labs Near Me" BUTTON!
    '{"pH": 11.8, "calcium_carbonate_pct": 48.0, "total_alkalinity_mg_l": 85000, "moisture_pct": 62.0, "calorific_value_mj_kg": 0.0, "hazard_class": "Class 9"}',
    '{"pH": "Medium", "chloride": "Low", "metals": "Low", "calorific_value": "Medium", "moisture": "Medium", "hazard_class": "Medium"}',
    'Draft'
),
(
    'ws-03', 'usr-seller-01', 'Spent Resin-Bonded Foundry Sand',
    'Hot Metal Casting Sand Core De-moulding Line', 'solid', 15.0,
    'Site-4 Industrial Area, Sahibabad, Ghaziabad', '201010', 'Non-Hazardous Industrial Waste', 'UN NA',
    FALSE, NULL, -- LOW CONFIDENCE -> TRIGGERS "Find Labs Near Me" BUTTON!
    '{"silica_pct": 88.5, "phenolic_resin_pct": 1.8, "loss_on_ignition_pct": 2.4, "moisture_pct": 3.2, "hazard_class": "Non-Hazardous"}',
    '{"metals": "Low", "leachate_toxicity": "Low", "calorific_value": "Low", "hazard_class": "Medium"}',
    'Draft'
);

-- 7. LISTING
INSERT INTO listings (
    id, waste_stream_id, seller_id, asking_price_per_tonne, available_quantity_tonnes, minimum_batch_tonnes, status
) VALUES
('list-01', 'ws-01', 'usr-seller-01', 1250.0, 12.0, 10.0, 'matched');

-- 8. MATCH OFFER
INSERT INTO matches_offers (
    id, listing_id, waste_stream_id, seller_id, buyer_id, offered_price_per_tonne,
    quantity_tonnes, distance_km, estimated_transport_cost, net_economic_gain, co2e_avoided_tonnes, status, accepted_by
) VALUES
(
    'match-hero-01', 'list-01', 'ws-01', 'usr-seller-01', 'usr-buyer-01', 1250.0,
    12.0, 820.0, 69700.0, 40550.0, 1.6, 'Accepted', 'usr-seller-01'
);

-- 9. SHIPMENT (FORM 10 MANIFEST)
INSERT INTO shipments (
    id, match_id, seller_id, buyer_id, transporter_id, scheduled_dispatch_date, status,
    manifest_form_10_no, manifest_data_json, trem_card_data_json, qc_result
) VALUES
(
    'ship-01', 'match-hero-01', 'usr-seller-01', 'usr-buyer-01', 'trans-01', '2026-10-28', 'In Transit',
    'FORM10-UP-2026-9042',
    '{"sender_auth": "UPPCB/HW/GZB/2024/7741", "receiver_auth": "RSPCB/HW/AFR/2023/11", "transporter_permit": "UPPCB/HAZ/TR/2023/1108", "vehicle_no": "UP14-BT-8902", "quantity": "12 MT", "waste_description": "Spent Hydrochloric Acid (Class 8 UN 1789)"}',
    '{"un_no": "UN 1789", "cargo": "Hydrochloric Acid Spent", "haz_class": "Class 8 Corrosive", "ppe": "Full acid rubber suit, SCBA", "spill_protocol": "Neutralize with dry soda ash or lime slurry", "emergency_phone": "1800-180-1111"}',
    'Pending'
);

-- 10. ESCROW TRANSACTION
INSERT INTO escrow_transactions (
    id, match_id, shipment_id, buyer_id, seller_id, amount, status, held_at
) VALUES
(
    'escrow-01', 'match-hero-01', 'ship-01', 'usr-buyer-01', 'usr-seller-01', 15000.0, 'Held', CURRENT_TIMESTAMP
);
