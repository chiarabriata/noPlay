package com.noplay.gestionale.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
            // .authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**", "/login", "login.html", "aziende", "/dipendenti", "/aziende/**", "/dipendenti/**", "aziende.html", "dettagliodipendente.html", "dipendenti.html", "index.html", "logout.html").permitAll()
            .authorizeRequests().antMatchers("/css/**", "/js/**", "/images/**", "/login", "login.html").permitAll()
            //Adding this line solved it
            .antMatchers("aziende.html", "dettagliodipendente.html", "dipendenti.html", "index.html", "logout.html", "registrazione.html").hasAnyRole("ADMIN", "USER")
            .antMatchers(HttpMethod.POST, "/aziende/**", "/dipendenti/**", "/aziende", "/dipendenti", "/utente", "/utente/**" ).hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.PUT, "/aziende/**", "/dipendenti/**", "/aziende", "/dipendenti" ).hasAnyRole("ADMIN")
            .antMatchers(HttpMethod.GET, "/aziende/**", "/dipendenti/**", "/aziende", "/dipendenti").hasAnyRole("ADMIN", "USER")
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginPage("/login.html")
            .loginProcessingUrl("/login").permitAll()
            .defaultSuccessUrl("/index.html", true)
            .failureUrl("/failed.html")
            .and()
            .logout().invalidateHttpSession(true)
            .clearAuthentication(true)
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .logoutSuccessUrl("/login.html").permitAll();
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
