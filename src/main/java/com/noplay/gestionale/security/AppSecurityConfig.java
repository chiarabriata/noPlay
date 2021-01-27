package com.noplay.gestionale.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter
{
    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    public AuthenticationProvider authProvider()
    {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(new BCryptPasswordEncoder());
        return provider;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**", "/login").permitAll()
             //Adding this line solved it
            .and()
            // .anyRequest().fullyAuthenticated()
            .authorizeRequests().antMatchers("login.html").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginPage("/login.html").permitAll()
            .loginProcessingUrl("/login")
            .and()
            .logout().invalidateHttpSession(true)
            .clearAuthentication(true)
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .logoutSuccessUrl("/logout.html").permitAll();
    }

    // @Override
    // public void configure(WebSecurity web) throws Exception {
    // web.ignoring().antMatchers("/resources/**");
// }

    // @Bean
    // @Override
    // public UserDetailsService userDetailsServiceBean() throws Exception {
    //     List<UserDetails> users = new ArrayList<>();
    //     users.add(User.withDefaultPasswordEncoder().username("admin").password("1234").roles("USER").build());
    //     return new InMemoryUserDetailsManager(users);
    // }
}
