# Application of String Matching and Regular Expression in DNA Pattern Matching

> Program ini ditujukan untuk memenuhi Tugas Besar Strategi Algoritma IF2211 tahun ajaran 2021/2022

## Setup Program
- Pastikan di komputer Anda telah terinstall bahasa Go, Node JS, dan MySQL

## Cara Menjalankan Program
- Setup database
    - Jalankan command berikut pada MySQL server anda untuk membuat database, user dan memberikan priviledge
      ```sql
      CREATE DATABASE tubes3stima;
      CREATE USER 'stima'@'127.0.0.1' IDENTIFIED BY 'fFDzwk4Z!FpU_QU';
      GRANT ALL PRIVILEGES ON tubes3stima.* TO 'stima'@'127.0.0.1' WITH GRANT OPTION;
      ```
- Cara menjalankan Backend program:
    - Pindah ke directory backend
      ```
      cd src/backend
      ```
    - Jalankan program
      ```
      go run server.go
      ```
- Cara menjalankan Frontend program:
    - Pindah ke directory frontend
      ```
      cd src/frontend
      ```
    - Install semua dependencies:
      ```sh
      npm install
      yarn install    # bila anda memiliki yarn
      ```
    - Jalankan program
      ```sh
      npm run dev
      yarn dev        # bila anda memiliki yarn
      ```

