# \# PROJECT\_ARCHITECTURE.md

# 

# Version: V2.0

# 

# Status: Production Development

# 

# Last Updated: 2026-08

# 

# \---

# 

# \# PURPOSE

# 

# This document defines the engineering architecture of the STEELLCX website.

# 

# Every AI coding assistant must follow this architecture.

# 

# The objective is to build a production-ready B2B website that is fast, maintainable and easy to expand.

# 

# Keep the project simple.

# 

# Avoid unnecessary complexity.

# 

# \---

# 

# \# TECHNOLOGY STACK

# 

# Frontend

# 

# • HTML5

# 

# • CSS3

# 

# • Vanilla JavaScript (ES6)

# 

# Development

# 

# • VS Code

# 

# • Git

# 

# • GitHub

# 

# AI Development

# 

# • ChatGPT

# 

# • Codex

# 

# Hosting

# 

# • GitHub (Development)

# 

# • Cloudflare (Production)

# 

# Do NOT introduce

# 

# • React

# 

# • Next.js

# 

# • Vue

# 

# • Angular

# 

# • Vite

# 

# unless explicitly approved.

# 

# \---

# 

# \# PROJECT STRUCTURE

# 

# ```

# steellcx/

# 

# │

# ├── index.html

# ├── products.html

# ├── projects.html

# ├── factory.html

# ├── about.html

# ├── contact.html

# │

# ├── assets/

# │   ├── css/

# │   ├── js/

# │   ├── images/

# │   ├── videos/

# │   ├── icons/

# │   └── logo/

# │

# ├── docs/

# │

# ├── README.md

# ├── PROJECT\_ARCHITECTURE.md

# ├── CHANGELOG.md

# ├── TODO.md

# ├── LICENSE

# └── .gitignore

# ```

# 

# This folder structure should remain stable.

# 

# \---

# 

# \# PAGE STRUCTURE

# 

# Current pages

# 

# Home

# 

# Products

# 

# Projects

# 

# Factory

# 

# About

# 

# Contact

# 

# Rules

# 

# Every page is independent.

# 

# Every page has its own SEO.

# 

# Navigation remains consistent.

# 

# Footer remains consistent.

# 

# \---

# 

# \# CSS STRUCTURE

# 

# ```

# assets/css/

# 

# global.css

# 

# variables.css

# 

# layout.css

# 

# components.css

# 

# utilities.css

# 

# responsive.css

# 

# home.css

# 

# products.css

# 

# projects.css

# 

# factory.css

# 

# about.css

# 

# contact.css

# ```

# 

# Rules

# 

# Global styles first.

# 

# Page styles second.

# 

# Never duplicate CSS.

# 

# Never place page-specific CSS inside global.css.

# 

# \---

# 

# \# JAVASCRIPT STRUCTURE

# 

# ```

# assets/js/

# 

# main.js

# 

# navigation.js

# 

# animation.js

# 

# video.js

# 

# contact.js

# ```

# 

# Rules

# 

# Keep JavaScript lightweight.

# 

# No jQuery.

# 

# No frameworks.

# 

# JavaScript should enhance the experience.

# 

# The website should remain usable without JavaScript.

# 

# \---

# 

# \# IMAGE STRUCTURE

# 

# ```

# assets/images/

# 

# hero/

# 

# products/

# 

# projects/

# 

# factory/

# 

# about/

# 

# contact/

# 

# backgrounds/

# ```

# 

# Naming

# 

# hero-home.webp

# 

# hero-about.webp

# 

# product-screen-01.webp

# 

# factory-welding-01.webp

# 

# project-hotel-01.webp

# 

# Rules

# 

# Use WebP whenever possible.

# 

# Lowercase only.

# 

# Use hyphens.

# 

# Never use spaces.

# 

# Never use Chinese filenames.

# 

# \---

# 

# \# VIDEO STRUCTURE

# 

# ```

# assets/videos/

# 

# factory/

# 

# hero/

# 

# projects/

# ```

# 

# Rules

# 

# MP4 only.

# 

# Muted.

# 

# Loop.

# 

# Autoplay when visible.

# 

# Maximum duration

# 

# 5–10 seconds.

# 

# \---

# 

# \# LOGO STRUCTURE

# 

# ```

# assets/logo/

# 

# logo-black.svg

# 

# logo-white.svg

# 

# logo-gold.svg

# 

# favicon.ico

# 

# apple-touch-icon.png

# ```

# 

# Only official logos belong in this folder.

# 

# \---

# 

# \# ICON STRUCTURE

# 

# ```

# assets/icons/

# 

# ui/

# 

# social/

# 

# products/

# ```

# 

# SVG preferred.

# 

# \---

# 

# \# DOCUMENTATION

# 

# ```

# docs/

# ```

# 

# Reserved for

# 

# Brand Guide

# 

# SEO Guide

# 

# Deployment Guide

# 

# Future documentation

# 

# README remains the primary project document.

# 

# \---

# 

# \# COMPONENT PHILOSOPHY

# 

# The project intentionally avoids heavy frontend frameworks.

# 

# Reusable sections should remain lightweight.

# 

# Reusable components include

# 

# Header

# 

# Footer

# 

# CTA

# 

# Product Card

# 

# Project Card

# 

# Workflow Card

# 

# Contact Form

# 

# Never duplicate identical layouts.

# 

# If the same section appears twice,

# 

# convert it into a reusable structure.

# 

# \---

# 

# \# DESIGN TOKENS

# 

# Container Width

# 

# 1280px

# 

# Section Padding

# 

# 100px

# 

# Grid Gap

# 

# 24px

# 

# Border Radius

# 

# 8px

# 

# Button Radius

# 

# 6px

# 

# Primary Color

# 

# \#171311

# 

# Accent Color

# 

# Champagne Gold

# 

# Background

# 

# Warm White

# 

# Animation

# 

# Subtle only.

# 

# Avoid excessive motion.

# 

# \---

# 

# \# HTML STANDARDS

# 

# Use semantic HTML.

# 

# Use

# 

# header

# 

# main

# 

# section

# 

# article

# 

# footer

# 

# One H1 per page.

# 

# Maintain proper heading hierarchy.

# 

# Avoid unnecessary nested divs.

# 

# \---

# 

# \# CSS STANDARDS

# 

# Prefer Flexbox.

# 

# Use CSS Grid when appropriate.

# 

# Avoid inline styles.

# 

# Avoid duplicated CSS.

# 

# Reuse utility classes.

# 

# Keep selectors simple.

# 

# \---

# 

# \# JAVASCRIPT STANDARDS

# 

# Vanilla JavaScript only.

# 

# Keep code modular.

# 

# Keep code readable.

# 

# Avoid unnecessary dependencies.

# 

# \---

# 

# \# RESPONSIVE BREAKPOINTS

# 

# Desktop

# 

# 1280+

# 

# Laptop

# 

# 1024

# 

# Tablet

# 

# 768

# 

# Mobile

# 

# 480

# 

# Always test mobile.

# 

# \---

# 

# \# IMAGE OPTIMIZATION

# 

# Hero

# 

# 1920px

# 

# Product

# 

# 1000px

# 

# Project

# 

# 1200px

# 

# Thumbnail

# 

# 600px

# 

# Compression

# 

# 80–85%

# 

# Always optimize before upload.

# 

# \---

# 

# \# PERFORMANCE TARGETS

# 

# Performance

# 

# 90+

# 

# Accessibility

# 

# 95+

# 

# SEO

# 

# 95+

# 

# Best Practices

# 

# 95+

# 

# Largest Contentful Paint

# 

# <2.5 seconds

# 

# CLS

# 

# <0.1

# 

# \---

# 

# \# ACCESSIBILITY

# 

# Keyboard navigation

# 

# Visible focus

# 

# Readable contrast

# 

# Meaningful alt text

# 

# Semantic HTML

# 

# \---

# 

# \# SEO STRUCTURE

# 

# Every page should include

# 

# Title

# 

# Description

# 

# Canonical URL

# 

# Open Graph

# 

# Twitter Card

# 

# Structured Data

# 

# Robots

# 

# Sitemap

# 

# Image alt text

# 

# \---

# 

# \# ASSET LIFECYCLE

# 

# When adding new assets

# 

# Step 1

# 

# Keep original files outside the project.

# 

# Step 2

# 

# Optimize images.

# 

# Step 3

# 

# Convert to WebP.

# 

# Step 4

# 

# Rename using project naming rules.

# 

# Step 5

# 

# Move into the correct asset folder.

# 

# Never upload unoptimized assets directly.

# 

# \---

# 

# \# GIT WORKFLOW

# 

# main

# 

# ↓

# 

# develop

# 

# ↓

# 

# feature/home

# 

# feature/products

# 

# feature/projects

# 

# feature/factory

# 

# feature/about

# 

# feature/contact

# 

# Merge into develop.

# 

# Review.

# 

# Merge into main.

# 

# Never develop directly on main.

# 

# \---

# 

# \# AI WORKING RULES

# 

# Before making any changes

# 

# 1\. Read README.md

# 

# 2\. Read PROJECT\_ARCHITECTURE.md

# 

# 3\. Read TODO.md

# 

# Then

# 

# Implement only the requested task.

# 

# Never redesign approved pages.

# 

# Never replace approved images.

# 

# Never rename folders.

# 

# Never move assets without reason.

# 

# Never introduce unnecessary libraries.

# 

# When uncertain,

# 

# preserve the existing implementation.

# 

# \---

# 

# \# DEPLOYMENT

# 

# Development

# 

# VS Code

# 

# ↓

# 

# Git

# 

# ↓

# 

# GitHub

# 

# ↓

# 

# Preview

# 

# ↓

# 

# Production

# 

# Never edit production files directly.

# 

# \---

# 

# \# FUTURE EXPANSION

# 

# Reserved for

# 

# Arabic Version

# 

# Case Studies

# 

# Download Center

# 

# Landing Pages

# 

# Blog

# 

# These features should be added without changing the existing architecture.

# 

# \---

# 

# \# ENGINEERING PHILOSOPHY

# 

# Every file should have a purpose.

# 

# Every folder should have a purpose.

# 

# Every component should be reusable.

# 

# Every page should be maintainable.

# 

# Every change should improve the project.

# 

# Keep it simple.

# 

# Keep it fast.

# 

# Keep it professional.

# 

# Build for long-term maintenance.

# 

# \---

# 

# End of PROJECT\_ARCHITECTURE.md

