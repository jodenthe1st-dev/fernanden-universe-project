@echo off
title Upload API Server
echo ========================================
echo    SERVEUR UPLOAD API - FERNANDEN
echo ========================================
echo.
echo Lancement du serveur API sur port 3001...
echo.

:loop
echo [%date% %time%] Serveur en cours d'execution...
node start-server.cjs

echo.
echo [%date% %time%] Serveur arrete. Redemarrage dans 5 secondes...
timeout /t 5
goto loop
