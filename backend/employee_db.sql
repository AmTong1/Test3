CREATE DATABASE IF NOT EXISTS employee_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
  emp_id    VARCHAR(50)  PRIMARY KEY,
  fullname  VARCHAR(255) NOT NULL,
  age       INT          NOT NULL,
  phone     VARCHAR(50)  NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO employees (emp_id, fullname, age, phone) VALUES
  ('EMP001', 'สมชาย ใจดี',            28, '081-234-5678'),
  ('EMP002', 'วิภาดา รักไทย',          32, '089-876-5432'),
  ('EMP003', 'กิตติศักดิ์ พูลสวัสดิ์', 25, '086-555-1234'),
  ('EMP004', 'นภาลัย รัตนกุล',         30, '090-999-8877'),
  ('EMP005', 'ธนากร มิ่งขวัญ',         35, '082-111-2233');
